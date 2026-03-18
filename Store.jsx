import { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, X, Menu, ChevronDown, ChevronRight, Truck, CreditCard, RotateCcw, Instagram, Facebook, Settings } from 'lucide-react';
import { DEFAULT_PRODUCTS, NAV, HERO_IMGS, GALLERY, CATS, TRUST, PLACEHOLDER } from './data';

function TrustIcon({ type }) {
  if (type === 'card') return <CreditCard size={20} color="#666" />;
  if (type === 'truck') return <Truck size={20} color="#666" />;
  return <RotateCcw size={20} color="#666" />;
}

function ProductCard({ product, imgs, onView }) {
  return (
    <div onClick={() => onView(product)} className="hi" style={{ cursor: 'pointer', textAlign: 'center' }}>
      <div style={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden', background: '#f0f0f0', borderRadius: 4 }}>
        <img className="i1" src={imgs[0]} alt={product.name} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        {imgs.length > 1 && <img className="i2" src={imgs[1]} alt={product.name} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, marginTop: 10, color: '#1a1a1a' }}>{product.name}</div>
      <div style={{ fontSize: 14, color: '#666', marginTop: 3 }}>{'\u20AA'}{product.price.toFixed(2)}</div>
    </div>
  );
}

function StoreHeader({ cartCount, onCartOpen, onMenuOpen, onAdmin, onNavigate }) {
  return (
    <div style={{ background: '#fff', borderBottom: '1px solid #e5e5e5', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={onMenuOpen} style={{ background: 'none', border: 'none', padding: 4 }}><Menu size={22} /></button>
          <div onClick={() => onNavigate({ path: 'home' })} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 4, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 16 }}>T</div>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: 0.5 }}>Tzadik Shop</span>
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 0, alignItems: 'center' }}>
          {NAV.map(n => (
            <div key={n.label} className="dd" style={{ position: 'relative' }}>
              <div onClick={() => { if (!n.children) onNavigate(n); }} style={{ padding: '8px 14px', fontSize: 14, fontWeight: 500, color: '#333', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                {n.label}{n.children && <ChevronDown size={12} />}
              </div>
              {n.children && (
                <div className="dm">
                  {n.children.map(c => (
                    <div key={c.label} onClick={() => onNavigate(n, c)} style={{ padding: '10px 18px', fontSize: 13, color: '#555', cursor: 'pointer' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#f5f5f5'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                      {c.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span onClick={onAdmin} style={{ fontSize: 11, color: '#aaa', cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}><Settings size={13} />Admin</span>
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={onCartOpen}>
            <ShoppingCart size={20} color="#333" />
            {cartCount > 0 && <span style={{ position: 'absolute', top: -8, right: -10, background: '#1a1a1a', color: '#fff', fontSize: 10, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{cartCount}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ cart, open, onClose, onUpdateQty, total, getImgs }) {
  if (!open) return null;
  return (
    <div>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 200 }} />
      <div style={{ position: 'fixed', top: 0, right: 0, height: '100%', width: '100%', maxWidth: 400, background: '#fff', zIndex: 201, display: 'flex', flexDirection: 'column', boxShadow: '-2px 0 20px rgba(0,0,0,0.08)', animation: 'slideR 0.3s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e5e5e5' }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>Shopping Cart</span>
          <X size={18} onClick={onClose} style={{ cursor: 'pointer' }} />
        </div>
        {cart.length === 0 ? (
          <div style={{ flex: 1, padding: 40, textAlign: 'center' }}><ShoppingCart size={48} color="#ddd" style={{ marginBottom: 16 }} /><p style={{ color: '#999', fontSize: 14 }}>Your cart is empty.</p></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
              {cart.map(it => (
                <div key={it.id + '-' + it.size} style={{ display: 'flex', gap: 14, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #f0f0f0' }}>
                  <img src={getImgs(it.id)[0]} style={{ width: 72, height: 72, objectFit: 'cover', background: '#f5f5f5', borderRadius: 4 }} alt="" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{it.name}</div>
                    <div style={{ fontSize: 12, color: '#999' }}>Size: {it.size}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                      <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: 3 }}>
                        <button onClick={() => onUpdateQty(it.id, it.size, -1)} style={{ width: 28, height: 28, border: 'none', background: 'none', fontSize: 14 }}>{'\u2212'}</button>
                        <span style={{ width: 28, textAlign: 'center', fontSize: 12, borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', lineHeight: '28px' }}>{it.qty}</span>
                        <button onClick={() => onUpdateQty(it.id, it.size, 1)} style={{ width: 28, height: 28, border: 'none', background: 'none', fontSize: 14 }}>+</button>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{'\u20AA'}{(it.price * it.qty).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: 20, borderTop: '1px solid #e5e5e5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginBottom: 4 }}><span>Total:</span><span>{'\u20AA'}{total.toFixed(2)}</span></div>
              <div style={{ fontSize: 12, color: '#999', marginBottom: 14 }}>Shipping calculated at checkout.</div>
              <button style={{ width: '100%', background: '#1a1a1a', color: '#fff', padding: '13px 0', fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 4 }}>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose, onNavigate }) {
  const [exp, setExp] = useState(null);
  if (!open) return null;
  return (
    <div>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 200 }} />
      <div style={{ position: 'fixed', top: 0, left: 0, height: '100%', width: 280, background: '#fff', zIndex: 201, display: 'flex', flexDirection: 'column', animation: 'slideL 0.3s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e5e5e5' }}>
          <span style={{ fontWeight: 700 }}>Tzadik Shop</span>
          <X size={18} onClick={onClose} style={{ cursor: 'pointer' }} />
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          {NAV.map(n => (
            <div key={n.label}>
              <div onClick={() => n.children ? setExp(exp === n.label ? null : n.label) : onNavigate(n)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', fontSize: 14, fontWeight: 500, borderBottom: '1px solid #f5f5f5', cursor: 'pointer' }}>
                {n.label}{n.children && <ChevronRight size={14} style={{ transform: exp === n.label ? 'rotate(90deg)' : 'none', transition: '0.2s' }} />}
              </div>
              {n.children && exp === n.label && n.children.map(c => (
                <div key={c.label} onClick={() => onNavigate(n, c)} style={{ padding: '10px 20px 10px 36px', fontSize: 13, color: '#666', cursor: 'pointer', borderBottom: '1px solid #fafafa' }}>{c.label}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StoreFooter({ onNavigate }) {
  return (
    <div style={{ background: '#f5f5f5', borderTop: '1px solid #e5e5e5', padding: '40px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40 }}>
        <div><h4 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14, color: '#333' }}>Worldwide shipping</h4><p style={{ fontSize: 13, color: '#666', lineHeight: 1.7 }}>Delivery 3-14 business days via UPS.</p></div>
        <div><h4 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14, color: '#333' }}>Menu</h4><div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{NAV.map(n => <span key={n.label} onClick={() => onNavigate(n)} style={{ fontSize: 13, color: '#666', cursor: 'pointer', lineHeight: 1.8 }}>{n.label}</span>)}</div></div>
        <div><h4 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14, color: '#333' }}>Follow us</h4><div style={{ display: 'flex', gap: 14 }}><a href="https://www.facebook.com/tzadikshop" target="_blank" rel="noreferrer"><Facebook size={18} color="#666" /></a><a href="https://instagram.com/tzadikshop" target="_blank" rel="noreferrer"><Instagram size={18} color="#666" /></a></div></div>
      </div>
      <div style={{ maxWidth: 1200, margin: '20px auto 0', paddingTop: 16, borderTop: '1px solid #ddd', fontSize: 12, color: '#999' }}>{'\u00A9 2026 Tzadik Shop.'}</div>
    </div>
  );
}

export default function Store({ cart, setCart, goAdmin, getImgs }) {
  const [page, setPage] = useState('home');
  const [filter, setFilter] = useState(null);
  const [filterLabel, setFilterLabel] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [selSize, setSelSize] = useState(null);
  const [selImg, setSelImg] = useState(0);
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => { const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMGS.length), 5000); return () => clearInterval(t); }, []);

  const addToCart = useCallback((p, sz) => { const s = sz || p.sizes[0]; setCart(prev => { const ex = prev.find(i => i.id === p.id && i.size === s); if (ex) return prev.map(i => (i.id === p.id && i.size === s) ? { ...i, qty: i.qty + 1 } : i); return [...prev, { ...p, qty: 1, size: s }]; }); setCartOpen(true); }, [setCart]);
  const updateQty = useCallback((id, sz, d) => { setCart(prev => prev.map(i => { if (i.id === id && i.size === sz) { const n = i.qty + d; return n < 1 ? null : { ...i, qty: n }; } return i; }).filter(Boolean)); }, [setCart]);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const getFiltered = () => { if (!filter) return DEFAULT_PRODUCTS; return DEFAULT_PRODUCTS.filter(p => { if (filter.cat && p.cat !== filter.cat) return false; if (filter.gen && p.gen !== filter.gen) return false; return true; }); };

  const navigate = useCallback((nav, child) => {
    setMenuOpen(false); setProduct(null); setSelImg(0); setSelSize(null);
    if (nav.path === 'home') { setPage('home'); setFilter(null); setFilterLabel(''); }
    else if (nav.path === 'contact') { setPage('contact'); }
    else if (child) { setPage('col'); setFilter(child.filter); setFilterLabel(child.label); }
    else if (nav.filter) { setPage('col'); setFilter(nav.filter); setFilterLabel(nav.label); }
    else if (nav.children) { setPage('col'); setFilter(nav.children[0].filter); setFilterLabel(nav.children[0].label); }
    window.scrollTo(0, 0);
  }, []);

  const viewProduct = useCallback(p => { setProduct(p); setSelImg(0); setSelSize(p.sizes[0]); window.scrollTo(0, 0); }, []);

  // Product detail
  if (product) {
    const imgs = getImgs(product.id);
    return (
      <div>
        <Announcement /><StoreHeader cartCount={count} onCartOpen={() => setCartOpen(true)} onMenuOpen={() => setMenuOpen(true)} onAdmin={goAdmin} onNavigate={navigate} />
        <CartDrawer cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} total={total} getImgs={getImgs} />
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={navigate} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 20px 60px' }}>
          <div style={{ fontSize: 12, color: '#aaa', marginBottom: 20, cursor: 'pointer' }} onClick={() => setProduct(null)}>{'\u2190 Back to products'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            <div>
              <div style={{ width: '100%', aspectRatio: '1', background: '#f0f0f0', overflow: 'hidden', marginBottom: 10, borderRadius: 4 }}>
                <img key={selImg} src={imgs[selImg] || PLACEHOLDER} style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'fadeI 0.3s' }} alt="" />
              </div>
              {imgs.length > 1 && <div style={{ display: 'flex', gap: 8 }}>{imgs.map((img, i) => <div key={i} onClick={() => setSelImg(i)} style={{ width: 64, height: 64, border: selImg === i ? '2px solid #1a1a1a' : '2px solid transparent', cursor: 'pointer', overflow: 'hidden', background: '#f0f0f0', borderRadius: 4 }}><img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /></div>)}</div>}
            </div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{product.name}</h1>
              <div style={{ fontSize: 12, color: '#aaa', marginBottom: 14 }}>by {product.vendor}</div>
              <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>{'\u20AA'}{product.price.toFixed(2)}</div>
              {product.colors.length > 0 && <div style={{ marginBottom: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Color</div><div style={{ display: 'flex', gap: 8 }}>{product.colors.map(c => <span key={c} style={{ padding: '7px 18px', border: '1px solid #ddd', fontSize: 13, borderRadius: 3 }}>{c}</span>)}</div></div>}
              <div style={{ marginBottom: 20 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Size</div><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{product.sizes.map(s => <span key={s} onClick={() => setSelSize(s)} style={{ padding: '8px 20px', border: selSize === s ? '2px solid #1a1a1a' : '1px solid #ddd', fontSize: 13, cursor: 'pointer', fontWeight: selSize === s ? 600 : 400, borderRadius: 3 }}>{s}</span>)}</div></div>
              <button onClick={() => addToCart(product, selSize)} style={{ width: '100%', background: '#1a1a1a', color: '#fff', padding: '14px 0', fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 4, marginBottom: 20 }}>Add to cart</button>
              <div style={{ borderTop: '1px solid #eee', paddingTop: 16 }}><div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Description</div><p style={{ fontSize: 13, color: '#666', lineHeight: 1.7 }}>{product.desc}</p></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 24, paddingTop: 20, borderTop: '1px solid #eee' }}>{TRUST.map(b => <div key={b.t} style={{ textAlign: 'center' }}><div style={{ marginBottom: 6, display: 'flex', justifyContent: 'center' }}><TrustIcon type={b.icon} /></div><div style={{ fontSize: 12, fontWeight: 600 }}>{b.t}</div><div style={{ fontSize: 11, color: '#999' }}>{b.s}</div></div>)}</div>
            </div>
          </div>
        </div>
        <StoreFooter onNavigate={navigate} />
      </div>
    );
  }

  // Main pages
  return (
    <div>
      <Announcement /><StoreHeader cartCount={count} onCartOpen={() => setCartOpen(true)} onMenuOpen={() => setMenuOpen(true)} onAdmin={goAdmin} onNavigate={navigate} />
      <CartDrawer cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} total={total} getImgs={getImgs} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={navigate} />

      {page === 'home' && <div>
        <div style={{ position: 'relative', width: '100%', height: 'clamp(280px,50vw,520px)', overflow: 'hidden' }}>
          <img key={heroIdx} src={HERO_IMGS[heroIdx]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'fadeI 0.8s' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <h1 style={{ color: '#fff', fontSize: 48, fontWeight: 800, letterSpacing: 2, textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>TZADIK</h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, letterSpacing: 4, textTransform: 'uppercase', marginTop: 4 }}>Just be Jew</p>
          </div>
          <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>{HERO_IMGS.map((_, i) => <button key={i} onClick={() => setHeroIdx(i)} style={{ width: i === heroIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === heroIdx ? '#fff' : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', transition: '0.3s' }} />)}</div>
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>{CATS.map(c => <div key={c.l} onClick={() => { setPage('col'); setFilter(c.f); setFilterLabel(c.l); }} style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden', borderRadius: 6 }}><img src={c.img} alt={c.l} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }} /><div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent,rgba(0,0,0,0.6))', padding: 20 }}><h3 style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{c.l}</h3></div></div>)}</div></div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}><h2 style={{ fontSize: 22, fontWeight: 600 }}>New Products</h2><span onClick={() => { setPage('col'); setFilter(null); setFilterLabel('All Products'); }} style={{ fontSize: 13, color: '#999', cursor: 'pointer' }}>View all {'\u2192'}</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>{DEFAULT_PRODUCTS.filter(p => p.feat).map(p => <ProductCard key={p.id} product={p} imgs={getImgs(p.id)} onView={viewProduct} />)}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>{GALLERY.map((img, i) => <img key={i} src={img} alt="" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />)}</div>
        <div style={{ background: '#1a1a1a', color: '#fff', padding: '60px 20px', textAlign: 'center' }}><h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 20 }}>Our Vision</h2><p style={{ maxWidth: 700, margin: '0 auto 24px', fontSize: 15, lineHeight: 1.7, color: '#bbb' }}>Creating a brand that appeals to Jewish youth with positive messages from Judaism. Values that are still relevant and may even be cool.</p><div style={{ border: '1px solid #444', display: 'inline-block', padding: '16px 32px' }}><p style={{ fontStyle: 'italic', color: '#ddd', fontSize: 14 }}>A righteous man falls down seven times and gets up</p><small style={{ color: '#888', fontSize: 11, textTransform: 'uppercase', letterSpacing: 2 }}>King Solomon</small></div></div>
        <div style={{ background: '#2d6a4f', color: '#fff', padding: '40px 20px', textAlign: 'center' }}><h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>10% OFF your first order!</h3><p style={{ fontSize: 13, color: '#a7d7c5', marginBottom: 16 }}>Subscribe for exclusive updates and gifts!</p><div style={{ display: 'flex', gap: 8, maxWidth: 420, margin: '0 auto' }}><input placeholder="Enter your email" style={{ flex: 1, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 13, borderRadius: 3 }} /><button style={{ padding: '10px 24px', background: '#fff', color: '#2d6a4f', fontWeight: 600, fontSize: 13, border: 'none', borderRadius: 3 }}>Subscribe</button></div></div>
      </div>}

      {page === 'col' && <div style={{ maxWidth: 1200, margin: '0 auto', padding: '30px 20px 60px' }}>
        <div style={{ fontSize: 12, color: '#aaa', marginBottom: 16 }}><span style={{ cursor: 'pointer' }} onClick={() => navigate({ path: 'home' })}>Home</span>{' / '}{filterLabel || 'Products'}</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 28 }}>{filterLabel || 'Products'}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>{getFiltered().map(p => <ProductCard key={p.id} product={p} imgs={getImgs(p.id)} onView={viewProduct} />)}</div>
        {getFiltered().length === 0 && <p style={{ textAlign: 'center', color: '#aaa', padding: '60px 0', fontSize: 14 }}>No products found.</p>}
      </div>}

      {page === 'contact' && <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px 60px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Contact Us</h1>
        <h3 style={{ fontSize: 16, fontWeight: 500, color: '#666', marginBottom: 24 }}>Drop us a line</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input placeholder="Name" style={{ padding: '12px 14px', border: '1px solid #ddd', fontSize: 13, borderRadius: 3 }} />
          <input placeholder="Email" style={{ padding: '12px 14px', border: '1px solid #ddd', fontSize: 13, borderRadius: 3 }} />
          <input placeholder="Phone" style={{ padding: '12px 14px', border: '1px solid #ddd', fontSize: 13, borderRadius: 3 }} />
          <textarea placeholder="Message" rows={6} style={{ padding: '12px 14px', border: '1px solid #ddd', fontSize: 13, resize: 'vertical', fontFamily: 'inherit', borderRadius: 3 }} />
          <button style={{ background: '#1a1a1a', color: '#fff', padding: '13px 36px', fontSize: 14, fontWeight: 600, border: 'none', alignSelf: 'flex-start', borderRadius: 4 }}>Send</button>
        </div>
      </div>}
      <StoreFooter onNavigate={navigate} />
    </div>
  );
}

function Announcement() {
  return <div style={{ background: '#1a1a1a', color: '#fff', fontSize: 12, textAlign: 'center', padding: '9px 16px', letterSpacing: 0.3 }}>Deliveries can be delayed up to 14 working days. Thank you for understanding!</div>;
}
