import { Link } from "react-router-dom";
import "./Categories.css";
import { useGetCategoryQuery } from "../../../redux/services/API";

const Categories = () => {
  const { data: categories } = useGetCategoryQuery("");
 
  return (
    <div className="bg-slate-800 flex py-3 sm:py-0 flex-wrap items-center justify-center text-slate-100">
      {categories?.data.map(
        (category: { _id: string; category: string; categoryLogo: string }) => (
          <Link
            to={`/category/${category._id}`}
            className="mx-4 btn-ghost  my-2 categoryText "
            key={category._id}
          >
            {category.category}
          </Link>
        )
      )}
    </div>
  );
};

export default Categories;
