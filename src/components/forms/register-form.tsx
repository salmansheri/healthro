"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomFormField, FormFieldType } from "../ui/form-field";
import { Form, FormControl } from "../ui/form";
import { SubmitButton } from "../ui/submit-button";
import { PatientFormValidation } from "@/lib/types/validation";
import { useRouter } from "next/navigation";
import { createUser, registerPatient } from "@/lib/action/patients.action";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Doctors,
  IdentificationTypes,
  PatientFormDefaultValues,
  GenderOptions,
} from "@/lib/data/constants";
import { SelectItem } from "../ui/select";
import { FileUploader } from "../ui/file-uploader";
import { toast } from "../ui/use-toast";

interface RegisterFormProps {
  user: User;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ user }) => {
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const router = useRouter();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();

      formData.append("blobFile", blobFile);
      formData.append("filename", values.identificationDocument[0].name);
    }
    try {
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insurenceProvider: values.insurenceProvider,
        insurencePolicyNumber: values.insurencePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
        treatmentConsent: values.treatmentConsent,
        disclosureConsent: values.disclosureConsent,
      };
      // @ts-ignore
      const newPatient = await registerPatient(patient);

      toast({
        title: "Success",
        description: "Success fully Registered",
      });
      router.push(`/patients/${user?.$id}/new-appointment`);
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        description: "Cannot Register Please Try again Later",
        variant: "destructive",
      });
      console.log(error);
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
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
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
            name="emergencyContactNumber"
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
          placeholder="Select an identification type"
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
          name="privacyConsent"
          fieldType={FormFieldType.CHECKBOX}
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
RegisterForm;
