import { useAppSelector } from "../../../../redux/hooks/hooks";
import { useGetSellersProductsQuery } from "../../../../redux/services/API";
import Loader from "../../../Shered/Loader/Loader";
import ProductTable from "../ProductTable/ProductTable";

const MyProduct = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetSellersProductsQuery(user?._id as string);
  const products = data?.data ? data?.data : [];

  return (
    <div className="mt-16">
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div>
          {products.length > 0 ? (
            <ProductTable products={products}></ProductTable>
          ) : (
            <h1 className="text-4xl mt-32 font-semibold  text-center">
              no product found
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProduct;
