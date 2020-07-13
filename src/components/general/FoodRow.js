import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Button, Skeleton } from "antd";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";

const GET_MAIN_DISHES = gql`
  {
    maindishes {
      id
      name
      type
    }
  }
`;

function Main({}) {
  const { loading, error, data } = useQuery(GET_MAIN_DISHES);

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
    setFoodData(collateCategories(data.maindishes));
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
        {data.map((maindish) => (
          <FoodCard
            key={maindish.id}
            name={maindish.name}
            type={maindish.type}
          />
        ))}
      </Sheet>
    </>
  );
}

function FoodCard({ name, type }) {
  const typesrcs = {
    SOUP:
      "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80",
    STEW:
      "https://nitrocdn.com/kAYhDANARZBYBuChUfNCjMuCDSNidQew/assets/static/optimized/wp-content/uploads/2013/09/dea8e6f20be6ab50c0e95c8e413282ef.IMG_0446.jpg",
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
      <div className="bottom1">
        <h4 className="name">{name.toUpperCase()}</h4>
        <Button type="default" icon={<PlusOutlined />} size={"medium"}></Button>
      </div>
    </Card>
  );
}

export default Main;

const Sheet = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0.3rem 0;
`;

const Card = styled.div`
  border: 1px solid #cbd5e0;
  margin: 0 0 1rem 0;
  background: #edf2f7;
  border-radius: 0.5rem 0.5rem 0 0;
  width: 12rem;
  word-wrap: break-word;
  margin: 0.5rem 0.5rem;

  .name {
    color: #4a5568;
  }

  .image {
    width: 100%;
    height: 8rem;
    display: block;
    border-radius: 0.5rem 0.5rem 0 0;
    object-fit: cover;
  }

  .bottom1 {
    padding: 0.3rem 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    word-wrap: break-word;

    .add {
      padding: 0rem 0.4rem;
    }
  }
`;
