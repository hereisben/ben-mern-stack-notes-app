import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("Error connecting to MONGODB", error);
    process.exit(1);
  }
};

export default connectDatabase;
