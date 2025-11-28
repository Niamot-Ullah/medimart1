import { FaUserPlus, FaPills, FaCartPlus, FaCreditCard } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Sign Up",
      desc: "Create your account to get started.",
      icon: <FaUserPlus className="text-4xl text-blue-600" />,
    },
    {
      id: 2,
      title: "Find Medicine",
      desc: "Search and choose your medicine easily.",
      icon: <FaPills className="text-4xl text-green-600" />,
    },
    {
      id: 3,
      title: "Select Quantity",
      desc: "Add the desired quantity to your cart.",
      icon: <FaCartPlus className="text-4xl text-yellow-600" />,
    },
    {
      id: 4,
      title: "Pay Bill",
      desc: "Complete your payment securely.",
      icon: <FaCreditCard className="text-4xl text-purple-600" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
              <div className="mt-4 flex justify-center">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  {step.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
