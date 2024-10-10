import Account from "../models/account.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignIn = async (req, res) => {
  const email = req.body.Email;
  const pw = req.body.Password;
  if (!email || !pw ) {
    return res.status(400).json({
      success: false,
      message: "Email, Password are required.",
    });
  }
  try {
    const mail = await Account.findOne({ Email: req.body.Email });

    if (!mail) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Email not found.",
          data: mail.Password,
        });
    }

    const checkPassword = bcrypt.compare(pw, mail.Password);

    if (!checkPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password." });
    }

    const { Password, Role, ...rest } = mail._doc;

    //create jwt token
    const token = jwt.sign(
      {
        id: mail._id,
        Role: mail.Role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        success: true,
        message: "Successfully login",
        data: {
          ...rest,
        },
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
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
  });

  try {
    const existingUsername = await Account.findOne({
      Username: req.body.Username,
    });
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

export const updateAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const idAcc = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!idAcc) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found." });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully updated.",
        data: idAcc,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
