import { Spinner } from "@chakra-ui/react";

export default function Loading(){
  return (
    <div className="h-full flex items-center justify-center">
      <Spinner size="xl" />
    </div>
  );
}