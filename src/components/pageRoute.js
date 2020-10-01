import React from 'react'
import {
  HomeOutlined,
  UserOutlined
} from '@ant-design/icons';
import GenrePage from './layout/GenrePage'
import MoviePage from './layout/MoviePage'

const pageRoute = () => {
  return [
    {
      icon: <UserOutlined />,
      name: 'Movie',
      link: '/',
      path: '/',
      component: MoviePage
    },
    {
      icon: <HomeOutlined />,
      name: 'Genres',
      link: '/genres',
      path: '/genres',
      component: GenrePage
    },
  ]
}

export default pageRoute()