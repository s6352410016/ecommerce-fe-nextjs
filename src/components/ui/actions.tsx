"use client";

import { useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Flex,
  Heading,
  Icon,
  Input,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { LuShoppingCart, LuUser } from "react-icons/lu";
import { useEffect, useState } from "react";
import { PasswordInput } from "./password-input";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpFields, SignInFields } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Axios } from "@/libs/axios";
import { Toaster, toaster } from "@/components/ui/toaster";
import axios from "axios";
import { deleteCookie, setCookie } from "@/actions/cookies";
import { useUserContext } from "@/providers/user-provider";
import { signOut } from "@/actions/signout";

export function Actions() {
  const { user, refreshUser } = useUserContext();

  const router = useRouter();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [authType, setAuthType] = useState<
    "signIn" | "signUp" | "signInGoogle" | "signInGitHub"
  >("signIn");

  const schema = authType === "signIn" ? SignInFields : SignUpFields;
  type SignUpSchema = z.infer<typeof SignUpFields>;
  type SignInSchema = z.infer<typeof SignInFields>;

  const authTypeText =
    authType === "signIn" ||
    authType === "signInGoogle" ||
    authType === "signInGitHub"
      ? "sign in"
      : "sign up";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInSchema | SignUpSchema>({
    resolver: zodResolver(schema),
    shouldFocusError: false,
  });

  const onSubmit = async (fields: z.infer<typeof schema>) => {
    try {
      if (authType === "signUp") {
        await Axios.post("api/auth/signup", fields);
        setOpenAuthModal(false);
        handleResetSignUpFields();
        setAuthType("signIn");
        toaster.create({
          type: "success",
          title: "account created successfully",
        });
        return;
      }

      await Axios.post("api/auth/signin", fields);
      setOpenAuthModal(false);
      reset({
        email: "",
        password: "",
      });
      toaster.create({
        type: "success",
        title: "signin successfully",
      });
      refreshUser();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toaster.create({
          type: "error",
          title: error.response?.data?.message || "Something went wrong",
        });
      }
    }
  };

  const handleSocialSignIn = (type: "google" | "github") => {
    const width = 500;
    const height = 600;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    const authUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/${type}`;

    window.open(
      authUrl,
      `${type} sign in`,
      `width=${width}, height=${height}, top=${top}, left=${left}`
    );

    setAuthType("signIn");
  };

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

  const handleCloseDialog = async (open: boolean) => {
    setOpenAuthModal(open);
    setAuthType("signIn");

    if (!open) {
      handleResetSignUpFields();
    }
  };

  const handleResetSignUpFields = () => {
    reset({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    });
  };

  const handleSocialSignInBtn = (type: "signInGoogle" | "signInGitHub") => {
    setAuthType(type);
    setCookie();
  };

  useEffect(() => {
    handleResetSignUpFields();

    if (authType === "signInGoogle") {
      handleSocialSignIn("google");
    } else if (authType === "signInGitHub") {
      handleSocialSignIn("github");
    }
  }, [authType]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.status === "success") {
        deleteCookie();

        setOpenAuthModal(false);
        reset({
          email: "",
          password: "",
        });
        toaster.create({
          type: "success",
          title: event.data.message,
        });
        
        refreshUser();
      } else if (event.data.status === "error") {
        deleteCookie();

        reset({
          email: "",
          password: "",
        });
        toaster.create({
          type: "error",
          title: event.data.message,
        });
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <Toaster />
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
                <Avatar.Image src={user.avatar}/>
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

          <Dialog.Root
            open={openAuthModal}
            onOpenChange={({ open }) => handleCloseDialog(open)}
            placement="center"
            motionPreset="scale"
          >
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Heading textAlign="center" width="full" size="2xl">
                      {authTypeText}
                    </Heading>
                  </Dialog.Header>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                  <Dialog.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Fieldset.Root>
                        <Fieldset.Content>
                          {authType === "signUp" && (
                            <Field.Root
                              invalid={
                                !!(errors as unknown as SignUpSchema).name
                              }
                            >
                              <Field.Label fontSize="md">name:</Field.Label>
                              <Input {...register("name")} name="name" />
                              <Field.ErrorText>
                                {
                                  (errors as FieldErrors<SignUpSchema>).name
                                    ?.message
                                }
                              </Field.ErrorText>
                            </Field.Root>
                          )}
                          <Field.Root invalid={!!errors.email}>
                            <Field.Label fontSize="md">email:</Field.Label>
                            <Input {...register("email")} name="email" />
                            <Field.ErrorText>
                              {errors.email?.message}
                            </Field.ErrorText>
                          </Field.Root>
                          <Field.Root invalid={!!errors.password}>
                            <Field.Label fontSize="md">password:</Field.Label>
                            <PasswordInput {...register("password")} />
                            <Field.ErrorText>
                              {errors.password?.message}
                            </Field.ErrorText>
                          </Field.Root>
                          {authType === "signUp" && (
                            <>
                              <Field.Root
                                invalid={
                                  !!(errors as unknown as SignUpSchema).phone
                                }
                              >
                                <Field.Label fontSize="md">phone:</Field.Label>
                                <Input {...register("phone")} name="phone" />
                                <Field.ErrorText>
                                  {
                                    (errors as FieldErrors<SignUpSchema>).phone
                                      ?.message
                                  }
                                </Field.ErrorText>
                              </Field.Root>
                              <Field.Root
                                invalid={
                                  !!(errors as unknown as SignUpSchema).address
                                }
                              >
                                <Field.Label fontSize="md">
                                  address:
                                </Field.Label>
                                <Input
                                  {...register("address")}
                                  name="address"
                                />
                                <Field.ErrorText>
                                  {
                                    (errors as FieldErrors<SignUpSchema>)
                                      .address?.message
                                  }
                                </Field.ErrorText>
                              </Field.Root>
                            </>
                          )}
                        </Fieldset.Content>
                        <Button type="submit">{authTypeText}</Button>
                        {(authType === "signIn" ||
                          authType === "signInGoogle" ||
                          authType === "signInGitHub") && (
                          <>
                            <Flex gap="2" className="flex-col md:flex-row">
                              <Button
                                onClick={() =>
                                  handleSocialSignInBtn("signInGoogle")
                                }
                                variant="outline"
                                className="md:flex-1"
                              >
                                continue with google
                                <Icon size="sm">
                                  <FaGoogle />
                                </Icon>
                              </Button>
                              <Button
                                onClick={() =>
                                  handleSocialSignInBtn("signInGitHub")
                                }
                                className="md:flex-1"
                                variant="subtle"
                              >
                                continue with github
                                <Icon>
                                  <FaGithub />
                                </Icon>
                              </Button>
                            </Flex>
                            <Button
                              onClick={() => setAuthType("signUp")}
                              variant="plain"
                            >
                              don't have an account? sign up
                            </Button>
                          </>
                        )}
                        {authType === "signUp" && (
                          <Button
                            onClick={() => setAuthType("signIn")}
                            variant="plain"
                          >
                            have an account? sign in
                          </Button>
                        )}
                      </Fieldset.Root>
                    </form>
                  </Dialog.Body>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Menu.Root>
      )}
    </>
  );
}
