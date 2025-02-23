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
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userIsAvailable = await User.findOne({ email });

  if (userIsAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await hash(password);

  const user = await User.create({ username, email, password: hashedPassword });

  console.log("userController - registerUser -- user ->", user);

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // res.json({ message: "Register the user" });
};

//@desc Login user
//@route POST /api/users/login
//@access public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });
  // compare password with hash password
  const isPasswordMatch = await compare(password, user.password);

  if (user && isPasswordMatch) {
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Email or password is incorrect");
  }
};

//@desc Current user
//@route GET /api/users/current
//@access private
export const currentUser = async (req, res) => {
  // res.json(req.user);
  return response(res, { status: true, message: "success", data: req.user });
};
