require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    const username = "arvindadmin";
    const password = "kanhaAdmin@123";

    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
      username,
      password: hashedPassword,
    });

    console.log("Admin created successfully");
    console.log("Username:", username);

    await mongoose.connection.close();
  } catch (error) {
    console.error("Admin creation error:", error.message);
    process.exit(1);
  }
};

createAdmin();