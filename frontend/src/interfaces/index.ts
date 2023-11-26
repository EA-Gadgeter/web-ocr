type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface ImageForDisplay {
  id: UUID;
  imageName: string;
  imageUrl: string;
}

export interface ImagesResult {
  idImage: UUID;
  extractedText: string;
  imageSrc: string;
}