"use client";
import { useParams } from "next/navigation";
import { fetchPropertyById } from "@/utils/request";
import { useState } from "react";

function ParticularPropertyPage() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!propertyId) return;
      try {
        const particularProperty = await fetchPropertyById(propertyId);
        setProperty(particularProperty);
      } catch (error) {
        console.error("Error fetching property", error);
      } finally {
        setLoading(false);
      }

      // if property is null,
      if (property === null) {
        await fetchData();
      }
    };
  }, [property, propertyId]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {property && (
        <div>
          <h2>{property.name}</h2>
          <p>{property.address}</p>
          <p>{property.description}</p>
        </div>
      )}
      {!property && <p>Property not found.</p>}

      {/* Add your property details here */}

      <style jsx>{`
        div {
          margin: 20px;
        }
      `}</style>
    </div>
  );
}

export default ParticularPropertyPage;
