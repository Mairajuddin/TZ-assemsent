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
import { FireApi } from "../hooks/useRequest";

const HomePage = () => {
  const { users, updateUser } = useContext(Context);
  const [preview, setPreview] = useState(""); // stores base64 string

  const [data, setData] = useState({
    file: "",
    username: "",
    email: "",
    phone: "",
    interviewTime: "",
    role: "",
    isAssign: false,
  });

  const InterviewTimeZone = ["MORNING", "EVENING"];

  const handleInputChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("interviewTime", data.interviewTime);
    formData.append("role", data.role);
    formData.append("isAssign", data.isAssign);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    updateUser(formData);
    updateUser(data);
    try {
      const response = await FireApi('register', 'POST', formData);
     
        console.log(response)
        setData({
          file: "",
          username: "",
          email: "",
          phone: "",
          interviewTime: "",
          role: "",
          isAssign: false,
        });


    
    } catch (error) {
console.log(error)
    }

  };

  const handleRadioChange = (event) => {
    setData({
      ...data,
      role: event.target.value,
    });
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

          {/* <img src={data.file} /> */}
          {preview && (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={preview}
                alt="preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}


          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              handleInputChange("file", file);
              const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result); // reader.result is base64 string
    };
    reader.readAsDataURL(file);
  
            }}

          />
        </Box>


        <Box my={5} sx={{ justifyContent: "center", alignItems: "center" }}>
          {/* <form onSubmit={handleAddUser}> */}
          <Grid container xs={12}>
            <Grid item xs={12} md={6}>
              <InputLabel>User Name</InputLabel>
              <TextField
                placeholder="Enter Username"
                value={data.username}
                name="username"
                onChange={(e) => handleInputChange("username", e.target.value)}
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
                name="phone"
                value={data.phone}
                onChange={(e) =>
                  handleInputChange("phone", e.target.value)
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
              checked={data.isAssign}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  isAssign: e.target.checked,
                }))
              }
              color="primary"
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
              value={data.role}
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
