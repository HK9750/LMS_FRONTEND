import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className="container my-12">
      <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
        Frequently Asked Questions
      </h1>
      <section className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </section>
  );
};

export default FAQ;
