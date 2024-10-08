"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { Appointment } from "../types/appwrite.types";
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

export async function getRecentAppointmentList() {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID as string,
      APPOINTMENT_COLLECTION_ID as string,
      [Query.orderDesc("$createdAt")],
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc: any, appointment: any) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCount += 1;
        } else if (appointment.status === "pending") {
          acc.pendingCount += 1;
        } else if (appointment.status === "cancelled") {
          acc.cancelledCount += 1;
        }

        return acc;
      },
      initialCounts,
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
}
