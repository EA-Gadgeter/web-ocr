import { CardContent } from "@/components/ui/card";
import type { ImageForDisplay } from "@/interfaces";

import { ImageCard } from "@/components/ImageCard";
import { CustomScroll } from "@/components/CustomScroll"

interface Props {
  imagesForDisplay: ImageForDisplay[]
}

export const ImageGrid = ({ imagesForDisplay }: Props) => {
  return (
    <CustomScroll maxHeight="350px">
      <CardContent className="grid grid-cols-3 gap-1">
        {
          imagesForDisplay.map(image => (
            <ImageCard key={image.id} image={image} />
          ))
        }
      </CardContent>
    </CustomScroll>
  );
};