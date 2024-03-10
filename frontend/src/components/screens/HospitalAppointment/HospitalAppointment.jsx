import React from "react";
import DashBoardLayout from "../../DashboardShared/DashBoardLayout/DashBoardLayout";
import useGetHospitalData from "../../../hooks/useGetHospitalSidebarData";
import DashBoardContentWrapper from "../../DashboardShared/DashBoardContentWrapper/DashBoardContentWrapper";
import PendingAppointments from "../../PendingAppointments/PendingAppointments";
import ApprovedAppointments from "../../ApprovedAppointments/ApprovedAppointments";

const HospitalAppointment = () => {
  const { hospitalMenuData } = useGetHospitalData();
  return (
    <DashBoardLayout>
      <DashBoardContentWrapper>
        <PendingAppointments />
        <ApprovedAppointments />
      </DashBoardContentWrapper>
    </DashBoardLayout>
  );
};

export default HospitalAppointment;
