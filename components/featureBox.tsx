"use client";

import { BadgeCheck, CalendarCheck2 } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "University Verified",
    description:
      "Users are verified through official  university email domains or alumni IDs to ensure a trusted academic community.",
  },
  {
    icon: CalendarCheck2,
    title: "Rental Scheduling",
    description:
      "Schedule rentals with our integrated calendar system for temporary needs.",
  },
  {
    icon: "material-symbols:e911-emergency-outline-sharp",
    title: "Emergency Lending",
    description:
      "Quick access to essential items when you're in urgent need — whether for academics, personal use, or emergencies.",
  },
];

export default function Features() {
  return (
    <div className="flex gap-6">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className="flex flex-col text-center border gap-4 items-start w-100 p-3"
          >
            <div className="flex items-center gap-5">
              <Icon className="w-8 h-8 text-[#BA3A2C]" />
              <h3 className="font-semibold">{feature.title}</h3>
            </div>
            <div className=" text-center">
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
