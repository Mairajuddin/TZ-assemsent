import { Grid, Typography, Button, Box, TextField } from "@mui/material";
import { useState, useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";

const HomePage = () => {
  const { users, updateUser } = useContext(Context);
  const [data, setData] = useState({
    file: "",
    name: "",
    email: "",
    phoneNumber: "",
    interviewTime: "",
    selectedRole: "",
    status: "",
  });

  const InterviewTimeZone = ["Morning", "Evening"];

  const handleInputChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    console.log([data], "data");

    updateUser(data);
  };

  const handleRadioChange = (event) => {
    setData({
      ...data,
      selectedRole: event.target.value,
    });
  };

  const handleSwitchChange = () => {
    setData((prevUserData) => ({
      ...prevUserData,
      isSwitchEnabled: !prevUserData.isSwitchEnabled,
      selectedRole: prevUserData.isSwitchEnabled ? "" : "active",
    }));
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        padding: "30px",
      }}
    >
      <form onSubmit={handleAddUser}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: 300, color: "#333333" }}
        >
          User Form
        </Typography>

        <Box
          sx={{
            display: "flex",
            height: "73px",
            width: "159px",
            marginTop: "20px",
            border: "1px dashed #CCCCCC",
            top: "145px",
            Radius: "2px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label htmlFor="fileInput">
            <Button
              sx={{
                width: "81px",
                height: "31px",
                backgroundColor: "#E4E4E4",
              }}
              component="span"
            >
              <Typography
                sx={{
                  display: "flex",
                  fontSize: "11px",
                  lineHeight: "15px",
                  color: "#333333",
                }}
              >
                + Browse
              </Typography>
            </Button>
          </label>

          <img src={data.file} />

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) {
                return;
              }

              const reader = new FileReader();
              reader.onload = (event) => {
                if (event.target?.result) {
                  const base64Content = event.target.result;
                  handleInputChange("file", base64Content);
                }
              };

              reader.readAsDataURL(file);
            }}
          />
        </Box>
        {/* {data.file && (
          <Box
            sx={{
              display: "flex",
              height: "73px",
              width: "159px",
              marginTop: "20px",
              border: "1px dashed #CCCCCC",
              top: "145px",
              Radius: "2px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={data.file} alt="file" />
          </Box>
        )} */}

        <Box my={5} sx={{ justifyContent: "center", alignItems: "center" }}>
          {/* <form onSubmit={handleAddUser}> */}
          <Grid container xs={12}>
            <Grid item xs={12} md={6}>
              <InputLabel>User Name</InputLabel>
              <TextField
                placeholder="Enter Username"
                value={data.userName}
                name="userName"
                onChange={(e) => handleInputChange("userName", e.target.value)}
                sx={{ width: "70%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {" "}
              <InputLabel>Email</InputLabel>
              <TextField
                placeholder="Enter Email"
                name="email"
                value={data.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                sx={{ width: "70%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel sx={{ marginTop: "30px" }}>Phone Number</InputLabel>
              <TextField
                placeholder="Enter Phone"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                sx={{ width: "70%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={InterviewTimeZone}
                name="interviewTime"
                onChange={(e, value) => {
                  data["interviewTime"] = value;
                }}
                sx={{ width: "70%", marginTop: "40px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Interview Prefered Time" />
                )}
              />
            </Grid>
          </Grid>
          <Box
            sx={{ marginTop: "30px", display: "flex", alignItems: "center" }}
          >
            <Switch
              {...(data.status === "active"
                ? { color: "primary" }
                : { color: "default" })}
              onChange={handleSwitchChange}
              name="status"
            />
            <Typography
              sx={{
                marginLeft: "10px",
                color: "#666666",
                fontSize: "16px",
                lineHeight: "18px",
              }}
            >
              Select Your Role (optional)
            </Typography>
          </Box>
          <Box my={4}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={data.selectedRole}
              onChange={handleRadioChange}
              sx={{
                marginLeft: "10px",
                color: "#666666",
              }}
            >
              <FormControlLabel
                value="Student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="Teacher"
                control={<Radio />}
                label="Teacher"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginTop: "30px",
              marginRight: "20px",
              justifyContent: "right",
              alignItems: "right",
            }}
          >
            <Button
              type="submit"
              sx={{
                width: "176px",
                height: "56px",
                padding: "16px",
                backgroundColor: "#7A5CFA",
                color: "#ffff",
                "&:hover": {
                  backgroundColor: "#6C48D4", // Darker background color on hover
                },
              }}
            >
              {" "}
              ADD USER
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default HomePage;
