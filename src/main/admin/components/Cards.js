import React from 'react';
import { MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';

function Cards(props) {
    return (
        <MDBCol size="12" sm="6" md="4" className="mt-4">
            <MDBCard className="text-center" style={{height:350}}>
            <MDBIcon icon={props.icon} style={{fontSize:150}} className="mt-2"/>
                <MDBCardBody>
                    <MDBCardTitle>{props.titulo}</MDBCardTitle>
                    <MDBCardText>{props.descripcion}</MDBCardText>
                    <Link to={props.link}><MDBBtn >Acceder</MDBBtn></Link>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}

export default Cards;
