import Account from "../models/account.Model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken"

export const SignIn = async (req, res) => {
  try {
    const account = await Account.findOne({ Email: req.body.Email });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Email not found.",
      });
    }

    
    const isPasswordValid = await bcrypt.compare(
      req.body.Password,
      account.Password
    );
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }
    
    if (!account.Active) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your email to activate your account.',
      });
    }

    const { Password: pwHash, Role, ...userDetails } = account._doc;

    // Create JWT token
    const token = generateToken(account?.id);

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      })
      .status(200)
      .json({
        success: true,
        message: "Successfully logged in.",
        token: token,
        data: userDetails,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the account by the decoded ID
    const account = await Account.findById(decoded.userId);
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    // If the account is already verified
    if (account.Active) {
      return res.status(400).json({ success: false, message: 'Account already verified' });
    }

    // Set the account to verified
    account.Active = true;
    await account.save();

    res.status(200).json({ success: true, message: 'Account successfully verified!', data: account });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Verification token has expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid verification token' });
    }

    res.status(500).json({ success: false, message: err.message });
  }
});