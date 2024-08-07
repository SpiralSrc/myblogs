import { getCategories } from "@/actions/action";

const CategoryList = async () => {
  const categories = await getCategories();
  console.log(categories);

  return (
    <>
      {categories &&
        categories.map((category) => (
          <option key={category._id} value={category._id.toString()}>
            {category.name}
          </option>
        ))}
    </>
  );
};
export default CategoryList;
