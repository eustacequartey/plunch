import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import GET_PROFILE from "../graphql/queries/profile";
import { useQuery } from "@apollo/react-hooks";
import { Form, p, Button, Skeleton, Card, Avatar } from "antd";
const { Meta } = Card;

const Profile = () => {
  return (
    <ProfilePageSheet>
      <div className="header">
        <div>
          <h4>Profile</h4>
        </div>
      </div>

      <div>
        <Fetcher />
      </div>
    </ProfilePageSheet>
  );
};

const Fetcher = () => {
  const { loading, error, data } = useQuery(GET_PROFILE);
  const hoverable = false;
  const gridStyle = {
    width: "50%",
    textAlign: "center",
  };

  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <Card
      title="Profile Card"
      style={{ width: "100%", marginTop: 16 }}
      loading={loading}>
      <Card.Grid hoverable={hoverable} style={gridStyle}>
        <div className="field">
          <p>First Name</p>
          <p>{data && data.profile.firstName}</p>
        </div>
      </Card.Grid>
      <Card.Grid hoverable={hoverable} style={gridStyle}>
        <div className="field">
          <p>Other Names</p>
          <p>{data && data.profile.otherNames}</p>
        </div>
      </Card.Grid>
      <Card.Grid hoverable={hoverable} style={gridStyle}>
        <div className="field">
          <p>Last Name</p>
          <p>{data && data.profile.lastName}</p>
        </div>
      </Card.Grid>
      <Card.Grid hoverable={hoverable} style={gridStyle}>
        <div className="field">
          <p>Email</p>
          <p>{data && data.profile.email}</p>
        </div>
      </Card.Grid>
      <Card.Grid hoverable={hoverable} style={gridStyle}>
        <div className="field">
          <p>Date of Birth</p>
          <p>+233 {data && data.profile.phone}</p>
        </div>
      </Card.Grid>
      <Card.Grid hoverable={hoverable} style={gridStyle}>
        <div className="field">
          <p>Phone</p>
          <p>{data && moment(data.profile.dob).format("Do MMMM, YYYY")}</p>
        </div>
      </Card.Grid>
      <Card.Grid hoverable={hoverable} style={gridStyle}>
        <div className="field">
          <p>Address</p>
          <p>{data && data.profile.address}</p>
        </div>
      </Card.Grid>
      <Card.Grid hoverable={hoverable} style={gridStyle}>
        <div className="field">
          <p>Month Expenditure</p>
          <p>{data && data.profile.address}</p>
        </div>
      </Card.Grid>
    </Card>
  );
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

  .field {
    display: flex;
    justify-content: space-between;
  }
`;
