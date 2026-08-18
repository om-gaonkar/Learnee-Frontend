import { Outlet } from "react-router";

export default function Auth() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </main>
  );
}
