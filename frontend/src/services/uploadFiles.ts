import { API_URL } from "@/const";

import type { ImagesResult } from "@/interfaces";

export const uploadFiles = async (files: FormData): Promise<ImagesResult[]> => {
    const response = await fetch(`${API_URL}/upload-files`, {
      method: 'POST',
      body: files
    });

    const imagesResult  = await response.json() as ImagesResult[];
    return imagesResult;
};