import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

const faqs = [
  {
    question: "What is Hacktoberfest?",
    answer: "Hacktoberfest is an annual month-long event in October that encourages open-source contributions. Participants can contribute to repositories on GitHub to earn swag and recognition."
  },
  {
    question: "Who can participate in Hacktoberfest?",
    answer: "Anyone with a GitHub account can participate! Whether you're a student, professional developer, or hobbyist, Hacktoberfest is open to all skill levels."
  },
  {
    question: "How do I participate?",
    answer: "Sign up on the Hacktoberfest website, find repositories labeled with 'hacktoberfest', make pull requests, and have them merged or approved to complete your participation."
  },
  {
    question: "How many pull requests do I need to submit?",
    answer: "You need to submit and have at least 4 valid pull requests during October to successfully complete Hacktoberfest and earn rewards."
  },
  {
    question: "Can I contribute to any repository?",
    answer: "You can contribute to any repository participating in Hacktoberfest. Look for the 'hacktoberfest' label on issues to ensure they count toward your contributions."
  },
  {
    question: "What counts as a valid pull request?",
    answer: "A valid pull request should be meaningful and follow the repository's contribution guidelines. Spam or trivial PRs may be marked as invalid by maintainers."
  },
  {
    question: "Do I need to be part of a team?",
    answer: "No! Hacktoberfest is an individual contribution event, though you can collaborate with others on the same repository if you like."
  },
  {
    question: "What rewards can I earn?",
    answer: "Participants who complete the challenge typically receive official Hacktoberfest swag like T-shirts, stickers, and other goodies. Rewards depend on availability and your completion status."
  },
  {
    question: "Are there any costs to participate?",
    answer: "No, participation in Hacktoberfest is completely free! You only need a GitHub account and a willingness to contribute to open-source projects."
  },
  {
    question: "Can I submit more than 4 pull requests?",
    answer: "Yes! You can submit as many pull requests as you like, but only 4 valid ones are required to complete the challenge and earn rewards."
  },
  {
    question: "How are spammy or invalid pull requests handled?",
    answer: "Repository maintainers and Hacktoberfest organizers review contributions. PRs deemed spammy or invalid will not count toward the challenge."
  },
  {
    question: "Is Hacktoberfest global?",
    answer: "Yes, Hacktoberfest is open to participants all around the world. Anyone can join as long as they have a GitHub account."
  },
];


  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="container mx-auto px-6 py-24 relative"
    >
      <h1 className="text-4xl font-bold pb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        Frequently Asked Questions
      </h1>

      <div className="mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:border-pink-300/50"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-8 py-6 flex justify-between items-center text-left gap-4 group"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="text-lg font-semibold text-neutral-300 group-hover:text-neutral-200 transition-colors">
                {faq.question}
              </span>
              <ChevronDown
                className={`flex-shrink-0 text-pink-400 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                size={24}
              />
            </button>

            <div
              id={`faq-answer-${index}`}
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="px-8 pb-6 text-neutral-300 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
