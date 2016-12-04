import React from 'react'
import {Nav,NavItem,Navbar,Panel} from 'react-bootstrap'

const Menu = (props) =>{
  var {onMenuOptionSelect,currMenuOption}=props
  return(
    <Navbar.Collapse>
      <Nav activeKey={currMenuOption} >
        <NavItem eventKey={1} onSelect={onMenuOptionSelect}> View </NavItem>
        <NavItem eventKey={2} onSelect={onMenuOptionSelect}> Add  </NavItem>
        <NavItem eventKey={3} onSelect={onMenuOptionSelect}> Delete </NavItem>
      </Nav>
    </Navbar.Collapse>
  )
}

export default Menu
