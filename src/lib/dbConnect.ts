import mongoose, { Connection } from "mongoose";
import { NextResponse } from "next/server";

let isConnected: boolean = false;

let cachedConnection: Connection | null = null;

export const dbConnect = async () => {
  mongoose.set("strictQuery", true);

  if (cachedConnection) return cachedConnection;

  if (isConnected) {
    console.log("You are connected to the database");
    return;
  }

  try {
    const cnx = await mongoose.connect(
      process.env.DATABASE_URL || ""
    );

    isConnected = true;

    cachedConnection = cnx.connection;
    console.log("New db connection established!");

    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw new NextResponse(
      "Failed to connect to the database" + error,
      { status: 500 }
    );
  }
};
