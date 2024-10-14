import { Link } from "react-router-dom";
import { useGetCategoryQuery } from "../../../redux/services/API";

const CategorySection = () => {
  const { data: categories } = useGetCategoryQuery("");
  return (
    <div className="p-5 mt-10">
      <h1 className="my-5 text-center text-4xl font-bold">Brands</h1>
      <div className="grid w-11/12 mx-auto grid-col-1 md:grid-cols-2 py-5 gap-4 md:gap-6">
        {categories?.data.map(
          (category: {
            _id: string;
            category: string;
            categoryLogo: string;
          }) => (
            <div
              key={category._id}
              className="shadow-xl rounded-xl bg-slate-200 w-3/4 sm:w-80  mx-auto"
            >
              <Link
                to={`/category/${category._id}`}
                className="mx-4 btn-ghost  my-2 categoryText "
                key={category._id}
              >
                <img
                  className="h-48 w-full"
                  src={category.categoryLogo}
                  alt=""
                />
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CategorySection;
