import { Box, Button, Container, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Model from "../components/Model";
import { useDispatch, useSelector } from "react-redux";
import {
  addCatgory,
  deleteCatgory,
  getCatgoryList,
  updateCatgory,
} from "../reducers/categoryReducer";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const Category = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formInfo, setFormInfo] = useState({});
  const [formErrorInfo, setFormErrorInfo] = useState({});
  const categoryList = useSelector((state) => state.category.data);
  const handleOpen = () => {
    setFormInfo({});
    setOpen(true);
  };
  const handleClose = () => {
    setFormInfo({});
    setOpen(false);
  };

  const handleFormInfo = (e) => {
    setFormInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    validateInputs();
    if(formInfo._id){
      dispatch(updateCatgory(formInfo)).then(() => {
        dispatch(getCatgoryList());
        handleClose();
      });
    } else {
      dispatch(addCatgory(formInfo)).then(() => {
        dispatch(getCatgoryList());
        handleClose();
      });
    }
  };
  const handleFormErrorInfoState = (objType, isError, errorMessage) => {
    setFormErrorInfo((prev) => ({
      ...prev,
      [objType]: { isError, errorMessage },
    }));
  };
  const validateInputs = () => {
    let isValid = true;
    if (!formInfo.name) {
      handleFormErrorInfoState("name", true, "Name is required.");
      isValid = false;
    } else {
      handleFormErrorInfoState("name", false, "");
    }
    return isValid;
  };

  const handleDelete = (_id) => {
    {
      dispatch(deleteCatgory(_id)).then(() => {
        dispatch(getCatgoryList());
      });
    }
  };
  const handleUpdate = (row) => {
    handleOpen();
    setFormInfo({ name: row.name, _id: row._id });
  };

  useEffect(() => {
    dispatch(getCatgoryList());
  }, [formInfo]);

  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Categories</Typography>
        <Button variant="contained" onClick={handleOpen}>
          Add Category
        </Button>
        <Model
          open={open}
          buttonText={formInfo._id ? "Update" : "Save"}
          handleClose={handleClose}
          title={formInfo._id ? "Update Category" : "Add Category"}
          handleSubmit={handleSubmit}
        >
          <TextField
            id="name"
            label="Name"
            name="name"
            variant="standard"
            fullWidth
            value={formInfo?.name}
            error={formErrorInfo.name?.isError}
            helperText={formErrorInfo.name?.errorMessage}
            color={formErrorInfo.name?.isError ? "error" : "primary"}
            onChange={(e) => handleFormInfo(e)}
          />
        </Model>
      </Box>
      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Action</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>CreatedBy</StyledTableCell>
                <StyledTableCell>createdAt</StyledTableCell>
                <StyledTableCell>UpdatedBy</StyledTableCell>
                <StyledTableCell>UpdatedAt</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryList.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    <FaPenToSquare
                      size={20}
                      onClick={() => handleUpdate(row)}
                    />
                    <FaRegTrashCan
                      size={20}
                      onClick={() => handleDelete(row._id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.createdBy}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.updatedBy}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {new Date(row.updatedAt).toLocaleDateString()}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};
