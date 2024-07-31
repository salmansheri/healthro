"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { CustomFormField, FormFieldType } from "../ui/form-field";
import { Form } from "../ui/form";
import { SubmitButton } from "../ui/submit-button";
import { UserFormValidation } from "@/lib/types/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/action/patients.action";
import { Loader } from "lucide-react";

export const PatientForm = () => {
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const router = useRouter();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    try {
      const userData = {
        ...values,
      };

      const user = await createUser(userData);

      if (user) {
        router.push(`/patients/${user?.$id}/register`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex-1">
        <section className="mb-5 space-y-2">
          <h1 className="header">Hi Amigo! 👋</h1>
          <p className="text-dark-700">Schedule your first first appointment</p>
        </section>
        <CustomFormField
          control={form.control}
          label="Username"
          description="You will recognized as this username on the platform"
          placeholder="Username"
          name="name"
          fieldType={FormFieldType.INPUT}
        />
        <CustomFormField
          control={form.control}
          label="Email"
          description="Enter your Email"
          placeholder="Enter Your Email"
          name="email"
          fieldType={FormFieldType.INPUT}
        />
        <CustomFormField
          control={form.control}
          label="Phone Number"
          description="Enter Your Phone Number to get OTP"
          placeholder="333 8888 33"
          name="phone"
          fieldType={FormFieldType.PHONE_INPUT}
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
