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
            <EmptyState.Title>404 Not Found</EmptyState.Title>
            <EmptyState.Description>
              The page you are looking for does not exist. Please check the URL or return to the homepage.
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    </Flex>
  );
}
