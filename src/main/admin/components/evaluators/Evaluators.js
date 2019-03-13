import React, { Component } from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader,
    MDBTableHead, MDBTable, MDBTableBody, MDBBtn, MDBIcon, MDBInput,
    MDBModal, MDBModalBody, MDBModalHeader
} from 'mdbreact';
import Navbar from '../../../../navbar/components/Navbar';
import Swal from 'sweetalert2';
import axios from '../candidates/axios';

const url = "10.20.10.2";
let arraySchedules = [];



class Evaluators extends Component{

constructor(props) {
    super(props);
    this.state = {
        modal: false,
        evaluators: undefined
      }
    this.handleChange = this.handleChange.bind(this);
    }

   
      
toggle = (id) => {

        this.setState({
            evaluators:{
                id:id
            }
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

componentDidMount(){
    console.log('mount')
    axios.get(`evaluators/1`)
    .then(res => {
      const respuesta = res.data.msg;
        this.setState({
            evaluators: respuesta.evaluators
        });
        
    })
    
};
componentDidUpdate(){
    if(this.state.evaluators===undefined){
        
    }else{
        axios.get(`evaluators/1`)
    .then(res => {
      const respuesta = res.data.msg;
        this.setState({
            evaluators: respuesta.evaluators
        });
        
    })
    }
};

approveAlert(ev_id){
    console.log(ev_id)
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

handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

handleClick = e => this.toggle(e.target.id);

    
async componentWillMount(){
    await axios.get(`evaluators/1`)
    .then(res => {
      const respuesta = res.data.msg;
        this.setState({
            evaluators: respuesta.evaluators
        });
        
    })
    
    console.log(this.state.evaluators)
}


render(){
    const evaluatorValue =this.state.evaluators;
    
    if(evaluatorValue===undefined){
        console.log('No hay candidatos que mostrar')
    }else{
        evaluatorValue.forEach(element => {
            var idActual= element.ev_id;
            arraySchedules[idActual]=element.schedules.sch_id
            delete element.ev_status;
            element.schedules = element.schedules.sch_schedule
            element.handle = 
            <div className="text-center">
                <MDBBtn id={idActual} color="green" size="sm" onClick={this.handleClick}><MDBIcon icon="check" className="mr-2" /> Aprobar</MDBBtn>
                <MDBBtn id={idActual} color="red" size="sm" onClick={this.handleClickDelete}><MDBIcon icon="times" className="mr-2" /> Rechazar</MDBBtn>
            </div>
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
                                
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            </div>

    );
    
    
};
}

export default Evaluators;