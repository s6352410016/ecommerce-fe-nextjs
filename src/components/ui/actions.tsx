"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Heading,
  HStack,
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

export function Actions() {
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
      case "profile":
        router.push("/profile");
        break;
      case "order":
        router.push("/order");
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
        setOpenAuthModal(false);
        reset({
          email: "",
          password: "",
        });
        toaster.create({
          type: "success",
          title: event.data.message,
        });
      }else if(event.data.status === "error"){
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
              <Menu.Item value="profile">profile</Menu.Item>
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
                            invalid={!!(errors as unknown as SignUpSchema).name}
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
                              <Field.Label fontSize="md">address:</Field.Label>
                              <Input {...register("address")} name="address" />
                              <Field.ErrorText>
                                {
                                  (errors as FieldErrors<SignUpSchema>).address
                                    ?.message
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
                          <HStack>
                            <Button
                              onClick={() => setAuthType("signInGoogle")}
                              flex="1"
                              variant="outline"
                            >
                              continue with google
                              <Icon size="sm">
                                <FaGoogle />
                              </Icon>
                            </Button>
                            <Button
                              onClick={() => setAuthType("signInGitHub")}
                              flex="1"
                              variant="subtle"
                            >
                              continue with github
                              <Icon>
                                <FaGithub />
                              </Icon>
                            </Button>
                          </HStack>
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
    </>
  );
}
