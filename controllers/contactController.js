import { Contact } from "../models/contactModel.js";
import { response } from "../utils/response.js";

//@desc Get all contacts
//@route GET /api/contacts
//@access private
export const getContacts = async (req, res) => {
  try {
    const contact = await Contact.find({ user_id: req.user.id });
    return response(
      res,
      { status: true, data: contact, message: "Contacts fetched successfully" },
      200
    );
  } catch (err) {
    return response(res, { status: false, message: err.message }, 500);
  }
};

//@desc Create new contact
//@route POST /api/contacts
//@access private
export const createContact = async (req, res) => {
  console.log("contactController - createContact -- GOT HERE!!!");
  console.log("contactController - createContact -- req.body ->", req.body);
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      user_id: req.user.id,
    });
    return response(
      res,
      { status: true, data: contact, message: "Contact created successfully" },
      201
    );
  } catch (err) {
    return response(res, { status: false, message: err.message }, 500);
  }
};

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return response(
        res,
        { status: false, message: "Contact not found" },
        404
      );
    }
    // await res.status(200).json(contact);
    return response(
      res,
      { status: true, message: "success", data: contact },
      200
    );
  } catch (err) {
    // res.status(404);
    // next(err);

    return response(res, { status: false, message: err.message }, 404);
  }
};

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
export const updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
      // A different user is trying to update the contact

      return response(
        res,
        { status: false, message: "User don't have permission to update" },
        403
      );
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    // await res.status(200).json(updatedContact);
    return response(res, {
      status: true,
      message: "success",
      data: updatedContact,
    });
  } catch (err) {
    res.status(404);
    next(err);
  }
};

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
export const deleteContact = async (req, res, next) => {
  try {
    console.log(
      "contactController - deleteContact -- req.params.id1 ->",
      req.params.id
    );
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
      // A different user is trying to update the contact

      return response(
        res,
        { status: false, message: "User don't have permission to update" },
        403
      );
    }
    console.log(
      "contactController - deleteContact -- req.params.id2 ->",
      req.params.id
    );
    await Contact.deleteOne({ _id: req.params.id });
    // res.status(200).json(contact);
    return response(res, {
      status: true,
      message: "success",
      data: contact,
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
};
