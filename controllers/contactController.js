import { Contact } from "../models/contactModel.js";

//@desc Get all contacts
//@route GET /api/contacts
//@access public
export const getContacts = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json(contact);
  } catch (err) {
    res.status(500);
    next(err);
  }
};

//@desc Create new contact
//@route POST /api/contacts
//@access public
export const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create({ name, email, phone });
    res.status(200).json(contact);
  } catch (err) {
    res.status(500);
    next(err);
  }
};

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    await res.status(200).json(contact);
  } catch (err) {
    res.status(404);
    next(err);
  }
};

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
export const updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    await res.status(200).json(updatedContact);
  } catch (err) {
    res.status(404);
    next(err);
  }
};

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
export const deleteContact = (req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}` });
};
