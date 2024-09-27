"use strict";
import Property from "@/models/Property";
import { StatusCodes } from "http-status-codes";
import dbConnection from "@/config/database";

 // GET      /api/properties  
export const GET = async (request) => {
  try {
    await dbConnection();
    const properties = await Property.find({});
    return new Response(
      JSON.stringify({
        success: true,
        message: "your get all user data",
        data: properties,
        err: null,
      }),
      {
        status: StatusCodes.OK,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "something want gone wrong" }),
      { status: 404 }
    );
  }
};


