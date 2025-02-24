import jwt from "jsonwebtoken";

import { User } from "../models/userModel.js";
import { compare, hash } from "../utils/crypt.js";
import { response } from "../utils/response.js";

//@desc Register a user
//@route POST /api/users/register
//@access public
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return response(
      res,
      {
        status: false,
        message: "All fields are mandatory",
      },
      400
    );
  }

  const userIsAvailable = await User.findOne({ email });

  if (userIsAvailable) {
    return response(
      res,
      {
        status: false,
        message: "User already exists",
      },
      400
    );
  }

  const hashedPassword = await hash(password);

  const user = await User.create({ username, email, password: hashedPassword });

  console.log("userController - registerUser -- user ->", user);

  if (user) {
    return response(res, {
      status: true,
      message: "User created successfully",
      data: { id: user.id, username: user.username, email: user.email },
    });
  } else {
    return response(res, { status: false, message: "Invalid user data" }, 400);
  }
};

//@desc Login user
//@route POST /api/users/login
//@access public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return response(
      res,
      { status: false, message: "All fields are mandatory" },
      400
    );
  }

  const user = await User.findOne({ email });
  // compare password with hash password
  const isPasswordMatch = await compare(password, user.password);

  if (user && isPasswordMatch) {
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    return response(res, {
      status: true,
      message: "success",
      data: { id: user.id, username: user.username, email: user.email, token },
    });
  } else {
    return response(
      res,
      { status: false, message: "Email or password is incorrect" },
      401
    );
  }
};

//@desc Current user
//@route GET /api/users/current
//@access private
export const currentUser = async (req, res) => {
  return response(res, { status: true, message: "success", data: req.user });
};
