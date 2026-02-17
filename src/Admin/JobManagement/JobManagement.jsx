import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Trash2,
  ChevronDown,
  ExternalLink,
  Edit3,
} from "lucide-react";
import JobDetailsModal from "./JobDetailsModal";
import JobModal from "./JobModal";
import toast from "react-hot-toast";

const jobsData = [
  {
    id: 1,
    title: "Développeur Frontend Senior",
    company: "Tech Corp",
    category: "Développement",
    link: "www.thhakjh.com",
    status: "Publié",
    description:
      "Rejoignez notre équipe technologique innovante pour créer des applications web de pointe. Nous recherchons un développeur frontend senior expert en React, Tailwind CSS et JavaScript moderne.",
  },
  {
    id: 2,
    title: "Infirmier(ère) diplômé(e)",
    company: "Centre Médical",
    category: "Médical",
    link: "www.thhakjh.com",
    status: "Publié",
    description:
      "Rejoignez notre équipe de santé compatissante fournissant des soins de qualité aux patients dans un environnement hospitalier dynamique. Nous recherchons des infirmiers dévoués.",
  },
  {
    id: 3,
    title: "Superviseur de chantier",
    company: "BuildCo Ltd",
    category: "BTP",
    link: "www.thhakjh.com",
    status: "Brouillon",
    description:
      "Dirigez les activités de construction sur site et gérez les équipes pour garantir que les projets sont achevés en toute sécurité, dans les délais et respecter le budget.",
  },
  {
    id: 4,
    title: "Directeur d'hôtel",
    company: "Grand Hotel",
    category: "Hôtellerie",
    link: "www.thhakjh.com",
    status: "Publié",
    description:
      "Supervisez tous les aspects des opérations hôtelières, y compris le service aux clients, la gestion du personnel et la santé financière.",
  },
];

const JobManagement = () => {
  const [jobs, setJobs] = useState(jobsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(true);
  };

  const handleAddOpen = () => {
    setEditJob(null);
    setIsJobModalOpen(true);
  };

  const handleEditOpen = (job) => {
    setEditJob(job);
    setIsJobModalOpen(true);
  };

  const handleSaveJob = (data) => {
    if (editJob) {
      setJobs(jobs.map((j) => (j.id === editJob.id ? { ...j, ...data } : j)));
      toast.success("Offre d'emploi mise à jour avec succès !");
    } else {
      setJobs([data, ...jobs]);
      toast.success("Nouvelle offre d'emploi ajoutée avec succès !");
    }
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="text-sm font-medium text-gray-900 font-['Outfit']">
            Êtes-vous sûr de vouloir supprimer cette offre ?
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors font-['Outfit']"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                setJobs(jobs.filter((j) => j.id !== id));
                toast.dismiss(t.id);
                toast.success("Offre supprimée avec succès !");
              }}
              className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors font-['Outfit']"
            >
              Confirmer
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        duration: 5000,
      },
    );
  };

  const handleToggleStatus = (id) => {
    setJobs(
      jobs.map((job) =>
        job.id === id
          ? {
              ...job,
              status: job.status === "Publié" ? "Brouillon" : "Publié",
            }
          : job,
      ),
    );
    toast.success("Statut mis à jour avec succès !");
  };

  return (
    <div className="w-full min-h-screen p-6 flex flex-col gap-8 font-['Outfit']">
      {/* Header Section */}
      <div className="flex justify-end items-center w-full">
        <button
          onClick={handleAddOpen}
          className="flex items-center gap-2 px-6 py-3 bg-[#30618B] rounded-md text-white hover:bg-[#254d6e] transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span className="text-base font-medium">Ajouter un emploi</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-black/10 flex gap-4 items-center shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Rechercher par titre, entreprise ou lieu..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-100 border border-zinc-900/10 rounded-md outline-none focus:ring-1 focus:ring-[#30618B] text-sm font-['Inter']"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 border border-zinc-900/10 rounded-md cursor-pointer hover:bg-zinc-200 transition-colors">
          <Filter className="w-4 h-4 text-zinc-500" />
          <span className="text-xs text-neutral-950 font-normal">
            Toutes les catégories
          </span>
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        </div>
      </div>

      {/* Jobs Table Container */}
      <div className="bg-white rounded-xl border border-black/10 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-black/10">
          <h2 className="text-neutral-950 text-lg font-normal">
            Toutes les offres ({jobs.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/10">
                <th className="px-6 py-4 text-zinc-900 text-sm font-normal">
                  Titre du poste
                </th>
                <th className="px-6 py-4 text-zinc-900 text-sm font-normal">
                  Entreprise
                </th>
                <th className="px-6 py-4 text-zinc-900 text-sm font-normal">
                  Catégorie
                </th>
                <th className="px-6 py-4 text-zinc-900 text-sm font-normal">
                  Lien de l'offre
                </th>
                <th className="px-6 py-4 text-zinc-900 text-sm font-normal text-center">
                  Statut
                </th>
                <th className="px-6 py-4 text-zinc-900 text-sm font-normal text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-black/5 hover:bg-zinc-50 transition-colors"
                >
                  <td className="px-6 py-4 text-neutral-600 text-sm">
                    {job.title}
                  </td>
                  <td className="px-6 py-4 text-neutral-600 text-sm">
                    {job.company}
                  </td>
                  <td className="px-6 py-4 text-neutral-600 text-sm">
                    {job.category}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`https://${job.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#30618B] text-sm hover:underline flex items-center gap-1"
                    >
                      {job.link}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      {/* Status Toggle Badge */}
                      <button
                        onClick={() => handleToggleStatus(job.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                          job.status === "Publié"
                            ? "bg-[#30618B] text-white shadow-sm"
                            : "bg-gray-100 text-zinc-900 border border-gray-200"
                        }`}
                      >
                        {job.status}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3 text-neutral-400">
                      <button
                        onClick={() => handleEditOpen(job)}
                        className="hover:text-[#30618B] transition-colors"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleViewDetails(job)}
                        className="hover:text-[#30618B] transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <JobDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        job={selectedJob}
      />

      {/* Unified Job Modal */}
      <JobModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        onSave={handleSaveJob}
        editData={editJob}
      />
    </div>
  );
};

export default JobManagement;
