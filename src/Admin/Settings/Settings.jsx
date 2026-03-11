import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import { useRef, useState } from "react";
import General from "./General";
import {
  useGetTermsQuery,
  useUpdateTermsMutation,
  useGetPrivacyQuery,
  useUpdatePrivacyMutation,
} from "../../Redux/api/authApi";
import toast from "react-hot-toast";

export default function TermsAndPolicies() {
  const [activeTab, setActiveTab] = useState("general");
  const [isEditing, setIsEditing] = useState(false);
  const { data: termsData, isLoading: isTermsLoading } = useGetTermsQuery();
  const { data: privacyData, isLoading: isPrivacyLoading } =
    useGetPrivacyQuery();
  const [updateTerms] = useUpdateTermsMutation();
  const [updatePrivacy] = useUpdatePrivacyMutation();

  const termsContent =
    termsData?.results?.[0]?.terms ||
    termsData?.terms ||
    (typeof termsData === "string" ? termsData : "");
  const privacyContent =
    privacyData?.results?.[0]?.policy ||
    privacyData?.policy ||
    (typeof privacyData === "string" ? privacyData : "");

  const [editContent, setEditContent] = useState("");
  const editorRef = useRef(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    const html = editorRef.current?.innerHTML ?? editContent;

    try {
      if (activeTab === "terms") {
        await updateTerms({ terms: html }).unwrap();
        toast.success("Termes mis à jour !");
      } else if (activeTab === "privacy") {
        await updatePrivacy({ policy: html }).unwrap();
        toast.success("Politique de confidentialité mise à jour !");
      }
      setIsEditing(false);
    } catch (err) {
      toast.error("Une erreur est survenue lors de l'enregistrement");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData?.getData("text/plain") ?? "";
    document.execCommand("insertText", false, text);
  };

  // const [fontSize, setFontSize] = useState("12");

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const applyFormat = (command, value) => {
    if (editorRef.current && isEditing) {
      document.execCommand(command, false, value);
      editorRef.current.focus();
    }
  };

  /*
  const handleFontSizeChange = (e) => {
    const newSize = e.target.value;
    setFontSize(newSize);
    // Apply the new font size to the selected text only
    applyFontSizeToSelection(newSize);
  };
  */

  /*
  const applyFontSizeToSelection = (size) => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    if (range) {
      const span = document.createElement("span");
      span.style.fontSize = `${size}px`;
      range.surroundContents(span);
    }
  };
  */

  return (
    <div className="min-h-screen py-6">
      <div className="py-8">
        {/* Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-8">
            <button
              onClick={() => handleTabChange("general")}
              className={`pb-3 font-semibold transition-colors ${
                activeTab === "general"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Général
            </button>
            <button
              onClick={() => handleTabChange("terms")}
              className={`pb-3 font-semibold transition-colors ${
                activeTab === "terms"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Termes et Conditions
            </button>
            <button
              onClick={() => handleTabChange("privacy")}
              className={`pb-3 font-semibold transition-colors ${
                activeTab === "privacy"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Politique de Confidentialité
            </button>
          </div>

          {!isEditing && activeTab !== "general" && (
            <button
              onClick={() => {
                setEditContent(
                  activeTab === "terms" ? termsContent : privacyContent,
                );
                setIsEditing(true);
              }}
              className="px-4 py-2 bg-cyan-900 text-white font-semibold rounded hover:bg-cyan-800 transition-colors"
            >
              Modifier
            </button>
          )}
        </div>

        {/* Toolbar */}
        {isEditing && activeTab !== "general" && (
          <div className="flex items-center flex-wrap gap-2 mb-4 p-2 border border-gray-300 rounded bg-gray-50">
            {/* 
            <select
              value={fontSize}
              onChange={handleFontSizeChange}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
              <option value="24">24</option>
            </select>

            <div className="w-px h-6 bg-gray-300" />
            */}

            <button
              onClick={() => applyFormat("bold")}
              className="p-1 hover:bg-gray-200 rounded"
              title="Gras"
            >
              <Bold size={16} />
            </button>

            <button
              onClick={() => applyFormat("italic")}
              className="p-1 hover:bg-gray-200 rounded"
              title="Italique"
            >
              <Italic size={16} />
            </button>

            <button
              onClick={() => applyFormat("underline")}
              className="p-1 hover:bg-gray-200 rounded"
              title="Souligné"
            >
              <Underline size={16} />
            </button>

            <div className="w-px h-6 bg-gray-300" />

            <button
              onClick={() => applyFormat("justifyLeft")}
              className="p-1 hover:bg-gray-200 rounded"
              title="Aligner à gauche"
            >
              <AlignLeft size={16} />
            </button>

            <button
              onClick={() => applyFormat("justifyCenter")}
              className="p-1 hover:bg-gray-200 rounded"
              title="Aligner au centre"
            >
              <AlignCenter size={16} />
            </button>

            <button
              onClick={() => applyFormat("justifyRight")}
              className="p-1 hover:bg-gray-200 rounded"
              title="Aligner à droite"
            >
              <AlignRight size={16} />
            </button>
          </div>
        )}

        {/* Content */}
        {activeTab === "general" && <General />}

        {activeTab !== "general" && (
          <>
            {(activeTab === "terms" ? isTermsLoading : isPrivacyLoading) ? (
              <div className="py-10 text-center text-gray-500 font-medium">
                Chargement...
              </div>
            ) : isEditing ? (
              <>
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  className="h-[500px] overflow-y-auto p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 text-gray-800 leading-relaxed"
                  onPaste={handlePaste}
                  dangerouslySetInnerHTML={{
                    __html: (editContent || "").replace(/\n/g, "<br>"),
                  }}
                  onBlur={(e) =>
                    setEditContent(
                      e.currentTarget.innerHTML.replace(/<br>/g, "\n"),
                    )
                  }
                />
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleSaveEdit}
                    className="px-6 py-2 bg-cyan-900 text-white font-semibold rounded hover:bg-cyan-800 transition-colors"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-6 py-2 bg-gray-200 text-gray-900 font-semibold rounded hover:bg-gray-300 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </>
            ) : (
              <div className="prose prose-sm max-w-none">
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html:
                      activeTab === "terms" ? termsContent : privacyContent,
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
