import { getProductId } from "@/actions/get-product-id";
import { ProductDetails } from "@/components/ui/product-details";
import { notFound } from "next/navigation";

export default async function ProductIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductId(Number(id));

  if(!product){
    notFound();
  }

  return (
    <ProductDetails product={product}/>
  );
}
