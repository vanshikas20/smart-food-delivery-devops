const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vanshikas20105_db_user:vanshikasingh@cluster0.3oh0nzy.mongodb.net/food_delivery?retryWrites=true&w=majority"
    );
    console.log("MongoDB Atlas Connected");
  } catch (error) {
    console.error("DB Error:", error);
  }
};

module.exports = connectDB;