import React, {Component} from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader,
    MDBTableHead, MDBTable, MDBTableBody, MDBBtn, MDBIcon
} from 'mdbreact';
import Navbar from '../../../../navbar/components/Navbar';
import Swal from 'sweetalert2';
import axios from './axios.js';

class Candidates extends Component{
    constructor(props) {
        super(props);
         
        this.state ={
            evaluators:[]
        }
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
    
     async componentDidMount(){

        await axios.get(`evaluators/0`)
        .then(res => {
          const respuesta = res.data.msg;
            this.setState({
                evaluators: respuesta.evaluators
            });
        })
    };

    approveAlert(ev_id){

        axios.post(`http://10.20.10.2:3001/evaluators/update-status/${ev_id}`, {
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

        /*
        
          */
    }
    
    rejectAlert(){
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras recuperar la información de un candidato rechazado.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText:'Cancelar',
            confirmButtonText: 'Si, rechazar'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                '¡Rechazado!',
                'Evaluador rechazado.',
                'success'
              )
            }
          })
    }
    
    handleClick = e => this.approveAlert(e.target.id);
    
    render(){
        this.state.evaluators.forEach(element => {
            delete element.ev_status;
            var idActual= element.ev_id;
            element.handle = 
            <div className="text-center">
                <MDBBtn id={idActual} color="green" size="sm" onClick={this.handleClick}><MDBIcon icon="check" className="mr-2" /> Aprobar</MDBBtn>
                <MDBBtn  color="red" size="sm" onClick={this. rejectAlert}><MDBIcon icon="times" className="mr-2" /> Rechazar</MDBBtn>
            </div>
            console.log(this.state.evaluators)
        });
        return (
            <div className="text-center">
            <Navbar/>
                <MDBContainer fluid>
                    <MDBRow center className="my-5">
                        <MDBCol>
                            <MDBCard>
                                <MDBCardHeader>
                                    <h1 className="text-center">Candidatos a Evaluadores</h1>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBTable btn responsive hover>
                                        <MDBTableHead columns={this.columns} />
                                        <MDBTableBody rows={this.state.evaluators} />
                                    </MDBTable>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
    
        );
    }
}



export default Candidates;