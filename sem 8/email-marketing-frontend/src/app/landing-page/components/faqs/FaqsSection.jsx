import SingleFaq from "./components/SingleFaq";

export const FaqsSection = () => {
  const faqs = [
    {
      question: "How do I manage my campaigns and audience effectively?",
      answer:
        "Our Campaign & Audience Manager lets you run multi-stage campaigns, organize your contact lists, and build dynamic segments to target the right people with the right message — all from one intuitive dashboard.",
    },
    {
      question: "Can I customize email templates easily?",
      answer:
        "Yes! Use our Template Studio to choose from predefined templates, design with a drag-and-drop builder, or leverage AI-powered content creation to craft emails that fit your brand perfectly.",
    },
    {
      question: "How can I measure the success of my email campaigns?",
      answer:
        "Our dashboard provides detailed analytics including open rates, click-through rates, bounce rates, and conversion tracking, enabling you to measure campaign performance and optimize future emails.",
    },
    {
      question:
        "What kind of analytics and insights does the platform provide?",
      answer:
        "Our Analytics Dashboard offers real-time metrics with visual charts and behavior tracking, giving you actionable insights to optimize your campaigns and understand your audience better.",
    },
    {
      question: "Is it easy to import my contacts and export my data?",
      answer:
        "Absolutely. You can import and export contact lists seamlessly in various formats like CSV or PDF. Bulk operations are also supported to save you time when managing large datasets.",
    },
    {
      question: "Can I automate my email campaigns based on user behavior?",
      answer:
        "Yes! Our Smart Triggers & Automations feature allows you to schedule campaigns, auto-resend emails to unopened recipients, and trigger emails based on user activity, so your marketing runs smoothly without manual effort.",
    },
  ];

  return (
    <>
      <div className="m-auto">
        {faqs &&
          faqs.map((faq, index) => (
            <SingleFaq
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
      </div>
    </>
  );
};
