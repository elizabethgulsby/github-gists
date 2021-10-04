/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Button, Input, Paper, Stack, Table, TableContainer, TableCell, TableHead, TableBody, TableRow, Checkbox } from '@mui/material';
import { GithubGist } from '../types/gist';
import Gist from 'react-gist';
import './App.css';

export default function App() {
  // setting up state
  const [favorites, setFavorites] = useState<number[]>([]);
  const [gists, setGists] = useState<GithubGist[]>();
  const [term, setTerm] = useState('');
  const [submitted, setSubmitted] = useState(false)

  // making a place for lifecycle behaviors
  useEffect(() => {
    const myFavorites: number[] = JSON.parse(window.localStorage.getItem("favorite") ?? "");
    if (myFavorites !== null) {
      setFavorites(myFavorites);
    }
  }, []);

  async function getGists (user: string) {
    try {
      const response = await fetch("https:api.github.com/users/" + user + "/gists", {
        method: 'GET'
      });
      const userGists = await response.json();
      setGists(userGists);
    } catch (error) {
      console.error(error);
    }
  };

  const addFav = (event: React.ChangeEvent<HTMLInputElement>, favorite: number) => {
    // Check if the favorited item exists in the current list of favorites
    const index = favorites.indexOf(favorite);
    // If the checkbox is checked and favorite is not part of favorites list already
    if (event.target.checked && index === -1) {
      // add checked item to favorites array as well as localStorage
      const updatedFavorites = [...favorites, favorite];
      setFavorites(updatedFavorites)
      window.localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
    } else if (!event.target.checked && index !== -1) {
      // remove item from favorites and localStorage
      const newFavorites = favorites.filter((f) => f !== favorite)
      setFavorites(newFavorites);
      window.localStorage.setItem("favorite", JSON.stringify(newFavorites));
    }
  };

  const gistsTable = (gists: GithubGist[]) => {
    if (gists.length > 0) {
      return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="gists table">
        <TableHead>
          <TableRow>
            <TableCell>Gists</TableCell>
            <TableCell align="right">Favorite?</TableCell>
          </TableRow>
          <TableBody>
            {gists.map((g, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Gist id={g.id}/>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Checkbox checked={favorites.indexOf(i) !== -1} onChange={(e) => addFav(e, i)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableHead>

        </Table>
        </TableContainer>
      )
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
      <div>{submitted && gists !== undefined ? gistsTable(gists) : undefined}</div>
      {/* TODO: clean up UI */}
    </div>
  );
}

// TODO: write tests for favoriting logic
// TODO: write readme
