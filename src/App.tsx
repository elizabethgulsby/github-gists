import React, { useEffect, useState } from 'react';
import { Box, Button, Collapse, FormControl, IconButton, Input, Paper, Stack, Table, TableContainer, TableCell, TableHead, TableBody, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GithubGist } from '../types/gist';
import Gist from 'react-gist';
import './App.css';

export default function App() {
  // setting up state
  const [favorites, setFavorites] = useState([]);
  const [gists, setGists] = useState<GithubGist[]>();
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

  const gistsTable = (gists: GithubGist[], user: string) => {
    console.log("Submitted?: ", submitted);
    if (gists.length > 0) {
      return <div>{gists.map((g, i) => <div key={i}><Gist id={g.id}/></div>)}</div>
    } else if (gists.length === 0) {
      return <div>No gists found for this user.</div>
    } else {
      return <div>User not found.</div>
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  // TODO: maybe re-add the event for preventDefault()
  const onSubmit = () => {
    getGists(term);
    setSubmitted(true); 
  };

  return (
    <div className="App">
      <Stack direction="row" spacing={2}>
        <Input onChange={handleChange} />
        <Button variant="outlined" onClick={onSubmit}>Search</Button>
      </Stack>
      {/* search results (populous or no results) or errors/result of bad requests go here */}
      <div>{submitted && gists !== undefined ? gistsTable(gists, term) : undefined}</div>
      {/* TODO: add favoriting logic - use localStorage */}
      {/* TODO: clean up UI */}
    </div>
  );
}

// TODO: write tests for favoriting logic
// TODO: write readme
