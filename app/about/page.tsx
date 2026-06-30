"use client";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Button,
  Avatar,
  Chip,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import CodeIcon from "@mui/icons-material/Code";

export default function AboutPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Container maxWidth="md" sx={{ py: 4 }}>

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
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            About This Project
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, mt: 1 }}>
            Pokemon App by Nattapon Saengkhiao
          </Typography>
        </Box>

        {/* โปรเจค */}
        <Card sx={{ borderRadius: 4, mb: 3, boxShadow: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <CodeIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Project Info
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>
              <b>Project Name:</b> Pokemon App
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <b>Description:</b> เว็บแอปพลิเคชันแสดงข้อมูล Pokemon ทั้ง 1,351 ตัว
              พร้อมรายละเอียด สถานะ วิวัฒนาการ และเสียงของแต่ละตัว
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <b>Tech Stack:</b>
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {["Next.js 16", "React 19", "TypeScript", "MUI", "PokeAPI"].map((tech) => (
                <Chip key={tech} label={tech} color="primary" variant="outlined" />
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* ผู้พัฒนา */}
        <Card sx={{ borderRadius: 4, mb: 3, boxShadow: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <PersonIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Developer
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  background: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
                  fontSize: 28,
                  fontWeight: "bold",
                  boxShadow: 3,
                }}
              >
                F
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Nattapon Saengkhiao
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ชื่อเล่น: Frame
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* การศึกษา */}
        <Card sx={{ borderRadius: 4, mb: 3, boxShadow: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <SchoolIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Education
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>
              <b>รายวิชา:</b> Front-end Web Programming
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <b>หลักสูตร:</b> วิทยาการคอมพิวเตอร์
            </Typography>
            <Typography variant="body1">
              <b>มหาวิทยาลัย:</b> มหาวิทยาลัยขอนแก่น
            </Typography>
          </CardContent>
        </Card>

        {/* GitHub */}
        <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <GitHubIcon />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Source Code
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Button
              variant="contained"
              startIcon={<GitHubIcon />}
              href="https://github.com/nattapon1123/Pokemon007.git"
              target="_blank"
              size="large"
              sx={{
                background: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
                borderRadius: 3,
                px: 3,
              }}
            >
              GitHub Repository
            </Button>
          </CardContent>
        </Card>

      </Container>
    </Box>
  );
}