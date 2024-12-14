import { Modal, Box, Button, Divider, Stack } from "@mui/material";

const Model = ({
  open,
  handleClose,
  handleSubmit,
  children,
  buttonText,
  title
}) => {
  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        handleClose();
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        component="form"

        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #1976d2", // Full modal border
          borderRadius: 2,
          boxShadow: 24,
          overflow: "hidden", // Ensures content stays inside the border
        }}
      >
        {/* Title */}
        <Box sx={{ p: 2, bgcolor: "#f0f4ff" }}>{title}</Box>

        {/* Full-width Divider */}
        <Divider />

        {/* Description or Content */}
        <Box sx={{ p: 3 }}>{children}</Box>

        {/* Full-width Divider Above Buttons */}
        <Divider />

        {/* Action Buttons */}
        <Box sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              {buttonText}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default Model;
