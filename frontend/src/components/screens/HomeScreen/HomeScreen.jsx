import React, { useEffect } from "react";
import styled from "styled-components";
import NavBar from "../../Global/components/NavBar/NavBar";
import HeroSection from "../../HomeComponents/HeroSection/HeroSection";

import SolutionSteps from "../../HomeComponents/SolutionSeps/SolutionSteps";
import Advantages from "../../HomeComponents/Advantages/Advantages";
import Specialities from "../../HomeComponents/Specialities/Specialities";
import Footer from "../../Global/components/Footer/Footer";

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HomeScreen = () => {
  const OneSignal = window.OneSignal;
  window.OneSignal = window.OneSignal || [];

  return (
    <HomeContainer>
      <NavBar />
      <HeroSection />
      <SolutionSteps />
      <Advantages />
      <Specialities />
      <Footer />
    </HomeContainer>
  );
};

export default HomeScreen;
