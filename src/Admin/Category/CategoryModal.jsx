import React, { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";

const CategoryModal = ({ isOpen, onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        description: editData.description || "",
        icon: editData.icon || null,
      });
      setPreview(typeof editData.icon === "string" ? editData.icon : null);
    } else {
      setFormData({ title: "", description: "", icon: null });
      setPreview(null);
    }
  }, [editData, isOpen]);

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData({ ...formData, icon: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    onSave(formData);
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
                  placeholder="par ex. Informatique et Technologie"
                  className="w-full h-16 px-4 rounded-[10px] border-2 border-gray-300 focus:border-[#30618B] outline-none font-['Outfit'] transition-all"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              {/* Upload Icon */}
              <div className="flex flex-col gap-3">
                <label className="text-neutral-950 text-lg font-normal font-['Outfit'] leading-3">
                  Télécharger une icône/image
                </label>
                <label className="w-full h-16 rounded-[10px] border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-zinc-50 transition-all overflow-hidden relative">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Icon Preview"
                      className="w-full h-full object-cover"
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

            {/* Sub Category Name */}
            <div className="flex flex-col gap-3">
              <label className="text-neutral-950 text-lg font-normal font-['Outfit'] leading-3">
                Nom de la sous-catégorie
              </label>
              <textarea
                placeholder="Constructeur, Électricien, Plombier"
                className="w-full h-20 p-4 rounded-[10px] border-2 border-gray-300 focus:border-[#30618B] outline-none font-['Outfit'] transition-all resize-none"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-12 rounded-[10px] border-2 border-red-600 text-red-600 text-xl font-medium font-['Outfit'] hover:bg-red-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 h-12 rounded-[10px] bg-[#1a3a5a] text-rose-50 text-xl font-medium font-['Outfit'] hover:bg-[#152e47] transition-colors shadow-md"
              >
                {editData
                  ? "Sauvegarder les modifications"
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
