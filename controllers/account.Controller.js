import Account from "../models/account.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignIn = async (req, res) => {
  const user = req.body.Username;
  const pw = req.body.Password;
  try {
    const username = await Account.findOne({Username: user });

    if (!username) {
      return res
        .status(404)
        .json({ success: false, message: "Username not found." });
    }

    const checkPassword = bcrypt.compare(pw, Account.Password);

    if (!checkPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password." });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to login.",
    });
  }
};

export const SignUp = async (req, res) => {
  const { Username, Password, Email } = req.body;
  if (!Username || !Password || !Email) {
    return res.status(400).json({
      success: false,
      message: "Username, Password, and Email are required.",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.Password, salt);

  const newAccount = new Account({
    Username: req.body.Username,
    Password: hash,
    Email: req.body.Email,
  })

  try {
    const existingUsername = await Account.findOne({ Username: req.body.Username });
    const existingEmail = await Account.findOne({ Email: req.body.Email });

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already exists.",
      });
    }

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const accountData = await newAccount.save();
    return res.status(201).json({
      success: true,
      message: "Successfully created account.",
      data: accountData,
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};


export const createAccount = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.Password, salt);

  const data = {
    Username: req.body.Username,
    Password: hash,
    Email: req.body.Email,
  };
  try {
    const existingUsername = await Account.findOne({ Username: data.Username });
    if (!existingUsername) {
      const accountData = await Account.insertMany(data);
      return res.status(200).json({
        success: true,
        message: "Successfully created account.",
        data: accountData,
      });
    } else {
      return res.status(404).json({ success: false, message: "Error." });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Username already exists." });
  }
};

export const getAllAccount = async (req, res) => {
  try {
    const account = await Account.find();
    if (!account) {
      return res
        .status(404)
        .json({ success: false, message: "Account is empty." });
    } else {
      res.status(200).json({
        success: true,
        messgae: "Successfully get all accounts.",
        data: account,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const acc = await Account.findByIdAndDelete(id);
    if (!acc) {
      res.status(404).json({ success: false, message: "Account not found." });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully delete account.",
        data: acc,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};