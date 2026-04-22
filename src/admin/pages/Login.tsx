import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Eye, EyeOff } from "lucide-react";
import { useStore } from "../../store/StoreProvider";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const result = await login(email, password);
    setSubmitting(false);

    if (!result.success) {
      setError(result.error ?? "تعذر تسجيل الدخول.");
      return;
    }

    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-[#c9a96e]" />
          </div>
          <h1 className="text-3xl font-bold text-[#c9a96e] font-['Amiri'] mb-2">أثر</h1>
          <p className="text-[#8a8279] text-sm">لوحة الإدارة الخاصة بالمتجر</p>
        </div>

        <div className="bg-[#141414] border border-[#2a2520] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-[#a0988e] mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@atharperfume.com"
                className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-3 text-[#e8e0d4] placeholder-[#5a524a] outline-none focus:border-[#c9a96e]/50 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-[#a0988e] mb-2">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-3 text-[#e8e0d4] placeholder-[#5a524a] outline-none focus:border-[#c9a96e]/50 transition-colors text-sm pl-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a524a] hover:text-[#a0988e] transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#c9a96e] hover:bg-[#b8985e] disabled:opacity-60 text-[#0c0c0c] font-semibold rounded-xl py-3.5 transition-colors text-sm"
            >
              {submitting ? "جارٍ التحقق" : "تسجيل الدخول"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#5a524a] mt-6">
          أثر - إدارة متجر العطور
        </p>
      </div>
    </div>
  );
}

