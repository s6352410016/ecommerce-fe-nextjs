import { For } from "@chakra-ui/react";
import { ProductItemsSkeletion } from "./product-items-skeletion";

export function ProductsSkeleton() {
  return (
    <For each={[...Array(20)].map((_, i) => i + 1)}>
      {(item) => (
        <ProductItemsSkeletion key={item}/>
      )}
    </For>
  )
}
