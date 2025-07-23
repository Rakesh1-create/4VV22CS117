import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { theme } from './theme';
import Index from "./pages/Index";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        margin: 0,
        padding: 0,
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
        minHeight: '100vh',
      },
      '*': {
        boxSizing: 'border-box',
      },
      '#root': {
        minHeight: '100vh',
      }
    }}
  />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/statistics" element={<Statistics />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
