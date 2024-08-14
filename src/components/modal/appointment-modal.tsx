"use client";

import { useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppointmentForm } from "../forms/appointment-form";
import { Appointment } from "@/lib/types/appwrite.types";

interface AppointmentModalProps {
  patientId: string;
  userId: string;
  appointment: Appointment;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  patientId,
  userId,
  appointment,
}) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  return (
    <>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => setIsScheduleModalOpen(!isScheduleModalOpen)}
        >
          Schedule
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setIsCancelModalOpen(!isCancelModalOpen)}
        >
          Cancel
        </DropdownMenuItem>
      </DropdownMenuContent>

      {/* Schedule Modal  */}

      <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule</DialogTitle>
          </DialogHeader>

          <div className="overflow-y-auto">
            <AppointmentForm
              type="schedule"
              patientId={patientId}
              userId={userId}
              appointment={appointment}
            />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel</DialogTitle>
          </DialogHeader>
          <div>
            <AppointmentForm
              type="cancel"
              patientId={patientId}
              userId={userId}
              appointment={appointment}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
