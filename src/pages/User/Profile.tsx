import { useAuthContext } from "../../context/AuthContext";

const cardClass = "rounded-2xl bg-white p-6 shadow-sm";

export default function Profile() {
  const { user } = useAuthContext();

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <p className="text-sm text-gray-500">Welcome back</p>
          <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className={cardClass}>
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-xl font-semibold text-indigo-600">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Email
              </p>
              <p className="mt-1 text-sm text-gray-700">{user?.email}</p>
            </div>
          </div>

          <div className={cardClass}>
            <p className="text-sm text-gray-500">Your Learning</p>

            <h2 className="mt-1 text-lg font-semibold text-gray-900">
              Explore Courses
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Browse courses and find something new to learn.
            </p>

            <button className="mt-5 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600">
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
