import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Task from "./project";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = React.useState("");

  const [tasksList, setTasksList] = React.useState([]);

  const handleTaskName = (e) => {
    setName(e.target.value);
  };

  const addTask = () => {
    handleOpen();
  };

  const saveTask = () => {
    localStorage.setItem(`task-${name}`, 0);
    setName("");
    handleClose();
  };

  const retrieveTasks = () => {
    const keys = Object.keys(localStorage);
    const tasks = keys.filter((key) => key.includes("task-"));
    setTasksList(tasks);
  }

  React.useEffect(() => {
    retrieveTasks();
  },[])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            onChange={handleTaskName}
            id="outlined-basic"
            label="Name of the task"
            variant="outlined"
          />
          <Button onClick={() => saveTask()}>Save</Button>
        </Box>
      </Modal>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Clockify
          </Typography>
        </Toolbar>
      </AppBar>

      <div
        style={{
          marginTop: 24,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vh",
        }}
      >
        {tasksList.map((task) => (
          <Task key={task} taskName={task} addTask={addTask} />
        ))}
      </div>
    </Box>
  );
}

export default App;
