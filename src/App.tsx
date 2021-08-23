import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import { Flex, Segment, Text, Button } from '@fluentui/react-northstar'
import Ranking from './component/Ranking';
import Tags from './component/Tags';

function App() {
  return <Flex vAlign="center" column style={{
    minHeight: '100vh',
  }}>
    <Flex hAlign="start" style={{ padding: "1rem 2rem"}}>
      <Text>Bangumi Research</Text>
      <Flex.Item push>
        <Button text content="排行榜" as={Link} to="/" />
      </Flex.Item>
      <Button text content="标签搜索" as={Link} to="/tags" />
    </Flex>
    <Switch>
      <Route path="/tags">
        <Tags />
      </Route>
      <Route path="/">
        <Ranking />
      </Route>
    </Switch>
    <Flex.Item push>
      <Segment content={<Text align="center">© 2018 - 2021 Ronnie Wang, all rights reserved.</Text>}/>
    </Flex.Item>
  </Flex>
}

export default App;
