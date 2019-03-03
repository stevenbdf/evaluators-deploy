import React from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader,
    MDBTableHead, MDBTable, MDBTableBody, MDBBtn, MDBIcon
} from 'mdbreact';



const columns = [
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

const rows_regular_btn = [
    {
        'id': 1,
        'nombre': 'Steven Benjamin Diaz Flores',
        'correo': 'stevenbdf@gmail.com',
        'telefono': '77814435',
        'horario': 'Jueves 8:00am-12:00pm',
        'nivel': 'Bachillerato Técnico',
        'handle': ''
    },
    {
        'id': 2,
        'nombre': 'Steven Benjamin Diaz Flores',
        'correo': 'stevenbdf@gmail.com',
        'telefono': '77814435',
        'horario': 'Jueves 8:00am-12:00pm',
        'nivel': 'Bachillerato Técnico',
        'handle': ''
    },
    {
        'id': 3,
        'nombre': 'Steven Benjamin Diaz Flores',
        'correo': 'stevenbdf@gmail.com',
        'telefono': '77814435',
        'horario': 'Jueves 8:00am-12:00pm',
        'nivel': 'Bachillerato Técnico',
        'handle': ''
    },{
        'id': 4,
        'nombre': 'Steven Benjamin Diaz Flores',
        'correo': 'stevenbdf@gmail.com',
        'telefono': '77814435',
        'horario': 'Jueves 8:00am-12:00pm',
        'nivel': 'Bachillerato Técnico',
        'handle': ''
    },
    {
        'id': 5,
        'nombre': 'Steven Benjamin Diaz Flores',
        'correo': 'stevenbdf@gmail.com',
        'telefono': '77814435',
        'horario': 'Jueves 8:00am-12:00pm',
        'nivel': 'Bachillerato Técnico',
        'handle': ''
    },
    {
        'id': 6,
        'nombre': 'Steven Benjamin Diaz Flores',
        'correo': 'stevenbdf@gmail.com',
        'telefono': '77814435',
        'horario': 'Jueves 8:00am-12:00pm',
        'nivel': 'Bachillerato Técnico',
        'handle': ''
    }
];


for(var i=0;i<rows_regular_btn.length;i++){
    rows_regular_btn[i].handle = <div className="text-center"><MDBBtn color="green" size="sm"><MDBIcon icon="check" className="mr-2" /> Aprobar</MDBBtn> 
    <MDBBtn color="red" size="sm"><MDBIcon icon="times" className="mr-2"/> Rechazar</MDBBtn></div>
}





const Candidates = () => {
    return (
        <div className="text-center">
            <MDBContainer fluid>
                <MDBRow center className="my-5">
                    <MDBCol>
                        <MDBCard>
                            <MDBCardHeader>
                                <h1 className="text-center">Candidatos a Evaluadores</h1>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBTable btn responsive hover>
                                    <MDBTableHead columns={columns} />
                                    <MDBTableBody rows={rows_regular_btn} />
                                </MDBTable>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>

    );
};

export default Candidates;