import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import MainNavbar from "./MainNavbar"
import HeroTitleDescription from "./HeroTitleDescription"
import AuthContext from "../contexts/AuthContext"

class Dashboard extends React.Component {
  render() {
      return (
          <>

          <MainNavbar></MainNavbar>
          <HeroTitleDescription></HeroTitleDescription>
          <AuthContext></AuthContext>

          </>
      )
  }
}

export default Dashboard;