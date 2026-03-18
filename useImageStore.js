import { useState, useEffect } from 'react';
import { PLACEHOLDER } from './data';

const STORAGE_KEY = 'tzadik-product-images';

export function useImageStore() {
  const [imageMap, setImageMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setImageMap(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load images:', e);
    }
    setLoading(false);
  }, []);

  function saveToStorage(newMap) {
    setImageMap(newMap);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMap));
    } catch (e) {
      console.error('Failed to save images:', e);
      alert('Storage is full. Try removing some images or using smaller files.');
    }
  }

  function getProductImages(productId) {
    const key = String(productId);
    if (imageMap[key] && imageMap[key].length > 0) {
      return imageMap[key];
    }
    return [PLACEHOLDER];
  }

  function addImage(productId, base64Data) {
    const key = String(productId);
    const current = imageMap[key] || [];
    const updated = { ...imageMap, [key]: [...current, base64Data] };
    saveToStorage(updated);
  }

  function removeImage(productId, index) {
    const key = String(productId);
    const current = imageMap[key] || [];
    const updated = { ...imageMap, [key]: current.filter((_, i) => i !== index) };
    saveToStorage(updated);
  }

  function clearAllImages() {
    saveToStorage({});
  }

  return { imageMap, getProductImages, addImage, removeImage, clearAllImages, loading };
}
