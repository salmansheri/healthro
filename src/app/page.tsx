import { PatientForm } from "@/components/forms/patient-form";
import { Button } from "@/components/ui/button";
import { PasskeyModal } from "@/components/ui/passkey-modal";
import { Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HomeParams {
  searchParams: {
    admin: string;
  };
}

export default function Home({ searchParams }: HomeParams) {
  const isAdmin = searchParams.admin === "true";

  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="flex h-screen ">
      {/* TODO: OTP verification*/}
      {isAdmin && <PasskeyModal />}

      <section
        className="
       remove-scrollbar container "
      >
        <div className="sub-container max-w-[496px] ">
          <Image
            src="/healthro-removebg.png"
            alt="logo"
            height={200}
            width={200}
            className="object-cover"
          />

          <PatientForm />

          <div className="text-14-regular  flex justify-between">
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
