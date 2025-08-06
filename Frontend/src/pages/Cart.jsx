import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [products, setProducts] = useState([]);
  const [savedAddress, setSavedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://unused-item-donation.onrender.com/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching cart:", error.message);
      }
    };

    fetchCart();
    // Mocking saved address
    setSavedAddress({
      street: "123 Main Street",
      city: "Delhi",
      state: "Delhi",
      zipcode: "110001",
      country: "India",
    });
  }, []);

  const updateQuantity = async (index, value) => {
    const updated = [...products];
    const newQuantity = parseInt(value);
    updated[index].quantity = newQuantity;
    setProducts(updated);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://unused-item-donation.onrender.com/api/cart/${updated[index]._id}`,
        {
          quantity: newQuantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Failed to update quantity:", error.message);
    }
  };

  const removeProduct = async (index) => {
    const productId = products[index]._id;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://unused-item-donation.onrender.com/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(products.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Failed to remove item:", error.message);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const total = products.reduce(
    (acc, item) => acc + item.offerPrice * item.quantity,
    0
  );
  const tax = Math.round(total * 0.02);

  const handlePlaceOrder = async () => {
  if (products.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const address = useNewAddress ? newAddress : savedAddress;

  // Ensure address is complete
  const requiredFields = ["street", "city", "state", "zipcode", "country"];
  const isAddressValid = requiredFields.every(
    (field) => address && address[field]?.trim()
  );

  if (!isAddressValid) {
    alert("Please fill in all address fields.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const totalAmount = total + tax;

    const response = await axios.post(
      "https://unused-item-donation.onrender.com/api/orders",
      {
        shippingAddress: address,
        paymentMethod,
        totalPrice: totalAmount,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 201) {
      alert("Order placed successfully!");
      setProducts([]); // clear frontend cart
      window.location.href = "/orders";
    }
  } catch (error) {
    console.error("Error placing order:", error.message);
    alert("Order failed. Please try again.");
  }
};




  return (
    <div className="min-h-screen bg-[#1F1F1F] text-white pt-24 font-poppins px-6">
      <div className="flex flex-col md:flex-row py-10 max-w-6xl mx-auto w-full gap-10">
        <div className="flex-1 max-w-4xl">
          <h1 className="text-3xl font-medium mb-6">
            Shopping Cart{" "}
            <span className="text-sm text-green-400">
              ({products.length} Items)
            </span>
          </h1>

          <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-400 text-base font-medium pb-3">
            <p className="text-left">Product Details</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          {products.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium pt-4 border-b border-gray-700 pb-4"
            >
              <div className="flex items-center md:gap-6 gap-3">
                <div className="w-24 h-24 flex items-center justify-center border border-gray-600 rounded overflow-hidden">
                  <img
                    className="max-w-full h-full object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div>
                  <p className="hidden md:block font-semibold text-white">
                    {product.name}
                  </p>
                  <div className="font-normal text-gray-400 text-sm">
                    <p>
                      Size: <span>{product.size || "N/A"}</span>
                    </p>
                    <div className="flex items-center gap-1">
                      <p>Qty:</p>
                      <select
                        className="bg-[#2a2a2a] border border-gray-600 rounded px-1 py-1 text-white outline-none"
                        value={product.quantity}
                        onChange={(e) => updateQuantity(index, e.target.value)}
                      >
                        {[1, 2, 3, 4, 5].map((qty) => (
                          <option key={qty} value={qty}>
                            {qty}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-white">
                {formatCurrency(product.offerPrice * product.quantity)}
              </p>
              <button
                className="cursor-pointer mx-auto"
                onClick={() => removeProduct(index)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                    stroke="#FF532E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}

          <button className="group flex items-center mt-8 gap-2 text-green-400 hover:text-green-300 transition font-medium">
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
              <path
                d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                stroke="#22c55e"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Continue Shopping
          </button>
        </div>

        <div className="max-w-sm w-full bg-[#2a2a2a] p-6 border border-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <hr className="border-gray-600 my-5" />

          <div className="mb-6">
            <p className="text-sm font-medium uppercase text-gray-400">
              Delivery Address
            </p>
            <div className="relative flex justify-between items-start mt-2">
              <p className="text-gray-500">
                {useNewAddress
                  ? `${newAddress.street}, ${newAddress.city}, ${newAddress.state} ${newAddress.zipcode}, ${newAddress.country}`
                  : savedAddress
                  ? `${savedAddress.street}, ${savedAddress.city}, ${savedAddress.state} ${savedAddress.zipcode}, ${savedAddress.country}`
                  : "No address found"}
              </p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-green-400 hover:underline cursor-pointer"
              >
                Change
              </button>
              {showAddress && (
                <div className="absolute top-12 left-0 py-2 px-3 w-full bg-[#1F1F1F] border border-gray-700 z-10 text-sm">
                  {!useNewAddress && savedAddress && (
                    <p
                      onClick={() => {
                        setUseNewAddress(false);
                        setShowAddress(false);
                      }}
                      className="text-gray-300 p-2 hover:bg-[#2a2a2a] cursor-pointer"
                    >
                      Use saved address
                    </p>
                  )}
                  <p
                    onClick={() => {
                      setUseNewAddress(true);
                      setShowAddress(false);
                    }}
                    className="text-green-400 text-center cursor-pointer p-2 hover:bg-green-600/20"
                  >
                    Add new address
                  </p>
                </div>
              )}
            </div>

            {useNewAddress && (
              <div className="grid grid-cols-1 gap-2 mt-4">
                <input
                  className="px-3 py-2 rounded bg-[#1F1F1F] border border-gray-600 text-white outline-none"
                  placeholder="Street"
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, street: e.target.value })
                  }
                />
                <input
                  className="px-3 py-2 rounded bg-[#1F1F1F] border border-gray-600 text-white outline-none"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                />
                <input
                  className="px-3 py-2 rounded bg-[#1F1F1F] border border-gray-600 text-white outline-none"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                />
                <input
                  className="px-3 py-2 rounded bg-[#1F1F1F] border border-gray-600 text-white outline-none"
                  placeholder="Zipcode"
                  value={newAddress.zipcode}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, zipcode: e.target.value })
                  }
                />
                <input
                  className="px-3 py-2 rounded bg-[#1F1F1F] border border-gray-600 text-white outline-none"
                  placeholder="Country"
                  value={newAddress.country}
                  onChange={(e) => {
                    const updatedAddress = {
                      ...newAddress,
                      country: e.target.value,
                    };
                    setNewAddress(updatedAddress);

                    // If all fields are filled, auto-confirm the new address and hide inputs
                    const allFilled = Object.values(updatedAddress).every(
                      (val) => val.trim() !== ""
                    );
                    if (allFilled) {
                      setSavedAddress(updatedAddress);
                      setUseNewAddress(false);
                    }
                  }}
                />
              </div>
            )}

            <p className="text-sm font-medium uppercase mt-6 text-gray-400">
              Payment Method
            </p>
            <select
              className="w-full border border-gray-600 bg-[#1F1F1F] px-3 py-2 mt-2 outline-none text-white"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Cash on Delivery">Cash On Delivery</option>
              <option value="Online Payment">Online Payment</option>
            </select>
          </div>

          <hr className="border-gray-600" />

          <div className="text-gray-300 mt-4 space-y-2 text-sm">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="text-green-400">Free</span>
            </p>
            <p className="flex justify-between">
              <span>Tax (2%)</span>
              <span>{formatCurrency(tax)}</span>
            </p>
            <p className="flex justify-between text-lg font-semibold mt-3 text-white">
              <span>Total Amount:</span>
              <span>{formatCurrency(total + tax)}</span>
            </p>
          </div>

          <button
            className="w-full py-3 mt-6 cursor-pointer bg-green-500 text-white font-medium hover:bg-green-600 transition"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
