import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../context";
import { Board } from "../components/admin";
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

const Admin = (props) => {
  return (
    <AdminPageSheet>
      <div className="header">
        <div>
          <h4>Administrator Portal</h4>
        </div>
      </div>
      <Board sub={props.match.params.sub} push={props.history.push} />
    </AdminPageSheet>
  );
};

export default Admin;

const AdminPageSheet = styled.div`
  display: flex;
  flex: 1;
  border: 1px dotted #e2e8f0;
  flex-direction: column;
  p {
    margin: 0;
  }

  h4 {
    font-size: 1.4rem;
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
    background-color: #a0aec0;
    display: inline-block;
     padding: 4px 10px;
     border: 1px solid #a0aec0;
     margin: 0 0 0 1rem;
     box-sizing: border-box;
     text-decoration: none;
     font-family: "Roboto", sans-serif;
     font-weight: 300;
     text-align: center;
     transition: all 0.2s;
    cursor: pointer;

    .logoutText {
      color: #fff;
      font-size: 1.2rem;
    }
  }

  .logoutButton:hover {
    color: #fff;
    background-color: #fff;
    border: 0.1em solid #a0aec0;

    .logoutText {
      color: #a0aec0;
    }
  }

  .adminDashboard {
    border: 1px solid black;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .adminDashboardTop {
      border: 1px solid red;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
`;
