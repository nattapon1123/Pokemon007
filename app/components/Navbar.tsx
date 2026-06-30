"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import InfoIcon from "@mui/icons-material/Info";

export default function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <CatchingPokemonIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", flexGrow: 1, cursor: "pointer" }}
          component="a"
          href="/"
        >
          Pokemon App
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button color="inherit" href="/" >
            Home
          </Button>
          <Button color="inherit" href="/about" startIcon={<InfoIcon />}>
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}