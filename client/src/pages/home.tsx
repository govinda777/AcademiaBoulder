import { useEffect } from "react";
import { SEOHead } from "@/components/seo/SEOHead";
import { StructuredData, createLocalBusinessSchema } from "@/components/seo/StructuredData";
import HeroSection from "@/components/sections/HeroSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
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
      <ContactSection />
      <FAQSection />
    </>
  );
};

export default Home;
