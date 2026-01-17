import React, { useEffect } from 'react';

const Login: React.FC = () => {
  useEffect(() => {
    window.location.href = 'https://next.bgm.tv/oauth/authorize?client_id=bgm125a93566101d15&response_type=code&redirect_uri=https://chii.ai/auth/redirect&scope=read:collection';
  }, []);

  return null;
};

export default Login;
