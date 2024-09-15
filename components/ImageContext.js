// ImageContext.js
import React, { createContext, useState, useContext } from 'react';

const ImageContext = createContext();

export const useImageContext = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [imageData, setImageData] = useState(null);
  const [detections, setDetections] = useState(null);

  return (
    <ImageContext.Provider value={{ imageData, setImageData, detections, setDetections }}>
      {children}
    </ImageContext.Provider>
  );
};
