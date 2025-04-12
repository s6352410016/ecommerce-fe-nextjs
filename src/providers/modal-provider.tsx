"use client";

import { AuthModal } from "@/components/ui/auth-modal";
import { useEffect, useState } from "react";

export function ModalProvider(){
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if(!mounted){
    return null;
  }

  return (
    <>
      <AuthModal />
    </>
  );
}