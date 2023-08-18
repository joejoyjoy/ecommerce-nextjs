import ProtectedRoute from "../../protectedRoute";

export default function AdminCategories() {
  return (
    <ProtectedRoute>
      <main className="responsive">
        <span className="responsive_wrapper flex flex-col px-4 mb-6">
          Hello Categories
        </span>
      </main>
    </ProtectedRoute>
  );
}
