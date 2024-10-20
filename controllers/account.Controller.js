import Account from "../models/account.Model.js";
import User from "../models/user.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import {sendVerificationEmail} from "../utils/sendEmail.js"

export const SignUp = asyncHandler(async (req, res) => {
  const { Username, Email, Password } = req.body;
  // Make sure both email and password are provided
  if (!Email || !Password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }
  try {
    const existingUser = await Account.findOne({ Username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username is already registered." });
    }
    // Check if the user already exists
    const existingEmail = await Account.findOne({ Email });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: 'Email is already registered.' });
    }
    // Create a new account
    const account = new Account({
      Username,
      Email,
      Password: bcrypt.hashSync(Password, 10), // hash the password
      Active: false, // set account as not verified
    });
    // Save the account to the database
    const savedAccount = await account.save();
    // Check if the account was successfully created
    if (!savedAccount) {
      return res.status(500).json({ success: false, message: 'Account creation failed.' });
    }
    const user = new User({
      Email,
      AccountId: savedAccount._id, // liên kết với account vừa tạo
      Name: req.body.Name,
      Gender:  req.body.Gender,
      Birhday: "",
      Phone:  req.body.Phone,
      Address:  req.body.Address,
      Photo: ""
    });
    const savedUser = await user.save();
    if (!savedUser) {
      return res
        .status(500)
        .json({ success: false, message: "User creation failed." });
    }

    // Generate a verification token
    const verificationToken = jwt.sign({ userId: savedAccount._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    // Generate the verification link
    const verificationLink = `${req.protocol}://${req.get('host')}/auth/verify-email/${verificationToken}`;
    // Send the verification email
    await sendVerificationEmail(Email, verificationLink);
    res.status(201).json({
      success: true,
      message: 'Account registered successfully! Please verify your email to activate your account.',
    });
  } catch (error) {
    // Catch and return any errors
    res.status(500).json({ success: false, message: error.message });
  }
});

export const getAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const acc = await Account.findById(id);
    if (!acc) {
      res.status(404).json({ success: false, message: "Account not found." });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully get account information.",
        data: acc,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllAccount = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const account = await Account.find().limit(10)
    .skip(page * 10);;
    if (!account) {
      return res
        .status(404)
        .json({ success: false, message: "Account is empty." });
    } else {
      res.status(200).json({
        success: true,
        messgae: "Successfully get all accounts.",
        total: account.length,
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

    // Tìm và xóa tài khoản
    const acc = await Account.findByIdAndDelete(id);
    if (!acc) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found." });
    }

    // Tìm và xóa user có email tương ứng
    const user = await User.findOneAndDelete({ Email: acc.Email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Nếu cả account và user đều bị xóa thành công
    res.status(200).json({
      success: true,
      message: "Successfully deleted account and user.",
      data: { account: acc, user: user },
    });
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
