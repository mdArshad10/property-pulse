"use strict";
import Property from "@/models/Property";
import { StatusCodes } from "http-status-codes";
import dbConnection from "@/config/database";

// GET      /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await dbConnection();
    const property = await Property.findById(params.routeId);
    if (!property) {
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: StatusCodes.NOT_FOUND,
      });
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "your get data",
        data: property,
        err: null,
      }),
      { status: StatusCodes.OK }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "something want gone wrong" }),
      { status: 404 }
    );
  }
};
