"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Doctors } from "@/lib/data/constants";
import { CreateAppointmentSchema } from "@/lib/types/validation";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import { CustomFormField, FormFieldType } from "../ui/form-field";
import { SelectItem } from "../ui/select";
import { SubmitButton } from "../ui/submit-button";
import { createAppointment } from "@/lib/action/appointment.action";
import { toast } from "../ui/use-toast";

interface AppointmentFormProps {
  type: "create" | "cancel" | "schedule";
  userId: string;
  patientId: string;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  type,
  userId,
  patientId,
}) => {
  const form = useForm<z.infer<typeof CreateAppointmentSchema>>({
    resolver: zodResolver(CreateAppointmentSchema),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      time: "",
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  const router = useRouter();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof CreateAppointmentSchema>) => {
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;

      case "create":
        status = "created";
        break;

      case "cancel":
        status = "cancelled";
        break;

      default:
        status = "pending";
        break;
    }
    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          note: values.note,
          schedule: values.schedule,
          reason: values.reason,
          status: status as Status,
          time: values.time,
        };

        const appointment = await createAppointment(appointmentData);

        toast({
          title: "Success",
          description: "Successfully Created Appointment",
        });

        router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
      }
    } catch (error) {
      console.error(error);
    }
  };

  let buttonLabel;

  switch (type) {
    case "create":
      buttonLabel = "Create Appointment";
      break;

    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;

    case "schedule":
      buttonLabel = "Schedule Appointment";
    default:
      break;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-5 space-y-2">
          <h1 className="header">New Appointment 🤗</h1>
          <p className="text-dark-700">Request Your Appointment</p>
        </section>

        {type !== "cancel" && (
          <div className="py-5 space-y-5">
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
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
            />
            <CustomFormField
              fieldType={FormFieldType.TIME_PICKER}
              control={form.control}
              name="time"
              label="Expected appointment time"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                label="Reason For Appointment"
                placeholder="Enter Reason for appointment"
                name="reason"
                fieldType={FormFieldType.TEXTAREA}
              />

              <CustomFormField
                control={form.control}
                label="Notes"
                placeholder="Enter Notes"
                name="note"
                fieldType={FormFieldType.TEXTAREA}
              />
            </div>
          </div>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason For Cancellation"
            placeholder="Enter Reason for Cancellation"
          />
        )}

        <SubmitButton
          variant={`${type === "cancel" ? "destructive" : "default"}`}
          isLoading={isLoading}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
