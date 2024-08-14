"use client";

import { AppointmentModal } from "@/components/modal/appointment-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/ui/status-badge";
import { Patient } from "@/lib/types/appwrite.types";
import { formatDateTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { MoreHorizontal, X } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AppointmentsType = {
  id: string;
  patient: Patient;
  amount: number;
  status: Status;
  email: string;
  schedule: Date;
  primaryPhysician: string;
};

export const AppointmentColumns: ColumnDef<AppointmentsType>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;

      return <p className="text-14-medium">{appointment?.patient.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={row.original.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDate(row.original.schedule, "dd MMM, yyyy")}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      return (
        <p className="whitespace-nowrap">{row.original.primaryPhysician}</p>
      );
    },
  },

  {
    id: "action",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <AppointmentModal
            patientId={row.original.patient.$id}
            userId={row.original.patient.userId}
            appointment={row.original}
          />
        </DropdownMenu>
      );
    },
  },
];
