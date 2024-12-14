import React, { useState } from "react";
import { Modal, Box, Typography, Button, Divider, Stack } from "@mui/material";

const PrettyModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    alert("Form submitted!");
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
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
          <Box sx={{ p: 2, bgcolor: "#f0f4ff" }}>
            <Typography id="modal-title" variant="h5" component="h2" >
              Modal Title
            </Typography>
          </Box>

          {/* Full-width Divider */}
          <Divider />

          {/* Description or Content */}
          <Box sx={{ p: 3 }}>
            <Typography id="modal-description" sx={{ mb: 3 }}>
              Add your content or form here. The layout now includes full-width dividers and a polished UI.
            </Typography>
          </Box>

          {/* Full-width Divider Above Buttons */}
          <Divider />

          {/* Action Buttons */}
          <Box sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" color="error" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PrettyModal;
