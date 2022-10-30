import React from "react";
import { IconButton, TextField, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddIcon from '@mui/icons-material/Add';

const Task = ({
    addTask
}) => {

  const [time, setTime] = React.useState(0);
  const [name, setName] = React.useState("");

  const [active, setActive] = React.useState(false);

  const handleStartStop = () => {
    setActive(!active);
  }

  React.useEffect(() => {
    if(active){
        const interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
            localStorage.setItem(`task-${name}`,time+1);
        }, 1000);
        return () => clearInterval(interval);
    } else {
        clearInterval();
    }
  },[active,time,setTime])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "90vh",
        justifyContent: "space-evenly",
      }}
    >
      <TextField
        style={{
          width: "100%",
        }}
        id="outlined-basic"
        label="What are you working on?"
        variant="outlined"
      />
      <IconButton onClick={addTask}>
        <AddIcon/>
      </IconButton>
        <IconButton>
            <LocalOfferIcon />
        </IconButton>
        <Button variant="outlined">$</Button>

        <div style={{
            width:300
        }}>
            <Typography style={{
                textAlign:"center"
            }}>
                {time}s
            </Typography>
        </div>
        <Button onClick={handleStartStop} variant="outlined">{active ? 'Stop' : 'Start'}</Button>
    </div>
  );
};

export default Task;
