import React from 'react'
import { Text, Header } from "@fluentui/react-northstar";
import { ArticlePanel } from './lib/Styled'

function About() {
  return <ArticlePanel column>
    <Header content="关于本站" />
    <p><Text>Bangumi Research 是由小乖创建、展示其对 Bangumi 数据挖掘成果的网站。自 2015 年始小乖就已经在以不同的方式向 Bangumi 用户呈现具有洞察力的数据报告。</Text></p>
    <p><Text>本站所使用的数据全部来自 <a href="https://github.com/wattlebird/Bangumi_Spider" target="_blank" rel="noopener noreferrer">Bangumi Spider</a>，并使用铃猫提供的<a href="https://chii.in/group/topic/344830" target="_blank" rel="noopener noreferrer">镜像</a>进行爬取。同时本站依赖于 <a href="https://bangumi.github.io/api/" target="_blank" rel="noopener noreferrer">Bangumi API</a>。</Text></p>
  </ArticlePanel>
  
}

export default About;