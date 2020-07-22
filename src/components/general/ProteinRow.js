import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Spin, Skeleton } from "antd";
import styled from "styled-components";
import { AppContext } from "../../context/";

const GET_PROTEIN_DISHES = gql`
  {
    proteins {
      id
      name
      type
    }
  }
`;

function Protein({}) {
  const { loading, error, data } = useQuery(GET_PROTEIN_DISHES);

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
    setFoodData(collateCategories(data.proteins));
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
        {data.map((protein) => (
          <FoodCard
            key={protein.id}
            name={protein.name}
            type={protein.type}
            id={protein.id}
          />
        ))}
      </Sheet>
    </>
  );
}

function FoodCard({ name, type, id }) {
  const typesrcs = {
    MISCELLANEOUS:
      "https://images.pexels.com/photos/4040539/pexels-photo-4040539.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    MEAT:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    FISH:
      "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  };
  const { setProtein } = useContext(AppContext);

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
        <h4
          onClick={() => {
            setProtein(id);
          }}
          className="name">
          {name.toUpperCase()}
        </h4>
      </div>
    </Card>
  );
}

export default Protein;

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
    font-weight: 600;
    margin: 0;
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
