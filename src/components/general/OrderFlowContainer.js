import React from "react";
import styled from "styled-components";
import OrderFlow from "./OrderFlow";
import GET_ORDERS from "../../graphql/queries/myOrders";
import { useQuery } from "@apollo/react-hooks";
import { Empty, Skeleton, Button } from "antd";
import { withRouter } from "react-router-dom";
import { Spinner } from "evergreen-ui";

const Main = (props) => {
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
  return <OrderFlowContainer data={data} push={props.history.push} />;
};

function OrderFlowContainer({ data, push }) {
  return (
    <OrderFlowContainerSheet>
      {data.profile.orders.length === 0 && (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={
            <div>
              <p>No Orders Yet</p>
              <Button type="dashed" size="large" onClick={() => push("/order")}>
                PLACE ORDER
              </Button>
            </div>
          }
        />
      )}
      {data.profile.orders.map((order, key) => {
        return <OrderFlow {...order} key={key} />;
      })}
    </OrderFlowContainerSheet>
  );
}

export default withRouter(Main);

const OrderFlowContainerSheet = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem 0;
`;
