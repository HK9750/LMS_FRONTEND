import {
  useGetLayoutQuery,
  useUpdateLayoutMutation,
} from "@/redux/features/layout/layoutapi";
import React, { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { IoAddCircleSharp } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const UpdateCategories = () => {
  const [categories, setCategories] = useState([{ title: "" }]);
  const { data, refetch } = useGetLayoutQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [updateLayout, { isSuccess, error }] = useUpdateLayoutMutation();
  const { toast } = useToast();
  console.log(data);
  useEffect(() => {
    setCategories(data?.layout?.categories || []);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast({
        description: "Categories updated successfully",
        variant: "default",
      });
    }
    if (error) {
      toast({
        description: "Failed to update categories",
        variant: "destructive",
      });
    }
  }, [isSuccess, error, toast, refetch]);

  const handleEdit = async (e: any) => {
    e.preventDefault();
    updateLayout({
      type: "Categories",
      categories: categories,
    });
  };

  const handleAddCategory = () => {
    if (
      categories.length !== 0 &&
      categories[categories.length - 1].title === ""
    ) {
      toast({
        description:
          "Please fill the existing category before adding a new one",
        variant: "destructive",
      });
    } else {
      setCategories([...categories, { title: "" }]);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category, i) =>
        i === index ? { ...category, title: value } : category
      )
    );
  };

  const handleDelete = (index: number) => {
    if (categories.length === 1) {
      toast({
        description: "At least one category is required",
        variant: "destructive",
      });
    } else {
      setCategories((prevCategories) =>
        prevCategories.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-6 bg-background shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground text-center">
          Update Categories
        </CardTitle>
        <div className="text-md text-foreground text-center">
          Click on existing categories to edit them
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative bg-card shadow-lg mx-auto border rounded-lg p-2 min-w-20 text-center"
            >
              <Input
                type="text"
                value={category.title}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="focus:outline-none border-none bg-transparent text-center w-auto text-foreground"
              />
              <RxCrossCircled
                className="absolute top-2 right-2 cursor-pointer text-primary"
                onClick={() => handleDelete(index)}
                size={20}
              />
            </div>
          ))}
        </div>
        <IoAddCircleSharp
          className="text-muted-foreground mt-4 cursor-pointer hover:text-foreground"
          size={36}
          onClick={handleAddCategory}
        />
        <div className="mt-4 flex">
          <Button
            type="submit"
            className="p-2 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors duration-200 w-full"
            onClick={handleEdit}
          >
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateCategories;
