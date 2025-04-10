import { Header } from "@/components/ui/header";
import { Separator } from "@chakra-ui/react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="max-w-[1440px] h-[70px] px-4 sm:px-8 md:px-16 mx-auto">
        <Header />
      </div>
      <Separator />
      <div className="max-w-[1440px] h-[calc(100vh-70px)] px-4 sm:px-8 md:px-16 mx-auto">
        {children}
      </div>
    </>
  );
}
