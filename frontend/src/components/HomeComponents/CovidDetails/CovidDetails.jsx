import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../../colors";
import axiosRequests from "../../../utils/axiosRequests";
import internationalNumber from "../../../utils/internationalNumber";

const CovidContainer = styled.div`
  background: ${colors.primary};
  color: ${colors.white};
  padding: 60px 70px;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
`;

const Box = styled.div`
  text-align: center;
  border-right: 1px solid
    ${(props) => (props.isLast === true ? "transparent" : colors.grey)};
  flex: 1;
`;

const BoxValue = styled.div`
  font-size: 45px;
  font-weight: bold;
`;

const BoxDescription = styled.div`
  font-size: 20px;
`;

const URL = `https://disease.sh/v3/covid-19/all`;

const CovidDetails = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ cases: 0, deaths: 0, recovered: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    const getCovidResponse = async (url, options) => {
      let [data, error] = await axiosRequests(url, options);
      setLoading(false);
      if (data) {
        console.log(data);
        const { cases, deaths, recovered } = data.data;
        setData({ cases, deaths, recovered });
        return;
      }
      setError(error.message);
      alert(error.message);
    };
    getCovidResponse(URL, {});
  }, []);

  console.log({ error, loading });

  return (
    <CovidContainer>
      <Box>
        <BoxValue>{internationalNumber(data.cases)}</BoxValue>
        <BoxDescription>Total Cases</BoxDescription>
      </Box>
      <Box>
        <BoxValue>{internationalNumber(data.recovered)}</BoxValue>
        <BoxDescription>Total Recovered</BoxDescription>
      </Box>
      <Box isLast>
        <BoxValue>{internationalNumber(data.deaths)}</BoxValue>
        <BoxDescription>Total Deaths</BoxDescription>
      </Box>
    </CovidContainer>
  );
};

export default CovidDetails;
