import Header from "@/components/LandingPage/Header";
import Hero from "./Hero";
import PopularCourses from "../Course/PopularCourses";
import FAQ from "../Faq/Faq";
import Feedback from "../Feedback/Feedback";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <PopularCourses />
      <Feedback />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
