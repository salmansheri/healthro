import { RegisterForm } from "@/components/forms/register-form";
import { getUser } from "@/lib/action/patients.action";
import { Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface IParams {
  userId: string;
}

export default async function PatientRegisterPage({
  params,
}: {
  params: IParams;
}) {
  const { userId } = params;

  const user = await getUser(userId);

  if (!user) {
    return redirect("/");
  }

  console.log(user.name);
  return (
    <div className="flex h-screen max-h-screen py-10">
      {/* TODO: OTP verification*/}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-col  py-10 ">
          <h2 className="text-2xl font-bold">Healthro</h2>

          {/* <PatientForm /> */}
          <RegisterForm user={user} />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left flex items-center justify-center">
              <Copyright className="h-3 w-3" /> 2024 Healthro
            </p>
          </div>
        </div>
      </section>
      <Image
        src="/doctor_nobg.png"
        alt="doctor"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
