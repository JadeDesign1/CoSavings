import { FiShield, FiClock, FiBarChart2, FiUserCheck } from "react-icons/fi";

const features = [
  {
    icon: <FiShield className="text-3xl text-[var(--primary)] mb-4" />,
    title: "Secure Contributions",
    desc: "All transactions are encrypted and transparently logged for group accountability.",
  },
  {
    icon: <FiClock className="text-3xl text-[var(--primary)] mb-4" />,
    title: "Real-time Tracking",
    desc: "Instant updates on member balances, payout history, and contribution schedule.",
  },
  {
    icon: <FiBarChart2 className="text-3xl text-[var(--primary)] mb-4" />,
    title: "Insightful Reports",
    desc: "Visual dashboards to understand group savings progress and individual activity.",
  },
  {
    icon: <FiUserCheck className="text-3xl text-[var(--primary)] mb-4" />,
    title: "Member Management",
    desc: "Add, remove, or verify members seamlessly with admin controls.",
  },
];

const Features = () => {
  return (
    <section className="bg-[var(--black-primary)] py-20 px-6 md:px-20 text-gray-800">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl text-[var(--text-light)] font-bold mb-4">
          Key Features
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Everything you need to simplify group savings — all in one app.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md shadow-gray-500 p-6 text-center hover:shadow-lg transition-shadow duration-300"
          >
            {feature.icon}
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
