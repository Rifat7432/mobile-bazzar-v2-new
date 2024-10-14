import { useParams } from "react-router-dom";
import Loader from "../../Shered/Loader/Loader";
import CategoryProductCard from "../CategoryProductCard/CategoryProductCard";
import { useGetCategoryProductsQuery } from "../../../redux/services/API";
import { TProduct } from "../../../globalTypes/globalTypes";

const CategoryProducts = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCategoryProductsQuery(id as string);
  const products: TProduct[] = data?.data;
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <>
      {products.length === 0 ? (
        <div className="text-center my-40 mx-auto w-80">No Product Found</div>
      ) : (
        <div className="grid grid-cols-1 mt-20 pb-10 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product: TProduct) => (
            <CategoryProductCard
              product={product}
              key={product._id}
            ></CategoryProductCard>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryProducts;
