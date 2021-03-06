import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import "./Sidebar.css";
import DashboardHeader from "./DashboardHeader";
import axios from "../axios";
import { useHistory } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DevicesIcon from "@material-ui/icons/Devices";
import "./DeviceModal.css";
import SidebarItem from "./SidebarItem";
import { Button, Table } from "react-bootstrap";
function ShowDevices(props) {
  const [motionSensorData, setMotionSensorData] = useState({});
  const [tempSensorData, setTempSensorData] = useState({});
  const [buzzerData, setBuzzerData] = useState({});
  const [ldrSensorData, setLdrSensorData] = useState({});
  const [lightSensorData, setLightSensorData] = useState({});
  const { username } = (props.location && props.location.state) || {};
  const history = useHistory();

  useEffect(() => {
    axios.get("/api/motionsensor/610e516c4a368a0004f8cef8").then((response) => {
      setMotionSensorData(response.data);
      console.log(motionSensorData);
    });
  }, [motionSensorData]);
  useEffect(() => {
    axios.get("/api/lightsensor/6109836e12f16a0518d81300").then((response) => {
      setLightSensorData(response.data);
    });
  }, [lightSensorData]);
  useEffect(() => {
    axios.get("/api/ldr/610f85171c3273000450d213").then((response) => {
      setLdrSensorData(response.data);
    });
  }, [ldrSensorData]);
  useEffect(() => {
    axios
      .get("/api/temphumidsensor/610e50ec4a368a0004f8cef7")
      .then((response) => {
        setTempSensorData(response.data);
      });
  }, [tempSensorData]);
  useEffect(() => {
    axios.get("/api/buzzer/610ecfd9948a660004840f10").then((response) => {
      setBuzzerData(response.data);
    });
  }, [buzzerData]);
  const logout = () => {
    history.push("/login");
  };
  const addDevice = () => {
    history.push({
      pathname: "/addDevice",
      state: {
        username: username,
      },
    });
  };

  return (
    <>
      <div className="dashboard">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar__top">
            <img
              src="https://zigron.goabode.com/assets/images/app-logo-2.svg"
              alt="logo"
            />
            <h3>Virtual Gateway</h3>
          </div>
          <div className="sidebarItems">
            <SidebarItem
              Icon={DashboardIcon}
              className="sidebarItems__active"
              title="Dashboard"
            />
            <SidebarItem
              Icon={DevicesIcon}
              onClick={addDevice}
              title="Add Device"
            />
            <SidebarItem
              Icon={DevicesIcon}
              onClick={() => history.push("/showdevices")}
              title="Show Device"
              style={{ color: "white" }}
            />

            <SidebarItem Icon={ExitToAppIcon} onClick={logout} title="Logout" />
          </div>
        </div>
        {/* Sidebar End */}
        <div style={{ flex: 1 }}>
          <DashboardHeader className="dashboard__header" />
          <div className="dashboard__devices">
            <h3>Devices Data</h3>
            <div onClick={addDevice} className="add__item">
              {/* <AddIcon /> */}
              <h4></h4>
            </div>
          </div>

          <div className="showdevices__body">
            <div>
              <h4>Motion Sensor</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sensor Name</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th colspan="2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Motion Sensor</td>
                    <td>{motionSensorData["stat"]}</td>
                    <td>{motionSensorData["date"]}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          axios
                            .put("/api/motionsensor/610e516c4a368a0004f8cef8", {
                              stat: "detected",
                            })
                            .then((response) => {
                              if (response.status === 200) {
                                axios
                                  .get(
                                    "/api/motionsensor/610e516c4a368a0004f8cef8"
                                  )
                                  .then((res) => {
                                    setMotionSensorData(res.data);
                                  });
                              }
                            });
                        }}
                      >
                        Set Detected
                      </Button>{" "}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          axios
                            .put("/api/motionsensor/610e516c4a368a0004f8cef8", {
                              stat: "not detected",
                            })
                            .then((response) => {
                              if (response.status === 200) {
                                axios
                                  .get(
                                    "/api/motionsensor/610e516c4a368a0004f8cef8"
                                  )
                                  .then((res) => {
                                    setMotionSensorData(res.data);
                                  });
                              }
                            });
                        }}
                      >
                        Set Not Detected
                      </Button>{" "}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <h4>Temparature and Humidity Sensor</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sensor Name</th>
                    <th>Celsius</th>
                    <th>Fahrenheit</th>
                    <th>Humidity</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Temperature Humidity Sensor</td>
                    <td>{tempSensorData["celsius"]} C</td>
                    <td>{tempSensorData["fahrenheit"]} F</td>
                    <td>{tempSensorData["humidity"]} </td>
                    <td>{tempSensorData["date"]}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <h4>Light Intensity Sensor</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sensor Name</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Light Sensor</td>
                    <td>{lightSensorData["stat"]}</td>
                    <td>{lightSensorData["date"]}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <h4>Buzzer Sensor</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sensor Name</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th colspan="2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Buzzer</td>
                    <td>{buzzerData["status"]}</td>
                    <td>{buzzerData["date"]}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          axios
                            .put("/api/buzzer/610ecfd9948a660004840f10", {
                              status: "on",
                            })
                            .then((response) => {
                              if (response.status === 200) {
                                axios
                                  .get("/api/buzzer/610ecfd9948a660004840f10")
                                  .then((res) => {
                                    setBuzzerData(res.data);
                                  });
                              }
                            });
                        }}
                      >
                        Turn On
                      </Button>{" "}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          axios
                            .put("/api/buzzer/610ecfd9948a660004840f10", {
                              status: "off",
                            })
                            .then((response) => {
                              if (response.status === 200) {
                                axios
                                  .get("/api/buzzer/610ecfd9948a660004840f10")
                                  .then((res) => {
                                    setBuzzerData(res.data);
                                  });
                              }
                            });
                        }}
                      >
                        Turn Off
                      </Button>{" "}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <h4>LDR Sensor</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sensor Name</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th colspan="2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>LDR Light</td>
                    <td>{ldrSensorData["status"]}</td>
                    <td>{ldrSensorData["date"]}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          axios
                            .put("/api/ldr/610f85171c3273000450d213", {
                              status: "on",
                            })
                            .then((response) => {
                              if (response.status === 200) {
                                axios
                                  .get("/api/ldr/610f85171c3273000450d213")
                                  .then((res) => {
                                    setLdrSensorData(res.data);
                                  });
                              }
                            });
                        }}
                      >
                        Turn On
                      </Button>{" "}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          axios
                            .put("/api/ldr/610f85171c3273000450d213", {
                              status: "off",
                            })
                            .then((response) => {
                              if (response.status === 200) {
                                axios
                                  .get("/api/ldr/610f85171c3273000450d213")
                                  .then((res) => {
                                    setLdrSensorData(res.data);
                                  });
                              }
                            });
                        }}
                      >
                        Turn Off
                      </Button>{" "}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowDevices;
