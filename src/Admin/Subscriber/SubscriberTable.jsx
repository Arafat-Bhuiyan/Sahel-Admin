import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Pagination from "../Common/Pagination";

const SubscriberTable = ({
  subscribers,
  selectedIds,
  toggleSelect,
  toggleSelectAll,
  onStatusChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(subscribers.length / itemsPerPage);
  const currentSubscribers = subscribers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="bg-white rounded-2xl border border-cyan-900/20 shadow-sm overflow-hidden pb-4 text-start">
      <div className="p-6 border-b border-cyan-900/10">
        <h2 className="text-cyan-900 text-base font-normal">
          Tous les abonnés ({subscribers.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-900/20">
              <th className="w-12 px-4 py-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-slate-100 rounded border-cyan-900/20 cursor-pointer"
                  checked={
                    selectedIds.length === subscribers.length &&
                    subscribers.length > 0
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-4 text-cyan-900 text-sm font-normal text-left">
                Nom
              </th>
              <th className="px-4 py-4 text-cyan-900 text-sm font-normal text-left">
                Téléphone
              </th>
              <th className="px-4 py-4 text-cyan-900 text-sm font-normal text-left">
                Préférences
              </th>
              <th className="px-4 py-4 text-cyan-900 text-sm font-normal text-left">
                Statut
              </th>

              <th className="px-4 py-4 text-cyan-900 text-sm font-normal text-left">
                Dernier SMS
              </th>
              <th className="px-4 py-4 text-cyan-900 text-sm font-normal text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentSubscribers.map((sub) => (
              <tr
                key={sub.id}
                className="border-b border-cyan-900/20 hover:bg-zinc-50 transition-colors"
              >
                <td className="px-4 py-4 text-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-slate-100 rounded border-cyan-900/20 cursor-pointer"
                    checked={selectedIds.includes(sub.id)}
                    onChange={() => toggleSelect(sub.id)}
                  />
                </td>
                <td className="px-4 py-4 text-cyan-900 text-sm">
                  Abonné {sub.id}
                </td>
                <td className="px-4 py-4 text-cyan-900 text-sm">
                  {sub.phone_number}
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2 flex-wrap">
                    {sub.active_subscriptions?.map((pref, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg border border-cyan-900/20 text-cyan-900 text-[10px] leading-4"
                      >
                        {pref}
                      </span>
                    ))}
                    {sub.active_subscriptions?.length === 0 && (
                      <span className="text-gray-400 text-[10px]">
                        Aucune preference
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-[10px] leading-4 font-normal ${
                      sub.sms_notification_active
                        ? "bg-lime-700/10 text-lime-700 font-medium"
                        : "bg-red-100 text-red-700 font-medium"
                    }`}
                  >
                    {sub.sms_notification_active ? "abonné" : "désabonné"}
                  </span>
                </td>
                <td className="px-4 py-4 text-cyan-900 text-sm">
                  {sub.last_sms_sent
                    ? new Date(sub.last_sms_sent).toLocaleDateString()
                    : "Aucun"}
                </td>
                <td className="px-4 py-4">
                  <div className="relative group">
                    <select
                      value={
                        sub.sms_notification_active
                          ? "subscribed"
                          : "unsubscribed"
                      }
                      onChange={(e) => onStatusChange(sub.id, e.target.value)}
                      className="appearance-none w-32 px-3 py-1.5 bg-slate-100 rounded-lg text-cyan-900 text-xs outline-none cursor-pointer focus:ring-1 focus:ring-cyan-900/20"
                    >
                      <option value="subscribed">Abonné</option>
                      <option value="unsubscribed">Désabonné</option>
                      <option value="blacklist">Liste noire</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none opacity-50" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default SubscriberTable;
