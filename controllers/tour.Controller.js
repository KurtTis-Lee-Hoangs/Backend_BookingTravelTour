import Tour from "../models/tour.Model.js";

export const createTour = async (req, res) => {
  const newUser = new Tour(req.body);
  try {
    const datasaved = await newUser.save();
    res.status(200).json({
      success: true,
      messgae: "Successfully created.",
      data: datasaved,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const idTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!idTour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found." });
    } else {
      res.status(200).json({
        success: true,
        messgae: "Successfully updated.",
        data: idTour,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndDelete(id);
    if (!tour) {
      res.status(404).json({ success: false, message: "Tour not found." });
    } else {
      res.status(200).json({
        success: true,
        messgae: "Successfully delete tour.",
        data: tour,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTours = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const tours = await Tour.find({})
      .skip(page * 10)
      .limit(10);
    if (!tours) {
      res.status(404).json({ success: false, message: "Tour not found." });
    } else {
      res.status(200).json({
        success: true,
        count: tours.length,
        messgae: "Successfully get all tours.",
        data: tours,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);
    if (!tour) {
      res.status(404).json({ success: false, message: "Tour not found." });
    } else {
      res.status(200).json({
        success: true,
        messgae: "Successfully get tour information.",
        data: tour,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
