import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="text-sm font-medium text-gray-500">Lernee</div>
    </header>
  );
}
