"use client";

import { Categories } from "@/libs/schemas";
import { useSearchProductContext } from "@/providers/search-product-provider";
import { Portal, Select, createListCollection } from "@chakra-ui/react";

interface CategoriesProps {
  categories: Categories[];
}

export function Category({ categories }: CategoriesProps) {
  const { category, setCategory } = useSearchProductContext();

  const categoriesCollection = createListCollection({
    items: categories,
  });

  return (
    <div className="pt-10">
      <Select.Root 
        onValueChange={(e) => setCategory(e.value)}
        collection={categoriesCollection} 
        size="md" 
        width="150px"
        value={category}
      >
        <Select.HiddenSelect />
        <Select.Label>Filter product</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="filter product"/>
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {categoriesCollection.items.map((category) => (
                <Select.Item item={category} key={category.label}>
                  {category.value}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </div>
  );
}
