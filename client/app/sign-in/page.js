import SignInForm from "@/components/Auth/SignInForm";
import { Container, Grid } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ marginTop: 8 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} md={6}>
          <SignInForm />
        </Grid>
      </Grid>
    </Container>
  );
}
