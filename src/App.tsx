import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, Input, Stack } from '@mui/material';
import './App.css';

export default function App() {
  // setting up state
  const [favorites, setFavorites] = useState([]);
  const [term, setTerm] = useState('');

  // making a place for lifecycle behaviors
  useEffect(() => {
  }, []);

  const getGists = (user: string) => {
    return fetch("https:api.github.com/users/" + user + "/gists").then(data => data.json);
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.preventDefault();
    getGists(term);
  };

  return (
    <div className="App">
      <Stack direction="row" spacing={2}>
        {/* <FormControl variant="standard"> */}
          <Input onChange={(e) => setTerm(e.target.value)} />
          <Button variant="outlined" onClick={(e) => onSubmit(e)}>Search</Button>
        {/* </FormControl> */}
      </Stack>
      {/* search results (populous or no results) or errors/result of bad requests go here */}
      <Box></Box>
    </div>
  );
}
