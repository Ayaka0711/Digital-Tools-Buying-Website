import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // --- STATE ---
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('products');

  // --- LOAD PRODUCTS ---
  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => toast.error('Failed to load products'));
  }, []);

  // --- CART LOGIC ---
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
        <div 
          className="text-[28px] font-bold text-[#7C3AED] tracking-tight cursor-pointer" 
          onClick={() => setView('products')}
        >
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
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 transition ${view === 'cart' ? 'text-[#7C3AED]' : 'text-slate-700 group-hover:text-[#7C3AED]'}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#7C3AED] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>

          <button className="hidden sm:block text-sm font-medium text-slate-700 hover:text-[#7C3AED]">
            Login
          </button>

          <button className="bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:opacity-90 text-white text-sm font-bold py-2.5 px-7 rounded-full transition-all shadow-md shadow-purple-100">
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="py-20 px-6 lg:px-32 grid md:grid-cols-2 gap-12 items-center bg-white">
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 bg-[#F3E8FF] text-[#7C3AED] px-4 py-1.5 rounded-full mb-6 text-sm font-bold border border-[#DDD6FE]">
            <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse"></span>
            New: AI-Powered Tools Available
          </div>
          <h1 className="text-[60px] font-bold text-[#1E293B] leading-[1.05] tracking-tight mb-6">
            Supercharge Your <br /> 
            <span className="text-slate-800">Digital Workflow</span>
          </h1>
          <p className="text-[#64748B] text-lg max-w-md leading-relaxed mb-10">
            Access premium AI tools, design assets, templates, and productivity 
            software—all in one place. Start creating faster today.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => setView('products')} 
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-purple-200 transition-all active:scale-95"
            >
              Explore Products
            </button>

            <button className="flex items-center gap-3 border border-[#7C3AED] text-[#7C3AED] font-bold py-4 px-10 rounded-full hover:bg-[#F5F3FF] transition-all group active:scale-95">
              <div className="w-6 h-6 flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  src="/Play.png" 
                  alt="Play" 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                  onError={(e) => { e.target.style.display = 'none'; }} 
                />
              </div>
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
            <img src="/banner.png" alt="Hero" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#7C3AED] text-white py-16 px-6 lg:px-20 grid grid-cols-3 text-center">
        <div><h2 className="text-5xl font-black mb-1">50K+</h2><p className="text-purple-100 font-medium">Active Users</p></div>
        <div><h2 className="text-5xl font-black mb-1">200+</h2><p className="text-purple-100 font-medium">Premium Tools</p></div>
        <div><h2 className="text-5xl font-black mb-1">4.9</h2><p className="text-purple-100 font-medium">User Rating</p></div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="py-20 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-[44px] font-bold text-[#1E293B] mb-3 tracking-tight">
            Premium Digital Tools
          </h2>
          <p className="text-slate-500 text-[15px] max-w-lg mx-auto leading-relaxed">
            Choose from our curated collection of premium digital products designed to boost your productivity and creativity.
          </p>
        </div>

        {/* VIEW TOGGLE - EXACTLY AS IMAGE */}
        <div className="flex justify-center mb-16">
          <div className="bg-[#F8FAFC] p-1 rounded-full border border-slate-100 flex shadow-sm">
            <button
              onClick={() => setView('products')}
              className={`px-10 py-2.5 rounded-full text-sm font-bold transition-all ${view === 'products' ? 'bg-[#7C3AED] text-white shadow-md' : 'text-slate-500'}`}
            >
              Products
            </button>
            <button
              onClick={() => setView('cart')}
              className={`px-10 py-2.5 rounded-full text-sm font-bold transition-all ${view === 'cart' ? 'bg-[#7C3AED] text-white shadow-md' : 'text-slate-500'}`}
            >
              Cart ({cart.length})
            </button>
          </div>
        </div>

        {view === 'products' ? (
          /* PRODUCTS GRID */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <div key={p.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative flex flex-col hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="absolute top-6 right-6">
                  <span className={`${p.tagColor} text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest`}>
                    {p.tag}
                  </span>
                </div>
                <div className="w-16 h-16 bg-[#F8FAFC] rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
                  {p.icon}
                </div>
                <h3 className="text-[24px] font-black text-[#1E293B] mb-3 leading-tight">{p.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">{p.description}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-[#1E293B]">${p.price}</span>
                  <span className="text-slate-400 font-bold">{p.period}</span>
                </div>
                <div className="space-y-4 mb-10 flex-grow">
                  {p.features?.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                      <div className="bg-green-100 p-0.5 rounded-full">
                        <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => addToCart(p)} 
                  className="w-full py-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black rounded-2xl transition-all shadow-lg shadow-purple-100 active:scale-95"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* CART UI - MATCHING image_ad92bf.png */
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-10 md:p-12 rounded-[24px] border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
              <h3 className="text-[20px] font-bold text-[#1E293B] mb-8">Your Cart</h3>

              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-slate-400 text-lg font-medium mb-6">Your cart is currently empty</p>
                  <button onClick={() => setView('products')} className="text-[#7C3AED] font-bold hover:underline">Return to Products</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex justify-between items-center p-6 bg-[#F8FAFC] rounded-[16px] transition-all hover:shadow-sm"
                    >
                      <div className="flex items-center gap-5">
                        {/* Icon Container */}
                        <div className="w-14 h-14 bg-white rounded-[12px] flex items-center justify-center text-2xl shadow-sm border border-slate-50">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-bold text-[17px] text-[#1E293B]">{item.name}</p>
                          <p className="text-slate-400 text-xs font-semibold mt-1">${item.price}</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-[#FF4D8D] text-xs font-bold hover:opacity-80 transition-opacity"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <div className="mt-10">
                    <div className="flex justify-between items-center mb-8 px-2">
                      <span className="text-slate-400 font-medium text-sm">Total:</span>
                      <span className="text-[24px] font-bold text-[#1E293B]">${cartTotal}</span>
                    </div>
                    
                    <button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4.5 px-8 rounded-full text-sm transition-all shadow-md shadow-purple-100">
                      Proceed To Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* HOW IT WORKS SECTION - MATCHING image_b77790.png */}
      <section className="py-24 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-[42px] font-bold text-[#1E293B] mb-4 tracking-tight">Get Started In 3 Steps</h2>
          <p className="text-slate-400 text-sm mb-20 font-medium">Start using premium digital tools in minutes, not hours.</p>
          
          <div className="grid md:grid-cols-3 gap-8 px-4">
            {[
              { 
                id: "01", 
                title: "Create Account", 
                img: "/user.png", 
                desc: "Sign up for free in seconds. No credit card required to get started." 
              },
              { 
                id: "02", 
                title: "Choose Products", 
                img: "/package.png", 
                desc: "Browse our catalog and select the tools that fit your needs." 
              },
              { 
                id: "03", 
                title: "Start Creating", 
                img: "/rocket.png", 
                desc: "Download and start using your premium tools immediately." 
              }
            ].map((step) => (
              <div key={step.id} className="bg-white p-12 rounded-[20px] border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] relative group hover:shadow-lg transition-all duration-300">
                {/* Step Number Badge */}
                <div className="absolute top-5 right-5 bg-[#7C3AED] text-white w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm shadow-purple-200">
                  {step.id}
                </div>
                
                {/* Icon Container */}
                <div className="w-24 h-24 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-105 duration-300">
                  <img src={step.img} alt={step.title} className="w-12 h-12 object-contain" />
                </div>
                
                <h3 className="text-[20px] font-bold text-slate-800 mb-4">{step.title}</h3>
                <p className="text-slate-400 text-[13px] leading-relaxed max-w-[210px] mx-auto font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}

export default App;