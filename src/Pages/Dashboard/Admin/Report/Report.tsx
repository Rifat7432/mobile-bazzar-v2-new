
import { TProduct } from "../../../../globalTypes/globalTypes";
import { useGetReportedProductsQuery } from "../../../../redux/services/API";
import Loader from "../../../Shered/Loader/Loader";
import ReportTable from "../../ReportTable/ReportTable";

const Report = () => {
    const { data, isLoading } = useGetReportedProductsQuery("");
    const reportedProducts:TProduct[] = data?.data;
  return (
    <div className="mt-16">
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div>
          {reportedProducts.length > 0 ? (
            <ReportTable
              reportedProducts={reportedProducts}
              
            ></ReportTable>
          ) : (
            <h1 className="text-4xl mt-32 font-semibold  text-center">
              no reported product found
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Report;
