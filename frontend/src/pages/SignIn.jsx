import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../theme/AppTheme.js";
import { useDispatch } from "react-redux";
import { signIn } from "../reducers/authReducer.jsx";
import {Link, useNavigate} from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn(props) {
  const [formInfo, setFormInfo] = useState({});
  const [formErrorInfo, setFormErrorInfo] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormInfo = (e) => {
    setFormInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formErrorInfo.email.isError || formErrorInfo.password.isError) return;
    dispatch(signIn(formInfo)).then((respo)=>{
      const {token} = respo.payload;
      if(token) navigate('/product');
    });
  };
  const handleFormErrorInfoState = (objType, isError, errorMessage) => {
    setFormErrorInfo((prev) => ({
      ...prev,
      [objType]: { isError, errorMessage },
    }));
  };
  const validateInputs = () => {
    let isValid = true;
    if (!formInfo.email || !/\S+@\S+\.\S+/.test(formInfo.email)) {
      handleFormErrorInfoState(
        "email",
        true,
        "Please enter a valid email address."
      );
      isValid = false;
    } else {
      handleFormErrorInfoState("email", false, "");
    }

    if (!formInfo.password || formInfo.password.length < 4) {
      handleFormErrorInfoState(
        "password",
        true,
        "Password must be at least 4 characters long."
      );
      isValid = false;
    } else {
      handleFormErrorInfoState("password", false, "");
    }
    return isValid;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="Enter Email"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                error={formErrorInfo.email?.isError}
                helperText={formErrorInfo.email?.errorMessage}
                color={formErrorInfo.email?.isError ? "error" : "primary"}
                onChange={(e) => handleFormInfo(e)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                name="password"
                placeholder="Enter password"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                error={formErrorInfo.password?.isError}
                helperText={formErrorInfo.password?.errorMessage}
                color={formErrorInfo.password?.isError ? "error" : "primary"}
                onChange={(e) => handleFormInfo(e)}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <span>
                <Link
                  to={"/signup"}
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Sign up
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
