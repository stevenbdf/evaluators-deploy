import React from 'react';
import {
    
    MDBBtn, MDBIcon, MDBModal,
    MDBModalBody, MDBModalHeader, MDBInput
} from 'mdbreact';

const  Modal = (props) => {
    return (
        <MDBModal isOpen={props.modal} toggle={props.toggleModal}>
            <MDBModalHeader toggle={props.toggleModal}>Editar Horario</MDBModalHeader>
            <MDBModalBody>
                <form>
                    <MDBInput label="Codigo:" hint={String(props.id)} disabled type="text" />
                    <MDBInput label="Nombre:" name="nombre" value={props.schedule} type="text" onChange={props.handleChangeSchedule} />
                    <div className="float-right">
                        <MDBBtn color="secondary" onClick={props.toggleModal}>Cerrar</MDBBtn>
                        <MDBBtn color="primary" onClick={()=>{props.handleModalClick(props.id)}} >Guardar cambios</MDBBtn>
                    </div>
                </form>
            </MDBModalBody>
        </MDBModal>
    )
}

export default Modal;
