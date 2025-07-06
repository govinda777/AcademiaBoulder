import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import VirtualTour from "@/components/ui/virtual-tour";
import { motion } from "framer-motion";

const tourHotspots = [
  {
    id: "area-iniciantes",
    label: "1",
    position: { top: "25%", left: "25%" },
    title: "Área de Iniciantes"
  },
  {
    id: "area-avancada",
    label: "2",
    position: { top: "33%", right: "33%" },
    title: "Área Avançada"
  },
  {
    id: "area-treinamento",
    label: "3",
    position: { bottom: "25%", right: "25%" },
    title: "Área de Treinamento"
  }
];

const tourAreas = [
  "Área de Iniciantes",
  "Área Avançada",
  "Área de Treinamento",
  "Vestiários",
  "Cafeteria"
];

const VirtualTourSection = () => {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [showTour, setShowTour] = useState(false);

  return (
    <section className="py-16 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 font-sans">Tour Virtual 360°</h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Explore nossa estrutura completa em uma experiência interativa 360°.
          </p>
        </motion.div>

        <motion.div 
          className="relative aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {showTour ? (
            <VirtualTour activeArea={activeArea} />
          ) : (
            <>
              <img 
                src="https://pixabay.com/get/gcb0e054558248cdbe579eb1b477fab688439e561847153139cf077f78486c1069c59479e94da76c919029fe0c6d7ca9906078cb5a03cec3113b82e7d5c973192_1280.jpg" 
                alt="Interior do Centro de Boulder" 
                className="w-full h-full object-cover"
              />
              
              {/* Tour Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/60 flex items-center justify-center">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition duration-300 transform hover:scale-110"
                  onClick={() => setShowTour(true)}
                >
                  <Play className="h-6 w-6" />
                </Button>
              </div>
              
              {/* Tour Hotspots */}
              {tourHotspots.map((spot) => (
                <div 
                  key={spot.id}
                  className="tour-hotspot absolute w-8 h-8 bg-primary/80 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ ...spot.position }}
                  onClick={() => {
                    setActiveArea(spot.title);
                    setShowTour(true);
                  }}
                >
                  <span className="text-white text-xs font-bold">{spot.label}</span>
                </div>
              ))}
            </>
          )}
        </motion.div>

        <motion.div 
          className="mt-6 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {tourAreas.map((area) => (
              <Button
                key={area}
                variant="outline"
                className={`px-4 py-2 ${activeArea === area 
                  ? 'bg-primary/90 hover:bg-primary text-white' 
                  : 'bg-white/10 hover:bg-white/20'} rounded-md text-sm transition duration-300`}
                onClick={() => {
                  setActiveArea(area);
                  setShowTour(true);
                }}
              >
                {area}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VirtualTourSection;
