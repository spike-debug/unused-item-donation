import React, { useState } from 'react';

const Donate = () => {
  const [formData, setFormData] = useState({
    name: '',
    item: '',
    condition: '',
    address: '',
    image: null,
    status: 'available',
    price: '',
    offerPrice: '',
    rating: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert('Please upload an image.');
      return;
    }

    const submissionData = new FormData();
    submissionData.append('name', formData.name);
    submissionData.append('description', formData.condition); // Treating "condition" as description
    submissionData.append('category', formData.item);         // Mapping "item" to "category"
    submissionData.append('image', formData.image);
    submissionData.append('status', formData.status);
    submissionData.append('price', formData.price);
    submissionData.append('offerPrice', formData.offerPrice);
    submissionData.append('rating', formData.rating);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('https://unused-item-donation.onrender.com/api/items', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submissionData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit donation.');
      }

      alert('Donation submitted successfully!');
      setFormData({
        name: '',
        item: '',
        condition: '',
        address: '',
        image: null,
        status: 'available',
        price: '',
        offerPrice: '',
        rating: '',
      });
      document.getElementById('imageInput').value = '';
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('Failed to submit donation. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#1F1F1F] text-white flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#2A2A2A] p-10 rounded-2xl shadow-lg"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-8 text-center text-white">Donate Unused Items</h2>

        <div className="space-y-5">
          {/* Item Name */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm text-gray-300">Item Name</label>
            <input
              type="text"
              name="item"
              value={formData.item}
              onChange={handleChange}
              placeholder="What are you donating?"
              className="flex-1 bg-[#3A3A3A] placeholder:text-sm placeholder:text-gray-400 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Full Name */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm text-gray-300">Category Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Category"
              className="flex-1 bg-[#3A3A3A] placeholder:text-sm placeholder:text-gray-400 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Condition */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm text-gray-300">Condition</label>
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              placeholder="e.g., Like New, Good"
              className="flex-1 bg-[#3A3A3A] placeholder:text-sm placeholder:text-gray-400 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Address */}
          <div className="flex items-start gap-4">
            <label className="w-32 pt-3 text-sm text-gray-300">Pickup Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter pickup address"
              rows="3"
              className="flex-1 bg-[#3A3A3A] placeholder:text-sm placeholder:text-gray-400 text-white p-3 rounded-lg outline-none resize-none focus:ring-2 focus:ring-green-400"
              required
            ></textarea>
          </div>

          {/* Status */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm text-gray-300">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="flex-1 bg-[#3A3A3A] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="available">Available</option>
              <option value="requested">Requested</option>
              <option value="claimed">Claimed</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm text-gray-300">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price (optional)"
              className="flex-1 bg-[#3A3A3A] placeholder:text-sm placeholder:text-gray-400 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Offer Price */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm text-gray-300">Offer Price</label>
            <input
              type="number"
              name="offerPrice"
              value={formData.offerPrice}
              onChange={handleChange}
              placeholder="Offer price (optional)"
              className="flex-1 bg-[#3A3A3A] placeholder:text-sm placeholder:text-gray-400 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm text-gray-300">Rating</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="0 to 5"
              min="0"
              max="5"
              step="0.1"
              className="flex-1 bg-[#3A3A3A] placeholder:text-sm placeholder:text-gray-400 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Image Upload */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm text-gray-300">Upload Image</label>
            <input
              type="file"
              name="image"
              id="imageInput"
              accept="image/*"
              onChange={handleChange}
              className="flex-1 text-sm text-gray-200 bg-[#3A3A3A] rounded-lg px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-300"
        >
          Submit Donation
        </button>
      </form>
    </div>
  );
};

export default Donate;
