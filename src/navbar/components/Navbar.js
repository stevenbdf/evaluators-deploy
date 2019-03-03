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
      <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text d-none d-md-block">Sistema de Control de Evaluadores</strong>
          <strong className="white-text d-block d-md-none">SCE</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to="/" >Registro</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/admin">Administrador</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/admin">Usuario</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/">Cerrar Sesión</MDBNavLink>
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