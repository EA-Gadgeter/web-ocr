import type { ImageForDisplay } from "@/interfaces";

import { 
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";

interface Props {
  image: ImageForDisplay
}

export const ImageCard = ({ image }: Props) => {
  return (
    <Card>
      <CardContent className="p-0">
        <img src={image.imageUrl} alt={image.imageName} className="rounded-t"/>
      </CardContent>

      <CardFooter className="p-2">
        {image.imageName}
      </CardFooter>
    </Card>
  );
};