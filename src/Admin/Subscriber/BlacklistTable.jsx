import React from "react";
import { Trash2 } from "lucide-react";

const BlacklistTable = ({ blacklistedSubscribers, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl border border-cyan-900/20 shadow-sm overflow-hidden pb-4">
      <div className="p-6 border-b border-cyan-900/10">
        <h2 className="text-cyan-900 text-base font-normal">
          Toute la liste noire ({blacklistedSubscribers.length})
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
                />
              </th>
              <th className="px-4 py-4 text-cyan-900 text-sm font-normal text-left">
                Nom
              </th>
              <th className="px-4 py-4 text-cyan-900 text-sm font-normal text-left">
                Téléphone
              </th>
              <th className="px-4 py-4 text-cyan-900 text-sm font-normal text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blacklistedSubscribers.map((sub) => (
              <tr
                key={sub.id}
                className="border-b border-cyan-900/20 hover:bg-zinc-50 transition-colors"
              >
                <td className="px-4 py-4 text-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-slate-100 rounded border-cyan-900/20 cursor-pointer"
                  />
                </td>
                <td className="px-4 py-4 text-cyan-900 text-sm">{sub.name}</td>
                <td className="px-4 py-4 text-cyan-900 text-sm">{sub.phone}</td>
                <td className="px-4 py-4 text-right">
                  <button
                    onClick={() => onDelete(sub.id)}
                    className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlacklistTable;
