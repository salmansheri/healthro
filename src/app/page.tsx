import { PatientForm } from "@/components/forms/patient-form";
import { Button } from "@/components/ui/button";
import { Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP verification*/}
      <section className="remove-scrollbar container my-auto ">
        <div className="sub-container max-w-[496px] ">
          <h2 className="text-2xl font-bold">Healthro</h2>

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left flex items-center justify-center">
              <Copyright className="h-3 w-3" /> {year} Healthro
            </p>
            <Link href="/?admin=true" className="text-rose-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/homedoctor.png"
        alt="doctor"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
