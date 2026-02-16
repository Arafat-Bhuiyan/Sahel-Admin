import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with real auth call
    if (email && password) {
      // pretend login success
      navigate("/admin", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#100f0f]">
      <div className="w-full max-w-md p-8">
        <div className="bg-[#201f1f] border border-[#333] rounded-md p-8 shadow-sm">
          <div className="flex justify-center mb-6">
            <h1 className="text-white logo-font font-bold text-2xl tracking-widest">Sahel Intelligence</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-1">
            <div>
              <label className="text-xs text-white">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-2 w-full bg-transparent border border-[#3a3a3a] rounded px-3 py-2 text-white"
                required
              />
            </div>

            <div>
              <label className="text-xs text-white">Password</label>
              <div className="relative mt-2">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="●●●●●●"
                  className="w-full bg-transparent border border-[#3a3a3a] rounded px-3 py-2 text-white placeholder-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 "
                  aria-label="Toggle password visibility"
                >
                  <span className="text-white">
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-white text-black rounded py-2 mt-3 font-bold"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
