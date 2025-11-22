import React, { useEffect } from 'react';

const Login: React.FC = () => {
  useEffect(() => {
    window.location.href = 'https://next.bgm.tv/oauth/authorize?client_id=bgm125a93566101d15&response_type=code&redirect_uri=http://localhost:4000/auth/redirect';
  }, []);

  return null;
};

export default Login;
