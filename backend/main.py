from typing import List
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware

import cv2 as cv
import numpy as np
import easyocr

ocrReader = easyocr.Reader(["es", "en"])

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.post("/upload-files")
async def uploadFiles(ids: List[str] = Form(...), srcs: List[str] = Form(...), images: List[UploadFile] = File(...)):
    responseArray = []

    for id, image, src in zip(ids, images, srcs):
        file_contents = await image.read()

        npIntArray = np.fromstring(file_contents, np.uint8)
        image = cv.imdecode(npIntArray, cv.IMREAD_COLOR)

        # Convert to grayscale
        gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)

        # Apply histogram equalization
        equalized = cv.equalizeHist(gray)

        ocrResult = ocrReader.readtext(equalized)

        textResult = ""

        for result in ocrResult:
            textResult += f"{result[1]} "

        responseArray.append({
            "idImage": id,
            "extractedText": textResult,
            "imageSrc": src
        })

    return responseArray
