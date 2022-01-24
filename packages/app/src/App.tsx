import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Flex, Segment, Text } from '@fluentui/react-northstar'
import Ranking from './component/Ranking'
import Tags from './component/Tags'
import About from './component/About'
import Nav from './component/Nav'
import Subject from './component/Subject'

function App() {
  return (
    <Flex
      vAlign='center'
      column
      style={{
        minHeight: '100vh'
      }}
    >
      <Nav />
      <Routes>
        <Route path='/' element={<Ranking />} />
        <Route path='/about' element={<About />} />
        <Route path='/tags' element={<Tags />} />
        <Route path='/subject/:id' element={<Subject />} />
        <Route path='*' element={() => <Navigate to='/' />} />
      </Routes>
      <Flex.Item push>
        <Segment content={<Text align='center'>© 2018 - 2021 Ronnie Wang, all rights reserved.</Text>} />
      </Flex.Item>
    </Flex>
  )
}

export default App
