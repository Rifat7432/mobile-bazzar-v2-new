import CategoryProductCard from "../../Products/CategoryProductCard/CategoryProductCard";
import { TProduct } from "../../../globalTypes/globalTypes";
const Advertised = ({
  advertiseProducts,
}: {
  advertiseProducts: TProduct[];
}) => {
  return (
    <>
      <div className="p-5 mt-10 text-center">
        <h1 className="text-4xl font-bold">Special product </h1>
      </div>
      <div className="grid grid-cols-1 mt-5 pb-5 w-11/12 mx-auto  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {advertiseProducts?.map((product) => (
          <CategoryProductCard
            product={product}
            key={product._id}
          ></CategoryProductCard>
        ))}
      </div>
    </>
  );
};

export default Advertised;
