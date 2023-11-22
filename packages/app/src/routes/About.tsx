import React, { useContext, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { SettingsContext } from '../store/setting'
import logoImg from '../assets/logo.png'

const Logo = styled('img')(() => ({
  width: '100%',
}))

export const About = () => {
  const { bgmPrefix } = useContext(SettingsContext)
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Bangumi Research - About'
    return () => {
      document.title = prevTitle
    }
  })
  return (
    <Container maxWidth='lg' component='section'>
      <Typography variant='h4' component='h1' gutterBottom sx={{ fontWeight: 'bold', mt: '2rem' }}>
        关于本站
      </Typography>
      <Logo src={logoImg} />
      <Typography variant='body1' component='p' gutterBottom>
        Bangumi Research 是由
        <Link href={`${bgmPrefix}/user/wattlebird`} target='_blank' rel='noopener noreferrer'>
          小乖
        </Link>
        创建的网站。
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        本站所使用的数据来自
        <Link href='https://github.com/bangumi/archive' target='_blank' rel='noopener noreferrer'>
          https://github.com/bangumi/archive
        </Link>
        ，以及{' '}
        <Link href='https://bangumi.github.io/api/' target='_blank' rel='noopener noreferrer'>
          Bangumi API
        </Link>
        。
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        Bangumi Research LOGO 由
        <Link href={`${bgmPrefix}/user/gracehuyelin`} target='_blank' rel='noopener noreferrer'>
          胡披萨
        </Link>
        设计并授权该站使用。
      </Typography>
      <Typography variant='h5' component='h2' gutterBottom>
        关于某科学的排名
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        关于动画排名的数学模型请参见
        <Link href='https://ikely.me/tags/bangumi-research/' target='_blank' rel='noopener noreferrer'>
          这些博客
        </Link>
        。
      </Typography>
    </Container>
  )
}
