import CategoryHome from "@/components/homePage/CategoryHome";

export default function Home() {
  return (
    <>
      <main className="responsive">
        <span className="responsive_wrapper flex flex-col gap-5 py-3">
          <CategoryHome />
        </span>
      </main>
    </>
  );
}
