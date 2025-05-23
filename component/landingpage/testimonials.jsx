import React from "react";

const Testimonials = () => {
  return (
    <section className="py-16 px-6 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-semibold mb-10">What Our Users Say</h2>
      <blockquote className="mb-6">
        <p className="text-lg italic">
          “This has made our Ajo group much more organized and fair.”
        </p>
        <footer className="text-sm text-gray-500 mt-2">— Aisha, Lagos</footer>
      </blockquote>
      <blockquote>
        <p className="text-lg italic">
          “No more arguments about who paid and who didn’t.”
        </p>
        <footer className="text-sm text-gray-500 mt-2">— Emeka, Enugu</footer>
      </blockquote>
    </section>
  );
};

export default Testimonials;
