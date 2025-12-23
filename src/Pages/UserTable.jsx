import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Switch } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { FireApi } from "../hooks/useRequest";

const UserTable = () => {
  // const { users } = useContext(Context);
 
const [users,setUsers]=useState()
const [count,setCount]=useState()
 

  const getUsers=async()=>{
    try {
      const response=await FireApi('all-candidates','GET');
      setUsers(response?.data?.users)
      setCount(response?.data?.count)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getUsers()
  },[])
  const columns = [
    { field: "email", headerName: "Email", width: 150, flex: 1 },
    {
      field: "file",
      headerName: "Profile",
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="User Avatar"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    { field: "userName", headerName: "Name", width: 150, flex: 1 },
    { field: "phoneNumber", headerName: "Phone", width: 150, flex: 1 },
    {
      field: "interviewTime",
      headerName: "Interview Time",
      width: 150,
      flex: 1,
    },
    { field: "selectedRole", headerName: "Selected Role", width: 150, flex: 1 },
    {
      field: "action",
      headerName: "Active",
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <Switch checked={params.row.action} onChange={() => {}} />
      ),
    },
  ];
  const check = users?.map((user, index) => {
  user.id = index + 1;
  return user;
}) || [];

  const rows = check;

  return (
    <Box sx={{ padding: "20px" }}>
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{ marginLeft: "10px", color: "#666666", fontWeight: 600 }}
        >
          {" "}
          Showing
        </Typography>
        <Box
          variant="body2"
          sx={{
            marginLeft: "10px",
            width: "60px",
            border: "1px solid #666666",
            height: "25px",
            color: "#666666",
            fontWeight: 600,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {count}
        </Box>
        <Typography
          sx={{ marginLeft: "10px", color: "#666666", fontWeight: 600 }}
        >
          {" "}
          Entries
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "20px",
          padding: "20px",
          height: "500px",
          width: "100%",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default UserTable;
