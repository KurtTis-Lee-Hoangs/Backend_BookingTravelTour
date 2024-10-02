import Account from "../models/account.Model.js";
import bcrypt from "bcryptjs";
export const SignIn = async (req, res) => {
  const username = req.body.username;

  try {
    const username = await Account.findOne({ username });

    if (!username) {
      return res
        .status(404)
        .json({ success: false, message: "Username not found." });
    }

    const checkPassword = bcrypt.compare(req.body.password, Account.password);

    if (!checkPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect email or password." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to login." });
  }
};

export const SignUp = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const data = {
    username: req.body.username,
    password: hash,
  };
  try {
    const existingUsername = await Account.findOne({ name: data.username });
    if (!existingUsername) {
      const accountData = await Account.insertMany(data);
      return res.status(200).json({
        success: true,
        message: "Successfully created account.",
        data: accountData,
      });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Username already exists." });
  }
};

export const createAccount = async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
    role: "admin",
  };
  try {
    const existingUsername = await Account.findOne({ name: data.username });
    if (!existingUsername) {
      const accountData = await Account.insertMany(data);
      return res.status(200).json({
        success: true,
        message: "Successfully created account.",
        data: accountData,
      });
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
        .json({ success: false, message: "Account not found." });
    } else {
      res.status(200).json({
        success: true,
        messgae: "Successfully get all users.",
        data: account,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
