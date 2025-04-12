"use client";

import { useRouter } from "next/navigation";
import { Avatar, Icon, Menu, Portal } from "@chakra-ui/react";
import { LuShoppingCart, LuUser } from "react-icons/lu";
import { useUserContext } from "@/providers/user-provider";
import { signOut } from "@/actions/signout";
import { useModalActionsContext } from "@/providers/modal-actions-provider";

export function Actions() {
  const { user, refreshUser } = useUserContext();
  const { setOpenAuthModal } = useModalActionsContext();

  const router = useRouter();

  const handleMenuSelect = (value: string) => {
    switch (value) {
      case "signIn":
        setOpenAuthModal(true);
        break;
      case "order":
        if (!user) {
          setOpenAuthModal(true);
          return;
        }
        router.push("/order");
        break;
      default:
        break;
    }
  };

  const handleMenuSelectProfile = async (value: string) => {
    switch (value) {
      case "profile":
        router.push("/profile");
        break;
      case "cart":
        router.push("/cart");
        break;
      case "signOut":
        await signOut();
        refreshUser();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Icon onClick={() => router.push("/cart")} size="md">
        <LuShoppingCart className="cursor-pointer" />
      </Icon>
      {user ? (
        <Menu.Root onSelect={({ value }) => handleMenuSelectProfile(value)}>
          <Avatar.Root size="sm" cursor="pointer">
            {!user.avatar ? (
              <Menu.Trigger asChild>
                <Avatar.Fallback />
              </Menu.Trigger>
            ) : (
              <Menu.Trigger asChild>
                <Avatar.Image src={user.avatar} />
              </Menu.Trigger>
            )}
          </Avatar.Root>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="profile">profile</Menu.Item>
                <Menu.Item value="cart">cart</Menu.Item>
                <Menu.Item value="signOut">signout</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      ) : (
        <Menu.Root onSelect={({ value }) => handleMenuSelect(value)}>
          <Menu.Trigger asChild>
            <Icon size="md">
              <LuUser className="cursor-pointer" />
            </Icon>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="signIn">signin</Menu.Item>
                <Menu.Item value="order">order</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      )}
    </>
  );
}
