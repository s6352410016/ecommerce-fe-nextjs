"use client";

import { useCategories } from "@/hooks/use-categories";
import { Portal, Select, createListCollection } from "@chakra-ui/react";

export function ProductFilter() {
  const { categories } = useCategories();

  const categoriesCollection = createListCollection({
    items: categories
  });

  return (
    <div className="mt-20 flex items-center gap-x-4">
      <Select.Root collection={categoriesCollection} size="md" width="150px">
        <Select.HiddenSelect />
        <Select.Label>Filter product</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Filter product" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {categoriesCollection.items.map((category) => (
                <Select.Item item={category} key={category.value}>
                  {category.label}
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
