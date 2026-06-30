"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import {
  Container,
  Typography,
  Box,
  Chip,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  cries: { latest: string };
  species: { url: string };
}

interface EvolutionChain {
  chain: EvolutionNode;
}

interface EvolutionNode {
  species: { name: string; url: string };
  evolves_to: EvolutionNode[];
}

const typeColors: Record<string, string> = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
};

const statColors: Record<string, string> = {
  hp: "#FF5959",
  attack: "#F5AC78",
  defense: "#FAE078",
  "special-attack": "#9DB7F5",
  "special-defense": "#A7DB8D",
  speed: "#FA92B2",
};

const statNames: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

function getEvolutionList(chain: EvolutionNode): { name: string; id: string }[] {
  const id = chain.species.url.split("/").filter(Boolean).pop() || "";
  const list: { name: string; id: string }[] = [{ name: chain.species.name, id }];
  if (chain.evolves_to.length > 0) {
    list.push(...getEvolutionList(chain.evolves_to[0]));
  }
  return list;
}

export default function PokemonDetailPage({
  params,
}: {
  params: Promise<{ pokemonname: string }>;
}) {
  const { pokemonname } = use(params);
  const router = useRouter();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [evolutions, setEvolutions] = useState<{ name: string; id: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonname}`)
      .then((res) => res.json())
      .then(async (data: PokemonDetail) => {
        setPokemon(data);
        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData: EvolutionChain = await evoRes.json();
        setEvolutions(getEvolutionList(evoData.chain));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [pokemonname]);

  const mainTypeColor = pokemon
    ? typeColors[pokemon.types[0].type.name] || "#777"
    : "#ee0979";

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          variant="contained"
          sx={{ mb: 3, borderRadius: 3 }}
        >
          Back
        </Button>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "60vh",
              gap: 2,
            }}
          >
            <CircularProgress size={80} />
            <Typography variant="h6" color="text.secondary">
              กำลังโหลดข้อมูล...
            </Typography>
          </Box>
        ) : pokemon ? (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Card
                sx={{
                  textAlign: "center",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: 4,
                }}
              >
                <Box
                  sx={{
                    background: `linear-gradient(135deg, ${mainTypeColor}cc, ${mainTypeColor})`,
                    py: 3,
                    px: 2,
                  }}
                >
                  <Chip
                    label={`#${String(pokemon.id).padStart(4, "0")}`}
                    sx={{ bgcolor: "rgba(255,255,255,0.3)", color: "white", mb: 1 }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      color: "white",
                    }}
                  >
                    {pokemon.name}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1 }}>
                    {pokemon.types.map(({ type }) => (
                      <Chip
                        key={type.name}
                        label={type.name}
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.3)",
                          color: "white",
                          fontWeight: "bold",
                          textTransform: "capitalize",
                        }}
                      />
                    ))}
                  </Box>
                  <Box
                    component="img"
                    src={pokemon.sprites.other["official-artwork"].front_default}
                    alt={pokemon.name}
                    sx={{
                      width: "100%",
                      maxWidth: 220,
                      mx: "auto",
                      mt: 1,
                      filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.3))",
                    }}
                  />
                </Box>

                {pokemon.cries?.latest && (
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      🔊 เสียงของ {pokemon.name}
                    </Typography>
                    <audio controls src={pokemon.cries.latest} style={{ width: "100%" }} />
                  </Box>
                )}
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Card sx={{ borderRadius: 4, mb: 3, boxShadow: 4 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    📊 Base Stats
                  </Typography>
                  {pokemon.stats.map(({ stat, base_stat }) => (
                    <Box key={stat.name} sx={{ mb: 1.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {statNames[stat.name] || stat.name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {base_stat}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min((base_stat / 255) * 100, 100)}
                        sx={{
                          height: 10,
                          borderRadius: 4,
                          bgcolor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: statColors[stat.name] || mainTypeColor,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>

              <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    🔄 Evolution Chain
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 1,
                      justifyContent: "center",
                    }}
                  >
                    {evolutions.map((evo, index) => (
                      <Box key={evo.name} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                          component="a"
                          href={`/pokemon/${evo.name}`}
                          sx={{
                            textAlign: "center",
                            textDecoration: "none",
                            p: 1,
                            borderRadius: 3,
                            transition: "background 0.2s",
                            "&:hover": { bgcolor: "#f0f0f0" },
                          }}
                        >
                          <Avatar
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`}
                            sx={{
                              width: 64,
                              height: 64,
                              mx: "auto",
                              bgcolor: `${mainTypeColor}33`,
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              textTransform: "capitalize",
                              color: "primary.main",
                              fontWeight: "bold",
                              display: "block",
                              mt: 0.5,
                            }}
                          >
                            {evo.name}
                          </Typography>
                        </Box>
                        {index < evolutions.length - 1 && (
                          <Typography variant="h5" color="text.secondary">
                            →
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Typography>ไม่พบข้อมูล Pokemon ครับ</Typography>
        )}
      </Container>
    </Box>
  );
}