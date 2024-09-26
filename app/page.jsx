"use client";
import Link from "next/link";

function page() {
  return (
    <div>
      <h1 className="text-3xl">Welcome to Home Page</h1>
      <Link href="/properties">Show Properties</Link>
    </div>
  );
}

export default page;
