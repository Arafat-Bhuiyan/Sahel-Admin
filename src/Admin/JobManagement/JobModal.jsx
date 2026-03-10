import { useEffect, useState } from "react";
import {
  useAddJobMutation,
  useUpdateJobMutation,
  useGetCategoriesQuery,
} from "../../Redux/api/authApi";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";

const JobModal = ({ isOpen, onClose, editData }) => {
  const [formData, setFormData] = useState({
    company_name: "",
    title: "",
    company_location: "",
    category: "",
    description: "",
    company_website_address: "",
    contact: "",
    status: "published",
  });

  const { data: categoryData } = useGetCategoriesQuery();
  const [addJob, { isLoading: isAdding }] = useAddJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const isLoading = isAdding || isUpdating;

  const categories = categoryData?.results || [];

  useEffect(() => {
    if (editData && isOpen) {
      setFormData({
        company_name: editData.company_name || "",
        title: editData.title || "",
        company_location: editData.company_location || "",
        category: editData.category || "",
        description: editData.description || "",
        company_website_address: editData.company_website_address || "",
        contact: editData.contact || "",
        status: editData.status || "published",
      });
    } else if (!editData && isOpen) {
      setFormData({
        company_name: "",
        title: "",
        company_location: "",
        category: "",
        description: "",
        company_website_address: "",
        contact: "",
        status: "published",
      });
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.company_name || !formData.title || !formData.category) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    try {
      if (editData) {
        await updateJob({ id: editData.id, data: formData }).unwrap();
        toast.success("Offre d'emploi mise à jour !");
      } else {
        await addJob(formData).unwrap();
        toast.success("Offre d'emploi ajoutée !");
      }
      onClose();
    } catch (err) {
      console.error("Job Submit Error:", err);
      const errorData = err?.data;
      let errorMessage = "Une erreur est survenue";

      if (errorData) {
        if (typeof errorData === "string") {
          errorMessage = errorData;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else {
          // Flatten field-specific errors
          errorMessage = Object.entries(errorData)
            .map(
              ([field, msgs]) =>
                `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`,
            )
            .join(" | ");
        }
      }
      toast.error(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-['Outfit'] text-start">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[544px] overflow-hidden border border-black/10 relative pb-8">
        {/* Header */}
        <div className="pt-10 pb-6 text-center">
          <h2 className="text-neutral-950 text-2xl font-semibold">
            {editData ? "Modifier l'offre" : "Ajouter un nouvel emploi"}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <label className="text-neutral-950 text-xl font-normal leading-3">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              className="w-full h-16 px-4 rounded-[10px] outline outline-2 outline-offset-[-1.82px] outline-gray-300 focus:outline-[#30618B] transition-all bg-transparent disabled:opacity-50"
              value={formData.company_name}
              onChange={(e) =>
                setFormData({ ...formData, company_name: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-neutral-950 text-xl font-normal leading-3">
              Titre du poste
            </label>
            <input
              type="text"
              className="w-full h-16 px-4 rounded-[10px] outline outline-2 outline-offset-[-1.82px] outline-gray-300 focus:outline-[#30618B] transition-all bg-transparent disabled:opacity-50"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2.5">
            <label className="text-neutral-950 text-xl font-normal leading-3">
              Emplacement
            </label>
            <input
              type="text"
              placeholder="e.g. Dakar, Sénégal"
              className="w-full h-16 px-4 rounded-[10px] outline outline-2 outline-offset-[-1.82px] outline-gray-300 focus:outline-[#30618B] transition-all bg-transparent disabled:opacity-50"
              value={formData.company_location}
              onChange={(e) =>
                setFormData({ ...formData, company_location: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-neutral-950 text-xl font-normal leading-3">
              Catégorie
            </label>
            <div className="relative">
              <select
                className="w-full h-16 px-4 rounded-[10px] outline outline-2 outline-offset-[-1.82px] outline-gray-300 focus:outline-[#30618B] transition-all bg-transparent appearance-none cursor-pointer disabled:opacity-50"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: Number(e.target.value) })
                }
                disabled={isLoading}
              >
                <option value="" disabled>
                  Sélectionnez une catégorie
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-neutral-950 text-xl font-normal leading-3">
              Brève description
            </label>
            <textarea
              className="w-full h-24 p-4 rounded-[10px] outline outline-2 outline-offset-[-1.82px] outline-gray-300 focus:outline-[#30618B] transition-all bg-transparent disabled:opacity-50 resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-neutral-950 text-xl font-normal leading-3">
              Ajouter un lien
            </label>
            <input
              type="text"
              placeholder="https://www.asdf.com"
              className="w-full h-16 px-4 rounded-[10px] outline outline-2 outline-offset-[-1.82px] outline-gray-300 focus:outline-[#30618B] transition-all bg-transparent text-[#1a3a5a] text-xl disabled:opacity-50"
              value={formData.company_website_address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  company_website_address: e.target.value,
                })
              }
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-neutral-950 text-xl font-normal leading-3">
              Contact
            </label>
            <input
              type="text"
              placeholder="+226..."
              className="w-full h-16 px-4 rounded-[10px] outline outline-2 outline-offset-[-1.82px] outline-gray-300 focus:outline-[#30618B] transition-all bg-transparent disabled:opacity-50"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full h-12 bg-white rounded-[10px] outline outline-2 outline-offset-[-1.82px] outline-red-600 text-red-600 text-xl font-medium hover:bg-red-50 transition-colors shadow-sm disabled:opacity-50"
              disabled={isLoading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="w-full h-12 bg-[#1a3a5a] rounded-[10px] text-rose-50 text-xl font-medium shadow-md hover:bg-[#152e47] transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading
                ? "Chargement..."
                : editData
                  ? "Sauvegarder"
                  : "Ajouter l'emploi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;
