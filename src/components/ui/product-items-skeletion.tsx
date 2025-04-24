import { Flex, Skeleton } from "@chakra-ui/react";

export function ProductItemsSkeletion() {
  return (
    <div className="w-[300px] overflow-hidden rounded">
      <Flex direction="column" height="250px">
        <div className="h-full relative">
          <Skeleton h="full" />
        </div>
      </Flex>
      <Skeleton h="15px" my="3" />
      <Skeleton h="15px" w="100px" />
    </div>
  );
}
