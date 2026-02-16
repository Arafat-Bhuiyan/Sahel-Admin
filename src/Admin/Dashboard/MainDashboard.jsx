import React from "react";
import { Users, Briefcase, Send, MessageSquare } from "lucide-react";
import ChartsSection from "./ChartsSection";
import SubscriberGrowth from "./SubscriberGrowth";

const cards = [
  {
    title: "Total Job Offers",
    number: "342",
    icon: Briefcase,
    iconColor: "#FFFFFF",
  },
  {
    title: "Active Subscribers",
    number: "12475",
    icon: Users,
    iconColor: "#FFFFFF",
  },
  {
    title: "SMS Sent (today)",
    number: "3456",
    icon: Send,
    iconColor: "#FFFFFF",
  },
  {
    title: "Total SMS",
    number: "9800",
    icon: MessageSquare,
    iconColor: "#FFFFFF",
  },
];

const MainDashboard = () => {
  return (
    <div className="flex flex-col gap-10 pt-5">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-[#FAFDFF] border border-[#E1F1FB] p-4 flex items-center justify-between rounded-xl shadow-lg"
            >
              <div className="text-[#2B2B2B] flex flex-col gap-2">
                <h2 className="font-semibold text-sm">{card.title}</h2>
                <p className="font-bold text-xl text-[#30618B]">{card.number}</p>
              </div>
              <div className="bg-[#30618B] p-3 rounded-lg">
                <Icon className="w-6 h-6" style={{ color: card.iconColor }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional dashboard content can go here */}
      <ChartsSection />

      <SubscriberGrowth />
    </div>
  );
};

export default MainDashboard;
