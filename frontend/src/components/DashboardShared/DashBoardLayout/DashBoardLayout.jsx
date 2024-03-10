import React from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
`;

const FlexRight = styled.div`
  flex: 1;
`;

const FlexLeft = styled.div`
  width: 300px;
`;

const DashBoardLayout = ({ type, id, menuData, children }) => {
  return (
    <div>
      <NavBar type={type} id={id} />
      <FlexContainer>
        <FlexLeft>
          <SideBar sidebarData={menuData} />
        </FlexLeft>
        <FlexRight>{children}</FlexRight>
      </FlexContainer>
    </div>
  );
};

export default DashBoardLayout;
