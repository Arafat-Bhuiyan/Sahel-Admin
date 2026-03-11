import React, { useState } from "react";
import { Search, Filter, Send, ChevronDown } from "lucide-react";
import SubscriberTable from "./SubscriberTable";
import BlacklistTable from "./BlacklistTable";
import {
  useGetSubscribersQuery,
  useGetBlacklistQuery,
  useRemoveFromBlacklistMutation,
  useAddToBlacklistMutation,
  useUpdateSubscriberMutation,
  useSubscriberBulkActionMutation,
} from "../../Redux/api/authApi";
import toast from "react-hot-toast";

const Subscriber = () => {
  const {
    data: subscribersData,
    isLoading: subLoading,
    isError: subError,
  } = useGetSubscribersQuery();
  const { data: blacklistData, isLoading: blLoading } = useGetBlacklistQuery();
  const [removeFromBlacklist] = useRemoveFromBlacklistMutation();
  const [addToBlacklist] = useAddToBlacklistMutation();
  const [updateSubscriber] = useUpdateSubscriberMutation();
  const [bulkAction] = useSubscriberBulkActionMutation();

  const [activeTab, setActiveTab] = useState("Abonnés");
  const [selectedIds, setSelectedIds] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Tous les statuts");
  const [searchQuery, setSearchQuery] = useState("");

  const subscribers = subscribersData?.results || [];
  const blacklist = blacklistData?.results || [];

  const unsubscribedCount = subscribers.filter(
    (s) => !s.sms_notification_active,
  ).length;
  const blacklistCount = blacklist.length;

  const toggleSelectAll = () => {
    const reachableSubscribers = getFilteredSubscribers();
    if (selectedIds.length === reachableSubscribers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(reachableSubscribers.map((s) => s.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const sub = subscribers.find((s) => s.id === id);
    if (!sub) return;

    const payload = {
      action: newStatus,
      phone_numbers: [sub.phone_number],
    };

    if (newStatus === "subscribed") {
      const catId = window.prompt("Entrez l'ID de la catégorie (ex: 1)");
      if (!catId) return;
      payload.action = "subscribe";
      payload.category_id = Number(catId);
    } else if (newStatus === "unsubscribed") {
      payload.action = "unsubscribe";
    }

    try {
      await bulkAction(payload).unwrap();

      const statusTranslate = {
        subscribed: "abonné",
        unsubscribed: "désabonné",
        blacklist: "liste noire",
      };
      toast.success(`Abonné marqué comme ${statusTranslate[newStatus]}`);
    } catch (err) {
      console.error("Bulk Action Error:", err);
      toast.error(err?.data?.message || "Erreur lors de la mise à jour");
    }
  };

  const handleAddToBlacklist = async () => {
    const phone = window.prompt(
      "Entrez le numéro de téléphone à bloquer (+226...)",
    );
    if (phone) {
      try {
        await addToBlacklist({ phone_number: phone }).unwrap();
        toast.success("Numéro ajouté à la liste noire !");
      } catch (err) {
        toast.error(err?.data?.message || "Erreur lors de l'ajout");
      }
    }
  };

  const handleDeleteBlacklist = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="text-sm font-medium text-gray-900 font-['Outfit']">
            Retirer ce numéro de la liste noire ?
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors font-['Outfit']"
            >
              Annuler
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await removeFromBlacklist(id).unwrap();
                  toast.success("Numéro retiré de la liste noire !");
                } catch (err) {
                  toast.error("Erreur lors de la suppression");
                }
              }}
              className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors font-['Outfit']"
            >
              Confirmer
            </button>
          </div>
        </div>
      ),
      { position: "top-center" },
    );
  };

  const getFilteredSubscribers = () => {
    return subscribers.filter((sub) => {
      const matchesSearch = sub.phone_number.includes(searchQuery);
      const matchesStatus =
        statusFilter === "Tous les statuts" ||
        (statusFilter === "Abonnés" && sub.sms_notification_active) ||
        (statusFilter === "Désabonnés" && !sub.sms_notification_active);

      const isNotBlacklistedInMainView = sub.status !== "blacklist";
      return matchesSearch && matchesStatus && isNotBlacklistedInMainView;
    });
  };

  const getBlacklistedSubscribers = () => {
    return blacklist.filter((sub) => sub.phone_number?.includes(searchQuery));
  };

  const isLoading = subLoading || blLoading;
  const isError = subError;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#30618B]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center p-10">
        Une erreur est survenue lors du chargement des abonnés.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6 flex flex-col gap-8 font-['Outfit'] text-start">
      {/* Header Section */}
      <div className="flex justify-end items-center w-full">
        <div className="flex gap-2">
          <button className="h-9 px-4 bg-gray-50 rounded-lg border border-cyan-900/20 text-cyan-900 text-sm font-normal hover:bg-gray-100 transition-colors">
            Désabonnés ({unsubscribedCount})
          </button>
          <button className="h-9 px-4 bg-gray-50 rounded-lg border border-cyan-900/20 text-cyan-900 text-sm font-normal hover:bg-gray-100 transition-colors">
            Liste noire ({blacklistCount})
          </button>
          {activeTab === "Liste noire" ? (
            <button
              onClick={handleAddToBlacklist}
              className="h-9 px-4 bg-red-600 rounded-lg text-white text-sm font-normal flex items-center gap-2 hover:bg-red-700 transition-colors"
            >
              Ajouter à la liste noire
            </button>
          ) : (
            <button className="h-9 px-4 bg-[#30618B] rounded-lg text-white text-sm font-normal flex items-center gap-2 hover:bg-[#254d6e] transition-colors">
              <Send className="w-4 h-4" />
              Envoyer SMS ({selectedIds.length})
            </button>
          )}
        </div>
      </div>

      {/* Filter & Search Section */}
      <div className="bg-white p-4 rounded-2xl border border-cyan-900/20 flex flex-col gap-4 shadow-sm">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par nom ou téléphone..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg outline-none text-slate-600 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative group">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none w-48 px-8 py-2 bg-slate-100 rounded-lg text-cyan-900 text-sm outline-none cursor-pointer focus:ring-1 focus:ring-cyan-900/20"
            >
              <option value="Tous les statuts">Tous les statuts</option>
              <option value="Abonnés">Abonnés</option>
              <option value="Désabonnés">Désabonnés</option>
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 opacity-50 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-neutral-200">
        {["Abonnés", "Liste noire"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2 text-base font-medium transition-all relative ${
              activeTab === tab
                ? "text-black border-b-2 border-black"
                : "text-stone-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Section */}
      {activeTab === "Abonnés" ? (
        <SubscriberTable
          subscribers={getFilteredSubscribers()}
          selectedIds={selectedIds}
          toggleSelect={toggleSelect}
          toggleSelectAll={toggleSelectAll}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <BlacklistTable
          blacklistedSubscribers={getBlacklistedSubscribers()}
          onDelete={handleDeleteBlacklist}
        />
      )}
    </div>
  );
};

export default Subscriber;
