import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Image from "next/image";

type StatType = "appointments" | "pending" | "cancelled";

interface StatCardProps {
  count: number;
  label: string;
  icon: LucideIcon;
  type: StatType;
}

export const StatCard = ({ count, label, icon: Icon, type }: StatCardProps) => {
  return (
    <div className={"stat-card"}>
      <div className="flex items-center gap-4 ">
        <Icon
          className={cn({
            "text-yellow-500": type === "appointments",
            "text-blue-500": type === "pending",
            "text-red-500": type === "cancelled",
          })}
        />

        <h2 className="text-32-bold text-white">{count}</h2>
      </div>

      <p className="text-14-regular">{label}</p>
    </div>
  );
};
