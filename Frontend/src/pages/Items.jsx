// src/pages/Items.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Items = ({ refreshTrigger }) => {
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();


  // Fetch items and cart together
  const fetchItems = async () => {
    try {
      // Fetch all items
      const itemsRes = await fetch("https://unused-item-donation.onrender.com/api/items");
      const itemsData = await itemsRes.json();

      // Fetch cart data
      const token = localStorage.getItem("token");
      const cartRes = await fetch("https://unused-item-donation.onrender.com/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const cartData = await cartRes.json();
      const cartItems = cartData.products || [];

      // Map cart quantities to corresponding items
      const itemCounts = itemsData.map((item) => {
        const cartItem = cartItems.find((ci) => ci._id === item._id);
        return cartItem ? cartItem.quantity : 0;
      });

      setItems(itemsData);
      setCounts(itemCounts);
    } catch (error) {
      console.error("Failed to fetch items or cart:", error);
    }
  };

  useEffect(() => {
    fetchItems(); // fetch on mount and whenever refreshTrigger changes
  }, [refreshTrigger]);

  // Add or update item in cart
  const addToCart = async (itemId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://unused-item-donation.onrender.com/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId, quantity }),
      });

      if (!res.ok) throw new Error("Failed to update cart");
      console.log("Cart updated");
    } catch (error) {
      console.error("Cart update failed:", error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://unused-item-donation.onrender.com/api/cart/remove/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to remove from cart");
      console.log("Item removed from cart");
    } catch (error) {
      console.error("Remove from cart failed:", error);
    }
  };

  // Update quantity and backend
  const updateCount = async (index, newCount) => {
    const product = filteredProducts[index];

    setCounts((prevCounts) =>
      prevCounts.map((count, i) => (i === index ? newCount : count))
    );

    if (newCount === 0) {
      await removeFromCart(product._id);
    } else {
      await addToCart(product._id, newCount);
    }
  };

  const filteredProducts = items.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#1F1F1F] text-white pt-24 font-poppins">
      <div className="w-full max-w-2xl mx-auto mb-6 px-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search product (e.g. Casual Shoes)"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 bg-[#2a2a2a] px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
        />
        <button
          onClick={() => {}}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-semibold flex items-center"
        >
          🔍 Search
        </button>
      </div>

      <div className="bg-gradient-to-r from-[#0f0f0f] to-[#1f1f1f] p-10 mx-4 rounded-2xl flex flex-col md:flex-row items-center justify-between mb-12">
        <div className="mb-6 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            🌱 ShareCircle — Give unused items a second life!
          </h1>
          <p className="text-gray-400 mt-4">
            Empower others by donating what you no longer use. Explore, share,
            and make an impact.
          </p>
        </div>
        <button onClick={() => navigate("/donate")} className="bg-green-500 text-[#0f0f0f] px-8 py-3 rounded-full font-semibold hover:bg-green-400 transition-all">
          Get Started
        </button>
      </div>

      <div className="w-full px-6 md:px-12">
        <h2 className="text-3xl font-semibold text-center mb-2">
          All Available Items
        </h2>
        <p className="text-gray-400 mb-8 text-center">
          Explore the available items
        </p>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id || index}
                className="bg-[#1F1F1F] border border-gray-700 rounded-lg px-4 py-3 w-full max-w-[240px] mx-auto shadow hover:shadow-xl transition"
              >
                <div className="group flex items-center justify-center px-2 cursor-pointer">
                  <img
                    className="group-hover:scale-105 transition duration-300 max-w-24 md:max-w-32"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                </div>
                <div className="text-gray-400 text-sm mt-3">
                  <p>{product.category}</p>
                  <p className="text-white font-semibold text-lg truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array(5)
                      .fill("")
                      .map((_, idx) =>
                        (product.rating || 0) > idx ? (
                          <svg
                            key={idx}
                            width="14"
                            height="13"
                            viewBox="0 0 18 17"
                            fill="#4ade80"
                          >
                            <path d="..." />
                          </svg>
                        ) : (
                          <svg
                            key={idx}
                            width="14"
                            height="13"
                            viewBox="0 0 18 17"
                            fill="#4ade80"
                            fillOpacity="0.25"
                          >
                            <path d="..." />
                          </svg>
                        )
                      )}
                    <p className="text-gray-400 text-xs">
                      ({product.rating || 0})
                    </p>
                  </div>

                  <div className="flex items-end justify-between mt-3">
                    <p className="text-green-400 font-semibold">
                      ₹{product.offerPrice}{" "}
                      <span className="line-through text-sm text-gray-500">
                        ₹{product.price}
                      </span>
                    </p>
                    <div>
                      {counts[index] === 0 ? (
                        <button
                          onClick={() => updateCount(index, 1)}
                          className="text-green-500 border border-green-600 text-sm px-3 py-1 rounded hover:bg-green-600 hover:text-white transition"
                        >
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-sm bg-green-500/20 text-green-300 rounded px-2 py-1">
                          <button
                            onClick={() =>
                              updateCount(index, Math.max(0, counts[index] - 1))
                            }
                          >
                            −
                          </button>
                          <span>{counts[index]}</span>
                          <button
                            onClick={() =>
                              updateCount(index, counts[index] + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-sm mt-12">
            No items found for this search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Items;
