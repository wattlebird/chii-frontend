import React from 'react'
import styled from 'styled-components'
import { Flex } from "@fluentui/react-northstar";

export const TitlePanel = styled.div`
  margin: 2rem 0;

  .sub {
    opacity: 0.5;
    display: block;
  }
`

export const FootnotePanel = styled.footer`
  opacity: 0.3;
`

export const ArticlePanel = styled(Flex)`
  margin-top: 5rem;
  margin-bottom: 1rem;
  @media (min-width: 769px) {
    margin-left: 10rem;
    margin-right: 10rem;
  }
  @media (max-width: 768px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  flex-direction: column;
`

export const LoadingPanel = styled.div`
  width: 100%;
  display: flex;
  height: 10rem;
  align-items: center;
  justify-content: center;

`