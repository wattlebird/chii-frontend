import React, { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Login: React.FC = () => {
  useEffect(() => {
    window.location.href = `https://next.bgm.tv/oauth/authorize?client_id=${process.env.BGM_CLIENT_ID}&response_type=code&redirect_uri=${process.env.BGM_REDIRECT_URL}&scope=read:collection`;
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">
        正在前往 Bangumi 登录，请稍候……
      </Typography>
    </Box>
  );
};

export default Login;