import { useState, CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { Play, Loader2 } from "lucide-react";
import VirtualTour from "@/components/ui/virtual-tour";
import { motion } from "framer-motion";
import { useVirtualTourSection } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";

interface HotspotPosition {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

interface TourHotspot {
  _key: string;
  id?: string;
  label?: string;
  title?: string;
  position?: HotspotPosition;
}

const VirtualTourSection = () => {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [showTour, setShowTour] = useState(false);
  const { data: virtualTourData, isLoading, error } = useVirtualTourSection();

  if (isLoading) {
    return (
      <section className="py-16 bg-neutral-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4">Carregando Tour Virtual...</p>
        </div>
      </section>
    );
  }

  if (error || !virtualTourData) {
    return (
      <section className="py-16 bg-neutral-900 text-white">
        <div className="container mx-auto px-4 text-center text-red-400">
          <p>Ocorreu um erro ao carregar o Tour Virtual.</p>
          <p>Tente novamente mais tarde.</p>
        </div>
      </section>
    );
  }

  const { title, description, fallbackImage, tourHotspots, tourAreas, videoUrl } = virtualTourData;

  // Helper to convert Sanity position to CSS style
  const getHotspotStyle = (position?: HotspotPosition): CSSProperties => {
    const style: CSSProperties = {};
    if (position?.top !== undefined) style.top = `${position.top}%`;
    if (position?.right !== undefined) style.right = `${position.right}%`;
    if (position?.bottom !== undefined) style.bottom = `${position.bottom}%`;
    if (position?.left !== undefined) style.left = `${position.left}%`;
    return style;
  };

  const fallbackImageUrl = fallbackImage ? urlFor(fallbackImage).url() : "https://pixabay.com/get/gcb0e054558248cdbe579eb1b477fab688439e561847153139cf077f78486c1069c59479e94da76c919029fe0c6d7ca9906078cb5a03cec3113b82e7d5c973192_1280.jpg";

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
          <h2 className="text-3xl font-bold mb-4 font-sans">{title || 'Tour Virtual 360°'}</h2>
          {description && (
            <p className="text-neutral-300 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        <motion.div 
          className="relative aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {showTour ? (
            <VirtualTour activeArea={activeArea} videoUrl={videoUrl} />
          ) : (
            <>
              <img 
                src={fallbackImageUrl}
                alt="Interior do Centro de Boulder" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/60 flex items-center justify-center">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition duration-300 transform hover:scale-110"
                  onClick={() => setShowTour(true)}
                  aria-label="Iniciar Tour Virtual"
                >
                  <Play className="h-6 w-6" />
                </Button>
              </div>
              
              {tourHotspots && tourHotspots.map((spot: TourHotspot) => (
                <button
                  key={spot._key || spot.id}
                  className="tour-hotspot absolute w-8 h-8 bg-primary/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900"
                  style={getHotspotStyle(spot.position)}
                  onClick={() => {
                    if (spot.title) setActiveArea(spot.title);
                    setShowTour(true);
                  }}
                  aria-label={`Ir para ${spot.title || 'área do tour'}`}
                >
                  <span className="text-white text-xs font-bold">{spot.label || '?'}</span>
                </button>
              ))}
            </>
          )}
        </motion.div>

        {tourAreas && tourAreas.length > 0 && (
          <motion.div
            className="mt-6 max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-wrap justify-center gap-2">
              {tourAreas.map((area: string) => (
                <Button
                  key={area}
                  variant="outline"
                  className={`px-4 py-2 ${activeArea === area && showTour
                    ? 'bg-primary hover:bg-primary/90 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white'} rounded-md text-sm transition duration-300`}
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
        )}
      </div>
    </section>
  );
};

export default VirtualTourSection;
