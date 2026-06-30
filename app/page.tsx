"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  Grid,
  CardActionArea,
  Box,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

interface PokemonResponse {
  count: number;
  next: string;
  previous: string | null;
  results: { name: string; url: string }[];
}

const LIMIT = 100;
const TOTAL = 1351;
const TOTAL_PAGES = Math.ceil(TOTAL / LIMIT);

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [pokemonData, setPokemonData] = useState<PokemonResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const offset = (currentPage - 1) * LIMIT;
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon data:", error);
        setLoading(false);
      });
  }, [currentPage]);

  const setPage = (page: number) => {
    router.push(`?page=${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (TOTAL_PAGES <= 9) {
      for (let i = 1; i <= TOTAL_PAGES; i++) pages.push(i);
    } else {
      if (currentPage <= 5) {
        for (let i = 1; i <= 7; i++) pages.push(i);
        pages.push("...");
        pages.push(TOTAL_PAGES);
      } else if (currentPage >= TOTAL_PAGES - 4) {
        pages.push(1);
        pages.push("...");
        for (let i = TOTAL_PAGES - 6; i <= TOTAL_PAGES; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
        pages.push("...");
        pages.push(TOTAL_PAGES);
      }
    }
    return pages;
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>

        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            py: 4,
            borderRadius: 4,
            background: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
            color: "white",
            boxShadow: 3,
          }}
        >
          <CatchingPokemonIcon sx={{ fontSize: 60, mb: 1 }} />
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Pokemon App
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Pokemon ทั้งหมด {TOTAL} ตัว
          </Typography>
        </Box>

        {/* Loading */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh", flexDirection: "column", gap: 2 }}>
            <CircularProgress size={80} />
            <Typography color="text.secondary">กำลังโหลดข้อมูล...</Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {pokemonData?.results.map((pokemon) => {
                const pokemonId = pokemon.url.split("/")[6];
                return (
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={pokemon.name}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: 2,
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardActionArea href={`/pokemon/${pokemon.name}`}>
                        <CardContent sx={{ textAlign: "center", p: 2 }}>
                          <Box
                            component="img"
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                            alt={pokemon.name}
                            sx={{ width: 80, height: 80 }}
                          />
                          <Chip
                            label={`#${String(pokemonId).padStart(4, "0")}`}
                            size="small"
                            sx={{ mb: 0.5, fontSize: "0.7rem" }}
                          />
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                              fontSize: "0.9rem",
                            }}
                          >
                            {pokemon.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            {/* Pagination */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
                my: 4,
              }}
            >
              <Button
                variant="contained"
                onClick={() => setPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </Button>

              {getPageNumbers().map((p, i) =>
                p === "..." ? (
                  <Typography key={`dots-${i}`} sx={{ px: 1 }}>
                    ...
                  </Typography>
                ) : (
                  <Button
                    key={p}
                    variant={currentPage === p ? "contained" : "outlined"}
                    onClick={() => setPage(p as number)}
                    sx={{ minWidth: 40 }}
                  >
                    {p}
                  </Button>
                )
              )}

              <Button
                variant="contained"
                onClick={() => setPage(Math.min(currentPage + 1, TOTAL_PAGES))}
                disabled={currentPage === TOTAL_PAGES}
              >
                &gt;
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}