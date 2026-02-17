import React from "react";
import { X, Edit3 } from "lucide-react";

const JobDetailsModal = ({ isOpen, onClose, job }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-['Outfit']">
      <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-[768px] overflow-hidden border border-gray-300 relative animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-gray-200 bg-white">
          <h2 className="text-[#1a3a5a] text-2xl font-bold">
            Détails de l'offre
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 text-[#1a3a5a] hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col gap-8">
          {/* Job Title & Category */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <h1 className="text-gray-900 text-3xl font-bold leading-tight">
                {job.title}
              </h1>
              <span className="text-slate-500 text-sm font-normal">
                {job.category}
              </span>
            </div>
            <p className="text-gray-600 text-xl font-normal">{job.company}</p>
          </div>

          {/* Job Description */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[#1a3a5a] text-lg font-bold">
              Description du poste
            </h3>
            <p className="text-gray-700 text-base font-normal leading-relaxed">
              {job.description ||
                "Rejoignez notre équipe de santé compatissante fournissant des soins de qualité aux patients dans un environnement hospitalier dynamique."}
            </p>
          </div>

          {/* Job Link */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[#1a3a5a] text-lg font-bold">
              Lien de l'offre
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-slate-400 rounded-full" />
              <a
                href={`https://${job.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 text-base font-normal hover:text-[#30618B] transition-colors"
              >
                {job.link}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
