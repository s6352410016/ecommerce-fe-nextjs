"use client";

import { Heading, Spinner, VStack } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthVerifyPage() {
  const searchParam = useSearchParams();
  const status = searchParam.get("status");

  useEffect(() => {
    window.opener.postMessage(
      {
        status: status === "success" ? "success" : "error",
        message: status === "success" ? "signin successfully" : "signin failed",
      },
      "*"
    );
    window.close();
  }, [status]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <VStack gap="4">
        <Spinner size="xl" />
        <Heading size="xl">verifying...</Heading>
      </VStack>
    </div>
  );
}
