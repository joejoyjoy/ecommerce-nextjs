import ProtectedRoute from "../../protectedRoute";

export default function AdminUpload() {
  return (
    <ProtectedRoute>
      <main className="responsive">
        <span className="responsive_wrapper flex flex-col px-4 mb-6">
          Hello uploads and so
        </span>
      </main>
    </ProtectedRoute>
  );
}
