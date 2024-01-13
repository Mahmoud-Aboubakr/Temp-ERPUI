// image.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  saveImage(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        // Save the image to the 'uploads' folder
        const imagePath = `./assest/uploads/${file.name}`;
        this.saveBase64Image(imagePath, event.target.result);
        
        // Return the image path
        resolve(imagePath);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      // Read the image as a data URL
      reader.readAsDataURL(file);
    });
  }

  private saveBase64Image(path: string, base64Data: string): void {
    debugger; 
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = path;
    link.click();
  }
}
