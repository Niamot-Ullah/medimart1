import React from "react";
import { FaPills, FaCommentMedical,FaTruck, FaUserMd } from "react-icons/fa";

const services = [
  {
    title: "Medicine Finder",
    description: "Find your medicine easily",
    icon: <FaPills />,
  },
  {
    title: "Raise a Complain",
    description: "Share your experiences",
    icon: <FaCommentMedical />,
  },
  {
    title: "Home Service",
    description: "Get home delivery",
    icon: <FaTruck />,
  },
  {
    title: "Expert Doctor",
    description: "Discuss with expert doctors",
    icon: <FaUserMd />,
  },
];

const ServiceSection = () => {
  return (
    <section className="py-10 bg-gray-50">
        <h1 className="text-2xl font-bold mb-8 text-gray-800 text-center">Our Services</h1>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white text-2xl">
              {service.icon}
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
