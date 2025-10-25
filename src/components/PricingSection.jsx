import React from "react";

const plans = [
  {
    title: "Starter",
    price: "Free",
    features: ["1 Repository", "Basic Insights", "Community Support"],
    gradient: "from-pink-500 to-purple-500",
    delay: "100",
  },
  {
    title: "Pro",
    price: "$9/month",
    features: ["Unlimited Repositories", "Advanced Stats", "Priority Support"],
    gradient: "from-purple-500 to-indigo-500",
    delay: "200",
  },
  {
    title: "Team",
    price: "$29/month",
    features: [
      "Team Collaboration",
      "Real-time Analytics",
      "Private Dashboards",
    ],
    gradient: "from-indigo-500 to-blue-500",
    delay: "300",
  },
  {
    title: "Enterprise",
    price: "Custom",
    features: [
      "Dedicated Server",
      "24/7 Premium Support",
      "Custom Integrations",
    ],
    gradient: "from-blue-500 to-cyan-500",
    delay: "400",
  },
];

export default function PricingCards() {
  return (
    <section className="container mx-auto px-6 py-24" data-aos="fade-up">
      <div className="text-center mb-16" data-aos="fade-down">
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          Pricing Plans
        </h2>
        <p className="max-w-2xl mx-auto text-white/80">
          Choose the perfect plan for your project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center group hover:border-${plan.gradient.split(" ")[1]}/50 hover:transform hover:-translate-y-2 transition-all duration-300`}
            data-aos="flip-left"
            data-aos-delay={plan.delay}
          >
            <div
              className={`inline-flex mb-4 p-4 rounded-full bg-gradient-to-br ${plan.gradient} group-hover:shadow-lg group-hover:shadow-${plan.gradient.split(" ")[1]}/40 transition-all`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 1.343-3 3v6h6v-6c0-1.657-1.343-3-3-3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 20h14M8 12V6a4 4 0 018 0v6"
                />
              </svg>
            </div>

            <h3
              className={`text-2xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${plan.gradient}`}
            >
              {plan.title}
            </h3>

            <div
              className={`text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${plan.gradient}`}
            >
              {plan.price}
            </div>

            <ul className="text-white/80 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="mb-2">
                  ✅ {feature}
                </li>
              ))}
            </ul>

            <button
              className={`px-6 py-2 rounded-full font-medium bg-gradient-to-r ${plan.gradient} hover:opacity-90 transition`}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
