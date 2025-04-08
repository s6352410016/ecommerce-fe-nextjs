"use client";

import { Axios } from "@/libs/axios";
import { Categories } from "@/libs/schemas";
import { useEffect, useState } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState<Categories[]>([
    {
      label: "",
      value: "",
    },
  ]);

  const getCategories = async () => {
    const { data: categories } = await Axios.get<Categories[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/category/find`);
    if(categories){
      setCategories(categories);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return {
    categories,
  }
}