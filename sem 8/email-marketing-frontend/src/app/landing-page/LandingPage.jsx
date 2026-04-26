import useDynamicTitle from "../../hooks/useDynamicTitle";
import useScrollToHash from "../../hooks/useScrollToHash";
import Cookies  from "./components/Cookies";
import FeaturesSection from "./components/features/FeaturesSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TestimonialSection from "./components/testimonials/TestimoialSection";

const LandingPage = () => {

  useScrollToHash();
  useDynamicTitle("Mailed IT | Landing Page");

  return (
    <>
    
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <Footer />
      <Cookies />
    </>
  );
};

export default LandingPage;
