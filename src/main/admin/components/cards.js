import React from 'react';
import { MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBIcon } from 'mdbreact';

function Cards(props) {
    return (
        <MDBCol size="12" sm="6" md="4" className="mt-4">
            <MDBCard className="text-center" style={{height:350}}>
            <MDBIcon center icon={props.icon} style={{'font-size':150}} className="mt-2"/>
                <MDBCardBody>
                    <MDBCardTitle>{props.titulo}</MDBCardTitle>
                    <MDBCardText>{props.descripcion}</MDBCardText>
                    <MDBBtn href="#">Acceder</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}

export default Cards;
