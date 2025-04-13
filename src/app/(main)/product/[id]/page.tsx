import { getProductId } from "@/actions/get-product-id";
import { ProductDetails } from "@/components/ui/product-details";

export default async function ProductIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductId(Number(id));

  return (
    <ProductDetails product={product}/>
  );
}
