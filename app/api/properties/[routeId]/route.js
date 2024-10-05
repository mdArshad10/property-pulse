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

// POST /api/properties
export const POST = async (request) => {
  try {
    // accept the request
    const formData = await request.formData();

    // Access the all values from amenities and images
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    // create propertyData object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipCode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.street"),
        email: formData.get("seller_info.street"),
        phone: formData.get("seller_info.street"),
      },
      images,
    };

    return new Response(
      JSON.stringify({ success: true, message: "OK", data: null, err: null }),
      { status: StatusCodes.OK }
    );
  } catch (error) {
    console.log("there are errors when adding the properties");
    return new Response(
      JSON.stringify({
        success: false,
        message: "failure",
        data: null,
        err: error.message,
      }),
      { status: StatusCodes.BAD_GATEWAY }
    );
  }
};
