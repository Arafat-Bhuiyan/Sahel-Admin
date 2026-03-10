import React from "react";
import { Users, Briefcase, Send, MessageSquare } from "lucide-react";
import ChartsSection from "./ChartsSection";
import SubscriberGrowth from "./SubscriberGrowth";

import { useGetDashboardStatsQuery } from "../../Redux/api/authApi";

const MainDashboard = () => {
  const { data, isLoading, error } = useGetDashboardStatsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#30618B]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-10">
        Une erreur est survenue lors du chargement des statistiques.
      </div>
    );
  }

  const overview = data?.overview || {};

  const cards = [
    {
      title: "Offres d'emploi totales",
      number: overview.total_job_offers || 0,
      icon: Briefcase,
      iconColor: "#FFFFFF",
    },
    {
      title: "Abonnés actifs",
      number: overview.total_active_subscribers || 0,
      icon: Users,
      iconColor: "#FFFFFF",
    },
    {
      title: "SMS envoyés (aujourd'hui)",
      number: overview.sms_sent_today || 0,
      icon: Send,
      iconColor: "#FFFFFF",
    },
    {
      title: "SMS totaux",
      number: overview.total_sms_sent || 0,
      icon: MessageSquare,
      iconColor: "#FFFFFF",
    },
  ];

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
                <p className="font-bold text-xl text-[#30618B]">
                  {card.number}
                </p>
              </div>
              <div className="bg-[#30618B] p-3 rounded-lg">
                <Icon className="w-6 h-6" style={{ color: card.iconColor }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional dashboard content */}
      <ChartsSection smsData={data?.sms_performance} />

      <SubscriberGrowth growthData={data?.user_subscribers_growth} />
    </div>
  );
};

export default MainDashboard;
