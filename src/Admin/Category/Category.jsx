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

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: "Construction & Labor",
      description: "Builder, Electrician, Plumber",
      icon: HardHat,
    },
    {
      id: 2,
      title: "Security & Safety",
      description: "Guard, Security Officer",
      icon: ShieldCheck,
    },
    {
      id: 3,
      title: "Customer Service",
      description: "Call Center, Support",
      icon: Headset,
    },
    {
      id: 4,
      title: "Manufacturing",
      description: "Machine Operator, Assembly",
      icon: Settings,
    },
  ]);

  const handleOpenModal = (category = null) => {
    setEditCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditCategory(null);
  };

  const handleSaveCategory = (data) => {
    if (editCategory) {
      // Update existing
      setCategories(
        categories.map((cat) =>
          cat.id === editCategory.id ? { ...cat, ...data } : cat,
        ),
      );
      toast.success("Category updated successfully!");
    } else {
      // Add new
      const newCategory = {
        id: Date.now(),
        ...data,
        icon: data.icon || Layers, // Use uploaded icon or fallback to Layers
      };
      setCategories([...categories, newCategory]);
      toast.success("Category added successfully!");
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="text-sm font-medium text-gray-900 font-['Outfit']">
            Are you sure you want to delete this category?
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors font-['Outfit']"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setCategories(categories.filter((c) => c.id !== id));
                toast.dismiss(t.id);
                toast.success("Category deleted successfully!");
              }}
              className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors font-['Outfit']"
            >
              Confirm
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

  return (
    <div className="w-full min-h-screen p-6 flex flex-col gap-8 relative">
      {/* Header Section */}
      <div className="flex justify-end items-center w-full">
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-[#30618B] rounded-md text-white hover:bg-[#254d6e] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="text-base font-medium font-['Outfit']">
            Add New Category
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
              className="bg-white rounded-2xl p-6 border border-neutral-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-all h-48"
            >
              <div className="flex flex-col gap-2.5 text-start">
                <div className="w-10 h-10 flex items-center justify-center">
                  {typeof cat.icon === "string" ? (
                    <img
                      src={cat.icon}
                      alt={cat.title}
                      className="w-8 h-8 object-contain rounded-sm"
                    />
                  ) : (
                    <Icon className="w-8 h-8 text-[#30618B]" />
                  )}
                </div>
                <div>
                  <h3 className="text-zinc-900 text-xl font-bold font-['Outfit'] leading-7 truncate">
                    {cat.title}
                  </h3>
                  <p className="text-neutral-500 text-sm font-normal font-['Outfit'] leading-5 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
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
