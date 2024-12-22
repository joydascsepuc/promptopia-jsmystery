import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    // Checking if connected
    if (isConnected) {
        console.log("MongoDB is already connected!");
        return;
    }

    // If not connected then stablishing the connection
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log("MongoDB connected!");
    } catch (error) {
        console.log(error);
    }
};
