import React from 'react';

const About = () => {
  return (
    <div className="bg-[#1F1F1F] text-white min-h-screen px-6 py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto mb-10">
        <section className="border-t-4  rounded-md p-6 border border-green-600 shadow-lg text-center">
          <h1 className="text-4xl font-bold text-green-400 mb-2">About Us</h1>
          <p className="text-lg text-gray-300">
            Transforming Clutter into Kindness – One Donation at a Time.
          </p>
        </section>
      </div>

      {/* Grid Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {/* Our Mission */}
        <div className="bg-[#2A2A2A] border border-green-600 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-green-300 mb-2">🌱 Our Mission</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Ensure unused items like clothes, books, toys, and gadgets reach people who need them most.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-[#2A2A2A] border border-green-600 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-green-300 mb-2">🔄 How It Works</h2>
          <ol className="list-decimal list-inside text-gray-300 text-sm space-y-1">
            <li>Submit unused items</li>
            <li>We arrange free pickups</li>
            <li>Delivered to trusted NGOs</li>
          </ol>
        </div>

        {/* Why Choose Us */}
        <div className="bg-[#2A2A2A] border border-green-600 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-green-300 mb-2">💡 Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
            <li>Seamless donation process</li>
            <li>Real-time updates</li>
            <li>Verified deliveries</li>
            <li>Eco & social impact</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="bg-[#2A2A2A] border border-green-600 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-green-300 mb-2">📞 Contact Us</h2>
          <p className="text-gray-300 text-sm"><strong>Email:</strong> support@unusedthings.org</p>
          <p className="text-gray-300 text-sm"><strong>Phone:</strong> +91 98765 43210</p>
          <p className="text-gray-300 text-sm"><strong>Location:</strong> 3rd Floor, Humanity Hub, Bengaluru</p>
        </div>
      </div>

      {/* Visual Feature Highlights */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 px-4">
        {[
         {
    title: "Empathy-Driven Impact",
    description: "Each donation creates a ripple of kindness, changing lives with simple gestures.",
    icon: "💚",
  },
  {
    title: "Eco-Friendly Mission",
    description: "Reducing waste by giving pre-loved items a second life and supporting sustainability.",
    icon: "🌍",
  },
  {
    title: "Effortless Giving",
    description: "A smooth, secure donation process – from form to doorstep pickup.",
    icon: "🤝",
  },
        ].map((feature, index) => (
          <div
            key={index}
            className="border border-green-600 rounded-lg p-6 shadow-md bg-[#2A2A2A] hover:shadow-xl transition duration-300"
          >
            <div className="text-3xl mb-4 text-green-400">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-green-300 mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
