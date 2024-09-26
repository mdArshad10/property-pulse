import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description:
    "Discover the best properties in your area, find a perfect rental, or sell your property.",
  keywords: "rental, find rental, sell property",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;
