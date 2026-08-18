import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
    >
      {children}
    </button>
  );
}
