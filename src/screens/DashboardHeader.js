import React from "react";
import "./DashboardHeader.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";
function DashboardHeader(props) {
  const history = useHistory();
  const logout = () => {
    history.push("/login");
  };
  return (
    <div className="dashboardHeader">
      <div className="dashboardHeader__icon">
        <ExitToAppIcon onClick={logout} />
      </div>
    </div>
  );
}

export default DashboardHeader;
