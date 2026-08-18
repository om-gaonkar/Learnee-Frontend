import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  Settings,
  Trophy,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/user/profile",
    },
    {
      title: "Courses",
      icon: BookOpen,
      path: "/user/courses",
    },
    {
      title: "Progress",
      icon: Trophy,
      path: "/user/progress",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/user/settings",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-6">
          <h1 className="text-xl font-bold text-gray-900">
            Ler<span className="text-blue-600">nee</span>
          </h1>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                  >
                    <Icon size={19} />
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
