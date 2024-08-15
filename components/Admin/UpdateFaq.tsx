import {
  useGetLayoutQuery,
  useUpdateLayoutMutation,
} from "@/redux/features/layout/layoutapi";
import React, { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const UpdateFaq = () => {
  const [faq, setFaq] = useState([{ question: "", answer: "" }]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const { data, refetch } = useGetLayoutQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [updateLayout, { isSuccess, error }] = useUpdateLayoutMutation();
  const { toast } = useToast();

  useEffect(() => {
    setFaq(data?.layout?.faq || []);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast({
        description: "FAQ updated successfully",
        variant: "default",
      });
    }
    if (error) {
      toast({
        description: "Failed to update FAQ",
        variant: "destructive",
      });
    }
  }, [isSuccess, error, toast]);

  const handleEdit = async (e: any) => {
    e.preventDefault();
    updateLayout({
      type: "FAQ",
      faq: faq,
    });
  };

  const handleAddFaq = () => {
    if (
      faq.length === 0 ||
      (faq[faq.length - 1].question !== "" && faq[faq.length - 1].answer !== "")
    ) {
      setFaq([...faq, { question: "", answer: "" }]);
      setEditingIndex(faq.length);
    } else {
      toast({
        description: "Please fill in the existing FAQ before adding a new one",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (index: number, key: string, value: string) => {
    setFaq((prevFaq) =>
      prevFaq.map((faqItem, i) =>
        i === index ? { ...faqItem, [key]: value } : faqItem
      )
    );
  };

  const handleDelete = (index: number) => {
    setFaq((prevFaq) => prevFaq.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8 bg-background shadow-lg border border-muted rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Update FAQs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <Accordion type="multiple" className="flex flex-col w-full space-y-4">
            {faq.map((faqItem, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card shadow-md rounded-lg border border-muted p-4"
              >
                <div className="flex items-center justify-between">
                  <AccordionTrigger className="text-foreground font-semibold text-lg">
                    {faqItem.question || "New Question"}
                  </AccordionTrigger>
                  <div className="flex gap-3">
                    <button
                      className="text-primary text-sm font-medium"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-primary text-sm font-medium"
                      onClick={() => setEditingIndex(index)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                {editingIndex === index && (
                  <AccordionContent className="mt-4 p-4 bg-background border border-muted rounded-lg">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col space-y-2">
                        <label
                          className="text-sm text-foreground"
                          htmlFor={`question-${index}`}
                        >
                          Question
                        </label>
                        <input
                          type="text"
                          id={`question-${index}`}
                          value={faqItem.question}
                          onChange={(e) =>
                            handleInputChange(index, "question", e.target.value)
                          }
                          className="border border-muted rounded-md p-2 focus:outline-none bg-transparent text-foreground w-full"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label
                          className="text-sm text-foreground"
                          htmlFor={`answer-${index}`}
                        >
                          Answer
                        </label>
                        <textarea
                          id={`answer-${index}`}
                          value={faqItem.answer}
                          onChange={(e) =>
                            handleInputChange(index, "answer", e.target.value)
                          }
                          className="border border-muted rounded-md p-2 focus:outline-none bg-transparent text-foreground w-full"
                          rows={4}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
          <div className="flex justify-end">
            <IoAddCircleSharp
              className="text-muted-foreground mt-6 cursor-pointer hover:text-muted-700"
              size={36}
              onClick={handleAddFaq}
            />
          </div>
          <div className="mt-8 flex">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors duration-200 w-full"
              onClick={handleEdit}
            >
              Update
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateFaq;
