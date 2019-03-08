import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import './Register.css';
import Swal from 'sweetalert2';
import axios from 'axios';

class RegisterPage extends Component {

  constructor(props) {
    super(props);
     
    this.state ={
      name:'',
      email:"",
      phone:"",       
      academic_level:"",       
      horary:"",       
      status:0 

    }
  } 

  addEvaluator = () => {
    var horarySelected = this.getScheduleId()
    console.log(horarySelected)
    axios.post('http://localhost:3001/evaluators/add', {
      request: {
        msg: {
            name:this.state.name,
            email:this.state.email,
            phone:this.state.phone,       
            academic_level:this.state.academic_level, 
            status:0,
            sch_id: horarySelected

        }
    }
    })
    .then(this.aproveAlert)
    .catch(function (error) {
      console.log(error);
    });
  }
  getScheduleId = () =>{
    var horarioString = this.state.horary
    var horarioNum
    console.log(horarioString)
    switch(horarioString  ){
      case 'Jueves 8:00am-12:00pm':
        horarioNum = 1
        break;
      case 'Jueves 1:00pm-4:00pm':
        horarioNum = 2
        break;
      case 'Viernes 8:00am-12:00pm':
        horarioNum = 3
        break;
      case 'Viernes 1:00pm-4:00pm':
        horarioNum = 4
          break;
      case 'Sabado 8:00am-12:00pm':
        horarioNum = 5
        break;
      case 'Sabado 1:00pm-4:00pm':
        horarioNum = 6
        break;
      case 'Domingo 8:00am-12:00pm':
        horarioNum = 7
        break;
      case 'Domingo 1:00pm-4:00pm':
        horarioNum = 8
          break;
    }
    return horarioNum;
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  aproveAlert(){
    Swal.fire(
        '¡Enviado!',
        'Registro enviado, espera a ser contactado por personal del ITR.',
        'success'
      )
  };




  
render(){
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
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
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
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          group
                          type="email"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <MDBInput
                          label="Telefono"
                          icon="hashtag"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.handleChange}
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
                            <select name="horary" className="browser-default custom-select" value={this.state.horary} onChange={this.handleChange} >
                              <option>Seleccione un horario...</option>
                              <option value="Jueves 8:00am-12:00pm">Jueves 8:00am-12:00pm</option>
                              <option value="Jueves 1:00pm-4:00pm">Jueves 1:00pm-4:00pm</option>
                              <option value="Viernes 8:00am-12:00pm">Viernes 8:00am-12:00pm</option>
                              <option value="Viernes 1:00pm-4:00pm">Viernes 1:00pm-4:00pm</option>
                              <option value="Sabado 8:00am-12:00pm">Sabado 8:00am-12:00pm</option>
                              <option value="Sabado 1:00pm-4:00pm">Sabado 1:00pm-4:00pm</option>
                              <option value="Domingo 8:00am-12:00pm">Domingo 8:00am-12:00pm</option>
                              <option value="Domingo 1:00pm-4:00pm">Domingo 1:00pm-4:00pm</option>
                            </select>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="mt-4 pt-2">
                          <MDBCol size="1">
                            <MDBIcon icon="university" className="iconRegister" />
                          </MDBCol>
                          <MDBCol>
                            <select name="academic_level" className="browser-default custom-select" value={this.state.academic_level} onChange={this.handleChange} >
                              <option>Seleccione un grado academico...</option>
                              <option value="Bachillerato Técnico">Bachillerato Técnico</option>
                              <option value="Tecnico Universitario">Tecnico Universitario</option>
                              <option value="Ingenieria">Ingenieria</option>
                              <option value="Licenciatura">Licenciatura</option>
                              <option value="Maestria">Maestria</option>
                              <option value="Doctorado">Doctorado</option>
                            </select>
                          </MDBCol>
                        </MDBRow>
                      </div>
  
                      <div className="text-center py-4 mt-3">
                          <MDBBtn color="teal"  onClick={this.addEvaluator}>
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
}



export default RegisterPage;