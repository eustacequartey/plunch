import React, { useContext } from "react";
import { CPModal } from "../components/general";
import styled from "styled-components";
import { AppContext } from "../context";

const Profile = () => {
  const { toggleLoggedIn } = useContext(AppContext);

  return (
    <ProfilePageSheet>
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
    </ProfilePageSheet>
  );

  function onLogout() {
    localStorage.removeItem("AUTH_TOKEN");
    localStorage.removeItem("USER");
    toggleLoggedIn();
  }
};

export default Profile;

const ProfilePageSheet = styled.div`
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
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    margin: 0 0 2rem 0;
  }

  .logoutButton {
    background-color: #fff;
    display: inline-block;
     padding: 4px 10px;
     border: 1px solid #1561ad;
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
