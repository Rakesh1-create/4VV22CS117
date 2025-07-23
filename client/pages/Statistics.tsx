import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Chip,
  IconButton,
  Divider,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Link as LinkIcon,
  ContentCopy,
  OpenInNew,
  BarChart,
  TrendingUp,
  People,
  Public,
  Schedule,
  Add,
  FileDownload,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
  lastClicked?: string;
  location?: string;
}

export default function Statistics() {
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Simulate fetching data - in real app this would come from API/localStorage
    const mockData: ShortenedUrl[] = [
      {
        id: '1',
        originalUrl: 'https://www.example.com/very/long/path/to/some/resource',
        shortUrl: 'https://short.ly/abc123',
        shortCode: 'abc123',
        clicks: 47,
        createdAt: '2024-01-15T10:30:00Z',
        lastClicked: '2024-01-20T15:45:00Z',
        location: 'United States'
      },
      {
        id: '2',
        originalUrl: 'https://github.com/user/repository/blob/main/README.md',
        shortUrl: 'https://short.ly/def456',
        shortCode: 'def456',
        clicks: 23,
        createdAt: '2024-01-18T14:20:00Z',
        lastClicked: '2024-01-19T09:12:00Z',
        location: 'Canada'
      },
      {
        id: '3',
        originalUrl: 'https://docs.example.com/api/v1/documentation/getting-started',
        shortUrl: 'https://short.ly/ghi789',
        shortCode: 'ghi789',
        clicks: 156,
        createdAt: '2024-01-12T08:15:00Z',
        lastClicked: '2024-01-21T11:30:00Z',
        location: 'United Kingdom'
      }
    ];
    setShortenedUrls(mockData);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    enqueueSnackbar('Copied to clipboard!', { variant: 'success' });
  };

  const totalClicks = shortenedUrls.reduce((sum, url) => sum + url.clicks, 0);
  const averageClicks = shortenedUrls.length > 0 ? Math.round(totalClicks / shortenedUrls.length) : 0;

  const StatCard = ({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

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
              variant="contained"
              startIcon={<BarChart />}
            >
              Statistics
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
            URL Statistics
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Track the performance of your shortened URLs
          </Typography>
        </Box>

        {/* Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total URLs"
              value={shortenedUrls.length}
              icon={<LinkIcon />}
              color="primary.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Clicks"
              value={totalClicks}
              icon={<TrendingUp />}
              color="success.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Average Clicks"
              value={averageClicks}
              icon={<BarChart />}
              color="warning.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Links"
              value={shortenedUrls.length}
              icon={<People />}
              color="info.main"
            />
          </Grid>
        </Grid>

        {/* URL Statistics Table */}
        <Card>
          <CardHeader
            title="URL Performance"
            subheader="Detailed analytics for all your shortened URLs"
          />
          <CardContent>
            {shortenedUrls.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <LinkIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h5" fontWeight="medium" gutterBottom>
                  No URLs shortened yet
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Start by shortening your first URL to see statistics here.
                </Typography>
                <Button 
                  component={RouterLink} 
                  to="/" 
                  variant="contained" 
                  size="large"
                  startIcon={<Add />}
                >
                  Create Short Link
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {shortenedUrls.map((url, index) => (
                  <Box key={url.id}>
                    <Paper variant="outlined" sx={{ p: 3, bgcolor: 'grey.50' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Typography variant="body2" fontWeight="medium">
                              #{index + 1}
                            </Typography>
                            <Chip label={url.shortCode} variant="outlined" size="small" />
                          </Box>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" color="text.secondary">
                              Original URL:
                            </Typography>
                            <Typography variant="body2" sx={{ 
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis', 
                              whiteSpace: 'nowrap' 
                            }}>
                              {url.originalUrl}
                            </Typography>
                          </Box>

                          <Box sx={{ mb: 3 }}>
                            <Typography variant="caption" color="text.secondary">
                              Short URL:
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
                                {url.shortUrl}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => copyToClipboard(url.shortUrl)}
                                color="primary"
                              >
                                <ContentCopy fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => window.open(url.originalUrl, '_blank')}
                                color="primary"
                              >
                                <OpenInNew fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>

                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUp fontSize="small" color="success" />
                                <Typography variant="body2" color="text.secondary">
                                  Clicks:
                                </Typography>
                                <Typography variant="body2" fontWeight="medium">
                                  {url.clicks}
                                </Typography>
                              </Box>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={3}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Schedule fontSize="small" color="primary" />
                                <Typography variant="body2" color="text.secondary">
                                  Created:
                                </Typography>
                                <Typography variant="body2" fontWeight="medium">
                                  {new Date(url.createdAt).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </Grid>

                            {url.lastClicked && (
                              <Grid item xs={12} sm={6} md={3}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Schedule fontSize="small" color="secondary" />
                                  <Typography variant="body2" color="text.secondary">
                                    Last Click:
                                  </Typography>
                                  <Typography variant="body2" fontWeight="medium">
                                    {new Date(url.lastClicked).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Grid>
                            )}

                            {url.location && (
                              <Grid item xs={12} sm={6} md={3}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Public fontSize="small" color="info" />
                                  <Typography variant="body2" color="text.secondary">
                                    Top Location:
                                  </Typography>
                                  <Typography variant="body2" fontWeight="medium">
                                    {url.location}
                                  </Typography>
                                </Box>
                              </Grid>
                            )}
                          </Grid>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, ml: 2 }}>
                          <Chip 
                            label={`${url.clicks} clicks`}
                            color={url.clicks > 50 ? "primary" : url.clicks > 10 ? "secondary" : "default"}
                            variant={url.clicks > 50 ? "filled" : "outlined"}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'right' }}>
                            Created:<br />
                            {new Date(url.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                    {index < shortenedUrls.length - 1 && <Divider sx={{ my: 2 }} />}
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            component={RouterLink} 
            to="/" 
            variant="contained" 
            size="large" 
            sx={{ mr: 2 }}
            startIcon={<Add />}
          >
            Create New Short Link
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            startIcon={<FileDownload />}
          >
            Export Data
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
