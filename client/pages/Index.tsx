import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Chip,
  IconButton,
  Alert,
  Divider,
  Paper,
  Link,
} from '@mui/material';
import {
  Link as LinkIcon,
  ContentCopy,
  OpenInNew,
  BarChart,
  TrendingUp,
  Speed,
  Share,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

export default function Index() {
  const [url, setUrl] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const handleShorten = async () => {
    setErrors([]);
    
    if (!url.trim()) {
      setErrors(['Please enter a URL']);
      return;
    }

    if (!isValidUrl(url)) {
      setErrors(['Please enter a valid URL (e.g., https://example.com)']);
      return;
    }

    if (shortenedUrls.length >= 5) {
      setErrors(['Maximum 5 URLs can be shortened concurrently']);
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const shortCode = generateShortCode();
      const newShortenedUrl: ShortenedUrl = {
        id: Date.now().toString(),
        originalUrl: url,
        shortUrl: `https://short.ly/${shortCode}`,
        shortCode,
        clicks: 0,
        createdAt: new Date().toISOString(),
      };

      setShortenedUrls(prev => [...prev, newShortenedUrl]);
      setUrl('');
      setIsLoading(false);
      enqueueSnackbar('URL shortened successfully!', { variant: 'success' });
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    enqueueSnackbar('Copied to clipboard!', { variant: 'success' });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleShorten();
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'transparent' }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <LinkIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              QuickLink
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={RouterLink} to="/" color="primary" variant="text">
              Home
            </Button>
            <Button 
              component={RouterLink} 
              to="/statistics" 
              color="primary" 
              variant="text"
              startIcon={<BarChart />}
            >
              Statistics
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Shorten Your URLs Instantly
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
            Transform long URLs into short, shareable links with detailed analytics
          </Typography>
        </Box>

        {/* URL Shortener Form */}
        <Card sx={{ mb: 4 }}>
          <CardHeader
            title="Create Short Link"
            subheader="Enter a URL to create a shortened version. You can shorten up to 5 URLs concurrently."
          />
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                type="url"
                placeholder="https://example.com/very/long/url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                variant="outlined"
              />
              <Button 
                onClick={handleShorten} 
                disabled={isLoading || shortenedUrls.length >= 5}
                variant="contained"
                sx={{ minWidth: 120 }}
              >
                {isLoading ? 'Shortening...' : 'Shorten'}
              </Button>
            </Box>

            {errors.length > 0 && (
              <Box sx={{ mb: 2 }}>
                {errors.map((error, index) => (
                  <Alert key={index} severity="error" sx={{ mb: 1 }}>
                    {error}
                  </Alert>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary', fontSize: '0.875rem' }}>
              <Typography variant="body2">URLs shortened: {shortenedUrls.length}/5</Typography>
              <Typography variant="body2">Free tier allows 5 concurrent URLs</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Shortened URLs Display */}
        {shortenedUrls.length > 0 && (
          <Card sx={{ mb: 6 }}>
            <CardHeader
              title="Your Shortened URLs"
              subheader="Click on any shortened URL to copy it to your clipboard"
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {shortenedUrls.map((item) => (
                  <Paper key={item.id} variant="outlined" sx={{ p: 3, bgcolor: 'grey.50' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          whiteSpace: 'nowrap' 
                        }}>
                          Original: {item.originalUrl}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography 
                            variant="body2" 
                            component="code" 
                            sx={{ 
                              color: 'primary.main',
                              bgcolor: 'primary.light',
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              fontFamily: 'monospace'
                            }}
                          >
                            {item.shortUrl}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => copyToClipboard(item.shortUrl)}
                            color="primary"
                          >
                            <ContentCopy fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => window.open(item.originalUrl, '_blank')}
                            color="primary"
                          >
                            <OpenInNew fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                        <Chip label={`${item.clicks} clicks`} color="secondary" variant="outlined" />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mt: 8 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center', pt: 3 }}>
                <Speed sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Fast & Reliable
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lightning-fast URL shortening with 99.9% uptime guarantee
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center', pt: 3 }}>
                <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Detailed Analytics
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track clicks, geographic data, and engagement metrics
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center', pt: 3 }}>
                <Share sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Easy Sharing
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  One-click copy and share across all platforms
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
