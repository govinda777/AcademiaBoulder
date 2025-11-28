import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface VirtualTourProps {
  activeArea: string | null;
}

// List of tour areas with their corresponding images
const tourAreas = [
  {
    id: "Área de Iniciantes",
    image: "https://pixabay.com/get/ga3ffa51a7bd5ef0a4da7f8e1e6cb7195c1f79c4fe40eed2de8dbbeafcb865dab61b7e9be4a196bff8bf30be71b0cebfd2a61f9073a10eee44d19e2b4654f9d4a_1280.jpg",
    hotspots: [
      { id: 1, position: { top: "40%", left: "70%" }, target: "Área Avançada" },
      { id: 2, position: { top: "60%", left: "30%" }, target: "Área de Treinamento" }
    ]
  },
  {
    id: "Área Avançada",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900",
    hotspots: [
      { id: 1, position: { top: "50%", left: "20%" }, target: "Área de Iniciantes" },
      { id: 2, position: { top: "70%", left: "60%" }, target: "Vestiários" }
    ]
  },
  {
    id: "Área de Treinamento",
    image: "https://pixabay.com/get/g4fc1de1bc8d4ab92beb6a2e18d0f2ce5c43b5c5a7d0eab2ef5c68c9f24c8d07ce5e5a9fbb0bc68633d9f4aa1f0d0fe4fe90f639f3ab00a5be01eee2bfa1e8f9d_1280.jpg",
    hotspots: [
      { id: 1, position: { top: "30%", left: "50%" }, target: "Área de Iniciantes" },
      { id: 2, position: { top: "60%", left: "80%" }, target: "Cafeteria" }
    ]
  },
  {
    id: "Vestiários",
    image: "https://pixabay.com/get/g60f4bbce05b5ce63f9f7c6e6d20b15d46de4fc2b4e8fcd93cd5ccb2ded0c86c4de09e8f24f63e41be90f2ce89efa00e37d57ee14275c25a9cca2afdb6b90c70a_1280.jpg",
    hotspots: [
      { id: 1, position: { top: "40%", left: "30%" }, target: "Área Avançada" }
    ]
  },
  {
    id: "Cafeteria",
    image: "https://pixabay.com/get/g6c77493e4c3a0ef9dbe8d9b16ccf60bd39e0272b2cdebbb4d8ae0c06c5c2cdcbebe6e5a3d66f6d41b0a257aa14d47fff94aa8e7b7f3e8d7e9b54fe2d35efa6c9_1280.jpg",
    hotspots: [
      { id: 1, position: { top: "50%", left: "20%" }, target: "Área de Treinamento" }
    ]
  }
];

const VirtualTour = ({ activeArea }: VirtualTourProps) => {
  const [currentArea, setCurrentArea] = useState<string>("Área de Iniciantes");
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // Set active area when prop changes
  useEffect(() => {
    if (activeArea) {
      setCurrentArea(activeArea);
      // Reset position and zoom when changing areas
      setPosition({ x: 0, y: 0 });
      setZoom(1);
    }
  }, [activeArea]);

  // Find the current area object
  const area = tourAreas.find(a => a.id === currentArea) || tourAreas[0];

  // Handle area navigation
  const navigateToArea = (areaId: string) => {
    setCurrentArea(areaId);
    setPosition({ x: 0, y: 0 });
    setZoom(1);
  };

  // Handle zoom in and out
  const handleZoomIn = () => {
    if (zoom < 2) {
      setZoom(prev => prev + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoom > 0.5) {
      setZoom(prev => prev - 0.1);
    }
  };

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  // Handle drag
  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDragging(false);
  };

  return (
    <div className="relative w-full h-full bg-black">
      {/* Tour Navigation */}
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-black/50 text-white border-white/20 hover:bg-black/70"
          onClick={() => {
            const index = tourAreas.findIndex(a => a.id === currentArea);
            const prevIndex = (index - 1 + tourAreas.length) % tourAreas.length;
            navigateToArea(tourAreas[prevIndex].id);
          }}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span className="text-white bg-black/50 px-3 py-1 rounded-md">
          {currentArea}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-black/50 text-white border-white/20 hover:bg-black/70"
          onClick={() => {
            const index = tourAreas.findIndex(a => a.id === currentArea);
            const nextIndex = (index + 1) % tourAreas.length;
            navigateToArea(tourAreas[nextIndex].id);
          }}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col space-y-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-black/50 text-white border-white/20 hover:bg-black/70"
          onClick={handleZoomIn}
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-black/50 text-white border-white/20 hover:bg-black/70"
          onClick={handleZoomOut}
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
      </div>

      {/* Panorama Image Container */}
      <div 
        className={`w-full h-full overflow-hidden ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${area.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          scale={zoom}
          x={position.x}
          y={position.y}
          transition={dragging ? { duration: 0 } : { duration: 0.1, ease: 'easeOut' }}
        >
          {/* Hotspots */}
          {area.hotspots.map((hotspot) => (
            <div 
              key={hotspot.id}
              className="absolute tour-hotspot w-8 h-8 bg-primary/80 rounded-full flex items-center justify-center cursor-pointer z-30"
              style={hotspot.position}
              onClick={() => navigateToArea(hotspot.target)}
            >
              <span className="text-white text-xs font-bold">{hotspot.id}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Tour Instructions */}
      <div className="absolute bottom-4 left-4 z-20 text-white bg-black/50 px-3 py-1 rounded-md text-sm">
        Arraste para explorar | Clique nos pontos para navegar
      </div>
    </div>
  );
};

export default VirtualTour;
