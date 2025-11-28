import { useEffect } from "react";
import { Helmet } from "react-helmet";
import HeroSection from "@/components/sections/HeroSection";
import SchedulingWidget from "@/components/sections/SchedulingWidget";
import EventsSection from "@/components/sections/EventsSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import CommunitySection from "@/components/sections/CommunitySection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import FAQSection from "@/components/sections/FAQSection";

const Home = () => {
  // Smooth scroll to sections when navigating via hash links
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          // Add a slight delay to ensure any layout shifts have completed
          setTimeout(() => {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }, 100);
        }
      }
    };

    // Handle hash on initial load
    if (window.location.hash) {
      handleHashChange();
    }

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Academia Boulder - Centro de Escalada</title>
        <meta name="description" content="Academia Boulder é um centro de excelência em escalada boulder com metodologias avançadas para todos os níveis, do iniciante ao atleta profissional." />
        <meta property="og:title" content="Academia Boulder - Centro de Escalada" />
        <meta property="og:description" content="Centro de excelência em escalada boulder com metodologias avançadas para todos os níveis." />
        <meta property="og:image" content="https://pixabay.com/get/g63703d3004e93b4e703b3bbf1d1f3f01097ace0cafb4010d3ff80cc326efdab10cf036bd0aed67ffd4a8a9336a69c41a8822c2cec4fb12068e28692b34c10cf3_1280.jpg" />
        <meta property="og:url" content="https://academiaboulder.com.br" />
        <meta property="og:type" content="website" />
      </Helmet>

      <HeroSection />
      <SchedulingWidget />
      <EventsSection />
      <ProgramsSection />
      <CommunitySection />
      <AboutSection />
      <ContactSection />
      <FAQSection />
    </>
  );
};

export default Home;
