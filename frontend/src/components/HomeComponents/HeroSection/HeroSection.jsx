import React from "react";
import styled from "styled-components";
import { colors } from "../../../colors";
import { Link } from "react-router-dom";
import Section from "../../Global/components/Section/Section";
import Button from "../../Global/components/Button/Button";
import RightHero from "../../../assets/images/right-hero.svg";
import Layout from "../../Global/components/Layout/Layout";
import CovidDetails from "../CovidDetails/CovidDetails";
import { fonts } from "../../../fonts";

const HeroSectionContainer = styled(Section)``;

const HeroSectionTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeroSectionBottom = styled.div``;

const GridLeft = styled.div``;
const GridRight = styled.div``;
const H1 = styled.h1`
  font-weight: ${fonts.bold};
  color: ${colors.darkBrown};
  font-size: 64px;
  line-height: 0.95;
  margin-bottom: 30px;
`;

const Description = styled.div`
  font-size: 25px;
  color: ${colors.darkBrown};
  opacity: 0.8;
  margin-bottom: 40px;
`;

const CTAButton = styled(Button)`
  font-weight: bold;
  width: 300px;
  height: 75px;
  font-size: 25px;
`;

const CovidTitle = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: ${fonts.bold};
  color: ${colors.primary};
  display: flex;
  justify-content: center;
`;

const HeroSection = () => {
  return (
    <HeroSectionContainer>
      <Layout>
        <HeroSectionTop>
          <GridLeft>
            <H1>
              <span>Take appointments</span>
              <br />
              <span>online with best</span>
              <br />
              <span>doctors</span>
            </H1>
            <Description>
              <span>Our skilled doctors have tremendous experience with</span>
              <br />
              <span>wide range of diseases to serve the needs of our</span>
              <br />
              <span>patients</span>
            </Description>
            <Link to="/login_options">
              <CTAButton>Get Started</CTAButton>
            </Link>
          </GridLeft>
          <GridRight>
            <img src={RightHero} alt={"A man having xray"} />
          </GridRight>
        </HeroSectionTop>
        <HeroSectionBottom>
          <CovidTitle>Current Covid Status In World</CovidTitle>
          <CovidDetails />
        </HeroSectionBottom>
      </Layout>
    </HeroSectionContainer>
  );
};

export default HeroSection;
