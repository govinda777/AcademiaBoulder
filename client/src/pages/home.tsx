import { useEffect } from "react";
import { SEOHead } from "@/components/seo/SEOHead";
import { StructuredData, createLocalBusinessSchema } from "@/components/seo/StructuredData";
import HeroSection from "@/components/sections/HeroSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import AboutSection from "@/components/sections/AboutSection";
import TeamSection from "@/components/sections/TeamSection";
import FacilitiesSection from "@/components/sections/FacilitiesSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";

const Home = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          setTimeout(() => {
            const headerOffset = 0; // Header is fixed but sections handle their own paddings in this design
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

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const pageTitle = "Escalada e Cross Training em Sorocaba";
  const pageDescription = "Academia Boulder reúne escalada boulder e cross training em Sorocaba. Treinamento para todos os níveis, do iniciante ao atleta.";

  return (
    <>
      <SEOHead 
        title={pageTitle}
        description={pageDescription}
        keywords="escalada, boulder, cross training, sorocaba, academia, treinamento físico"
      />
      <StructuredData 
        type="localBusiness"
        data={createLocalBusinessSchema()}
      />

      <HeroSection />
      <ProgramsSection />
      <AboutSection />
      <TeamSection />
      <FacilitiesSection />
      <FAQSection />
      <ContactSection />
    </>
  );
};

export default Home;
