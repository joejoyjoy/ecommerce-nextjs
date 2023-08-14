import React from "react";
import CategoryHome from "@/components/homePage/CategoryHome";

const Components = {
  categoryHome: CategoryHome,
};

export const homeComponents = [
  {
    label: "Category",
    route: "/",
    render: <CategoryHome />,
  },
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "Search",
  },
  {
    imgURL: "/assets/heart.svg",
    route: "/activity",
    label: "Activity",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/create-thread",
    label: "Create Thread",
  },
  {
    imgURL: "/assets/community.svg",
    route: "/communities",
    label: "Communities",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profile",
  },
];
