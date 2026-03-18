import { useState, useRef } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { PLACEHOLDER } from './data';

export function ImageUploader({ productId, productName, images, onAddImage, onRemoveImage }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  function handleFiles(files) {
    if (!files || files.length === 0) return;
    setUploading(true);
    let processed = 0;
    const total = files.length;

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) {
        processed++;
        if (processed >= total) setUploading(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxSize = 800;
          let w = img.width, h = img.height;
          if (w > maxSize || h > maxSize) {
            if (w > h) { h = (h / w) * maxSize; w = maxSize; }
            else { w = (w / h) * maxSize; h = maxSize; }
          }
          canvas.width = w;
          canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          const resized = canvas.toDataURL('image/jpeg', 0.8);
          onAddImage(productId, resized);
          processed++;
          if (processed >= total) setUploading(false);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  const hasImages = images.length > 0 && images[0] !== PLACEHOLDER;

  return (
    <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 8, padding: 20, marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{productName}</div>
          <div style={{ fontSize: 12, color: '#999' }}>
            ID: {productId} {'\u00B7'} {hasImages ? `${images.length} image${images.length > 1 ? 's' : ''}` : 'No images'}
          </div>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', fontSize: 12, fontWeight: 600, border: '1px solid #ddd', background: '#fff', borderRadius: 6, color: '#333', cursor: 'pointer' }}
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {hasImages && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          {images.map((img, i) => (
            <div key={i} style={{ position: 'relative', width: 80, height: 80, borderRadius: 6, overflow: 'hidden', border: '1px solid #eee' }}>
              <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
              <button
                onClick={() => onRemoveImage(productId, i)}
                style={{ position: 'absolute', top: 2, right: 2, width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer' }}
              >
                <X size={12} color="#fff" />
              </button>
              {i === 0 && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 9, textAlign: 'center', padding: 2, fontWeight: 600 }}>
                  MAIN
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
        onClick={() => fileRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? '#2563EB' : '#ddd'}`,
          borderRadius: 8,
          padding: hasImages ? '12px' : '24px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          background: dragging ? '#EFF6FF' : '#fafafa',
        }}
      >
        {uploading ? (
          <div style={{ color: '#2563EB', fontSize: 13, fontWeight: 500 }}>Processing...</div>
        ) : (
          <div>
            <Upload size={20} color="#bbb" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: 12, color: '#999' }}>Drop images here or click to browse</div>
            <div style={{ fontSize: 11, color: '#ccc', marginTop: 2 }}>JPG, PNG, WebP</div>
          </div>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => { handleFiles(e.target.files); e.target.value = ''; }}
      />
    </div>
  );
}
