import CountUp from "react-countup";
import Loader from "../../Shered/Loader/Loader";
import { useAdminOverviewQuery } from "../../../redux/services/API";
import { LineChart } from "@mui/x-charts/LineChart";

const AdminOverview = () => {
  //
  const { data, isLoading } = useAdminOverviewQuery("");
  if (isLoading) {
    return <Loader></Loader>;
  }
  const { totalProduct, totalSeller, totalBuyer } = data.data;
  const generateNumberArray = (lastNumber: number): number[] => {
    return Array.from({ length: lastNumber }, (_, index) => index + 1);
  };
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="shadow-xl w-11/12 m-5 p-5 rounded-lg">
          <div className="text-xl font-bold">Total Products</div>
          <div>
            <h4 className="text-xl pl-4 font-semibold">
              <CountUp end={Number(totalProduct)} duration={4}></CountUp>
            </h4>
          </div>
        </div>
        <div className="shadow-xl w-11/12 m-5 p-5 rounded-lg">
          <div className="text-xl font-bold">Total Seller</div>
          <div>
            <h4 className="text-xl pl-4 font-semibold">
              <CountUp end={Number(totalSeller)} duration={4}></CountUp>
            </h4>
          </div>
        </div>
        <div className="shadow-xl w-11/12 m-5 p-5 rounded-lg">
          <div className="text-xl font-bold">Total Buyer</div>
          <div>
            <h4 className="text-xl pl-4 font-semibold">
              <CountUp end={Number(totalBuyer)} duration={4}></CountUp>
            </h4>
          </div>
        </div>
      </div>
      <div>
        <div className="hidden md:block">
          <LineChart
            xAxis={[
              {
                data: [0, 0, 0, 0, 0, 0, 0, ...generateNumberArray(Number(12))],
              },
            ]}
            series={[
              {
                data: [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  ...generateNumberArray(Number(totalProduct)),
                  2,
                ],
                area: true,
              },
            ]}
            width={600}
            height={500}
          />
          <div className="mx-auto w-11/12 text-center text-xl font-bold my-10">
            Date VS. Product
          </div>
        </div>
        <div className="hidden sm:block md:hidden">
          <LineChart
            xAxis={[
              {
                data: [0, 0, 0, 0, 0, 0, 0, ...generateNumberArray(Number(12))],
              },
            ]}
            series={[
              {
                data: [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  ...generateNumberArray(Number(totalProduct)),
                  2,
                ],
                area: true,
              },
            ]}
            width={500}
            height={300}
          />
          <div className="mx-auto w-11/12 text-center text-xl font-bold my-10">
            Date VS. Product
          </div>
        </div>
        <div className="block sm:hidden">
          <LineChart
            xAxis={[
              {
                data: [0, 0, 0, 0, 0, 0, 0, ...generateNumberArray(Number(12))],
              },
            ]}
            series={[
              {
                data: [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,

                  ...generateNumberArray(Number(totalProduct)),
                  2,
                ],
                area: true,
              },
            ]}
            width={340}
            height={250}
          />
          <div className="mx-auto w-11/12 text-center text-xl font-bold my-10">
            Date VS. Product
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
