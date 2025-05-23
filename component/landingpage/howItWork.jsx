import { FiUsers, FiSend, FiTrendingUp } from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FiUsers className="text-4xl text-emerald-400 mb-4" />,
      title: "Create a Group",
      desc: "Start by creating your own savings group or join an existing one.",
    },
    {
      icon: <FiSend className="text-4xl text-emerald-400 mb-4" />,
      title: "Contribute Regularly",
      desc: "Members contribute funds periodically, tracked and secured in real-time.",
    },
    {
      icon: <FiTrendingUp className="text-4xl text-emerald-400 mb-4" />,
      title: "Payout & Monitor",
      desc: "Funds are disbursed fairly based on agreed rotation. Track progress easily.",
    },
  ];

  return (
    <section className="bg-[#002D32] py-20 px-6  md:px-20 text-white w-[100vw]">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
          A simple 3-step process to grow and manage your cooperative savings
          with ease.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-[#013940] hover:scale-105 transition-transform duration-300 md:px-4 lg:px-8 p-8 rounded-xl border border-emerald-800 text-center"
          >
            {step.icon}
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              {step.title}
            </h3>
            <p className="text-gray-400 text-sm md:text-base">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
