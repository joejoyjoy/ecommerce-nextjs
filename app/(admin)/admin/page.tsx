import ProtectedRoute from "../protectedRoute";

export default function Admin() {
  return (
    <ProtectedRoute>
      <main className="responsive">
        <span className="responsive_wrapper flex flex-col px-4 mb-6">
          Hello
        </span>
      </main>
    </ProtectedRoute>
  );
}