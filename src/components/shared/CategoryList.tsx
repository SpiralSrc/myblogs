"use client";

import { getCategories } from "@/actions/action";
import { useEffect, useState } from "react";

interface CategoryProps {
  id: string;
  name: string;
  posts?: string[];
}

const CategoryList = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories: any = await getCategories();
        setCategories(JSON.parse(JSON.stringify(fetchedCategories)));
      } catch (err) {
        setError("Failed to fetch categories");
        console.error("Error fetching categories:", err);
      }
    };

    loadCategories();
  }, []);
  if (error) {
    return <div>Error loading categories.</div>;
  }

  return (
    <>
      {categories &&
        categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
    </>
  );
};
export default CategoryList;
