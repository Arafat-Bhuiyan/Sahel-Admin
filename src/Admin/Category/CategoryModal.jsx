import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "../../Redux/api/authApi";
import toast from "react-hot-toast";

const CategoryModal = ({ isOpen, onClose, editData }) => {
  const [formData, setFormData] = useState({
    name: "",
    sub_categories: "",
    icon: null,
  });

  const [preview, setPreview] = useState(null);
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const isLoading = isAdding || isUpdating;

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        sub_categories: editData.sub_categories?.join(", ") || "",
        icon: null,
      });
      // Handle icon preview for existing categories
      if (editData.icon) {
        setPreview(
          editData.icon.startsWith("http")
            ? editData.icon
            : `${import.meta.env.VITE_BASE_URL}${editData.icon}`,
        );
      } else {
        setPreview(null);
      }
    } else {
      setFormData({ name: "", sub_categories: "", icon: null });
      setPreview(null);
    }
  }, [editData, isOpen]);

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, icon: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Veuillez entrer le nom de la catégorie");
      return;
    }

    const submitData = new FormData();
    submitData.append("name", formData.name);

    if (formData.sub_categories) {
      // Split sub_categories by comma and create an array
      const subCats = formData.sub_categories
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      // Append as a JSON string because the backend expects valid JSON
      submitData.append("sub_categories", JSON.stringify(subCats));
    }

    if (formData.icon) {
      submitData.append("icon", formData.icon);
    }

    try {
      if (editData) {
        await updateCategory({ id: editData.id, data: submitData }).unwrap();
        toast.success("Catégorie mise à jour avec succès !");
      } else {
        await addCategory(submitData).unwrap();
        toast.success("Catégorie ajoutée avec succès !");
      }
      onClose();
    } catch (err) {
      console.error("Category Submit Error:", err);
      // Detailed error reporting to identify exactly what failed
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
          // Flatten field-specific errors (e.g., { "name": ["This field is required."] })
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 text-start">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[544px] overflow-hidden border border-black/10">
        <div className="p-6 flex flex-col gap-6 font-['Outfit']">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Category Name */}
              <div className="flex flex-col gap-3">
                <label className="text-neutral-950 text-lg font-normal font-['Outfit'] leading-3">
                  Nom de la catégorie
                </label>
                <input
                  type="text"
                  placeholder="par ex. Informatique"
                  className="w-full h-16 px-4 rounded-[10px] border-2 border-gray-300 focus:border-[#30618B] outline-none font-['Outfit'] transition-all"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              {/* Upload Icon */}
              <div className="flex flex-col gap-3">
                <label className="text-neutral-950 text-lg font-normal font-['Outfit'] leading-3">
                  Télécharger une icône
                </label>
                <label className="w-full h-16 rounded-[10px] border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-zinc-50 transition-all overflow-hidden relative">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Icon Preview"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <Upload className="w-6 h-6 text-gray-400" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleIconChange}
                  />
                </label>
              </div>
            </div>

            {/* Sub Categories */}
            <div className="flex flex-col gap-3">
              <label className="text-neutral-950 text-lg font-normal font-['Outfit'] leading-3">
                Sous-catégories (séparées par des virgules)
              </label>
              <textarea
                placeholder="Frontend, Backend, Mobile"
                className="w-full h-20 p-4 rounded-[10px] border-2 border-gray-300 focus:border-[#30618B] outline-none font-['Outfit'] transition-all resize-none"
                value={formData.sub_categories}
                onChange={(e) =>
                  setFormData({ ...formData, sub_categories: e.target.value })
                }
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 h-12 rounded-[10px] border-2 border-red-600 text-red-600 text-xl font-medium font-['Outfit'] hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 h-12 rounded-[10px] bg-[#1a3a5a] text-rose-50 text-xl font-medium font-['Outfit'] hover:bg-[#152e47] transition-colors shadow-md disabled:opacity-50"
              >
                {isLoading
                  ? "Chargement..."
                  : editData
                    ? "Sauvegarder"
                    : "Ajouter une catégorie"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
