import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import auth from './auth'

class LoginPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined
        }
    }

    handleChange = (e)=>{
        const name = e.target.name
        this.setState({
            [name]: e.target.value
        });
    }
    
    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
    };
    
    render(props) {
           return (<div>
                <MDBContainer>
                    <MDBRow center className="my-5">
                        <MDBCol size="12" md="6" lg="5">
                            <MDBCard>
                                <MDBCardBody>
                                    <form className="needs-validation"
                                    onSubmit={this.submitHandler}
                                    noValidate>
                                        <p className="h4 text-center py-4">Inicio de Sesión</p>
                                        <div className="teal-text">
    
                                            <MDBInput
                                                label="Correo electronico"
                                                name= "email"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                icon="envelope"
                                                group
                                                type="email"
                                                validate
                                                error="wrong"
                                                success="right"
                                                required
                                            />
                                            <MDBInput
                                                label="Contraseña"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                                name= "password"
                                                icon="unlock"
                                                group
                                                type="password"
                                                validate
                                                error="wrong"
                                                success="right"
                                                required
                                            />
                                        </div>
    
                                        <div className="text-center py-4 mt-3">
                                    
                                            <MDBBtn color="teal" type="submit"  onClick={
                                                () =>{
                                                    if(this.state.password===undefined || this.state.email===undefined){
                                                        console.log('Campos Vacios')
                                                    }else{ 
                                                        auth.login(()=>{
                                                            this.props.history.push("/admin")
                                                        },this.state.email,this.state.password)
                                                    }
                                                }
                                            }>
                                                Ingresar
                                            <MDBIcon icon="paper-plane" className="ml-2" />
                                            </MDBBtn>
    
                                        </div>
                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>)
        }
}



export default LoginPage;