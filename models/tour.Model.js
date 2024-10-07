import mongodb from "../config/mongoose.js";

const tourSchema = new mongodb.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongodb.Types.ObjectId,
        ref: "Review",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    timeBegin: {
      type: Date,
    },
    timeEnd: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Tour = mongodb.model("Tour", tourSchema);
export default Tour;
