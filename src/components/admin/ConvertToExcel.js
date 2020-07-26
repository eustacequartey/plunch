import React from "react";
import { JsonToExcel } from "react-json-excel";
import { useQuery } from "@apollo/react-hooks";
import GET_ORDERS from "../../graphql/queries/orderBatch";
import moment from "moment";
import { Spin } from "antd";

const ConvertToExcel = ({ date = moment().format() }) => {
  const { error, loading, data } = useQuery(GET_ORDERS, {
    variables: { date },
  });

  const className = "class-name-for-style";
  const filename = "Order_Sheet";
  const fields = {
    createdAt: "Created At",
    createdFor: "Created For",
    main: "Main",
    side: "Side",
    protein: "Protein",
    comments: "Comments",
    createdBy: "Created By",
  };
  const style = {
    padding: "5px",
  };

  const text = "Export To Excel";

  return (
    <>
      {error && <p>Couldn't fetch</p>}
      {loading && <Spin />}
      {data && (
        <JsonToExcel
          data={data.orderBatch.map((order) => {
            return {
              ...order,
              createdFor: moment(order.createdFor).format("DD/MMM/YYYY"),
              createdAt: moment(order.createdAt).format("DD/MMM/YYYY"),
              createdBy: order.createdBy.firstName,
              main: order.main.name,
              side: order.side.name,
              protein: order.protein.name,
            };
          })}
          className={className}
          filename={filename}
          fields={fields}
          style={style}
          text={text}
        />
      )}
    </>
  );
};

export default ConvertToExcel;
