import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full Stack Developer",
      company: "TechCorp",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
      quote: "This was my first hackathon and the experience was incredible! The mentors were super helpful, and I learned more in 24 hours than I did in months of self-study. Plus, our team won the best beginner project award!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Computer Science Student",
      company: "MIT",
      photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      quote: "The energy at this hackathon was unmatched. I met so many talented people and built connections that led to my current internship. The judges were industry experts and their feedback was invaluable.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "UI/UX Designer",
      company: "Design Studio",
      photo: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
      quote: "As a designer, I was nervous about participating, but the team formation process was amazing. I found developers who valued design, and we created something beautiful together. Can't wait for next year!",
      rating: 5
    },
    {
      name: "Alex Rivera",
      role: "Software Engineer",
      company: "Startup Labs",
      photo: "https://images.unsplash.com/photo-1654110455429-cf322b40a906?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
      quote: "The organization was top-notch. From the opening ceremony to the final presentations, everything ran smoothly. The swag and prizes were awesome, but the real reward was the learning experience.",
      rating: 5
    },
    {
      name: "Emily Wong",
      role: "Data Scientist",
      company: "AI Solutions",
      photo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
      quote: "I've been to many hackathons, but this one stands out. The challenges were creative, the sponsors were engaged, and the venue had everything we needed. The 3am pizza delivery was a lifesaver!",
      rating: 5
    },
    {
      name: "David Kumar",
      role: "Backend Developer",
      company: "CloudTech",
      photo: "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
      quote: "This hackathon pushed me out of my comfort zone in the best way possible. I learned new technologies, collaborated with amazing people, and walked away with a project I'm genuinely proud of.",
      rating: 5
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section
      id="testimonials"
      className="container mx-auto px-6 py-24 relative"
    >
      <h1 className="text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        What People Say
      </h1>
      <p className="text-center text-neutral-300 mb-12 max-w-2xl mx-auto">
        Hear from past participants about their hackathon experience
      </p>

      {/* Carousel */}
      <div className="max-w-4xl mx-auto relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/20 relative group hover:border-pink-300/50 transition-all duration-300">
                  <Quote className="absolute top-6 right-6 text-pink-500/20 w-16 h-16" />

                  <div className="flex flex-col items-center text-center mb-6">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full mb-4 border-4 border-pink-500/30 transition-transform duration-300 group-hover:scale-110 object-cover"
                    />
                    <h3 className="text-xl font-bold text-sky-300 mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-neutral-300 mb-2">
                      {testimonial.role} at {testimonial.company}
                    </p>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-neutral-300 leading-relaxed text-lg italic relative z-10">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-pink-500/20 hover:bg-pink-500/40 backdrop-blur-md p-3 rounded-full border border-white/20 transition-all duration-300 group"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-pink-500/20 hover:bg-pink-500/40 backdrop-blur-md p-3 rounded-full border border-white/20 transition-all duration-300 group"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-3 bg-pink-500"
                  : "w-3 h-3 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Grid View (Mobile-friendly alternative shown below carousel) */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 group hover:border-pink-300/50 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full border-2 border-pink-500/30 transition-transform duration-300 group-hover:scale-110 object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-sky-300 truncate">
                  {testimonial.name}
                </h4>
                <p className="text-xs text-neutral-300 truncate">
                  {testimonial.role}
                </p>
              </div>
            </div>
            <div className="flex gap-1 mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed line-clamp-4">
              "{testimonial.quote}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
