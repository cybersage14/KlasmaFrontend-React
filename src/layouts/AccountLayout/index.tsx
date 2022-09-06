import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router";
import Loading from "../../components/Loading";
import ScrollFab from "../../components/ScrollFab";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AccountLayout() {
  return (
    <Box>
      <Stack direction="row">
        <Sidebar />
        <Box flexGrow={1} bgcolor="#eeeeee" minHeight="100vh">
          <Navbar />
          <Outlet />
          <ScrollFab />
        </Box>
      </Stack>
      <Loading />
    </Box>
  )
}