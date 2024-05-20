import mongoose from "mongoose";

let connected = { isConnected: 0 };

export const connectDB = async () => {
  if (connected.isConnected) {
    console.log("Database Already Connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    connected.isConnected = db.connections[0].readyState;
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error in connecting to Database : ", error);
  }
};
