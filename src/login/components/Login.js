import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import auth from './auth'




function LoginPage(props) {
       return (<div>
            <MDBContainer>
                <MDBRow center className="my-5">
                    <MDBCol size="12" md="6" lg="5">
                        <MDBCard>
                            <MDBCardBody>
                                <form>
                                    <p className="h4 text-center py-4">Inicio de Sesión</p>
                                    <div className="teal-text">

                                        <MDBInput
                                            label="Correo electronico"
                                            icon="envelope"
                                            group
                                            type="email"
                                            validate
                                            error="wrong"
                                            success="right"
                                        />
                                        <MDBInput
                                            label="Contraseña"
                                            icon="unlock"
                                            group
                                            type="password"
                                            validate
                                            error="wrong"
                                            success="right"
                                        />
                                    </div>

                                    <div className="text-center py-4 mt-3">
                                
                                        <MDBBtn color="teal" type="submit" onClick={
                                            () =>{
                                                auth.login(()=>{
                                                    props.history.push("/admin")
                                                })
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


export default LoginPage;