import { getCategories } from "@/actions/get-categories";
import { Category } from "./category";

export async function ProductFilter() {
  const categories = await getCategories();
  if(!categories){
    return null;
  }

  return (
    <Category categories={categories} />
  );
}
