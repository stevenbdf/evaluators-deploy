import React from 'react';
import {

    MDBBtn, MDBModal,
    MDBModalBody, MDBModalHeader, MDBInput
} from 'mdbreact';

const Modal = (props) => {
    return (
        <MDBModal isOpen={props.modal} toggle={props.toggleModal} centered>
            <MDBModalHeader toggle={props.toggleModal}>{props.title}</MDBModalHeader>
            <MDBModalBody>
                <form>
                    <MDBInput label="Codigo:" hint={String(props.id)} disabled type="text" />
                    <MDBInput label="Curso:" name="curso" value={props.curso} type="text" onChange={props.handleChange} />
                    <MDBInput label="Profesor/a Guia:" name="profesor" value={props.profesor} type="text" onChange={props.handleChange} />
                    <select name="nivel" className="browser-default custom-select" value={props.selectLevels} onChange={props.handleChange} >
                        <option>Seleccione un nivel...</option>
                        {
                            props.levels.map(item =>
                                <option key={item.lv_id} value={item.lv_name}> {item.lv_name} </option>
                            )
                        }
                    </select>
                    <select name="local" className="browser-default custom-select mt-4" value={props.selectLocals} onChange={props.handleChange} >
                        <option>Seleccione un local...</option>
                        {
                            props.locals.map(item =>
                                <option key={item.lc_id} value={item.lc_name}> {item.lc_name} </option>
                            )
                        }
                    </select>
                    <div className="float-right">
                        <MDBBtn color="secondary" onClick={props.toggleModal}>Cerrar</MDBBtn>
                        <MDBBtn color="primary" onClick={() => { props.handleModalClick(props.id) }} >Aceptar</MDBBtn>
                    </div>
                </form>
            </MDBModalBody>
        </MDBModal>
    )
}

export default Modal;