import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export default function Input({ label, className, ...props }: Props) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <input
        {...props}
        className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm
        outline-none transition
        placeholder:text-gray-400
        focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}`}
      />
    </div>
  );
}
