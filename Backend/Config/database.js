const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected - ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Connection Failled - ${error.message}`);
  }
};

module.exports = connectDatabase;
