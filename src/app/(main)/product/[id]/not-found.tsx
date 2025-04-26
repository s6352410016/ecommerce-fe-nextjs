import { EmptyState, Flex, VStack } from "@chakra-ui/react";
import { LuSearchX } from "react-icons/lu";

export default function NotFound() {
  return (
    <Flex justifyContent="center" alignItems="center" h="vh">
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <LuSearchX />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>Products not found</EmptyState.Title>
            <EmptyState.Description>
              Explore our products
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    </Flex>
  );
}
