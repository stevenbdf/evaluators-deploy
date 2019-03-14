import React, { Component } from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader,
    MDBTableHead, MDBTable, MDBTableBody, MDBBtn, MDBIcon, MDBInput,
    MDBModal, MDBModalBody, MDBModalHeader
} from 'mdbreact';
import Navbar from '../../../../navbar/components/Navbar';
import axios from '../candidates/axios';

const url = "localhost";

let evaluatorsCopy = []

class Evaluators extends Component{

constructor(props) {
    super(props);
    this.state = {  
        modal: false,
        evaluators: undefined,
        ordenados: false,
        id: 0,nombre: undefined,correo: undefined, telefono: undefined,horario: undefined, nivel: undefined,
        firstTime: true
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
    
    console.log(evaluatorsCopy[id])
    var nombre = evaluatorsCopy[id].ev_name
    this.setState({
        firstTime: false,
        nombre: nombre,
        correo: evaluatorsCopy[id].ev_email,
        modal: true
    })
}


toggleModal = () =>{
    this.setState({
        modal: !this.state.modal,
        firstTime: false
    });
}



async aproveAlert(ev_id){
    this.setState({
        ordenados: false,
        
    });
    const res = await axios.post(`http://${url}:3001/evaluators/update/${ev_id}`, {
        request: {
            msg: {
                name: this.state.evaluators.ev_name,
                email: this.state.evaluators.ev_email,
                phone: this.state.evaluators.ev_phone,
                academic_level:this.state.evaluators.ev_academic_level,
                status: "1",
                sch_id: this.state.evaluators.schedules
            }
        }
    })
    if(res.data.status===200){
        this.actualizarTabla()
    }
      
}

handleChange = e => {
    const name = e.target.name
    this.setState({
        firstTime: false,
        [name]: e.target.value
   });
}


handleClick = e => this.toggle(e.target.id);


//refresh data table
async actualizarTabla(){
    const res = await axios.get(`evaluators/1`)
    const respuesta = res.data.msg;
    this.setState({
        evaluators: respuesta.evaluators
    });

    if(res.data.status===200){
        this.setState({
            ordenados:true
        })
    }
}

//get first data from API
componentDidMount(){
    this.actualizarTabla()
};


render(){
    if(this.state.ordenados){
        console.log('render')
        var i = 0;
        if(this.state.firstTime){
            this.state.evaluators.forEach(element => {
                element.schedules = element.schedules.sch_id
                element.handle = 
                <div className="text-center">
                   <MDBBtn id={i} color="orange" size="sm" onClick={this.handleClick}><MDBIcon icon="pen" className="mr-2" /> Editar</MDBBtn>
                </div>
                i++;
            });
         evaluatorsCopy = this.state.evaluators   
        }
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
                            <MDBInput label="Codigo:" hint={(evaluatorsCopy[this.state.id].ev_id).toString()} disabled type="text" />
                            <MDBInput label="Nombre:" name="nombre" value={this.state.nombre} type="text" onChange={this.handleChange} />
                            <MDBInput label="Correo:" name="correo" value={(this.state.correo)} type="email" onChange={this.handleChange} />
                            <MDBInput label="Telefono:" name="telefono" value={(this.state.telefono).toString()} type="text" onChange={this.handleChange} />
                            <label className="d-block">Horario:
                                <select name="horario" className="browser-default custom-select" value={this.state.horario} onChange={this.handleChange} >
                                    <option value="1">Jueves 8:00am-12:00pm</option>
                                    <option value="2">Jueves 1:00pm-4:00pm</option>
                                    <option value="3">Viernes 8:00am-12:00pm</option>
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