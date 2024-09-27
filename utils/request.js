"use client";
import { NEXT_PUBLIC_API_DOMAIN } from "./constant";

const fetchAllProperties = async () => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_DOMAIN}/api/properties`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error.message);
    return [];
  }
};

const fetchPropertyById = async (propertyId) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_DOMAIN}/api/properties/${propertyId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching property:", error.message);
    return null;
  }
};

export { fetchAllProperties, fetchPropertyById };
