import CountUp from "react-countup";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { useSellerOverviewQuery } from "../../../redux/services/API";
import Loader from "../../Shered/Loader/Loader";
import { LineChart } from "@mui/x-charts/LineChart";

const SellerOverview = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useSellerOverviewQuery(user?._id as string);
  if (isLoading) {
    return <Loader></Loader>;
  }
  const { sellerProducts, orderCount, paidOrderCount } = data.data;
  const totalOrders = orderCount.length === 0 ? 0 : orderCount[0].totalOrders;
  const totalPaidOrders =
    paidOrderCount.length === 0 ? 0 : paidOrderCount[0].totalOrders;
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
              <CountUp end={Number(sellerProducts)} duration={4}></CountUp>
            </h4>
          </div>
        </div>
        <div className="shadow-xl w-11/12 m-5 p-5 rounded-lg">
          <div className="text-xl font-bold">Total Orders</div>
          <div>
            <h4 className="text-xl pl-4 font-semibold">
              <CountUp end={Number(totalOrders)} duration={4}></CountUp>
            </h4>
          </div>
        </div>
        <div className="shadow-xl w-11/12 m-5 p-5 rounded-lg">
          <div className="text-xl font-bold">Total Paid Orders</div>
          <div>
            <h4 className="text-xl pl-4 font-semibold">
              <CountUp end={Number(totalPaidOrders)} duration={4}></CountUp>
            </h4>
          </div>
        </div>
      </div>
      <div>
        <div className="hidden md:block">
          <LineChart
            xAxis={[
              {
                data: [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  ...generateNumberArray(Number(sellerProducts)),
                ],
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
                  ...generateNumberArray(Number(totalOrders)),
                ],
                area: true,
              },
            ]}
            width={600}
            height={500}
          />
          <div className="mx-auto w-11/12 text-center text-xl font-bold my-10">
            Products VS. Order Chart
          </div>
        </div>
        <div className="hidden sm:block md:hidden">
          <LineChart
            xAxis={[
              {
                data: [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  ...generateNumberArray(Number(sellerProducts)),
                ],
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
                  ...generateNumberArray(Number(totalOrders)),
                ],
                area: true,
              },
            ]}
            width={500}
            height={300}
          />
          <div className="mx-auto w-11/12 text-center text-xl font-bold my-10">
            Products VS. Order Chart
          </div>
        </div>
        <div className="block sm:hidden">
          <LineChart
            xAxis={[
              {
                data: [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  ...generateNumberArray(Number(sellerProducts)),
                ],
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
                  ...generateNumberArray(Number(totalOrders)),
                ],
                area: true,
              },
            ]}
            width={340}
            height={250}
          />
          <div className="mx-auto w-11/12 text-center text-xl font-bold my-10">
            Products VS. Order Chart
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;
