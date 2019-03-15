import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import './Register.css';
import Swal from 'sweetalert2';
import axios from '../../main/admin/components/candidates/axios.js';

class RegisterPage extends Component {

  constructor(props) {
    super(props);
     
    this.state ={
      name:'',
      email:"",
      phone:"",       
      academic_level:"",
      schedules: undefined
    }
  }

  addEvaluator = async () => {
    const sche = await axios.post(`http://localhost:3001/schedules/findBySchedule`, {
        request: {
            msg: {
                schedule: this.state.horary
            }
        }
    })
    const res = await  axios.post(`http://localhost:3001/evaluators/add`, {
      request:{
        msg:{
          name: String(this.state.name),
          email:String(this.state.email),
          phone:String(this.state.phone),
          academic_level:String(this.state.academic_level),
          status: "0",
          sch_id: String(sche.data.msg.sch_id)
        }
      }
    })
    if(res.data.code!==400){
      this.aproveAlert()
    }else{
      console.log("Error 400, API request failed")
    }
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

  async componentDidMount(){
    const res = await axios.get(`schedules/`)
    const respuesta = res.data.msg;
    this.setState({
        schedules: respuesta.schedules
    })
  }


  
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
                              {
                                this.state.schedules!==undefined
                                &&
                                this.state.schedules.map(item =>
                                  <option key={item.sch_id} value={item.sch_schedule}> {item.sch_schedule} </option>
                                )
                              }
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