import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Autocomplete,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import { useEffect, useState } from "react";
import Model from "../components/Model";
import { useDispatch, useSelector } from "react-redux";
import {
  getCatgoryList,
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
import { addProduct, deleteProduct, getProductById, getProductList, updateProduct } from "../services/product";
import Toaster from "../components/Toaster";

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

export const Product = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formInfo, setFormInfo] = useState({});
  const [formErrorInfo, setFormErrorInfo] = useState({});
  const [productList, setProductList] = useState([]);
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
    if (formInfo._id) {
      updateProduct(formInfo).then((updateRespo) => {
        Toaster({ message: updateRespo.message, type: "success" });
        getProductList().then((resop) => {
          setProductList(resop);
        });
        handleClose();
      });
    } else {
      addProduct(formInfo).then((addRespo) => {
        Toaster({ message: addRespo.message, type: "success" });
        getProductList().then((resop) => {
          setProductList(resop);
        });
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
    if (!formInfo.category) {
      handleFormErrorInfoState("category", true, "Category is required.");
      isValid = false;
    } else {
      handleFormErrorInfoState("category", false, "");
    }
    if (!formInfo.initialStock) {
      handleFormErrorInfoState(
        "initialStock",
        true,
        "InitialStock is required."
      );
      isValid = false;
    } else {
      handleFormErrorInfoState("initialStock", false, "");
    }
    if (!formInfo.price) {
      handleFormErrorInfoState("price", true, "Price is required.");
      isValid = false;
    } else {
      handleFormErrorInfoState("price", false, "");
    }
    if (!formInfo.colors) {
      handleFormErrorInfoState("colors", true, "Color is required.");
      isValid = false;
    } else {
      handleFormErrorInfoState("colors", false, "");
    }
    if (!formInfo.size) {
      handleFormErrorInfoState("size", true, "Size is required.");
      isValid = false;
    } else {
      handleFormErrorInfoState("size", false, "");
    }
    return isValid;
  };

  const handleDelete = (_id) => {
    deleteProduct(_id).then((delRes) => {
      Toaster({ message: delRes.message, type: "success" });
      getProductList().then((resop) => {
        setProductList(resop);
      });
    });
  };
  const handleUpdate = (row) => {
    handleOpen();
    getProductById(row._id).then((respo)=>{
      let data = respo.data;
      setFormInfo({
        name: data.name,
        _id: data._id,
        category: data.category,
        colors: data.colors,
        initialStock: data.initialStock,
        price: data.price,
        size: data.size
      });
    })
  };

  useEffect(() => {
    dispatch(getCatgoryList());
    getProductList().then((resop) => {
      setProductList(resop);
    });
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
        <Typography variant="h5">Products</Typography>
        <Button variant="contained" onClick={handleOpen}>
          Add Product
        </Button>
        <Model
          open={open}
          buttonText={formInfo._id ? "Update" : "Save"}
          handleClose={handleClose}
          title={formInfo._id ? "Update Product" : "Add Product"}
          handleSubmit={handleSubmit}
        >
          <TextField
            id="name"
            label="Name"
            name="name"
            variant="standard"
            focused={true} 
            fullWidth
            value={formInfo?.name || ""}
            error={formErrorInfo.name?.isError}
            helperText={formErrorInfo.name?.errorMessage}
            color={formErrorInfo.name?.isError ? "error" : "primary"}
            onChange={(e) => handleFormInfo(e)}
          />
          <Autocomplete
            options={categoryList}
            getOptionLabel={(Option) => Option.name || ""}
            id="category"
            name="category"
            value={categoryList.find((item) => item._id === formInfo?.category) || null}
            onChange={(e, value) =>
              setFormInfo((prev) => ({ ...prev, category: value?._id || "" }))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                variant="standard"
                error={formErrorInfo.category?.isError}
                helperText={formErrorInfo.category?.errorMessage}
              />
            )}
          />
          <TextField
            id="initialStock"
            name="initialStock"
            label="InitialStock"
            type="number"
            variant="standard"
            focused={true}
            fullWidth
            value={formInfo?.initialStock || ""}
            error={formErrorInfo.initialStock?.isError}
            helperText={formErrorInfo.initialStock?.errorMessage}
            color={formErrorInfo.initialStock?.isError ? "error" : "primary"}
            onChange={(e) => handleFormInfo(e)}
          />
          <TextField
            id="price"
            name="price"
            label="price"
            type="number"
            variant="standard"
            focused={true}
            fullWidth
            value={formInfo?.price || ""}
            error={formErrorInfo.price?.isError}
            helperText={formErrorInfo.price?.errorMessage}
            color={formErrorInfo.price?.isError ? "error" : "primary"}
            onChange={(e) => handleFormInfo(e)}
          />
          <TextField
            id="colors"
            label="Color"
            name="colors"
            variant="standard"
            focused={true}
            fullWidth
            value={formInfo?.colors || ""}
            error={formErrorInfo.colors?.isError}
            helperText={formErrorInfo.colors?.errorMessage}
            color={formErrorInfo.colors?.isError ? "error" : "primary"}
            onChange={(e) => handleFormInfo(e)}
          />
          <FormControl sx={{ mt: 2 }}>
            <FormLabel
              id="Size"
              sx={{ color: formErrorInfo.size?.isError ? "red" : null }}
            >
              Size
            </FormLabel>
            <RadioGroup
              row
              name="size"
              value={formInfo?.size || ""}
              onChange={(e, value) =>
                setFormInfo((prev) => ({ ...prev, size: value }))
              }
            >
              <FormControlLabel value="S" control={<Radio />} label="S" />
              <FormControlLabel value="M" control={<Radio />} label="M" />
              <FormControlLabel value="ML" control={<Radio />} label="ML" />
              <FormControlLabel value="XL" control={<Radio />} label="XL" />
            </RadioGroup>
          </FormControl>
          {formErrorInfo.size?.isError && (
            <FormHelperText sx={{ color: "red" }}>
              {formErrorInfo.size?.errorMessage}
            </FormHelperText>
          )}
        </Model>
      </Box>
      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Action</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell>Color</StyledTableCell>
                <StyledTableCell>size</StyledTableCell>
                <StyledTableCell>InitialStock</StyledTableCell>
                <StyledTableCell>price</StyledTableCell>
                <StyledTableCell>CreatedBy</StyledTableCell>
                <StyledTableCell>createdAt</StyledTableCell>
                <StyledTableCell>UpdatedBy</StyledTableCell>
                <StyledTableCell>UpdatedAt</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productList.data &&
                productList.data.map((row) => (
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
                      {row.category}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.colors}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.size}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.initialStock}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.price}
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
