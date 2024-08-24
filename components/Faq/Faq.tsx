import React from "react";
import { Accordion } from "@/components/ui/accordion";
import FAQCard from "./FaqCard";
import { useGetLayoutQuery } from "@/redux/features/layout/layoutapi";

const FAQ = () => {
  const { data, isLoading } = useGetLayoutQuery("FAQ");
  const faqArray = data?.layout?.faq;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="container my-12">
      <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
        Frequently Asked Questions
      </h1>
      <section className="flex justify-center">
        <div className="w-full max-w-3xl mx-auto">
          {" "}
          {/* Add container with fixed max width */}
          <Accordion type="single" collapsible className="space-y-8">
            {faqArray?.map((faq: any, index: number) => (
              <FAQCard
                key={index}
                value={`item-${index + 1}`}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </Accordion>
        </div>
      </section>
    </section>
  );
};

export default FAQ;
