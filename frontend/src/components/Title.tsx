import { Badge } from "@/components/ui/badge";


export const Title = () => {
  return (
    <div className="flex flex-col items-center gap-3 mb-7">
      <h1 className="font-bold text-5xl">WEB-OCR</h1>

      <Badge className="text-sm">
        Sube cualquier imagen para obtener el texto
      </Badge>
    </div>
  );
};