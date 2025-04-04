"use client";

import { Portal, Select, createListCollection } from "@chakra-ui/react";

const categories = createListCollection({
  items: [
    { label: "Clothes", value: "clothes" },
    { label: "Shoes", value: "shoes" },
    { label: "Bags", value: "bags" },

  ],
});

export function ProductFilter() {
  return (
    <div className="mt-20 flex items-center gap-x-4">
      <Select.Root collection={categories} size="md" width="150px">
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
              {categories.items.map((category) => (
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
