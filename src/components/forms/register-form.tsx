"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { CustomFormField, FormFieldType } from "../ui/form-field";
import { Form, FormControl } from "../ui/form";
import { SubmitButton } from "../ui/submit-button";
import { PatientFormValidation } from "@/lib/types/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/action/patients.action";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Doctors,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/lib/data/constants";
import { SelectItem } from "../ui/select";
import { FileUploader } from "../ui/file-uploader";

interface RegisterFormProps {
  user: User;
}

const GenderOptions = [
  {
    id: 1,
    label: "Male",
  },
  {
    id: 1,
    label: "Female",
  },
  {
    id: 1,
    label: "Others",
  },
];

export const RegisterForm: React.FC<RegisterFormProps> = ({ user }) => {
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const router = useRouter();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    try {
      const userData = {
        ...PatientFormDefaultValues,
        name: "",
        email: "",
        phone: "",
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="mb-5 space-y-4">
          <h1 className="header">Welcome 😊</h1>
          <p className="text-dark-700">Let us know more about about you</p>
        </section>
        <section>
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Informations</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          label="Full Name"
          description="Your Full Name"
          placeholder="Enter Your name"
          name="name"
          fieldType={FormFieldType.INPUT}
        />
        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            label="Date of Birth"
            description="Enter your Birth Date"
            name="birthDate"
            fieldType={FormFieldType.DATE_PICKER}
          />
          <CustomFormField
            control={form.control}
            name="gender"
            label="Gender"
            fieldType={FormFieldType.SKELETON}
            renderSkeleton={(field) => {
              return (
                <FormControl>
                  <RadioGroup
                    className="h-11 gap-6 xl:justify-between flex "
                    onChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option) => (
                      <div key={option.id} className="radio-group">
                        <RadioGroupItem
                          value={option.label}
                          id={option.label}
                        />
                        <Label
                          htmlFor={option.label}
                          className="cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              );
            }}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            label="Address"
            description="Enter your Address"
            placeholder="Enter Your address"
            name="address"
            fieldType={FormFieldType.INPUT}
          />

          <CustomFormField
            control={form.control}
            label="Occupation"
            description="Enter your Occupation"
            placeholder="Software Engineer"
            name="occupation"
            fieldType={FormFieldType.INPUT}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            label="Emergency Contact Name"
            placeholder="Gaurdian's Name"
            name="emergencyContactName"
            fieldType={FormFieldType.INPUT}
          />

          <CustomFormField
            control={form.control}
            label="Emergency Contact Number"
            placeholder="Eg: 383838383"
            name="Emergency Contact Number"
            fieldType={FormFieldType.INPUT}
          />
        </div>

        <section>
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          label="Primary care Physician"
          placeholder="Select a Physician"
          name="primaryPhysician"
          fieldType={FormFieldType.SELECT}
        >
          {Doctors.map((doctor) => (
            <SelectItem value={doctor.name} key={doctor.name}>
              <p>{doctor.name}</p>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="w-full flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            label="Insurance Provider"
            placeholder="Ex: BlueCross"
            name="insurenceProvider"
            fieldType={FormFieldType.INPUT}
          />
          <CustomFormField
            control={form.control}
            label="Insurence Policy Number"
            placeholder="Eg: 383838383"
            name="insurencePolicyNumber"
            fieldType={FormFieldType.INPUT}
          />
        </div>
        <div className="w-full flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            label="Allegies(if any)"
            placeholder="Ex: Peanuts, Pencillin, Pollen"
            name="allergies"
            fieldType={FormFieldType.TEXTAREA}
          />
          <CustomFormField
            control={form.control}
            label="Current Medicine"
            placeholder="Eg: Istamet 250mg, Levothyroxine 50mg"
            name="currentMedication"
            fieldType={FormFieldType.TEXTAREA}
          />
        </div>

        <div className="w-full flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            label="Family Medical History (if relevent)"
            placeholder="Ex: Mother had Diabetes"
            name="familyMedicalHistory"
            fieldType={FormFieldType.TEXTAREA}
          />
          <CustomFormField
            control={form.control}
            label="Past Medical History"
            placeholder="Eg: Istamet 250mg, Levothyroxine 50mg"
            name="pastMedicalHistory"
            fieldType={FormFieldType.TEXTAREA}
          />
        </div>

        <section>
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          label="Identification Type"
          placeholder="Ex: Aadhar Card"
          name="identificationType"
          fieldType={FormFieldType.SELECT}
        >
          {IdentificationTypes.map((identificationType) => (
            <SelectItem value={identificationType} key={identificationType}>
              <p>{identificationType}</p>
            </SelectItem>
          ))}
        </CustomFormField>
        <CustomFormField
          control={form.control}
          label="Identification Number"
          placeholder="Eg: 383838383"
          name="identificationNumber"
          fieldType={FormFieldType.INPUT}
        />

        <CustomFormField
          control={form.control}
          name="identificationDocument"
          label="Scenned Copy of identification document"
          fieldType={FormFieldType.SKELETON}
          renderSkeleton={(field) => {
            return (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            );
          }}
        />

        <section>
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          label="I Consent to treatment"
          name="treatmentConsent"
          fieldType={FormFieldType.CHECKBOX}
        />

        <CustomFormField
          control={form.control}
          label="I Consent to disclosure of information"
          name="disclosureConsent"
          fieldType={FormFieldType.CHECKBOX}
        />
        <CustomFormField
          control={form.control}
          label="I Consent to Privacy Policy"
          name="privacyConset"
          fieldType={FormFieldType.CHECKBOX}
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
RegisterForm;
