import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";

const HomePage = async () => {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
      <Footer />
    </div>
  );
};

export default HomePage;
