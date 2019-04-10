import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse} from "mdbreact";
class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}


render() {
  return (
      <MDBNavbar color="default-color" fixed="top" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text d-none d-md-block">Sistema de Control de Evaluadores</strong>
          <strong className="white-text d-block d-md-none">SCE</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to="/admin">Administrador</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/login">Cerrar Sesión</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          
        </MDBCollapse>
      </MDBNavbar>

    );
  }

handleClick(){

  }
}

export default NavbarPage;