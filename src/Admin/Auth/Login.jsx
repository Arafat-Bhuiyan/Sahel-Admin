import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import toast, { Toaster } from "react-hot-toast";
import { useLoginMutation } from "../../Redux/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Redux/services/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);

  // RTK Query mutation
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Calling the login mutation with phone_number as key as per API requirement
      const response = await login({
        phone_number: email,
        password: password,
      }).unwrap();

      // Dispatching setCredentials to save tokens and user info
      dispatch(
        setCredentials({
          access: response.access,
          refresh: response.refresh,
          user: { email: email }, // Saving email as user info
        }),
      );

      toast.success("Login Successful!");
      navigate("/admin", { replace: true });
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(
        err?.data?.detail || err?.data?.message || "Invalid email or password.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
      <Toaster position="top-right" />
      <div className="w-full max-w-md p-8">
        <div className="bg-white border border-[#e5e7eb] rounded-lg p-8 shadow-xl">
          <div className="flex justify-center mb-8">
            <h1 className="text-[#111827] font-bold text-2xl tracking-widest uppercase">
              Sahel Intelligence
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-[#4b5563] uppercase tracking-wider">
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@exemple.com"
                className="mt-1.5 w-full bg-[#fcfcfc] border border-[#d1d5db] rounded-md px-4 py-2.5 text-[#111827] focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#4b5563] uppercase tracking-wider">
                Mot de passe
              </label>
              <div className="relative mt-1.5">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#fcfcfc] border border-[#d1d5db] rounded-md px-4 py-2.5 text-[#111827] focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#111827] hover:bg-black text-white rounded-md py-3 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md active:scale-[0.98]"
              >
                {isLoading ? "Chargement..." : "Se connecter"}
              </button>
            </div>
          </form>
        </div>
        <p className="text-center mt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Sahel Intelligence. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
