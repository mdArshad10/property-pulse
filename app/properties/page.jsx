"use client";
import PropertyCard from "@/components/PropertyCard";
import { fetchAllProperties } from "@/utils/request.js";

async function PropertyPage() {
  const allProperties = await fetchAllProperties();

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {allProperties.data.length === 0 ? (
          <p>No Property Found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {allProperties.data.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                image={property.images[0]}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PropertyPage;
