import { Eye, EyeOff, Lock, Save, Edit } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function General() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    adminName: "Admin User",
    email: "admin@icecream.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Password validation check
    if (formData.newPassword || formData.confirmPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("New Password and Confirm Password must be match.");
        return;
      }
      if (formData.newPassword.length > 0 && formData.newPassword.length < 6) {
        toast.error("New password must be at least 6 characters long.");
        return;
      }
    }

    // In a real application, you would send the data to your server here.
    console.log("Saving data:", formData);
    toast.success("Admin settings saved successfully!");

    // Reset password fields
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));

    // Reset password visibility and disable editing
    setShowPassword({ current: false, new: false, confirm: false });
    setIsEditing(false);
  };
  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col gap-6">
      <Toaster position="top-right" />
      <div className="px-6 pt-6 flex justify-between">
        <div>
          <h2 className="text-gray-900 text-base font-normal leading-4">
            Admin Account
          </h2>
          <p className="text-gray-600 text-base font-normal leading-6">
            Update your admin login credentials
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center justify-center gap-2 h-9 px-4 py-2 bg-gray-600 rounded-[10px] text-white text-sm font-medium leading-5 hover:bg-gray-700 transition-colors"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
        )}
      </div>
      <div className="flex-1 relative px-6 pb-6">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-900 text-sm font-medium leading-4">
                Admin Name
              </label>
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="h-9 px-3 py-1 bg-white rounded-[10px] border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-900 text-sm font-medium leading-4">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="h-9 px-3 py-1 bg-white rounded-[10px] border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="my-6 h-px bg-gray-200" />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-gray-900" />
            <h3 className="text-gray-900 text-base font-normal leading-6">
              Change Password
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-900 text-sm font-medium leading-4">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.current ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter current password"
                  className="w-full h-9 px-3 py-1 bg-white rounded-[10px] border border-gray-200 text-sm placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((p) => ({ ...p, current: !p.current }))
                  }
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                >
                  {showPassword.current ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-gray-900 text-sm font-medium leading-4">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Min 8 characters"
                    className="w-full h-9 px-3 py-1 bg-white rounded-[10px] border border-gray-200 text-sm placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((p) => ({ ...p, new: !p.new }))
                    }
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 disabled:cursor-not-allowed"
                    disabled={!isEditing}
                  >
                    {showPassword.new ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-900 text-sm font-medium leading-4">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Confirm password"
                    className="w-full h-9 px-3 py-1 bg-white rounded-[10px] border border-gray-200 text-sm placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((p) => ({ ...p, confirm: !p.confirm }))
                    }
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 disabled:cursor-not-allowed"
                    disabled={!isEditing}
                  >
                    {showPassword.confirm ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {isEditing && (
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 h-9 px-4 py-2 bg-blue-500 rounded-[10px] text-white text-sm font-medium leading-5 hover:bg-blue-600 transition-colors"
            >
              <Save size={16} />
              <span>Save Admin Settings</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
