import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../context";
import Lottie from "react-lottie";
import animationData from "../assets/lottie/27474-food-delivery.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Home = () => {
  const { onLogout } = useContext(AppContext);

  return (
    <HomePageSheet>
      <div className="header">
        <div>
          <h4>Home</h4>
        </div>

        <div>
          <button className="logoutButton" onClick={onLogout}>
            <h4 className="logoutText">Logout</h4>
          </button>
        </div>
      </div>

      <div>
        <Lottie options={defaultOptions} height={700} />
      </div>
    </HomePageSheet>
  );
};

export default Home;

const HomePageSheet = styled.div`
  display: flex;
  flex: 1;
  border: 1px dotted #e2e8f0;
  flex-direction: column;
  p {
    margin: 0;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 1000;
    margin: 0;
    padding: 0 0 0 0;
    color: #718096;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    margin: 0 0 2rem 0;
    // border: 1px solid;
  }

  .logoutButton {
    background-color: #fff;
    display: inline-block;
     padding: 4px 10px;
     border: 1px solid #a0d2eb;
     margin: 0 0 0 1rem;
     box-sizing: border-box;
     text-decoration: none;
     font-family: "Roboto", sans-serif;
     font-weight: 300;
     color: #000000;
     text-align: center;
     transition: all 0.2s;
    cursor: pointer;
  }

  .logoutButton:hover {
    color: #fff;
    background-color: #a0d2eb;
    border: 0.1em solid #a0d2eb;

    .logoutText {
      color: #fff;
    }
  }
`;
