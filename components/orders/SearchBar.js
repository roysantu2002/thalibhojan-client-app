import React, { useState } from "react";
import {
  Box,
  Grid,
  Input,
  InputAdornment,
  ButtonGroup,
  makeStyles,
  Button,
  TextField,
  CardActions,
  Container,
  Typography,
} from "@material-ui/core";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";

const SearchBar = (props) => {
  const { searchKey, setSearchKey, children, classes } = props;

  return (
    <Grid item xs={12}>
      <Grid
        containe
        justify="center"
        spacing={2}
        style={{
          padding: 10,
          marginTop: 10,
          marginBottom: 10,
          display: "flex",
        }}
      >
 
          <TextField
            placeholder="Order..."
            inputProps = {{maxLength:6}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchTwoToneIcon />
                </InputAdornment>
              ),
            }}
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <Box bgcolor="secondary.main" color="primary.main" p={0.4} m={0.5}>
            {children}
          </Box>
       
      </Grid>
    </Grid>
  );
};

export default SearchBar;
