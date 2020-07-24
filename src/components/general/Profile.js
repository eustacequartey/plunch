import React from "react";
import styled from "styled-components";
import bell from "../../assets/images/bell.png";
import avatar from "../../assets/images/avatar.png";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/8603-profile.json";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("USER"));
  return (
    <ProfileSheet>
      <div className="topProfileSheet">{<StyledImage src={bell} />}</div>
      <div className="bottomProfileSheet">
        <div className="centerBottomProfileSheet">
          <Lottie options={defaultOptions} height={100} width={100} />
          <h4>{`${user.firstName} ${user.otherNames || ""} ${
            user.lastName
          }`}</h4>
          <h6>admin</h6>
        </div>
      </div>
    </ProfileSheet>
  );
};

export default Profile;

const ProfileSheet = styled.div`
  background-color: #2d3748;
  color: #fff;
  flex-basis: 23%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem 0.5rem 1rem;

  h4 {
    margin: 0;
    color: #f7fafc;
    font-size: 1rem;
    font-weight: 500;
  }
  h6 {
    margin: 0;
    color: #fff;
    font-size: 0.8rem;
  }
  .topProfileSheet {
    flex: 0.1;
  }
  .bottomProfileSheet {
    flex: 0.9;
    display: flex;

    .centerBottomProfileSheet {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
`;

const StyledImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 0;
`;

// 718096;
