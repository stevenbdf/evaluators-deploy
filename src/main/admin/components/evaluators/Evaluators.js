import React, { Component } from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader,
    MDBTableHead, MDBTable, MDBTableBody, MDBBtn, MDBIcon, MDBInput,
    MDBModal, MDBModalBody, MDBModalHeader
} from 'mdbreact';
import Navbar from '../../../../navbar/components/Navbar';
import dataRows from './Evaluators.json';
import Swal from 'sweetalert2';


class Evaluators extends Component{

constructor(props) {
    super(props);
    this.state = {
        modal: false,
        id:0,
        nombre: '',
        correo: '',
        telefono: '',
        horario: '',
        nivel: '',
        vecesClick: 0
      }
    this.handleChange = this.handleChange.bind(this);
    }


      
toggle = (id) => {

        this.setState({
            id: id,
            nombre: dataRows[id-1].nombre,
            correo: dataRows[id-1].correo,
            telefono: dataRows[id-1].telefono,
            horario: dataRows[id-1].horario,
            nivel: dataRows[id-1].nivel,
            modal: !this.state.modal,
            vecesClick: this.vecesClick++
        });
       
}

toggleModal = () =>{
    this.setState({
        modal: !this.state.modal
    });
}


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
        label: 'Horario',
        field: 'horario',
        sort: 'asc'
    },
    {
        label: 'Nivel Academico',
        field: 'nivel',
        sort: 'asc'
    },
    {
        label: 'Acciones',
        field: 'acciones',
        sort: 'asc'
    }

];

aproveAlert(){
    Swal.fire(
        '¡Modificado!',
        'Cambios guardados.',
        'success'
      )
    this.setState({
    modal: !this.state.modal
    });
};

handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

handleClick = e => this.toggle(e.target.id);

componentWillMount(){
    

    for (var i = 0; i < dataRows.length; i++) {
        var idActual= dataRows[i].id;
        dataRows[i].handle = 
        <div className="text-center">
            <MDBBtn id={idActual} color="orange" size="sm" onClick={this.handleClick}><MDBIcon icon="pen" className="mr-2" /> Editar</MDBBtn>
        </div>
    }
    
}


render(){
    
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
                                    <MDBTableBody rows={dataRows} />
                                </MDBTable>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <MDBModalHeader toggle={this.toggleModal}>Editar Evaluador</MDBModalHeader>
                    <MDBModalBody>
                        <form>
                            <MDBInput label="Codigo:" hint={(this.state.id).toString()} disabled type="text" />
                            <MDBInput label="Nombre:" name="nombre" value={(this.state.nombre)} type="text" onChange={this.handleChange} />
                            <MDBInput label="Correo:" name="correo" value={(this.state.correo)} type="email" onChange={this.handleChange} />
                            <MDBInput label="Telefono:" name="telefono" value={(this.state.telefono).toString()} type="text" onChange={this.handleChange} />
                            <label className="d-block">Horario:
                                <select className="browser-default custom-select" value={this.state.horario} onChange={this.handleChange} >
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
                                <select className="browser-default custom-select" value={this.state.nivel} onChange={this.handleChange} >
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
            </MDBContainer>
        </div>

    );
};
}

export default Evaluators;