import { FiUsers, FiSend, FiTrendingUp, FiLock } from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      icon: (
        <FiLock className="text-4xl text-[var(--primary)] mb-4 transition-transform duration-300 group-hover:scale-110" />
      ),
      title: "Sign Up or Log In",
      desc: "Create an account or log in to access group savings features securely.",
    },
    {
      icon: (
        <FiUsers className="text-4xl text-[var(--primary)] mb-4 transition-transform duration-300 group-hover:scale-110" />
      ),
      title: "Create or Join a Group",
      desc: "Start your own savings group or join an existing one using a group code.",
    },
    {
      icon: (
        <FiSend className="text-4xl text-[var(--primary)] mb-4 transition-transform duration-300 group-hover:scale-110" />
      ),
      title: "Contribute Regularly",
      desc: "Contribute funds on schedule. Every transaction is securely tracked in real-time.",
    },
    {
      icon: (
        <FiTrendingUp className="text-4xl text-[var(--primary)] mb-4 transition-transform duration-300 group-hover:scale-110" />
      ),
      title: "Payout & Monitor",
      desc: "Receive payouts fairly based on rotation. Monitor your balance and history with ease.",
    },
  ];

  return (
    <section className="bg-[var(--black-muted)] py-20 px-6  md:px-20 text-white w-[100vw]">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          How It Works
        </h2>
        <p className="text-slate-100 text-base md:text-lg max-w-2xl mx-auto">
          A simple 3-step process to grow and manage your cooperative savings
          with ease.
        </p>
      </div>

      <div className="grid  md:grid-cols-2 xl:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-[var(--black-soft)] hover:scale-105 group transition-transform duration-300 md:px-4 lg:px-8 p-8 rounded-xl border shadow-lg  border-emerald-800 text-center"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">
              {index + 1}
            </div>
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
