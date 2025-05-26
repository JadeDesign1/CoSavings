import React from "react";

const testimonials = [
  {
    quote: "“This has made our Ajo group much more organized and fair.”",
    author: "Aisha, Lagos",
  },
  {
    quote: "“No more arguments about who paid and who didn’t.”",
    author: "Emeka, Enugu",
  },
  {
    quote: "“Everything is transparent now – we all love it!”",
    author: "Bola, Abuja",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-[var(--black-primary)] py-16 px-6">
      <section className="max-w-6xl mx-auto text-center text-[var(--white)]">
        <h2 className="text-3xl font-semibold mb-12">What Our Users Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top testimonial spans both columns */}
          <div className="md:col-span-2 bg-[var(--black-muted)] p-6 rounded-xl shadow-lg">
            <p className="text-lg italic mb-2">{testimonials[0].quote}</p>
            <footer className="text-sm text-gray-800">
              — {testimonials[0].author}
            </footer>
          </div>

          {/* Two side-by-side cards */}
          {testimonials.slice(1).map((testimonial, index) => (
            <div
              key={index}
              className="bg-[var(--black-muted)] p-6 rounded-xl shadow-lg"
            >
              <p className="text-lg italic mb-2">{testimonial.quote}</p>
              <footer className="text-sm text-gray-800">
                — {testimonial.author}
              </footer>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
