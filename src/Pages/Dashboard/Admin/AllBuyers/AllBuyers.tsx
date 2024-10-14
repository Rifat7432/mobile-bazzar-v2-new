import { TUser } from "../../../../globalTypes/globalTypes";
import { useGetAllBuyerQuery } from "../../../../redux/services/API";
import Loader from "../../../Shered/Loader/Loader";
import UserTable from "../UserTable/UserTable";


const AllBuyers = () => {
  const { data, isLoading } = useGetAllBuyerQuery("");
  const buyers: TUser[] = data?.data ? data?.data : [];
console.log(buyers);
  return (
    <div className="mt-16 ">
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div>
          {buyers.length > 0 ? (
            <UserTable users={buyers}></UserTable>
          ) : (
            <h1 className="text-4xl mt-32 font-semibold  text-center">
              no buyers found
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default AllBuyers;
