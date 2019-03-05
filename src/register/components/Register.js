import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import './Register.css';
import Swal from 'sweetalert2';

function aproveAlert(){
  Swal.fire(
      '¡Enviado!',
      'Registro enviado, espera a ser contactado por personal del ITR.',
      'success'
    )
};

const RegisterPage = () => {
  return (
    <div>
        <MDBContainer>
          <MDBRow center className="my-5">
            <MDBCol size="12" md="8" lg="6">
              <MDBCard>
                <MDBCardBody>
                  <form>
                    <p className="h4 text-center py-4">Registro de Evaluadores</p>
                    <div className="teal-text">
                      <MDBInput
                        label="Nombre completo"
                        icon="user"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                      />
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
                        label="Telefono"
                        icon="hashtag"
                        group
                        type="number"
                        validate
                        error="wrong"
                        success="right"
                      />
                      <MDBRow className="mb-4">
                        <MDBCol size="1">
                          <MDBIcon icon="calendar-alt" className="iconRegister" />
                        </MDBCol>
                        <MDBCol>
                          <select className="browser-default custom-select">
                            <option>Seleccione un horario...</option>
                            <option value="1">Jueves 8:00am-12:00pm</option>
                            <option value="2">Jueves 1:00pm-4:00pm</option>
                            <option value="3">Viernes 8:00am-12:00pm</option>
                            <option value="4">Viernes 1:00pm-4:00pm</option>
                            <option value="5">Sabado 8:00am-12:00pm</option>
                            <option value="6">Sabado 1:00pm-4:00pm</option>
                            <option value="7">Domingo 8:00am-12:00pm</option>
                            <option value="8">Domingo 1:00pm-4:00pm</option>
                          </select>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="mt-4 pt-2">
                        <MDBCol size="1">
                          <MDBIcon icon="university" className="iconRegister" />
                        </MDBCol>
                        <MDBCol>
                          <select className="browser-default custom-select">
                            <option>Seleccione un grado academico...</option>
                            <option value="1">Bachillerato Técnico</option>
                            <option value="2">Tecnico Universitario</option>
                            <option value="3">Ingenieria</option>
                            <option value="4">Licenciatura</option>
                            <option value="5">Maestria</option>
                            <option value="6">Doctorado</option>
                          </select>
                        </MDBCol>
                      </MDBRow>
                    </div>

                    <div className="text-center py-4 mt-3">
                        <MDBBtn color="teal"  onClick={aproveAlert}>
                          Enviar
                          <MDBIcon icon="paper-plane" className="ml-2"/>
                        </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow> 
        </MDBContainer>
      </div>
      
  );
};

export default RegisterPage;