import React, { FC } from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FAQCardProps {
  question: string;
  answer: string;
  value: string;
}

const FAQCard: FC<FAQCardProps> = ({ question, answer, value }) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-lg font-semibold">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQCard;
