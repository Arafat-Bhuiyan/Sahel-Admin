import { Phone, Save, ChevronDown } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function General() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [formData, setFormData] = useState({
    shortCode: "*384*123#",
    provider: "Africa's Talking, Safaricom, etc.",
    apiKey: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Enregistrement des paramètres USSD :", {
      isEnabled,
      ...formData,
    });
    toast.success("Paramètres USSD enregistrés avec succès !");
  };

  return (
    <div className="w-full max-w-[1059px] bg-white rounded-2xl border border-neutral-200 shadow-sm flex flex-col font-['Outfit'] text-start">
      <Toaster position="top-right" />

      {/* Header Section */}
      <div className="p-6 md:p-8 flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Phone className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-neutral-950 text-xl font-semibold leading-tight">
            Configuration du service USSD
          </h2>
          <p className="text-gray-500 text-base font-normal">
            Configurer le code court USSD pour l'inscription des abonnés
          </p>
        </div>
      </div>

      <div className="px-6 md:px-8 pb-8 flex flex-col gap-8">
        {/* Toggle Section */}
        <div className="flex justify-between items-center py-2">
          <div className="flex flex-col">
            <h3 className="text-neutral-950 text-base font-normal leading-6">
              Activer le service USSD
            </h3>
            <p className="text-gray-500 text-sm font-normal">
              Permettre aux utilisateurs de s'abonner via USSD
            </p>
          </div>
          <button
            onClick={() => setIsEnabled(!isEnabled)}
            className={`w-10 h-6 rounded-full transition-all relative flex items-center px-1 ${
              isEnabled ? "bg-cyan-900" : "bg-gray-200"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-sm transition-all transform ${
                isEnabled ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="h-px bg-black/10" />

        {/* Form Fields */}
        <div className="flex flex-col gap-6">
          {/* Short Code */}
          <div className="flex flex-col gap-2">
            <label className="text-neutral-950 text-sm font-normal">
              Code court USSD
            </label>
            <input
              type="text"
              name="shortCode"
              value={formData.shortCode}
              onChange={handleInputChange}
              className="w-full h-11 px-4 bg-zinc-100 rounded-lg outline-none text-gray-600 text-sm border-none"
              placeholder="par ex. *384*123#"
            />
            <p className="text-gray-500 text-xs font-normal">
              Les utilisateurs composeront ce code pour accéder au service
              d'emploi
            </p>
          </div>

          {/* Provider */}
          <div className="flex flex-col gap-2">
            <label className="text-neutral-950 text-sm font-normal">
              Fournisseur USSD
            </label>
            <div className="relative">
              <input
                type="text"
                name="provider"
                value={formData.provider}
                onChange={handleInputChange}
                className="w-full h-11 px-4 bg-zinc-100 rounded-lg outline-none text-gray-600 text-sm border-none"
                placeholder="Africa's Talking, Safaricom, etc."
              />
            </div>
          </div>

          {/* API Key */}
          <div className="flex flex-col gap-2">
            <label className="text-neutral-950 text-sm font-normal">
              Clé API
            </label>
            <input
              type="password"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleInputChange}
              className="w-full h-11 px-4 bg-zinc-100 rounded-lg outline-none text-gray-600 text-sm border-none"
              placeholder="Entrez votre clé API USSD"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-4">
          <button
            onClick={handleSave}
            className="h-12 px-6 bg-cyan-900 rounded-lg text-white text-base font-normal flex items-center gap-2 hover:bg-[#254d6e] transition-all shadow-sm"
          >
            <Save className="w-5 h-5" />
            <span>Enregistrer les paramètres USSD</span>
          </button>
        </div>
      </div>
    </div>
  );
}
