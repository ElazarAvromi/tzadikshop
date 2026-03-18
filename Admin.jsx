import { useState } from 'react';
import { ArrowLeft, Eye, Search, Trash2, Image, Camera } from 'lucide-react';
import { DEFAULT_PRODUCTS, ORDERS, STS } from './data';
import { ImageUploader } from './ImageUploader';

function AdminHeader({ onBack }) {
  return (
    <div style={{ background: '#fff', borderBottom: '1px solid #e5e5e5', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', gap: 16 }}>
        <span onClick={onBack} style={{ fontSize: 13, color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}><ArrowLeft size={16} /> Store</span>
        <div style={{ width: 1, height: 24, background: '#e5e5e5' }} />
        <div style={{ width: 28, height: 28, borderRadius: 4, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 12 }}>T</div>
        <span style={{ fontWeight: 700 }}>Tzadik</span>
        <span style={{ background: '#1a1a1a', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', letterSpacing: 1, borderRadius: 3 }}>ADMIN</span>
      </div>
    </div>
  );
}

function TH({ children, right }) {
  return <th style={{ textAlign: right ? 'right' : 'left', padding: '10px 14px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: '#888', borderBottom: '1px solid #e5e5e5' }}>{children}</th>;
}

function ORow({ order, onSelect }) {
  const st = STS[order.status];
  return (
    <tr style={{ cursor: 'pointer' }} onClick={() => onSelect(order)}>
      <td style={{ padding: '10px 14px', borderBottom: '1px solid #f0f0f0', fontFamily: 'monospace', fontWeight: 600 }}>{order.id}</td>
      <td style={{ padding: '10px 14px', borderBottom: '1px solid #f0f0f0' }}>{order.customer}</td>
      <td style={{ padding: '10px 14px', borderBottom: '1px solid #f0f0f0', color: '#888' }}>{order.date}</td>
      <td style={{ padding: '10px 14px', borderBottom: '1px solid #f0f0f0' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', fontSize: 11, fontWeight: 600, borderRadius: 20, background: st.bg, color: st.fg }}>{st.label}</span></td>
      <td style={{ padding: '10px 14px', borderBottom: '1px solid #f0f0f0', textAlign: 'right', fontFamily: 'monospace' }}>{'\u20AA'}{order.total.toFixed(2)}</td>
      <td style={{ padding: '10px 14px', borderBottom: '1px solid #f0f0f0' }}><Eye size={14} color="#ccc" /></td>
    </tr>
  );
}

export default function Admin({ onBack, getImgs, addImage, removeImage, clearAllImages, imageMap }) {
  const [orders, setOrders] = useState(ORDERS);
  const [tab, setTab] = useState('overview');
  const [sel, setSel] = useState(null);
  const [sf, setSF] = useState('all');
  const [q, setQ] = useState('');
  const [imgSearch, setImgSearch] = useState('');

  const filtered = orders.filter(o => {
    if (sf !== 'all' && o.status !== sf) return false;
    if (q && !o.customer.toLowerCase().includes(q.toLowerCase()) && !o.id.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });
  const rev = orders.reduce((s, o) => s + o.total, 0);
  const updSt = (id, ns) => { setOrders(p => p.map(o => o.id === id ? { ...o, status: ns } : o)); if (sel && sel.id === id) setSel(p => ({ ...p, status: ns })); };

  const stats = [
    { l: 'Total Revenue', v: '\u20AA' + rev.toLocaleString(), c: '#059669' },
    { l: 'Total Orders', v: orders.length, c: '#2563EB' },
    { l: 'Pending', v: orders.filter(o => o.status === 'pending' || o.status === 'processing').length, c: '#D97706' },
    { l: 'Delivered', v: orders.filter(o => o.status === 'delivered').length, c: '#7C3AED' },
  ];

  const totalImages = Object.values(imageMap).reduce((s, arr) => s + arr.length, 0);
  const productsWithImages = Object.keys(imageMap).filter(k => imageMap[k] && imageMap[k].length > 0).length;
  const filteredProducts = imgSearch ? DEFAULT_PRODUCTS.filter(p => p.name.toLowerCase().includes(imgSearch.toLowerCase()) || String(p.id) === imgSearch) : DEFAULT_PRODUCTS;

  // Order detail
  if (sel) {
    const st = STS[sel.status];
    return (
      <div style={{ background: '#fafafa', minHeight: '100vh' }}>
        <AdminHeader onBack={onBack} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 20px' }}>
          <div onClick={() => setSel(null)} style={{ fontSize: 13, color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}><ArrowLeft size={14} /> Back</div>
          <div style={{ background: '#fff', border: '1px solid #e5e5e5', padding: 24, marginBottom: 20, borderRadius: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
              <div><h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: 'monospace' }}>{sel.id}</h2><div style={{ fontSize: 13, color: '#999', marginTop: 2 }}>{sel.date}</div></div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 14px', fontSize: 11, fontWeight: 600, borderRadius: 20, background: st.bg, color: st.fg }}>{st.label}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              <div><div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: '#999', marginBottom: 8 }}>Customer</div><div style={{ fontWeight: 600 }}>{sel.customer}</div><div style={{ fontSize: 13, color: '#666' }}>{sel.email}</div><div style={{ fontSize: 13, color: '#666' }}>{sel.phone}</div></div>
              <div><div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: '#999', marginBottom: 8 }}>Shipping</div><div style={{ fontSize: 13, color: '#555' }}>{sel.address}</div></div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: '#999', marginBottom: 8 }}>Items</div>
            <div style={{ border: '1px solid #eee', borderRadius: 4, overflow: 'hidden' }}>
              {sel.items.map((it, i) => { const pr = DEFAULT_PRODUCTS.find(x => x.id === it.pid); return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderBottom: i < sel.items.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <img src={getImgs(it.pid)[0]} style={{ width: 48, height: 48, objectFit: 'cover', background: '#f5f5f5', borderRadius: 4 }} alt="" />
                  <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500 }}>{pr ? pr.name : 'Unknown'}</div><div style={{ fontSize: 12, color: '#999' }}>Size: {it.size} {'\u00B7'} Qty: {it.qty}</div></div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{'\u20AA'}{((pr ? pr.price : 0) * it.qty).toFixed(2)}</div>
                </div>
              ); })}
            </div>
            <div style={{ textAlign: 'right', marginTop: 16 }}><div style={{ fontSize: 12, color: '#999' }}>Total</div><div style={{ fontSize: 22, fontWeight: 700 }}>{'\u20AA'}{sel.total.toFixed(2)}</div></div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e5e5e5', padding: 24, borderRadius: 6 }}>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Update Status</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{Object.entries(STS).map(([k, v]) => <button key={k} onClick={() => updSt(sel.id, k)} style={{ padding: '6px 16px', fontSize: 12, fontWeight: 600, borderRadius: 20, border: sel.status === k ? 'none' : '1px solid #ddd', background: sel.status === k ? v.bg : '#fff', color: sel.status === k ? v.fg : '#666', cursor: 'pointer' }}>{v.label}</button>)}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>
      <AdminHeader onBack={onBack} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 20px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #e5e5e5', marginBottom: 24 }}>
          {['overview', 'orders', 'images', 'products'].map(t => (
            <div key={t} onClick={() => setTab(t)} style={{ padding: '12px 20px', fontSize: 13, fontWeight: 500, color: tab === t ? '#000' : '#888', cursor: 'pointer', borderBottom: tab === t ? '2px solid #000' : '2px solid transparent', transition: '0.2s', display: 'flex', alignItems: 'center', gap: 6 }}>
              {t === 'images' && <Camera size={14} />}
              {t.charAt(0).toUpperCase() + t.slice(1)}
              {t === 'images' && <span style={{ background: '#2563EB', color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10 }}>{totalImages}</span>}
            </div>
          ))}
        </div>

        {tab === 'overview' && <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>{stats.map(s => <div key={s.l} style={{ background: '#fff', border: '1px solid #e5e5e5', padding: 20, borderRadius: 6 }}><div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>{s.l}</div><div style={{ fontSize: 28, fontWeight: 700, marginTop: 8, color: s.c }}>{s.v}</div></div>)}</div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Recent Orders</h3>
          <div style={{ background: '#fff', border: '1px solid #e5e5e5', overflowX: 'auto', borderRadius: 6 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}><thead><tr style={{ background: '#fafafa' }}><TH>Order</TH><TH>Customer</TH><TH>Date</TH><TH>Status</TH><TH right>Total</TH><TH>{''}</TH></tr></thead>
            <tbody>{orders.slice(0, 5).map(o => <ORow key={o.id} order={o} onSelect={setSel} />)}</tbody></table>
          </div>
        </div>}

        {tab === 'orders' && <div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 240, position: 'relative' }}><Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#bbb' }} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." style={{ width: '100%', padding: '10px 10px 10px 38px', border: '1px solid #ddd', fontSize: 13, borderRadius: 3 }} /></div>
            <select value={sf} onChange={e => setSF(e.target.value)} style={{ padding: '10px 16px', border: '1px solid #ddd', fontSize: 13, background: '#fff', borderRadius: 3 }}><option value="all">All Status</option>{Object.entries(STS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e5e5e5', overflowX: 'auto', borderRadius: 6 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}><thead><tr style={{ background: '#fafafa' }}><TH>Order</TH><TH>Customer</TH><TH>Date</TH><TH>Status</TH><TH right>Total</TH><TH>{''}</TH></tr></thead>
            <tbody>{filtered.map(o => <ORow key={o.id} order={o} onSelect={setSel} />)}</tbody></table>
            {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '40px 0', color: '#999', fontSize: 13 }}>No orders found.</div>}
          </div>
        </div>}

        {/* ═══ IMAGES TAB ═══ */}
        {tab === 'images' && <div>
          <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 8, padding: 20, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}><Image size={20} color="#2563EB" />Product Image Manager</div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{totalImages} image{totalImages !== 1 ? 's' : ''} across {productsWithImages} product{productsWithImages !== 1 ? 's' : ''} {'\u00B7'} {DEFAULT_PRODUCTS.length - productsWithImages} without images</div>
            </div>
            {totalImages > 0 && <button onClick={() => { if (window.confirm('Remove all uploaded images?')) clearAllImages(); }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', fontSize: 12, fontWeight: 600, border: '1px solid #FCA5A5', background: '#FEF2F2', color: '#DC2626', borderRadius: 6 }}><Trash2 size={14} /> Clear All</button>}
          </div>
          <div style={{ position: 'relative', marginBottom: 20 }}><Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#bbb' }} /><input value={imgSearch} onChange={e => setImgSearch(e.target.value)} placeholder="Search products by name..." style={{ width: '100%', padding: '10px 10px 10px 38px', border: '1px solid #ddd', fontSize: 13, borderRadius: 6, background: '#fff' }} /></div>
          <div>{filteredProducts.map(p => <ImageUploader key={p.id} productId={p.id} productName={p.name} images={getImgs(p.id)} onAddImage={addImage} onRemoveImage={removeImage} />)}</div>
        </div>}

        {tab === 'products' && <div style={{ background: '#fff', border: '1px solid #e5e5e5', overflowX: 'auto', borderRadius: 6 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead><tr style={{ background: '#fafafa' }}><TH>Product</TH><TH>Category</TH><TH>Price</TH><TH>Sizes</TH><TH>Vendor</TH></tr></thead>
            <tbody>{DEFAULT_PRODUCTS.map(p => (
              <tr key={p.id}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #f0f0f0' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><img src={getImgs(p.id)[0]} style={{ width: 40, height: 40, objectFit: 'cover', background: '#f5f5f5', borderRadius: 4 }} alt="" /><span style={{ fontWeight: 500 }}>{p.name}</span></div></td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #f0f0f0', textTransform: 'capitalize', color: '#666' }}>{p.cat}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #f0f0f0', fontFamily: 'monospace' }}>{'\u20AA'}{p.price}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #f0f0f0', color: '#888', fontSize: 12 }}>{p.sizes.join(', ')}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #f0f0f0', color: '#888' }}>{p.vendor}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>}
      </div>
    </div>
  );
}
