import { TProduct } from "../../../globalTypes/globalTypes";
import ReportTableBody from "./ReportTableBody";

const ReportTable = ({ reportedProducts}:{ reportedProducts:TProduct[]}) => {
  return (
    <div className="overflow-x-auto shadow-lg">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th></th>
            <th>Product image</th>
            <th>Product name</th>
            <th>Seller name</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {reportedProducts.map((reportedProduct, i) => (
            <ReportTableBody
              key={reportedProduct._id}
              reportedProduct={reportedProduct}
              i={i}
              
            ></ReportTableBody>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
