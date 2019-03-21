import React from 'react';
import {
    
    MDBBtn, MDBModal,
    MDBModalBody, MDBModalHeader, MDBInput
} from 'mdbreact';

const  Modal = (props) => {
    return (
        <MDBModal isOpen={props.modal} toggle={props.toggleModal}>
            <MDBModalHeader toggle={props.toggleModal}>{props.title}</MDBModalHeader>
            <MDBModalBody>
                <form>
                    <MDBInput label="Codigo:" hint={String(props.id)} disabled type="text" />
                    <MDBInput label="Nombre:" name="nombre" value={props.name} type="text" onChange={props.handleChange} />
                    <div className="float-right">
                        <MDBBtn color="secondary" onClick={props.toggleModal}>Cerrar</MDBBtn>
                        <MDBBtn color="primary" onClick={()=>{props.handleModalClick(props.id)}} >Aceptar</MDBBtn>
                    </div>
                </form>
            </MDBModalBody>
        </MDBModal>
    )
}

export default Modal;
