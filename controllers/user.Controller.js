import User from "../models/user.Model.js";

export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const saved = await newUser.save();
    res
      .status(200)
      .json({ success: true, messgae: "Successfully created.", data: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const idUserUpdated = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!idUserUpdated) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    } else {
      res
        .status(200)
        .json({ success: true, messgae: "Successfully updated.", data: idUserUpdated });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
    } else {
      res
        .status(200)
        .json({
          success: true,
          messgae: "Successfully delete user.",
          data: user,
        });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    } else {
      res.status(200).json({
        success: true,
        messgae: "Successfully get all users.",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    } else {
      res.status(200).json({
        success: true,
        messgae: "Successfully get user information.",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
