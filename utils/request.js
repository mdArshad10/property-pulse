"use client";
import { NEXT_PUBLIC_API_DOMAIN } from "./constant";

async function fetchAllProperties() {
  try {
    // when api domain is not available
    if (!NEXT_PUBLIC_API_DOMAIN) {
      return [];
    }

    const response = await fetch(`${NEXT_PUBLIC_API_DOMAIN}/properties`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error.message);
    return [];
  }
}

async function fetchPropertyById(propertyId) {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_DOMAIN}/properties/${propertyId}`
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
}

export { fetchAllProperties, fetchPropertyById };
