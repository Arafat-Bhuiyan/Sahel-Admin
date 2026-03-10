import React, { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  HardHat,
  ShieldCheck,
  Headset,
  Settings,
  Upload,
  X,
  Layers,
} from "lucide-react";
import CategoryModal from "./CategoryModal";
import toast from "react-hot-toast";
import { initialCategories } from "./categoryData";

import { useGetCategoriesQuery } from "../../Redux/api/authApi";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const { data, isLoading, error } = useGetCategoriesQuery();
  const categories = data?.results || [];

  const handleOpenModal = (category = null) => {
    setEditCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditCategory(null);
  };

  const handleSaveCategory = (data) => {
    // API integration for Create/Update will go here
    toast.success("Fonctionnalité à venir !");
    handleCloseModal();
  };

  const handleDelete = (id) => {
    // API integration for Delete will go here
    toast.success("Fonctionnalité à venir !");
  };

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
        Une erreur est survenue lors du chargement des catégories.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6 flex flex-col gap-8 relative text-start">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 font-['Outfit']">
            Catégories
          </h1>
          <p className="text-neutral-500 text-sm font-normal font-['Outfit']">
            Gérez vos catégories et sous-catégories
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-[#30618B] rounded-md text-white hover:bg-[#254d6e] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="text-base font-medium font-['Outfit']">
            Ajouter une nouvelle catégorie
          </span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon || Layers;
          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl p-6 border border-neutral-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-all h-52"
            >
              <div className="flex flex-col gap-2.5 text-start">
                <div className="w-10 h-10 flex items-center justify-center">
                  {cat.icon && typeof cat.icon === "string" ? (
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      className="w-8 h-8 object-contain rounded-sm"
                    />
                  ) : (
                    <Icon className="w-8 h-8 text-[#30618B]" />
                  )}
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-zinc-900 text-lg font-bold font-['Outfit'] leading-tight truncate">
                    {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {cat.sub_categories?.slice(0, 3).map((sub, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-blue-50 text-[#30618B] px-2 py-0.5 rounded-full"
                      >
                        {sub}
                      </span>
                    ))}
                    {cat.sub_categories?.length > 3 && (
                      <span className="text-[10px] text-neutral-400">
                        +{cat.sub_categories.length - 3}
                      </span>
                    )}
                  </div>
                  {cat.description && (
                    <p className="text-neutral-500 text-xs font-normal font-['Outfit'] mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleOpenModal(cat)}
                  className="p-2 rounded border border-gray-200 text-neutral-500 hover:text-[#30618B] hover:bg-zinc-50 transition-all font-['Outfit']"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-2 rounded border border-gray-200 text-neutral-500 hover:text-red-500 hover:bg-zinc-50 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Modal Component */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCategory}
        editData={editCategory}
      />
    </div>
  );
};

export default Category;
