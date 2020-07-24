import React from "react";
import styled from "styled-components";
import OrderFlow from "./OrderFlow";
import GET_ORDERS from "../../graphql/queries/myOrders";
import { useQuery } from "@apollo/react-hooks";
import { Empty, Skeleton } from "antd";
import { Spinner } from "evergreen-ui";

const Main = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading) return <Skeleton />;
  if (error)
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description="Failed to fetch. Check connection."
      />
    );
  return <OrderFlowContainer data={data} />;
};

function OrderFlowContainer({ data }) {
  console.log(data.profile);
  return (
    <OrderFlowContainerSheet>
      {data.profile.orders.map((order, key) => {
        return <OrderFlow {...order} key={key} />;
      })}
    </OrderFlowContainerSheet>
  );
}

export default Main;

const OrderFlowContainerSheet = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem 0;
`;
