import React, { Component } from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader,
    MDBTableHead, MDBTable, MDBTableBody, MDBBtn, MDBIcon, MDBInput,
    MDBModal, MDBModalBody, MDBModalHeader
} from 'mdbreact';
import Navbar from '../../../../navbar/components/Navbar';
import Swal from 'sweetalert2';
import axios from '../candidates/axios';

const url = "localhost";

var skere = ''

class Evaluators extends Component{

constructor(props) {
    super(props);
    this.state = {
        modal: false,
        firstTime: true,
        evaluators: undefined,
        ordenados: false,
        id: ' ',
        nombre: ' ',
        correo: ' ',
        telefono: ' ',
        horario: ' ',
        nivel: ' '
      }
    }
    

//table columns , added on header
columns = [
    {
        label: '#',
        field: 'id',
        sort: 'asc'
    },
    {
        label: 'Nombre',
        field: 'nombre',
        sort: 'asc'
    },
    {
        label: 'Correo',
        field: 'correo',
        sort: 'asc'
    },
    {
        label: 'Telefono',
        field: 'telefono',
        sort: 'asc'
    },
    {
        label: 'Nivel Academico',
        field: 'nivel',
        sort: 'asc'
    },
    {
        label: 'Horario',
        field: 'horario',
        sort: 'asc'
    },
    {
        label: 'Acciones',
        field: 'acciones',
        sort: 'asc'
    }

];

      
async toggle(id){
    await this.setModalInfo(skere[id])
    

    console.log(this.state.id)
    console.log(this.state.nombre)
    console.log(this.state.correo)
    console.log(this.state.telefono)
    console.log(this.state.horario)
    console.log(this.state.nivel)

    this.setState({
        ordenados:true,
        modal:true
    })
    

}

async setModalInfo(array){
    await this.setState({
        ordenados: false,
        id: array.ev_id,
        nombre: array.ev_name,
        correo: array.ev_email,
        telefono: array.ev_phone,
        horario: array.schedules,
        nivel: array.ev_academic_level,
        firstTime: false
    })
}

toggleModal = () =>{
    this.setState({
        modal: !this.state.modal
    });
}



approveAlert(ev_id){
    axios.post(`http://${url}:3001/evaluators/update-status/${ev_id}`, {
        request: {
          msg: {
              status : 1
          }
      }
      })
      .then(Swal.fire(
        '¡Aprobado!',
        'Evaluador aprobado.',
        'success'
      ))
      .catch(function (error) {
        console.log(error);
      });
}

handleChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

handleClick = e => this.toggle(e.target.id);


//refresh data table
async actualizarTabla(){
    const res = await axios.get(`evaluators/1`)
    const respuesta = res.data.msg;
    await this.setState({
        evaluators: respuesta.evaluators
    });
    skere = (this.state.evaluators)
    console.log(skere[0])
    if(res.data.status===200){
        this.setState({
            ordenados:true,
            horario: 4
        })
    }
}

//get first data from API
componentDidMount(){
    this.actualizarTabla()
};


render(){
    if(this.state.ordenados && this.state.firstTime){
        var i = 0;
        
        this.state.evaluators.forEach(element => {
            element.schedules = element.schedules.sch_schedule
            element.handle = 
            <div className="text-center">
               <MDBBtn id={i} color="orange" size="sm" onClick={this.handleClick}><MDBIcon icon="pen" className="mr-2" /> Editar</MDBBtn>
            </div>
            i++;
        });
    }
    return (
        <div>
            <Navbar/>
            <MDBContainer fluid>
                <MDBRow center className="my-5">
                    <MDBCol>
                        <MDBCard>
                            <MDBCardHeader>
                                <h1 className="text-center">Evaluadores Aprobados</h1>
                                <MDBCol md="4" className="offset-md-8" >
                                    <MDBInput label="Buscar" icon="search"/>
                                </MDBCol>
                            </MDBCardHeader>
                            <MDBCardBody>
                            <MDBTable btn responsive hover className="text-center">
                                        <MDBTableHead columns={this.columns} />
                                        {
                                            //if data exists
                                            this.state.ordenados
                                            &&
                                            <MDBTableBody rows={this.state.evaluators}/> 
                                        }    
                                    </MDBTable>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                {
                    //if data exists
                    this.state.ordenados 
                    &&
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <MDBModalHeader toggle={this.toggleModal}>Editar Evaluador</MDBModalHeader>
                    <MDBModalBody>
                        <form>
                            <MDBInput label="Codigo:" hint={(this.state.id).toString()} disabled type="text" />
                            <MDBInput label="Nombre:" name="nombre" value={(this.state.nombre)} type="text" onChange={this.handleChange} />
                            <MDBInput label="Correo:" name="correo" value={(this.state.correo)} type="email" onChange={this.handleChange} />
                            <MDBInput label="Telefono:" name="telefono" value={(this.state.telefono).toString()} type="text" onChange={this.handleChange} />
                            <label className="d-block">Horario:
                                <select name="horario" className="browser-default custom-select" value={this.state.horario} onChange={this.handleChange} >
                                    <option value="Jueves 8:00am-12:00pm">Jueves 8:00am-12:00pm</option>
                                    <option value="Jueves 1:00pm-4:00pm">Jueves 1:00pm-4:00pm</option>
                                    <option value="Viernes 8:00am-12:00pm">Viernes 8:00am-12:00pm</option>
                                    <option value="Viernes 1:00pm-4:00pm">Viernes 1:00pm-4:00pm</option>
                                    <option value="Sabado 8:00am-12:00pm">Sabado 8:00am-12:00pm</option>
                                    <option value="Sabado 1:00pm-4:00pm">Sabado 1:00pm-4:00pm</option>
                                    <option value="Domingo 8:00am-12:00pm">Domingo 8:00am-12:00pm</option>
                                    <option value="Domingo 1:00pm-4:00pm">Domingo 1:00pm-4:00pm</option>
                                </select>
                            </label>
                            <label className="d-block">
                            Nivel Academico:
                                <select name="nivel" className="browser-default custom-select" value={this.state.nivel} onChange={this.handleChange} >
                                <option value="Bachillerato Técnico">Bachillerato Técnico</option>
                                <option value="Técnico Universitario">Técnico Universitario</option>
                                <option value="Ingenieria">Ingenieria</option>
                                <option value="Licenciatura">Licenciatura</option>
                                <option value="Maestria">Maestria</option>
                                <option value="Doctorado">Doctorado</option>
                                </select>
                            </label>
                            <div className="float-right">
                                <MDBBtn color="secondary" onClick={this.toggleModal}>Cerrar</MDBBtn>
                                <MDBBtn color="primary" onClick={()=>{this.aproveAlert()}} >Guardar cambios</MDBBtn>
                            </div>
                        </form>
                    </MDBModalBody>
                </MDBModal>
                }
                
            </MDBContainer>
            </div>

    );
    
    
};
}

export default Evaluators;