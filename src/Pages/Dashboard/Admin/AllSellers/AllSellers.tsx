import { TUser } from "../../../../globalTypes/globalTypes";
import { useGetAllSellerQuery } from "../../../../redux/services/API";
import Loader from "../../../Shered/Loader/Loader";
import SellerTable from "../SellerTable/SellerTable";

const AllSellers = () => {
  const { data, isLoading } = useGetAllSellerQuery("");
  const sellers:TUser[] = data?.data;

  return (
    <div className="mt-16 ">
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div>
          {sellers?.length > 0 ? (
            <SellerTable users={sellers}></SellerTable>
          ) : (
            <h1 className="text-4xl mt-32 font-semibold  text-center">
              no sellers found
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default AllSellers;
