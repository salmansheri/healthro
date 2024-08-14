import { buttonVariants } from "@/components/ui/button";
import { getAppointments } from "@/lib/action/appointment.action";
import { cn } from "@/lib/utils";

import { formatDate } from "date-fns";
import { Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SuccessPageProps {
  searchParams: {
    appointmentId: string;
  };
  params: {
    userId: string;
  };
}
export default async function SuccessPage({
  searchParams,
  params,
}: SuccessPageProps) {
  const { appointmentId } = searchParams;

  const { userId } = params;

  const appointment = await getAppointments(appointmentId);

  return (
    <div className="flex h-screen max-h-screen px-[5%] ">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/healthro-removebg.png"
            alt="logo"
            width={500}
            height={500}
          />
        </Link>

        <section className="header mb-6 max-w-[600px] text-center">
          <h2>
            Your <span className="text-rose-500">Appointment request </span>has
            been successfully Submitted!
          </h2>
        </section>
        <p>We&apos;ll be in touch shortly</p>

        <section className="request-details">
          <p>Requested appointment Details</p>
          <div className="item-center flex gap-3">
            <p className="whitespace-nowrap">
              Dr. {appointment?.primaryPhysician}
            </p>
          </div>
          <div className="flex gap-2">
            <p>{formatDate(new Date(appointment?.schedule), "yyyy-MM-dd")}</p>
            <p>{appointment?.time}</p>
          </div>
        </section>

        <Link
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
          )}
          href={`/patients/${userId}/new-appointment`}
        >
          New Appointment
        </Link>
        <div className="flex items-center justify-center text-sm text-rose-500">
          <Copyright className="h-3" />

          <p className="text-sm ">{` copyright 2024`}</p>
        </div>
      </div>
    </div>
  );
}
