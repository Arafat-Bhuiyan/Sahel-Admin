import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { initialCategories } from "../Category/categoryData";

const JobModal = ({ isOpen, onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    category: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    if (editData && isOpen) {
      setFormData({
        company: editData.company || "",
        title: editData.title || "",
        location: editData.location || "",
        category: editData.category || "",
        description: editData.description || "",
        link: editData.link || "",
      });
    } else if (!editData && isOpen) {
      setFormData({
        company: "",
        title: "",
        location: "",
        category: "",
        description: "",
        link: "",
      });
    }
  }, [editData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.title || !formData.category) return;

    onSave({
      ...editData, // Keep existing fields like ID and Status if editing
      ...formData,
      id: editData ? editData.id : Date.now(),
      status: editData ? editData.status : "Publié",
    });

    onClose();
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
              className="w-full h-16 px-4 rounded-[10px] outline outline-2 outline-offset-[-1.82px] outline-gray-300 focus:outline-[#30618B] transition-all bg-transparent"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-neutral-950 text-xl font-normal leading-3">
              Titre du poste
            </label>
            <input
              type="text"
              className="w-full h-16 px-4 rounded-[10px] outline outline-2 outline-offset-[-1.82px] outline-gray-300 focus:outline-[#30618B] transition-all bg-transparent"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
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
              className="w-full h-16 px-4 rounded-[10px] outline outline-2 outline-offset-[-1.82px] outline-gray-300 focus:outline-[#30618B] transition-all bg-transparent"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-neutral-950 text-xl font-normal leading-3">
              Catégorie
            </label>
            <div className="relative">
              <select
                className="w-full h-16 px-4 rounded-[10px] outline outline-2 outline-offset-[-1.82px] outline-gray-300 focus:outline-[#30618B] transition-all bg-transparent appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="" disabled>
                  Sélectionnez une catégorie
                </option>
                {initialCategories.map((cat) => (
                  <option key={cat.id} value={cat.title}>
                    {cat.title}
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
            <input
              type="text"
              className="w-full h-16 px-4 rounded-[10px] outline outline-2 outline-offset-[-1.82px] outline-gray-300 focus:outline-[#30618B] transition-all bg-transparent"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-neutral-950 text-xl font-normal leading-3">
              Ajouter un lien
            </label>
            <input
              type="text"
              placeholder="www.asdf.com"
              className="w-full h-16 px-4 rounded-[10px] outline outline-2 outline-offset-[-1.82px] outline-gray-300 focus:outline-[#30618B] transition-all bg-transparent text-cyan-900 text-2xl font-['Arimo']"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full h-12 bg-white rounded-[10px] outline outline-2 outline-offset-[-1.82px] outline-red-600 text-red-600 text-xl font-medium hover:bg-red-50 transition-colors shadow-sm"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="w-full h-12 bg-cyan-900 rounded-[10px] text-rose-50 text-xl font-medium shadow-md hover:bg-cyan-950 transition-colors"
            >
              {editData ? "Sauvegarder les modifications" : "Ajouter l'emploi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;
