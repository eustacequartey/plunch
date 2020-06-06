import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Spin, Skeleton } from "antd";
import styled from "styled-components";

const GET_SIDE_DISHES = gql`
  {
    sidedishes {
      id
      name
      type
    }
  }
`;

function Side({}) {
  const { loading, error, data } = useQuery(GET_SIDE_DISHES);
  const [stateData, setData] = React.useState([]);
  if (loading)
    return (
      <>
        <Skeleton paragraph={{ rows: 4 }} active />;
        <Skeleton paragraph={{ rows: 4 }} active />;
        <Skeleton paragraph={{ rows: 4 }} active />;
      </>
    );
  if (error) return `Error! ${error.message}`;
  if (data) return <Display data={data} />;
}

function Display({ data }) {
  const [FoodData, setFoodData] = React.useState([]);

  React.useEffect(() => {
    setFoodData(collateCategories(data.sidedishes));
  }, [data]);

  return (
    <>
      {Object.keys(FoodData).map((el) => (
        <Row title={el} data={FoodData[el]} />
      ))}
    </>
  );

  function collateCategories(rawData) {
    const collatedCategories = {};
    rawData.forEach((el) => {
      if (!Object.keys(collatedCategories).includes(el.type)) {
        collatedCategories[el.type] = [];
      }
    });

    rawData.forEach((el) => {
      collatedCategories[el.type] = [...collatedCategories[el.type], el];
    });

    return collatedCategories;
  }
}

function Row({ title, data }) {
  return (
    <>
      <p>{`${title} DISHES`}</p>
      <Sheet>
        {data.map((sidedish) => (
          <FoodCard
            key={sidedish.id}
            name={sidedish.name}
            type={sidedish.type}
          />
        ))}
      </Sheet>
    </>
  );
}

function FoodCard({ name, type }) {
  const typesrcs = {
    DUMPLING:
      "https://images.pexels.com/photos/3758959/pexels-photo-3758959.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    RICE:
      "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    HOTSAUCE:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/5/9/0/FNM_060111-Insert-008-d_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371597500184.jpeg",
  };

  return (
    <Card>
      <img
        className={"image"}
        src={
          typesrcs[type] ||
          "https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }
      />
      <h4 className="name">{name}</h4>
    </Card>
  );
}

export default Side;

const Sheet = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Card = styled.div`
  border: 1px solid #cbd5e0;
  margin: 0 0 1rem 0;
  background: #edf2f7;
  border-radius: 1rem;
  width: 12rem;
  height: 10rem;
  word-wrap: break-word;
  margin: 0 0.5rem;

  .name {
    font-size: 1rem;
    color: #4a5568;
    text-align: center;
  }

  .image {
    width: 100%;
    height: 8rem;
    display: block;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    object-fit: cover;
  }
`;
