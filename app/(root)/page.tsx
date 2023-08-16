import Component from "@/components/Login-btn";
import AllProductsHome from "@/components/homePage/AllProductsHome";
import CategoryHome from "@/components/homePage/CategoryHome";

export default function Home() {
  return (
    <main className="responsive">
      <span className="responsive_wrapper flex flex-col px-4 mb-6">
        <CategoryHome />
        <AllProductsHome />
        <Component />
      </span>
    </main>
  );
}
