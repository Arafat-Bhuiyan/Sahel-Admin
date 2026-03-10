import { useState } from "react";
import { useGetJobsQuery } from "../../Redux/api/authApi";
import { ChevronDown, Edit3, Eye, Filter, Plus, Search, Trash2 } from "lucide-react";
import JobModal from "./JobModal";
import JobDetailsModal from "./JobDetailsModal";
import toast from "react-hot-toast";

const JobManagement = () => {
  const { data, isLoading, error } = useGetJobsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const jobs = data?.results || [];

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
    // API integration for save/update will be handled in JobModal or here via mutation
    toast.success("Fonctionnalité à venir !");
  };

  const handleDelete = (id) => {
    // API integration for delete
    toast.success("Fonctionnalité à venir !");
  };

  const handleToggleStatus = (id) => {
    // API integration for status toggle
    toast.success("Statut mis à jour !");
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company_location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
        Une erreur est survenue lors du chargement des offres d'emploi.
      </div>
    );
  }

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
            Toutes les offres ({filteredJobs.length})
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
              {filteredJobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-black/5 hover:bg-zinc-50 transition-colors"
                >
                  <td className="px-6 py-4 text-neutral-600 text-sm max-w-xs truncate">
                    {job.title}
                  </td>
                  <td className="px-6 py-4 text-neutral-600 text-sm">
                    {job.company_name}
                  </td>
                  <td className="px-6 py-4 text-neutral-600 text-sm">
                    {job.category_details?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={job.company_website_address}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#30618B] text-sm hover:underline flex items-center gap-1 max-w-[150px] truncate"
                    >
                      {job.company_website_address || "Lien"}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleToggleStatus(job.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all hover:scale-105 active:scale-95 capitalize ${
                          job.status === "published"
                            ? "bg-[#30618B] text-white shadow-sm"
                            : "bg-gray-100 text-zinc-900 border border-gray-200"
                        }`}
                      >
                        {job.status === "published" ? "Publié" : job.status}
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
