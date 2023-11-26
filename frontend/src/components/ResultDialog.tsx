import type { ImagesResult } from "@/interfaces";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";

import { CustomScroll } from "@/components/CustomScroll"

interface Props {
  showDialog: boolean;
  imagesResult: ImagesResult[];
  closeModal: (newModalState: boolean) => void;
}

export const ResultDialog = ({ showDialog, imagesResult, closeModal }: Props) => {
  return (
    <Dialog open={showDialog} onOpenChange={closeModal}>
      <DialogContent className="w-3/4 max-w-none max-h-none">
        <DialogHeader>
          <DialogTitle>Resultados</DialogTitle>
        </DialogHeader>

        <CustomScroll maxHeight="500px">
          <div className="flex flex-col px-4">
            {
              imagesResult.map(result => (
                <>
                  <div key={result.idImage} className="flex gap-5 my-3">
                    <picture className="w-72 h-72">
                      <img className="w-full block max-h-full rounded-2xl" src={result.imageSrc} />
                    </picture>

                    <div className="flex-1">
                      <h3 className="text-slate-700 text-xl font-bold">Texto: </h3>
                      <p>{result.extractedText}</p>
                    </div>
                  </div>

                  <Separator decorative={false} orientation="horizontal" className="bg-gray-500 last-of-type:hidden"/>
                </>
              ))
            }
          </div>
        </CustomScroll>

        <DialogFooter>
          <DialogClose>
            <Button type="button" variant="default" className="bg-zinc-500 font-semibold">
              Subir otras imagenes...
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};