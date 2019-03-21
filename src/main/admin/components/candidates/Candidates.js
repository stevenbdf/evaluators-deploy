import React, {Component} from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader,
    MDBTableHead, MDBTable, MDBTableBody, MDBBtn, MDBIcon
} from 'mdbreact';
import Navbar from '../../../../navbar/components/Navbar';
import Swal from 'sweetalert2';
import axios from './axios.js';

const url = "localhost"

class Candidates extends Component{
    constructor(props) {
        super(props);
         
        this.state ={
            evaluators:undefined,
            ordenados: false
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
    
    //aprove candidate function
    async approveAlert(ev_id) {
        this.setState({
            ordenados: false
        });
        const res = await axios.post(`http://${url}:3001/evaluators/update-status/${ev_id}`, {
            request: {
                msg: {
                    status : 1
                }
            }
        });

        if(res.data.code===205){
            Swal.fire(
                '¡Aprobado!',
                'Evaluador aprobado.',
                'success'
            )
           this.actualizarTabla()
        }
        
    }

    //reject (delete from db) candidate function
    async deleteEvaluator (ev_id){
        const res = await axios.post(`http://${url}:3001/evaluators/delete`, {
            request: {
                    msg: {
                        id: ev_id
                    }
                }
            })
        if(res.data.code===205){
            Swal.fire(
                '¡Rechazado!',
                'Evaluador rechazado.',
                'success'
            )
            this.actualizarTabla()
        }
    }
    
    //reject alert candidate function
    rejectAlert(ev_id){
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras recuperar la información de un candidato rechazado.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText:'Cancelar',
            confirmButtonText: 'Si, rechazar'
          }).then(() => {
                this.deleteEvaluator(ev_id)
            })
    }
    
    //handle 2 buttons clicks
    handleClick = e => this.approveAlert(e.target.id);

    handleClickDelete = e => this.rejectAlert(e.target.id);
    
    //refresh data table
    async actualizarTabla(){
        const res = await axios.get(`evaluators/status/0`)
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
    }

    

   render(){
       //if data exists
       if(this.state.ordenados  && this.state.evaluators!==undefined){
            this.state.evaluators.forEach(element => {
                var idActual = element.ev_id;
                delete element.ev_status;
                element.schedules = element.schedules.sch_schedule
                element.handle = 
                <div className="text-center">
                    <MDBBtn id={idActual} color="green" size="sm" onClick={this.handleClick}><MDBIcon icon="check" className="mr-2" /> Aprobar</MDBBtn>
                    <MDBBtn id={idActual} color="red" size="sm" onClick={this.handleClickDelete}><MDBIcon icon="times" className="mr-2" /> Rechazar</MDBBtn>
                </div>
            })
       }
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
                </MDBContainer>
            </div>
        );  
    }
}



export default Candidates;