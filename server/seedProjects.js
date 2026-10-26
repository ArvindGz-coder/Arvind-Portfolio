require("dotenv").config();

const mongoose = require("mongoose");
const Project = require("./models/Projects");

const projects = [
  {
    number: "01",
    title: "CareerGenie",
    description:
      "An AI-powered career platform that helps students manage resumes, job applications, career profiles and interview preparation.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Gemini AI",
    ],
    github: "https://github.com/ArvindGz-coder/CareerGenie",
    demo: "#",
    featured: true,
  },
  {
    number: "02",
    title: "Student Career OS",
    description:
      "A centralized career management platform for students to manage internships, jobs, resumes, projects and certifications.",
    technologies: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    number: "03",
    title: "JECRC ERP Frontend",
    description:
      "A modern frontend interface for a student ERP system designed to improve accessibility and usability of academic information.",
    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
    ],
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    number: "04",
    title: "Password Strength Checker",
    description:
      "A web application that evaluates password strength and provides feedback to help users create stronger passwords.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    number: "05",
    title: "Calculator",
    description:
      "A clean and responsive calculator application supporting standard arithmetic operations.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    github: "#",
    demo: "#",
    featured: false,
  },
];

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    await Project.deleteMany({});

    await Project.insertMany(projects);

    console.log(`${projects.length} projects inserted successfully`);

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedProjects();