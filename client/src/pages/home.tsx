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

  const pageTitle = "Academia Boulder - Escalada e Cross Training em Sorocaba";
  const pageDescription = "Academia Boulder, inaugurada em 2018 em Sorocaba (SP), reúne escalada boulder e cross training em um só espaço, com programas estruturados para todos os níveis, do iniciante ao atleta.";
  const siteUrl = "https://academiaboulder.com";
  const ogImageUrl = `${siteUrl}/og-image.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Academia Boulder",
    url: siteUrl,
    description: pageDescription,
    image: ogImageUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Getúlio Vargas, 475",
      addressLocality: "Sorocaba",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    sameAs: ["https://www.instagram.com/academiaboulder/"],
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <HeroSection />
      <ProgramsSection />
      <AboutSection />
      <ContactSection />
      <FAQSection />
    </>
  );
};

export default Home;
