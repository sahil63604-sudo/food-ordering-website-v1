import React from 'react'
import Menu from '../Components/Menu'
import About from '../Components/About'
import Home from '../Components/Home'
import LoginPage from '../Pages/loginPage'

import SignUp from '../Pages/SignUp'
import Admin from '../Components/AdminMenuForm'

function HomeSection({socket}) {
  return (
    <>
    <Home />
    <Menu socket={socket}/>
    <About/>
    </>
  )
}

export default HomeSection
