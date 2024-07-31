"use server";

import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { Patient } from "../types/appwrite.types";
import { InputFile } from "node-appwrite/file";

export async function createUser(user: CreateUserParams) {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name,
    );

    return newUser;
  } catch (error: any) {
    if (error && error?.code === 409) {
      const document = await users.list([Query.equal("email", [user.email])]);

      return document?.users[0];
    }
  }
}

export async function getUser(userId: string) {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(error);
  }
}

export async function registerPatient({
  identificationDocument,
  ...patient
}: RegisterUserParams) {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string,
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentURL: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient,
      },
    );

    return newPatient;
  } catch (error) {
    console.log(error);
  }
}
