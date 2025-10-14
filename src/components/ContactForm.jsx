import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  // Simple client-side validation
  const validate = () => {
    let errors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Invalid email";
    if (!form.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const EMAILJS_PUBLIC_KEY = "wWASL3-GY6b8mi-US";
  const SERVICE_ID = "service_qf8icws";
  const TEMPLATE_ID = "template_enw4fmc";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validErrors = validate();
    if (Object.keys(validErrors).length > 0) {
      setErrors(validErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    try {
      emailjs.send('service_qf8icws','template_741klwq',
        {
        from_name:form.name,
        to_name:'Pranav',
        from_email:form.email,
        to_email:'it10800222003@gmail.com',
        message:form.message,
      },
      'wWASL3-GY6b8mi-US'
    )
      // result.status should be 200 on success
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setServerError("An error occurred while sending. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="container mx-auto px-6 py-24 max-w-xl"
      id="contact"
      data-aos="fade-up"
      aria-labelledby="contact-heading"
    >
      <h2
        className="text-4xl text- font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
        id="contact-heading"
      >
        Contact Us
      </h2>
      <form
        className="bg-white/[0.1] backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl text-white"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="mb-6">
          <label htmlFor="name" className="block font-medium mb-2">
            Name
          </label>
          <input
            name="name"
            id="name"
            type="text"
            className={`w-full p-3 rounded-lg border-violet-600 bg-violet-800 border ${errors.name ? "border-red-500" : "border-gray-200"} focus:outline-none focus:border-pink-500`}
            value={form.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby="name-error"
          />
          {errors.name && (
            <span className="text-red-400 text-xs mt-1 block" id="name-error">
              {errors.name}
            </span>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            className={`w-full p-3 rounded-lg border-violet-600 bg-violet-800 border ${errors.email ? "border-red-500" : "border-gray-200"} focus:outline-none focus:border-pink-500`}
            value={form.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
          />
          {errors.email && (
            <span className="text-red-400 text-xs mt-1 block" id="email-error">
              {errors.email}
            </span>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block font-medium mb-2">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className={`w-full p-3 rounded-lg border-violet-600 bg-violet-800 border ${errors.message ? "border-red-500" : "border-gray-200"} focus:outline-none focus:border-pink-500 resize-none`}
            value={form.message}
            onChange={handleChange}
            rows={6}
            aria-invalid={!!errors.message}
            aria-describedby="message-error"
          />
          {errors.message && (
            <span className="text-red-400 text-xs mt-1 block" id="message-error">
              {errors.message}
            </span>
          )}
        </div>
        {serverError && (
          <div className="text-red-400 text-sm mb-4">{serverError}</div>
        )}
        {submitted ? (
          <div className="text-green-400 text-lg font-semibold" role="alert">
            Thank you for contacting us — we'll reply soon!
          </div>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg transition-all hover:shadow-pink-500/50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        )}
      </form>
    </section>
  );
}
