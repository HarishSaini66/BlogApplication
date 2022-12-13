import React, { useContext, useState } from 'react';
import { NavLink as ReactLink, Link, useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';



import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from 'react';
import { doLogOut, getCurrentUserDetails, isLoggedIn } from '../auth';
import userContext from '../context/userContext';

// Main Code
const NavBar = () => {

  const userContextData = useContext(userContext);



  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {

    setLogin(isLoggedIn());
    setUser(getCurrentUserDetails())
  }, [login])


  const logout = () => {
    doLogOut(() => {
      setLogin(false);
      userContextData.setUser({
        data:null,
        login:false
      })
      navigate("/");
    });

  }



  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Navbar color="dark" fixed="" dark expand="md" className='px-5'>
      <NavbarBrand href="/">MyBlog</NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse navbar isOpen={!collapsed}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag={ReactLink} to="/">New Feed</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={ReactLink} to="/about">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={ReactLink} to="/services">Services</NavLink>
          </NavItem>

          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              More
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={ReactLink} to="/services">Contact Us</DropdownItem>
              <DropdownItem>Facebook</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>LinkedIn</DropdownItem>
              <DropdownItem>Instagram</DropdownItem>
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>



        <Nav navbar>

          {
            login && (
              <>

                <NavItem>
                  <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`}>
                    Profile Info
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard" >
                    {user.name}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout}>
                    Logout
                  </NavLink>
                </NavItem>
              </>
            )
          }



          {
            !login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    SignUp
                  </NavLink>
                </NavItem>
              </>
            )
          }

        </Nav>


      </Collapse>
    </Navbar>
  );
}

export default NavBar;