// src/components/HomePage.jsx

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 mt-15">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">
          Welcome to DevConnect 🚀
        </h1>
        <p className="text-lg text-base-content/70 max-w-2xl mb-6">
          Find developers. Build projects. Grow your network worldwide.
        </p>
        <div className="flex gap-4">
          <Link to="/login" className="btn btn-primary px-6 py-3 text-lg">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Why DevConnect?</h2>
          <p className="text-base-content/70">
            A platform built for collaboration and growth.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="card bg-base-100 shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2 text-primary">Connect</h3>
            <p>Find developers who share your passion and goals.</p>
          </div>
          <div className="card bg-base-100 shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2 text-primary">Collaborate</h3>
            <p>Team up on exciting real-world projects and hackathons.</p>
          </div>
          <div className="card bg-base-100 shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2 text-primary">Grow</h3>
            <p>
              Expand your skills, build portfolio, and unlock opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-16 text-center text-white px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-5xl font-bold mb-2">10,000+</div>
            <div className="text-lg">Developers Connected</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">500+</div>
            <div className="text-lg">Projects Launched</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">200+</div>
            <div className="text-lg">Hiring Companies</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Success Stories</h2>
          <p className="text-base-content/70">
            Hear from our amazing community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="card bg-base-100 shadow p-6">
            <p className="italic">
              "I found my first co-founder through DevConnect. Best decision
              ever!"
            </p>
            <div className="mt-4 font-bold text-primary">
              - Sarah, Fullstack Developer
            </div>
          </div>
          <div className="card bg-base-100 shadow p-6">
            <p className="italic">
              "Built 3 apps, expanded my network, and got hired in 6 months!"
            </p>
            <div className="mt-4 font-bold text-primary">
              - Mike, React Developer
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-base-300 py-16 px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 text-base-content/70">
            Get the latest news, updates and developer opportunities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-primary w-full sm:w-auto">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
