import { cn } from "../../utils/cn";

export const Input = ({ label, type = "text", value, onChange, placeholder, required = true }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <input
            type={type}
            required={required}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={cn(
                "w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all",
                "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            )}
        />
    </div>
);