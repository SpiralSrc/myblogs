import {
  Github,
  Boxes,
  LayoutDashboard,
  Hash,
  BookHeart,
  UserRound,
} from "lucide-react";

export const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Categories",
    path: "/categories",
  },
];

export const socialsData = [
  {
    name: "Github",
    path: "https://github.com/",
    icon: Github,
  },
];

export const dashboardNavs = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Categories",
    path: "/dashboard/categories",
    icon: Boxes,
  },
  {
    name: "Posts",
    path: "/dashboard/posts",
    icon: BookHeart,
  },
  {
    name: "Tags",
    path: "/dashboard/tags",
    icon: Hash,
  },
  {
    name: "Users",
    path: "/dashboard/users",
    icon: UserRound,
  },
];
