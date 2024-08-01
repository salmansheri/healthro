import { AppointmentForm } from "@/components/forms/appointment-form";
import { getPatient } from "@/lib/action/patients.action";
import { Copyright } from "lucide-react";
import Image from "next/image";

interface IParams {
  userId: string; 
}

export default async  function NewAppointmentPage({params}: {params: IParams}) {
  const { userId } = params; 
  const date = new Date();
  const year = date.getFullYear();

  const patient = await getPatient(userId); 
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP verification*/}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <h2 className="text-2xl font-bold">Healthro</h2>

          <AppointmentForm 
            type="create"
            userId={userId}
            patientId={patient.$id}

          />

          <div className="text-14-regular py-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left flex items-center justify-center">
              <Copyright className="h-3 w-3" /> {year} Healthro
            </p>
            
          </div>
        </div>
      </section>

      <Image
        src="/appointment1-removebg.png"
        alt="doctor"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
