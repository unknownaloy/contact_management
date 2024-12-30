import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URL);
    console.log(
      "dbConnection - connectDb -- connect.connection.host ->",
      connect.connection.host
    );
    console.log(
      "dbConnection - connectDb -- connect.connection.name ->",
      connect.connection.name
    );
  } catch (err) {
    console.log("dbConnection - connectDb -- err ->", err);
    process.exit(1);
  }
};
