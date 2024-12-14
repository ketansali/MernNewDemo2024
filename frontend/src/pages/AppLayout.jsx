import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAuthToken,removeAuthToken } from "../reducers/authReducer";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";


const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.user.authToken);

  useEffect(() => {
    dispatch(addAuthToken());
    if (authToken) {
      navigate("/product");
    } else {
      navigate("/signin");
    }
  }, [authToken]);

  const handleLogout = () => {
    dispatch(removeAuthToken());
  };
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to={"/product"} style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Product
                </Button>
              </Link>
              <Link to={"/category"} style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Category
                </Button>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Button
                onClick={handleLogout}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};

export default AppLayout;
