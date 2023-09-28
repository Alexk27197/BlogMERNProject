const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODBCONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connect To mongoDB Successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
