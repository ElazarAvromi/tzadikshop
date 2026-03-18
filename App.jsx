import { useState } from 'react';
import './styles.css';
import Store from './Store';
import Admin from './Admin';
import { useImageStore } from './useImageStore';

export default function App() {
  const [cart, setCart] = useState([]);
  const [admin, setAdmin] = useState(false);
  const { getProductImages, addImage, removeImage, clearAllImages, loading, imageMap } = useImageStore();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 4, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 16 }}>T</div>
        <div style={{ fontSize: 14, color: '#999' }}>Loading Tzadik Shop...</div>
      </div>
    );
  }

  if (admin) {
    return (
      <Admin
        onBack={() => setAdmin(false)}
        getImgs={getProductImages}
        addImage={addImage}
        removeImage={removeImage}
        clearAllImages={clearAllImages}
        imageMap={imageMap}
      />
    );
  }

  return (
    <Store
      cart={cart}
      setCart={setCart}
      goAdmin={() => setAdmin(true)}
      getImgs={getProductImages}
    />
  );
}
