import { FormEvent, useId, useState, useRef } from "react";

import { uploadFiles } from "@/services/uploadFiles";

import type { ImageForDisplay, ImagesResult } from "@/interfaces";

import { 
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useToast } from "@/components/ui/use-toast"

import { ImageGrid } from "@/components/ImageGrid";
import { PhotoPlus, Loader } from "@/components/icons";
import { ResultDialog } from "@/components/ResultDialog";

export const MainForm = () => {
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [imagesResult, setImagesResult] = useState<ImagesResult[]>([]);
  const [ imagesForDisplay, setImagesForDisplay ] = useState<ImageForDisplay[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const inputFilesId = useId();
  const formFilesId = useId();

  const handleImageChange = () => {
    if (!inputFileRef.current) return;

    const images = inputFileRef.current.files;

    if (!images) return;
    
    const newImagesForDisplay: ImageForDisplay[] = Array.from(images).map(image => {
      return {
        id: crypto.randomUUID(),
        imageName: image.name,
        imageUrl: URL.createObjectURL(image),
      };
    });

    setImagesForDisplay(newImagesForDisplay);
  };

  const handleImageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!inputFileRef.current) return;

    const filesToSubmit = inputFileRef.current.files;

    if (!filesToSubmit || filesToSubmit.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Sube por lo menos una imagen...",
      })

      return;
    }

    const files = new FormData();
    
    // El indice tanto del array para mostrar como de los archivos es el mismo
    for (let i = 0; i < filesToSubmit.length; i++) {
      files.append(`images`, filesToSubmit[i]);
      files.append("ids", imagesForDisplay[i].id);
      files.append("srcs", imagesForDisplay[i].imageUrl);
    }

    setProcessing(true);

    try {
      const newImagesResult = await uploadFiles(files);
      setImagesResult(newImagesResult);
      setShowDialog(true);
      setProcessing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = (newModalState: boolean) => {
    setImagesForDisplay([]);

    if (!inputFileRef.current) return;
    inputFileRef.current.value = "";

    setShowDialog(newModalState);
  };
  
  return (
    <>
      <Card className="w-[600px]">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Sube aqui tus imagenes</CardTitle>

          <form onSubmit={handleImageSubmit} id={formFilesId}>
            <Input 
              className="hidden"
              type="file"
              accept="image/png, image/jpeg"
              multiple
              id={inputFilesId}
              ref={inputFileRef}
              alt="Input para subir las imagenes" 
              onChange={handleImageChange}
            />

            <Button variant="outline" type="button">
              <Label htmlFor={inputFilesId} className="flex gap-1 items-center">
                <PhotoPlus />
                Agregar
              </Label>   
            </Button>     
          </form>
        </CardHeader>

        <ImageGrid imagesForDisplay={imagesForDisplay} />

        <CardFooter className="border-t p-4">
          <Button form={formFilesId} type="submit" className="flex gap-1" disabled={processing}>
            {processing && <Loader />}
            {processing ? "Procesando" : "Procesar"}
          </Button>
        </CardFooter>
      </Card>
    
      <ResultDialog showDialog={showDialog} imagesResult={imagesResult} closeModal={closeModal} />
    </>
  );
};