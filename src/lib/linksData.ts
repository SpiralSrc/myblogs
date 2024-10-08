import {
  Github,
  Boxes,
  LayoutDashboard,
  Hash,
  BookHeart,
  UserRound,
  Home,
  Sparkles,
} from "lucide-react";

export const navLinks = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "About",
    path: "/about",
    icon: Sparkles,
  },
  {
    name: "Categories",
    path: "/categories",
    icon: Boxes,
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
  // {
  //   name: "Dashboard",
  //   path: "/dashboard",
  //   icon: LayoutDashboard,
  // },
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
