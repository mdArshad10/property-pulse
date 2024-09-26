import mongoose from "mongoose";

let connected = false;

const dbConnected = async () => {
  // it is told only save the data which is define into the schema
  mongoose.set("strictQuery", true);
  

  // check is it already connected or not ??
  if (connected) {
    console.log("database already connected");
    return;
  }

  try {
    const dbInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/property-pluse`
    );
    connected = true;

    console.log("the database is connected at " + dbInstance.connection.port);
  } catch (error) {
    console.log(error.message);
    process;
  }
};

export default dbConnected;
