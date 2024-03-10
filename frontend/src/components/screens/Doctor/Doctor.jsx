import React from "react";
import styled from "styled-components";
import NavBar from "../../Global/components/NavBar/NavBar";
import Footer from "../../Global/components/Footer/Footer";

const DoctorsScreen = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Doctor = () => {
  return (
    <DoctorsScreen>
      <NavBar />
      <Footer />
    </DoctorsScreen>
  );
};

export default Doctor;
