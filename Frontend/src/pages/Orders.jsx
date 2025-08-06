import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const boxIcon = "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("https://unused-item-donation.onrender.com/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const transformed = response.data.orders.map(order => ({
          id: order._id,
          items: order.items.map(item => ({
            product: {
              name: item?.item?.name || "Unnamed Item"
            },
            quantity: item.quantity
          })),
          address: {
            street: order.shippingAddress?.street || "Unknown Street",
            city: order.shippingAddress?.city || "Unknown City",
            state: order.shippingAddress?.state || "Unknown State",
            zipcode: order.shippingAddress?.zipcode || "000000",
            country: order.shippingAddress?.country || "Unknown Country"
          },
          amount: order.totalPrice || 0,
          paymentType: order.paymentMethod || "Unknown",
          orderDate: new Date(order.createdAt).toLocaleDateString("en-IN"),
          isPaid: order.status?.toLowerCase() === "completed"
        }));

        setOrders(transformed);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-6 bg-[#1F1F1F] min-h-screen text-[#E0F7D1]">
      <h2 className="text-2xl font-semibold">🧾 Orders List</h2>

      {orders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:grid md:grid-cols-[2fr_1.5fr_1fr_1.5fr] gap-5 p-5 max-w-5xl rounded-md border border-gray-700 bg-[#2A2A2A] shadow-md"
        >
          {/* Product Info */}
          <div className="flex gap-4">
            <img className="w-12 h-12 object-cover opacity-70" src={boxIcon} alt="boxIcon" />
            <div>
              {order.items.map((item, idx) => (
                <p key={idx} className="font-semibold text-[#E0F7D1]">
                  {item.product.name}
                  {item.quantity > 1 && (
                    <span className="text-green-400"> x{item.quantity}</span>
                  )}
                </p>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="text-sm leading-5">
            <p className="font-semibold">{order.address.firstName} {order.address.lastName}</p>
            <p className="text-gray-300">
              {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}, {order.address.country}
            </p>
          </div>

          {/* Amount */}
          <p className="font-bold text-lg text-green-400 my-auto">
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(order.amount)}
          </p>

          {/* Payment Info */}
          <div className="text-sm flex flex-col gap-1">
            <p><span className="text-gray-400">Method:</span> {order.paymentType}</p>
            <p><span className="text-gray-400">Date:</span> {order.orderDate}</p>
            <p>
              <span className="text-gray-400">Payment:</span>{' '}
              <span className={order.isPaid ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
