import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productsData from "./products.json"; // Assuming the JSON above is saved here

export default function App() {
  const [view, setView] = useState("product"); // "product" or "cart"
  const [cart, setCart] = useState([]);

  // Add to Cart Logic
  const addToCart = (product) => {
    const isExist = cart.find((item) => item.id === product.id);
    if (isExist) {
      toast.warning("Item already in cart!");
    } else {
      setCart([...cart, product]);
      toast.success(`${product.name} added to cart!`);
    }
  };

  // Remove Logic
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    toast.error("Item removed from cart");
  };

  // Checkout Logic
  const handleCheckout = () => {
    setCart([]);
    toast.info("Purchase successful! Cart cleared.");
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="navbar bg-base-100 shadow-md px-10 sticky top-0 z-50">
        <div className="flex-1">
          <a className="text-2xl font-bold text-primary">DigiTools</a>
        </div>
        <div className="flex-none gap-4">
          <div className="indicator cursor-pointer" onClick={() => setView("cart")}>
            <span className="indicator-item badge badge-secondary">{cart.length}</span>
            <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <header className="py-12 px-10 bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-5xl font-black mb-4">Find the Best Digital Tools</h1>
          <p className="text-lg text-gray-600 mb-6">Automate your workflow with premium builders and AI tools.</p>
          <button className="btn btn-primary" onClick={() => setView("product")}>Browse Store</button>
        </div>
        <div className="flex-1">
          <img src="banner.jpg" alt="Banner" className="rounded-2xl shadow-xl w-full" />
        </div>
      </header>

      {/* Main Section Toggling */}
      <main className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex justify-center mb-10 gap-4">
          <button 
            className={`btn px-8 ${view === "product" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setView("product")}
          >
            Products
          </button>
          <button 
            className={`btn px-8 ${view === "cart" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setView("cart")}
          >
            Cart ({cart.length})
          </button>
        </div>

        {/* Product Grid View */}
        {view === "product" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsData.map((p) => (
              <div key={p.id} className="card bg-base-100 shadow-xl border border-gray-100 transition hover:scale-105">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <span className="text-4xl">{p.icon}</span>
                    <div className="badge badge-accent uppercase font-bold text-xs p-3">{p.tagType}</div>
                  </div>
                  <h2 className="card-title mt-4 text-2xl">{p.name}</h2>
                  <p className="text-gray-500">{p.description}</p>
                  <div className="divider my-1"></div>
                  <ul className="space-y-1 mb-4">
                    {p.features.map((f, i) => <li key={i} className="text-sm flex items-center gap-2">✅ {f}</li>)}
                  </ul>
                  <div className="flex justify-between items-center mt-auto">
                    <div>
                      <span className="text-3xl font-bold">${p.price}</span>
                      <span className="text-gray-400">/{p.period}</span>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => addToCart(p)}>Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Cart View */
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
              <div className="text-center py-10 text-gray-400">Your cart is empty.</div>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h4 className="font-bold">{item.name}</h4>
                          <p className="text-sm text-gray-500">${item.price}</p>
                        </div>
                      </div>
                      <button className="btn btn-circle btn-ghost text-error" onClick={() => removeFromCart(item.id)}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t">
                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total Amount:</span>
                    <span>${totalPrice}</span>
                  </div>
                  <button className="btn btn-success btn-block text-white" onClick={handleCheckout}>
                    Proceed to Checkout
                  </button>
                </>
            )}
          </div>
        )}
      </main>

      {/* Footer (Simplified) */}
      <footer className="footer footer-center p-10 bg-neutral text-neutral-content rounded">
        <aside>
          <p className="font-bold text-xl">DigiTools</p> 
          <p>Copyright © 2026 - All rights reserved</p>
        </aside>
      </footer>

      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}