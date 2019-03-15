import React from "react";
import { MDBContainer, MDBRow, MDBCol,MDBCard, MDBCardBody} from 'mdbreact';
import Cards from './Cards';
import Navbar from '../../../navbar/components/Navbar';

const info={
    cards: [
        {id: 1, titulo:'Candidatos',icon:'plus',link:'/candidates', descripcion:'Visualiza los evaluadores que se han postulado.'},
        {id: 2, titulo:'Evaluadores',icon:'address-card',link:'/evaluators',  descripcion:'Gestiona los evaluadores ya aprobados.'},
        {id: 3, titulo:'Asignaciones',icon:'check-square',link:'/assignments',  descripcion:'Relaciona evaluadores a sus respectivos proyectos.'},
        {id: 4, titulo:'Mantenimientos',icon:'list-alt',link:'/maintenance',  descripcion:'Visualiza información de los evaluadores aprobados.'},
        {id: 5, titulo:'Estado',icon:'bolt',link:'/candidates',  descripcion:'Cambia de estado a los evaluadores aprobados.'},
        {id: 6, titulo:'Usuarios',icon:'users',link:'/users',  descripcion:'Gestiona las personas con acceso al sistema.'}
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
