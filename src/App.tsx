import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, IconButton, Input, Stack, TableCell, TableRow } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './App.css';

export default function App() {
  // setting up state
  const [favorites, setFavorites] = useState([]);
  const [gists, setGists] = useState([{}]);
  const [term, setTerm] = useState('');
  const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(false);

  // making a place for lifecycle behaviors
  useEffect(() => {
  }, []);

  async function getGists (user: string) {
    try {
      const response = await fetch("https:api.github.com/users/" + user + "/gists", {
        method: 'GET'
      });
      const userGists = await response.json();
      console.log(userGists);
      setGists(userGists);
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: this is getting called twice when a search is conducted for the first time (but not on initial load) - it's called once on every search thereafter
  // TODO: nothing is showing up, despite the function is being called
  const gistsTable = (gists: object[]) => {
    console.log(submitted);
    if (gists.length > 0) {
      // TODO: put the table here
      <>
      </>
    } else if (gists.length === 0) {
      <><div>No gists found for this user.</div></>
    } else {
      <><Box><div>User not found.</div></Box></>
    }
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.preventDefault();
    getGists(term);
    setSubmitted(true); 
  };

  return (
    <div className="App">
      <Stack direction="row" spacing={2}>
        <Input onChange={(e) => setTerm(e.target.value)} />
        <Button variant="outlined" onClick={(e) => onSubmit(e)}>Search</Button>
      </Stack>
      {/* search results (populous or no results) or errors/result of bad requests go here */}
      {submitted ? gistsTable(gists) : undefined}
    </div>
  );
}
