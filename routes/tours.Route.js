import express from "express";
import {
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
} from "../controllers/tour.Controller.js";

const router = express.Router();

//create a tour
router.post("/createTour", createTour);
//get all tours
router.get("/", getAllTours);
//get tour
router.get("/:id", getTour);
//update tour
router.put("/:id", updateTour);
//delete tour
router.delete("/:id", deleteTour);

export default router;
