import React, {Component} from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader,
    MDBTableHead, MDBTable, MDBTableBody, MDBBtn, MDBIcon
} from 'mdbreact';
import Navbar from '../../../../navbar/components/Navbar';
import dataRows from './Candidates.json';
import Swal from 'sweetalert2';
import axios from './axios.js';

class Candidates extends Component{
    constructor(props) {
        super(props);
         
        this.state ={
          name:'',
          email:"",
          phone:"",       
          academic_level:"",       
          sch_id:0,       
          status:0 
    
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

        axios.get(`evaluators/0`)
        .then(res => {
          const persons = res.data;
          console.log(persons)
        })
        
        /*
        const response = await fetch('https://10.20.10.5:3001/evaluators/0')
            const data = await response.json()
            console.log(data)
        */


        /*
        Swal.fire(
            '¡Aprobado!',
            'Evaluador aprobado.',
            'success'
          )*/
    };
    
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
    
    
    
    
    
    
    
    
    render(){
        for (var i = 0; i < dataRows.length; i++) {
            dataRows[i].handle = 
            <div className="text-center">
                <MDBBtn color="green" size="sm" onClick={this.aproveAlert}><MDBIcon icon="check" className="mr-2" /> Aprobar</MDBBtn>
                <MDBBtn color="red" size="sm" onClick={this.rejectAlert}><MDBIcon icon="times" className="mr-2" /> Rechazar</MDBBtn>
            </div>
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
                                    <MDBTable btn responsive hover>
                                        <MDBTableHead columns={this.columns} />
                                        <MDBTableBody rows={dataRows} />
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