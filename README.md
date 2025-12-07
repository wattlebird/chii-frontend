<p align="center">
  <img width="864" height="304" src="https://github.com/wattlebird/chii-frontend/blob/master/packages/app/src/assets/logo.png">
</p>

# Bangumi Research Web Client

## Local setup
```
git clone https://github.com/wattlebird/chii-frontend.git
pnpm install
cd chii-frontend/packages/schema
pnpm generate
cd ../app
pnpm start
```

The above commands are the default way to connect to test bed. If one wish to test on local server, one has to comment `uri: '/graphql',` in `packages/app/src/index.tsx` and uncomment `uri: 'http://localhost:4000/graphql',`
