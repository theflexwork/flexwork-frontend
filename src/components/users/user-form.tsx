"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { ExtInputField, SubmitButton } from "@/components/ui/ext-form";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AuthoritiesSelect from "@/components/users/authorities-select";
import { userSchema, UserType } from "@/types/users";

interface UserFormProps {
  initialData: any | null;
}

type UserFormValues = z.infer<typeof userSchema>;

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isEdit = !!initialData;
  const title = isEdit ? "Edit User" : "Create User";
  const description = isEdit ? "Edit user" : "Add a new user";
  const action = isEdit ? "Save changes" : "Create";

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData,
  });

  function onSubmit(data: UserType) {
    console.log(`Data: ${JSON.stringify(data)}`);
    // try {
    //   setLoading(true);
    //   router.refresh();
    //   router.push(`/portal/users`);
    // } catch (error: any) {
    //   toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description: "There was a problem with your request.",
    //   });
    // } finally {
    //   setLoading(false);
    // }
  }

  return (
    <div className="bg-card px-6 py-6">
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-[72rem]"
        >
          <ExtInputField
            form={form}
            required={true}
            fieldName="email"
            label="Email"
            placeholder="Email"
          />
          <AuthoritiesSelect form={form} required={true} label="Authority" />
          <ExtInputField
            form={form}
            required={true}
            fieldName="firstName"
            label="First Name"
            placeholder="First Name"
          />
          <ExtInputField
            form={form}
            required={true}
            fieldName="lastName"
            label="Last Name"
            placeholder="Last Name"
          />
          <div className="flex items-center gap-2">
            <SubmitButton
              label="Invite user"
              labelWhileLoading="Creating ..."
            />
            <Button variant="secondary" onClick={() => router.back()}>
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
