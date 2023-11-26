import type { ImagesResult } from "@/interfaces";

export const uploadFiles = async (files: FormData): Promise<ImagesResult[]> => {
    const response = await fetch('http://localhost:8000/upload-files', {
      method: 'POST',
      body: files
    });

    const imagesResult  = await response.json() as ImagesResult[];
    return imagesResult;
};