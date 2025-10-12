import { useState } from "react";

// 1. Feature Data Array (Content Management)
// This array holds all the content for the feature cards.
const featuresData = [
  {
    title: "Fast Development",
    description: "Built with Vite for lightning-fast development experience",
  },
  {
    title: "Modern Styling",
    description: "Styled with Tailwind CSS for beautiful, responsive design",
  },
  {
    title: "React Powered",
    description: "Built with React for interactive user interfaces",
  },
  {
    title: "Open Source",
    description:
      "Full access to the codebase. Review, learn, and contribute on GitHub.",
  },
  {
    title: "Community Driven",
    description:
      "A project actively developed and maintained by the community.",
  },
  {
    title: "Well Documented",
    description:
      "Includes clear guides to help you get started contributing quickly.",
  },
];

// 2. Reusable FeatureCard Component
// This component encapsulates the repeated card markup.
const FeatureCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header/Navigation Section */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-indigo-600">
              Hacktoberfest Site
            </h1>
            <div className="space-x-4">
              <a href="#home" className="text-gray-700 hover:text-indigo-600">
                Home
              </a>
              <a href="#about" className="text-gray-700 hover:text-indigo-600">
                About
              </a>
              <a
                href="#features"
                className="text-gray-700 hover:text-indigo-600"
              >
                Features
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Our Site
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            A simple site built with React, Vite, and Tailwind CSS
          </p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
            Get Started
          </button>
        </div>
      </section>

      {/* Counter Demo Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Interactive Counter
          </h3>
          <p className="text-gray-600 mb-4">
            Click the button to increment the counter
          </p>
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Count is: {count}
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Features
        </h2>

        {/* FINAL FIX: Removing browser defaults using all-encompassing reset classes */}
        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0"
        >
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </ul>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            About This Project
          </h2>
          <p className="text-gray-600 mb-4">
            This is a basic website built for Hacktoberfest contributions. The
            site is designed to be simple yet functional, providing a foundation
            for contributors to add new features and elements.
          </p>
          <p className="text-gray-600">
            Feel free to contribute by adding new sections, components, or
            features to make this site even better!
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">100+</div>
            <div className="text-gray-600">Contributors</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
            <div className="text-gray-600">Projects</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">1000+</div>
            <div className="text-gray-600">Commits</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Empty - for contributors) */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Testimonials
        </h2>
        <div className="text-center text-gray-600">
          <p>No testimonials yet. Be the first to add one!</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-2">Built with ❤️ for Hacktoberfest</p>
          <p className="text-gray-400 text-sm">
            © 2025 Hacktoberfest Contribution Site
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
