import React, { useState } from "react";
import { Search, Filter, Send, ChevronDown } from "lucide-react";
import SubscriberTable from "./SubscriberTable";
import BlacklistTable from "./BlacklistTable";
import toast from "react-hot-toast";

const initialSubscriberData = [
  {
    id: 1,
    name: "John Mwangi",
    phone: "+254712345678",
    preferences: ["IT/Technology", "Finance"],
    status: "subscribed",
    subscribedDate: "2026-01-15",
    lastSMSDate: "2026-02-04",
  },
  {
    id: 2,
    name: "Mary Wanjiru",
    phone: "+254723456789",
    preferences: ["Healthcare", "Education"],
    status: "subscribed",
    subscribedDate: "2026-01-20",
    lastSMSDate: "2026-02-03",
  },
  {
    id: 3,
    name: "David Kamau",
    phone: "+254734567890",
    preferences: ["Construction"],
    status: "unsubscribed",
    subscribedDate: "2025-12-10",
    lastSMSDate: "2026-01-15",
  },
  {
    id: 4,
    name: "Grace Akinyi",
    phone: "+254745678901",
    preferences: ["Hospitality", "IT/Technology"],
    status: "subscribed",
    subscribedDate: "2026-02-01",
    lastSMSDate: "2026-02-05",
  },
  {
    id: 5,
    name: "Peter Ochieng",
    phone: "+254756789012",
    preferences: ["Finance"],
    status: "unsubscribed",
    subscribedDate: "2025-11-05",
    lastSMSDate: "2025-12-20",
  },
  {
    id: 6,
    name: "Alice Munene",
    phone: "+254700111222",
    preferences: ["Agriculture"],
    status: "blacklist",
    subscribedDate: "2025-10-01",
    lastSMSDate: "2025-11-15",
  },
  {
    id: 7,
    name: "Bob Kariuki",
    phone: "+254733444555",
    preferences: ["Energy"],
    status: "blacklist",
    subscribedDate: "2025-09-20",
    lastSMSDate: "2025-10-10",
  },
  {
    id: 8,
    name: "Catherine Njeri",
    phone: "+254755666777",
    preferences: ["Retail"],
    status: "blacklist",
    subscribedDate: "2025-08-15",
    lastSMSDate: "2025-09-05",
  },
];

const Subscriber = () => {
  const [activeTab, setActiveTab] = useState("Subscribers");
  const [subscribers, setSubscribers] = useState(initialSubscriberData);
  const [selectedIds, setSelectedIds] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");

  const unsubscribedCount = subscribers.filter(
    (s) => s.status === "unsubscribed",
  ).length;
  const blacklistCount = subscribers.filter(
    (s) => s.status === "blacklist",
  ).length;

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

  const handleStatusChange = (id, newStatus) => {
    setSubscribers(
      subscribers.map((sub) =>
        sub.id === id ? { ...sub, status: newStatus } : sub,
      ),
    );
    toast.success(`Subscriber marked as ${newStatus}`);
  };

  const handleDeleteBlacklist = (id) => {
    setSubscribers(subscribers.filter((sub) => sub.id !== id));
    toast.success("Subscriber removed from blacklist");
  };

  const getFilteredSubscribers = () => {
    return subscribers.filter((sub) => {
      const matchesSearch =
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.phone.includes(searchQuery);
      const matchesStatus =
        statusFilter === "All Status" ||
        sub.status.toLowerCase() === statusFilter.toLowerCase();
      const isNotBlacklistedInMainView = sub.status !== "blacklist";
      return matchesSearch && matchesStatus && isNotBlacklistedInMainView;
    });
  };

  const getBlacklistedSubscribers = () => {
    return subscribers.filter(
      (sub) =>
        sub.status === "blacklist" &&
        (sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.phone.includes(searchQuery)),
    );
  };

  return (
    <div className="w-full min-h-screen p-6 flex flex-col gap-8 font-['Outfit'] text-start">
      {/* Header Section */}
      <div className="flex justify-end items-center w-full">
        <div className="flex gap-2">
          <button className="h-9 px-4 bg-gray-50 rounded-lg border border-cyan-900/20 text-cyan-900 text-sm font-normal hover:bg-gray-100 transition-colors">
            Unsubscribed({unsubscribedCount})
          </button>
          <button className="h-9 px-4 bg-gray-50 rounded-lg border border-cyan-900/20 text-cyan-900 text-sm font-normal hover:bg-gray-100 transition-colors">
            Blacklist({blacklistCount})
          </button>
          <button className="h-9 px-4 bg-[#30618B] rounded-lg text-white text-sm font-normal flex items-center gap-2 hover:bg-[#254d6e] transition-colors">
            <Send className="w-4 h-4" />
            Send SMS ({selectedIds.length})
          </button>
        </div>
      </div>

      {/* Filter & Search Section */}
      <div className="bg-white p-4 rounded-2xl border border-cyan-900/20 flex flex-col gap-4 shadow-sm">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
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
              <option value="All Status">All Status</option>
              <option value="Subscribed">Subscribed</option>
              <option value="Unsubscribed">Unsubscribed</option>
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 opacity-50 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-neutral-200">
        {["Subscribers", "Blacklist"].map((tab) => (
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
      {activeTab === "Subscribers" ? (
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
