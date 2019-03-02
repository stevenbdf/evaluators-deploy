import React from "react";
import { MDBContainer, MDBRow, MDBCol,MDBCard, MDBCardBody} from 'mdbreact';
import Navbar from '../../../navbar/components/Navbar.js';
import Cards from './cards.js';


const info={
    cards: [
        {id: 1, titulo:'Candidatos',icon:'plus', descripcion:'Visualiza los evaluadores que se han postulado.'},
        {id: 2, titulo:'Evaluadores',icon:'address-card', descripcion:'Gestiona los evaluadores ya aprobados.'},
        {id: 3, titulo:'Asignaciones',icon:'check-square', descripcion:'Relaciona evaluadores a sus respectivos proyectos.'},
        {id: 4, titulo:'Control',icon:'list-alt', descripcion:'Visualiza información de los evaluadores aprobados.'},
        {id: 5, titulo:'Estado',icon:'bolt', descripcion:'Cambia de estado a los evaluadores aprobados.'}
    ]
}
const Admin = () => {
  return (
    <div>
      <Navbar/>
        <MDBContainer fluid>
          <MDBRow center className="my-5">
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                    <h1 className="text-center">Sistema de Control de Evaluadores</h1>
                    <MDBRow center>
                    {
                        info.cards.map((item)=>{
                            return <Cards key={item.id} {...item} />
                        })
                    }
                    </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow> 
        </MDBContainer>
      </div>
      
  );
};

export default Admin;