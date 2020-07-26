import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../context";
import Lottie from "react-lottie";
import animationData from "../assets/lottie/8603-profile.json";
import GET_PROFILE from "../graphql/queries/profile";
import { useQuery } from "@apollo/react-hooks";
import { Form, Input, Button, Skeleton, Switch } from "antd";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Profile = () => {
  return (
    <ProfilePageSheet>
      <div className="header">
        <div>
          <h4>Profile</h4>
        </div>
      </div>

      <div style={{ margin: "0 0 5rem 0" }}>
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>

      <div>
        <Fetcher />
      </div>
    </ProfilePageSheet>
  );
};

const Fetcher = () => {
  const { loading, error, data } = useQuery(GET_PROFILE);

  if (loading) {
    return <Skeleton />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <FormDisplay profile={data.profile} />;
};

const FormDisplay = ({ profile }) => {
  return (
    <div style={{ margin: "0 auto" }}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: "large" }}
        onValuesChange={() => {
          void 0;
        }}
        size={"large"}>
        <Form.Item label="First Name">
          <Input value={profile.firstName} />
        </Form.Item>
        <Form.Item label="Other Names">
          <Input value={profile.otherNames} />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input value={profile.lastName} />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={profile.email} />
        </Form.Item>
        <Form.Item label="Password">
          <Input value={profile.password} />
        </Form.Item>

        <Button>Save</Button>
      </Form>
    </div>
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
