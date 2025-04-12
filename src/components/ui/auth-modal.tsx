"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { Axios } from "@/libs/axios";
import { SignInFields, SignUpFields } from "@/validations/auth";
import {
  CloseButton,
  Dialog,
  Portal,
  Heading,
  Fieldset,
  Field,
  Input,
  Button,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { useUserContext } from "../../providers/user-provider";
import axios from "axios";
import { deleteCookie, setCookie } from "@/actions/cookies";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useModalActionsContext } from "@/providers/modal-actions-provider";

export function AuthModal() {
  const { refreshUser } = useUserContext();
  const { openAuthModal, setOpenAuthModal } = useModalActionsContext();

  const [authType, setAuthType] = useState<
    "signIn" | "signUp" | "signInGoogle" | "signInGitHub"
  >("signIn");
  const [isPending, setIsPending] = useState(false);
  const [isPendingOAuth, setIsPendingOAuth] = useState(false);

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
    setIsPending(true);
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
    } finally {
      setIsPending(false);
    }
  };

  const handleSocialSignIn = (type: "google" | "github") => {
    setIsPendingOAuth(true);

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
        setIsPendingOAuth(false);
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

        setIsPendingOAuth(false);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
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
                          {(errors as FieldErrors<SignUpSchema>).name?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    )}
                    <Field.Root invalid={!!errors.email}>
                      <Field.Label fontSize="md">email:</Field.Label>
                      <Input {...register("email")} name="email" />
                      <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
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
                          invalid={!!(errors as unknown as SignUpSchema).phone}
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
                  <Button
                    type="submit"
                    disabled={isPending || isPendingOAuth}
                    loading={isPending}
                  >
                    {authTypeText}
                  </Button>
                  {(authType === "signIn" ||
                    authType === "signInGoogle" ||
                    authType === "signInGitHub") && (
                    <>
                      <Flex gap="2" className="flex-col md:flex-row">
                        <Button
                          onClick={() => handleSocialSignInBtn("signInGoogle")}
                          variant="outline"
                          className="md:flex-1"
                          disabled={isPendingOAuth || isPending}
                        >
                          continue with google
                          <Icon size="sm">
                            <FaGoogle />
                          </Icon>
                        </Button>
                        <Button
                          onClick={() => handleSocialSignInBtn("signInGitHub")}
                          className="md:flex-1"
                          variant="subtle"
                          disabled={isPendingOAuth || isPending}
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
  );
}
