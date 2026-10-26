const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Full Stack", "Other"],
      default: "Full Stack",
    },
    github: {
      type: String,
      default: "",
    },
    demo: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Project", projectSchema);
