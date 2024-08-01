"use server";

import { ID } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export async function createAppointment(appointment: CreateAppointmentParams) {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...appointment,
      },
    );

    return parseStringify(newAppointment);
  } catch (error: any) {
    console.log(error);
  }
}

export async function getAppointments(appointmentId: string) {
  try {
    const appointments = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
    );

    return parseStringify(appointments);
  } catch (error) {
    console.log(error);
  }
}
