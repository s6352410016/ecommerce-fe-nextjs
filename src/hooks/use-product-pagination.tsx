import { Axios } from "@/libs/axios";
import { ProductWithPagination } from "@/libs/schemas";
import { useSearchProductContext } from "@/providers/search-product-provider";
import axios from "axios";
import { useEffect, useState } from "react";

export function useProductPagination(productName?: string) {
  const { category: categoryName } = useSearchProductContext();

  const [page, setPage] = useState(1);
  const [product, setProduct] = useState<ProductWithPagination | null>(null);

  const getProducts = async () => {
    try {
      if (!categoryName?.length && !productName) {
        const { data } = await Axios.get<ProductWithPagination>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/find?page=${page}`
        );
        setProduct(data);
        return;
      }

      if(categoryName && categoryName.length !== 0 && !productName){
        switch (categoryName[0]) {
          case "default":
            const { data: product } = await Axios.get<ProductWithPagination>(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/find?page=${page}`
            );
            setProduct(product);
          break;
          default:
            const { data } = await Axios.get<ProductWithPagination>(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/find?page=${page}&categoryName=${categoryName[0]}`
            );
            setProduct(data);
          break;   
        }
      }
      
      if(!categoryName?.length && productName){
        const { data } = await Axios.get<ProductWithPagination>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/find?productName=${productName}`
        );
        setProduct(data);
        return;
      }

      if(categoryName && categoryName.length !== 0 && productName){
        if(categoryName[0] !== "default"){
          const { data } = await Axios.get<ProductWithPagination>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/find?categoryName=${categoryName[0]}&productName=${productName}`
          );
          setProduct(data);
          return;
        }

        const { data } = await Axios.get<ProductWithPagination>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/find?productName=${productName}`
        );
        setProduct(data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [page, categoryName, productName]);

  return {
    product,
    setPage,
    getProducts,
  };
}
