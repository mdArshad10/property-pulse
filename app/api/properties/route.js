import Property from "@/models/Property";
import { StatusCodes } from "http-status-codes";
import dbConnection from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

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

// POST     /api/properties
export const POST = async (request) => {
  try {
    await dbConnection();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User id is required",
          data: null,
        }),
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const { userId } = sessionUser;

    const formData = await request.formData();

    // access al values from amenities and images
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
        zipcode: formData.get("location.zipcode"),
      },
      beds: parseInt(formData.get("beds")),
      baths: parseInt(formData.get("baths")),
      square_feet: parseInt(formData.get("square_feet")),
      amenities,
      rates: {
        nightly: parseFloat(formData.get("rates.nightly_rate")),
        weekly: parseFloat(formData.get("rates.weekly_rate")),
        monthly: parseFloat(formData.get("rates.monthly_rate")),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        phone: formData.get("seller_info.phone"),
        email: formData.get("seller_info.email"),
      },

      owner: userId,
    };

    // upload image(s) to cloudinary
    const imageUploadPromises = [];
    images.forEach(async (image) => {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // convert the image data to base64
      const imageBase64 = imageData.toString("base64");

      // make request to upload to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "property-pulse",
        }
      );
      imageUploadPromises.push(result.secure_url);

      // wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);
      propertyData.images = uploadedImages;
    });

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "something want gone wrong" }),
      { status: 404 }
    );
  }
};
