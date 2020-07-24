import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Skeleton } from "antd";
import styled from "styled-components";
import { AppContext } from "../../context/";

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
      {Object.keys(FoodData).map((el, index) => (
        <Row key={index} title={el} data={FoodData[el]} />
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
      <SectionHeader>{`${title} DISHES`}</SectionHeader>
      <Sheet>
        {data.map((maindish) => (
          <FoodCard
            key={maindish.id}
            name={maindish.name}
            type={maindish.type}
            id={maindish.id}
          />
        ))}
      </Sheet>
    </>
  );
}

function FoodCard({ name, type, id }) {
  const typesrcs = {
    SOUP:
      "https://images.unsplash.com/photo-1541095441899-5d96a6da10b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    STEW:
      "https://images.unsplash.com/photo-1560100927-c32f29063ade?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=80",
    HOTSAUCE:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/5/9/0/FNM_060111-Insert-008-d_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371597500184.jpeg",
  };
  const { setMainDish, currentOrder } = useContext(AppContext);
  return (
    <div>
      <Card
        onClick={() => {
          setMainDish(id);
        }}
        style={{
          border:
            currentOrder.mainDish === id
              ? "2px dotted #2C7A7B"
              : "1px solid #cbd5e0",
        }}>
        <img
          className={"image"}
          src={
            typesrcs[type] ||
            "https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          }
        />
        <div className="bottom1">
          <h4 className="name">{name.toUpperCase()}</h4>
        </div>
      </Card>
    </div>
  );
}

export default Main;

const Sheet = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  // padding: 0.3rem 0 1rem 0;
  margin: 0 0 2rem 0;
`;

const Card = styled.div`
  border: 1px solid #cbd5e0;
  // margin: 0 0 0 0;
  background: #edf2f7;
  border-radius: 0.5rem 0.5rem;
  width: 12rem;
  word-wrap: break-word;
  margin: 0.5rem 0.5rem;

  :hover {
    cursor: pointer;
  }
  .name {
    color: #4a5568;
    font-size: 1rem;
    padding: 0.5rem 0;
    margin: 0;
    font-weight: 600;
  }

  .name:hover {
    text-decoration: underline;
  }

  .image {
    width: 100%;
    height: 8rem;
    display: block;
    border-radius: 0.5rem 0.5rem 0 0;
    object-fit: cover;
    opacity: 0.8;
  }

  .image:hover {
    opacity: 1;
  }

  .bottom1 {
    padding: 0 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    word-wrap: break-word;

    .add {
      padding: 0rem 0.4rem;
    }
  }
`;

const SectionHeader = styled.p`
  font-size: 1.5rem;
  font-weight: 1000;
  margin: 0;
  padding-left: 10px;
`;
