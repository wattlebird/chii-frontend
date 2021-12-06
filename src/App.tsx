import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Flex, Segment, Text } from '@fluentui/react-northstar';
import Ranking from './component/Ranking';
import Tags from './component/Tags';
import About from './component/About';
import Nav from './component/Nav';
import Subject from './component/Subject';

function App() {
  return (
    <Flex
      vAlign="center"
      column
      style={{
        minHeight: '100vh',
      }}
    >
      <Nav />
      <Switch>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/tags">
          <Tags />
        </Route>
        <Route exact path="/subject/:id">
          <Subject />
        </Route>
        <Route exact path="/">
          <Ranking />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
      <Flex.Item push>
        <Segment content={<Text align="center">© 2018 - 2021 Ronnie Wang, all rights reserved.</Text>} />
      </Flex.Item>
    </Flex>
  );
}

export default App;
