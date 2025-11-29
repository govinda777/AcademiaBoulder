import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface SocialFeedProps {
  images: string[];
}

const SocialFeed = ({ images }: SocialFeedProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="instagram-feed grid gap-2">
      {images.map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer overflow-hidden rounded"
              onClick={() => setSelectedImage(image)}
            >
              <ImageWithFallback
                src={image}
                fallbackSrc="/placeholder-image.jpg"
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover rounded transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-0 overflow-hidden">
            <div className="relative w-full h-full aspect-square md:aspect-auto md:h-[80vh]">
              <ImageWithFallback
                src={image}
                fallbackSrc="/placeholder-image.jpg"
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default SocialFeed;
