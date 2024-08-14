import {
  AppointmentColumns,
  AppointmentsType,
} from "@/components/table/appointment-table/columns";
import { DataTable } from "@/components/ui/data-table";
import { StatCard } from "@/components/ui/stat-card";
import { getRecentAppointmentList } from "@/lib/action/appointment.action";
import { Clipboard, ClipboardList, ClipboardX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AdminPage() {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex max-w-6xl flex-col space-y-14">
      <header
        className="admin-header
            "
      >
        <Link href="/" className="cursor-pointer">
          <Image
            src="/healthro-removebg.png"
            alt="logo"
            height={32}
            width={100}
            className=" w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>
      <section className="w-full space-y-4">
        <h1 className="header">Welcome👋</h1>
        <p className="text-dark-700">
          Start the day with managing new appointments
        </p>
      </section>

      <section className="admin-stat">
        <StatCard
          type="appointments"
          count={appointments.scheduledCount}
          label="Scheduled Appointments"
          icon={Clipboard}
        />
        <StatCard
          type="pending"
          count={appointments.pendingCount}
          label="Pending Appointments"
          icon={ClipboardList}
        />
        <StatCard
          type="cancelled"
          count={appointments.cancelledCount}
          label="Cancelled Appointment"
          icon={ClipboardX}
        />
      </section>

      <DataTable
        // @ts-ignore
        data={appointments.documents as AppointmentsType}
        columns={AppointmentColumns}
      />
    </div>
  );
}
