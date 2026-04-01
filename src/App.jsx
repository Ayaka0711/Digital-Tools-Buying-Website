import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('products');

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => toast.error('Failed to load products'));
  }, []);

  const addToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      toast.info('Item already in cart');
      return;
    }
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    toast.error('Item removed from cart');
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-white min-h-screen font-sans text-[#1E293B]">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between bg-white px-6 lg:px-20 py-6 sticky top-0 z-50 border-b border-slate-50 shadow-sm">
        <div className="text-[28px] font-bold text-[#7C3AED] tracking-tight cursor-pointer" onClick={() => setView('products')}>
          DigiTools
        </div>
        <div className="hidden md:flex gap-10 text-slate-600 font-medium text-sm">
          <button onClick={() => setView('products')} className="hover:text-[#7C3AED] transition">Products</button>
          <button className="hover:text-[#7C3AED] transition">Features</button>
          <button className="hover:text-[#7C3AED] transition">Pricing</button>
          <button className="hover:text-[#7C3AED] transition">Testimonials</button>
          <button className="hover:text-[#7C3AED] transition">FAQ</button>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer group flex items-center gap-1" onClick={() => setView('cart')}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition ${view === 'cart' ? 'text-[#7C3AED]' : 'text-slate-700 group-hover:text-[#7C3AED]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cart.length > 0 && <span className="absolute -top-2 -right-3 bg-[#7C3AED] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>}
          </div>
          <button className="bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:opacity-90 text-white text-sm font-bold py-2.5 px-7 rounded-full transition-all shadow-md shadow-purple-100">Get Started</button>
        </div>
      </nav>

      {/* MAIN VIEW */}
      {view === 'products' ? (
        <>
          {/* HERO SECTION */}
          <section className="py-20 px-6 lg:px-32 grid md:grid-cols-2 gap-12 items-center bg-white">
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 bg-[#F3E8FF] text-[#7C3AED] px-4 py-1.5 rounded-full mb-6 text-sm font-bold border border-[#DDD6FE]">
                <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse"></span>
                New: AI-Powered Tools Available
              </div>
              <h1 className="text-[60px] font-bold text-[#1E293B] leading-[1.05] tracking-tight mb-6">Supercharge Your <br /><span className="text-slate-800">Digital Workflow</span></h1>
              <p className="text-[#64748B] text-lg max-w-md leading-relaxed mb-10">Access premium AI tools, design assets, and productivity software—all in one place.</p>
              <button onClick={() => setView('products')} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-purple-200 transition-all">Explore Products</button>
            </div>
            <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white"><img src="/banner.png" alt="Hero" className="w-full h-auto" /></div>
          </section>

          {/* PRODUCTS GRID */}
          <section className="py-20 px-6 lg:px-20 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {products.map((p) => {
                const isInCart = cart.some(item => item.id === p.id);
                return (
                  <div key={p.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col hover:shadow-xl transition-all group">
                    <div className="w-16 h-16 bg-[#F8FAFC] rounded-2xl flex items-center justify-center text-3xl mb-8">{p.icon}</div>
                    <h3 className="text-[24px] font-black text-[#1E293B] mb-3">{p.name}</h3>
                    <p className="text-slate-500 text-sm mb-8">{p.description}</p>
                    <div className="text-4xl font-black text-[#1E293B] mb-10">${p.price}<span className="text-slate-400 text-sm">/mo</span></div>
                    <button 
                      onClick={() => addToCart(p)} 
                      disabled={isInCart}
                      className={`w-full py-4 font-black rounded-2xl transition-all flex items-center justify-center gap-2 ${isInCart ? 'bg-green-500 text-white' : 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]'}`}
                    >
                      {isInCart ? <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>Added to Cart</> : 'Buy Now'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* PRICING SECTION - EXACT MATCH image_b864ca.png */}
          <section className="py-24 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-[44px] font-bold text-[#0F172A] mb-4">Simple, Transparent Pricing</h2>
              <p className="text-slate-500 text-base mb-16">Choose the plan that fits your needs. Upgrade or downgrade anytime.</p>
              <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
                {/* Starter */}
                <div className="bg-white p-10 rounded-[24px] border border-slate-200 text-left flex flex-col">
                  <h3 className="text-xl font-bold text-[#0F172A] mb-1">Starter</h3>
                  <p className="text-slate-500 text-sm mb-8">Perfect for getting started</p>
                  <div className="mb-8"><span className="text-4xl font-bold text-[#0F172A]">$0</span><span className="text-slate-500 text-sm">/Month</span></div>
                  <div className="space-y-4 mb-10 flex-grow text-[#1E293B] text-sm">
                    {['Access to 10 free tools', 'Basic templates', 'Community support', '1 project per month'].map(f => (
                      <div key={f} className="flex gap-3"><svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>{f}</div>
                    ))}
                  </div>
                  <button className="w-full py-4 bg-[#7C3AED] text-white font-bold rounded-xl">Get Started Free</button>
                </div>
                {/* Pro */}
                <div className="bg-[#8B5CF6] p-10 rounded-[24px] text-left flex flex-col relative scale-105 shadow-2xl z-10">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FEF3C7] text-[#D97706] px-4 py-1 rounded-full text-xs font-bold shadow-sm">Most Popular</div>
                  <h3 className="text-xl font-bold text-white mb-1">Pro</h3>
                  <p className="text-purple-100 text-sm mb-8">Best for professionals</p>
                  <div className="mb-8"><span className="text-4xl font-bold text-white">$29</span><span className="text-purple-100 text-sm">/Month</span></div>
                  <div className="space-y-4 mb-10 flex-grow text-white text-sm">
                    {['Access to all premium tools', 'Unlimited templates', 'Priority support', 'Unlimited projects', 'Cloud sync', 'Advanced analytics'].map(f => (
                      <div key={f} className="flex gap-3"><svg className="w-5 h-5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>{f}</div>
                    ))}
                  </div>
                  <button className="w-full py-4 bg-white text-[#7C3AED] font-bold rounded-xl">Start Pro Trial</button>
                </div>
                {/* Enterprise */}
                <div className="bg-white p-10 rounded-[24px] border border-slate-200 text-left flex flex-col">
                  <h3 className="text-xl font-bold text-[#0F172A] mb-1">Enterprise</h3>
                  <p className="text-slate-500 text-sm mb-8">For teams and businesses</p>
                  <div className="mb-8"><span className="text-4xl font-bold text-[#0F172A]">$99</span><span className="text-slate-500 text-sm">/Month</span></div>
                  <div className="space-y-4 mb-10 flex-grow text-[#1E293B] text-sm">
                    {['Everything in Pro', 'Team collaboration', 'Custom integrations', 'Dedicated support', 'SLA guarantee', 'Custom branding'].map(f => (
                      <div key={f} className="flex gap-3"><svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>{f}</div>
                    ))}
                  </div>
                  <button className="w-full py-4 bg-[#7C3AED] text-white font-bold rounded-xl">Contact Sales</button>
                </div>
              </div>
            </div>
          </section>

          {/* CTA SECTION - EXACT MATCH image_b8dc8c.jpg */}
          <section className="py-24 px-6 bg-white">
            <div className="max-w-6xl mx-auto rounded-[40px] bg-gradient-to-r from-[#7C3AED] to-[#A855F7] p-16 md:p-24 text-center">
              <h2 className="text-white text-[42px] md:text-[54px] font-bold mb-6 tracking-tight">Ready To Transform Your Workflow?</h2>
              <p className="text-purple-100 text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-90">Join thousands of professionals who are already using Digitools to work smarter. Start your free trial today.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <button className="bg-white text-[#7C3AED] px-10 py-5 rounded-full font-bold text-lg shadow-xl active:scale-95">Explore Products</button>
                <button className="border-2 border-white/40 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 active:scale-95">View Pricing</button>
              </div>
              <p className="text-purple-200 text-sm">14-day free trial • No credit card required • Cancel anytime</p>
            </div>
          </section>
        </>
      ) : (
        /* CART VIEW */
        <main className="py-20 px-6 max-w-3xl mx-auto">
          <div className="bg-white p-10 rounded-[24px] border border-slate-100 shadow-xl">
            <h3 className="text-2xl font-bold mb-8">Your Cart</h3>
            {cart.length === 0 ? <p className="text-center py-10 text-slate-400">Your cart is empty.</p> : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-6 bg-slate-50 rounded-xl">
                    <div className="font-bold">{item.name} - ${item.price}</div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 font-bold">Remove</button>
                  </div>
                ))}
                <div className="pt-8 flex justify-between items-center text-2xl font-bold border-t"><span>Total:</span><span>${cartTotal}</span></div>
                <button className="w-full bg-[#7C3AED] text-white py-4 rounded-full mt-6 font-bold">Checkout</button>
              </div>
            )}
          </div>
        </main>
      )}

{/* FOOTER SECTION */}
<footer className="bg-[#0B1221] text-white pt-20 pb-10 px-6 lg:px-20 border-t border-slate-800">
  <div className="max-w-7xl mx-auto">
    {/* Side-by-Side Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
      
      {/* 1. DigiTools Branding Column */}
      <div className="lg:col-span-1">
        <h2 className="text-3xl font-bold mb-6">DigiTools</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
          Premium digital tools for creators, professionals, and businesses. Work smarter with our suite of powerful tools.
        </p>
      </div>
      
      {/* 2. Product Column */}
      <div>
        <h4 className="font-semibold mb-6 text-base">Product</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li className="hover:text-white cursor-pointer transition">Features</li>
          <li className="hover:text-white cursor-pointer transition">Pricing</li>
          <li className="hover:text-white cursor-pointer transition">Templates</li>
          <li className="hover:text-white cursor-pointer transition">Integrations</li>
        </ul>
      </div>

      {/* 3. Company Column */}
      <div>
        <h4 className="font-semibold mb-6 text-base">Company</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li className="hover:text-white cursor-pointer transition">About</li>
          <li className="hover:text-white cursor-pointer transition">Blog</li>
          <li className="hover:text-white cursor-pointer transition">Careers</li>
          <li className="hover:text-white cursor-pointer transition">Press</li>
        </ul>
      </div>

      {/* 4. Resources Column */}
      <div>
        <h4 className="font-semibold mb-6 text-base">Resources</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li className="hover:text-white cursor-pointer transition">Documentation</li>
          <li className="hover:text-white cursor-pointer transition">Help Center</li>
          <li className="hover:text-white cursor-pointer transition">Community</li>
          <li className="hover:text-white cursor-pointer transition">Contact</li>
        </ul>
      </div>

      {/* 5. Social Links Column (Pashapashi with Resources) */}
      <div>
        <h4 className="font-semibold mb-6 text-base">Social Links</h4>
        <div className="flex gap-4">
          {/* Instagram */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0B1221] hover:bg-slate-200 cursor-pointer transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.999 0h.001zm1.978 1.149c.83.038 1.282.177 1.583.294.398.155.682.341.98.639.298.298.484.582.639.98.117.301.256.753.294 1.583.039.842.048 1.093.048 3.235s-.01 2.393-.048 3.235c-.038.83-.177 1.282-.294 1.583a2.633 2.633 0 0 1-.639.98 2.633 2.633 0 0 1-.98.639c-.301.117-.753.256-1.583.294-.842.039-1.093.048-3.235.048s-2.393-.01-3.235-.048c-.83-.038-1.282-.177-1.583-.294a2.633 2.633 0 0 1-.98-.639 2.633 2.633 0 0 1-.639-.98c-.117-.301-.256-.753-.294-1.583-.039-.842-.048-1.093-.048-3.235s.01-2.393.048-3.235c.038-.83.177-1.282.294-1.583a2.633 2.633 0 0 1 .639-.98 2.633 2.633 0 0 1 .98-.639c.301-.117.753-.256 1.583-.294.842-.039 1.093-.048 3.235-.048s2.393.01 3.235.048zM8 3.89a4.11 4.11 0 1 0 0 8.22 4.11 4.11 0 0 0 0-8.22zm0 6.786a2.677 2.677 0 1 1 0-5.355 2.677 2.677 0 0 1 0 5.355zm4.823-7.592a1.092 1.092 0 1 0 0 2.184 1.092 1.092 0 0 0 0-2.184z"/>
            </svg>
          </div>
          {/* Facebook */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0B1221] hover:bg-slate-200 cursor-pointer transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
            </svg>
          </div>
          {/* X (Twitter) */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0B1221] hover:bg-slate-200 cursor-pointer transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    {/* Copyright & Legal Links */}
    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-xs font-medium">
      <p>© 2026 Digitools. All rights reserved.</p>
      <div className="flex gap-8">
        <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
        <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
        <span className="hover:text-white cursor-pointer transition">Cookies</span>
      </div>
    </div>
  </div>
</footer>
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}

export default App;