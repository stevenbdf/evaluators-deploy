import React, { Component } from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader,
    MDBTableHead, MDBTable, MDBTableBody, MDBBtn, MDBIcon, MDBModal,
    MDBModalBody, MDBModalHeader, MDBInput
} from 'mdbreact';
import Navbar from '../../../../navbar/components/Navbar';
import Swal from 'sweetalert2';
import axios from '../candidates/axios';

const url = "localhost"
let schedulesCopy = []

class Candidates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstTime: true,
            schedules: undefined,
            schedulesModal: {
                id: undefined,
                schedule: undefined
            },
            ordenados: false,
            modal: false
        }
    }

    //table columns , added on header
    columnsSchedule = [
        {
            label: '#',
            field: 'id',
            sort: 'asc'
        },
        {
            label: 'Horario',
            field: 'horario',
            sort: 'asc'
        },
        {
            label: 'Acciones',
            field: 'handle',
            sort: 'asc'
        }

    ];

    //update function (call from modal only)
    updateAlert = async (sch_id) => {
        await this.setState({
            ordenados: false,
        });

        const res = await axios.post(`http://${url}:3001/schedules/update/${sch_id}`, {
            request: {
                msg: {
                    schedule: String(this.state.schedulesModal.schedule)
                }
            }
        })

        if (res.data.code === 205) {
            await Swal.fire(
                '¡Actualizado!',
                'Horario actualizado.',
                'success'
            )
            await this.setButtonsSchedules()
            await this.setState({
                ordenados: true,
                modal: false,
                firstTime: false
            })
        } else {
            console.log('Error al actualizar evaluador')
        }
    }

    //delete function (call from modal only)
    deleteAlert = async (sch_id) => {
        await this.setState({
            ordenados: false,
        });

        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras recuperar la información de un candidato rechazado.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, rechazar'
        })
            .then(async () => {
                const res = await axios.post(`http://${url}:3001/schedules/delete`, {
                    request: {
                        msg: {
                            id: schedulesCopy[sch_id].sch_id
                        }
                    }
                })

                if (res.data.code === 205) {
                    await Swal.fire(
                        '¡Eliminado!',
                        'Horario eliminado.',
                        'success'
                    )
                    await this.setButtonsSchedules()
                    await this.setState({
                        ordenados: true,
                        modal: false,
                        firstTime: false
                    })
                } else if (res.data.code === 400) {
                    await Swal.fire(
                        '¡No borrado!',
                        'Existen evaluadores y/o candidatos relacionados a este horario.',
                        'error'
                    )
                } else {
                    console.log(res)
                }
            })


    }

    setButtonsSchedules = async () => {
        try {
            const res = await axios.get(`schedules`)

            if (res.data.status === 200) {
                const respuesta = res.data.msg;
                await this.setState({
                    schedules: respuesta.schedules
                });
                await this.setSchedulesHandle()
            }
        } catch (error) {
            console.log(error)
        }
    }

    setDataModalSchedules = async (id) => {
        await this.setState({
            schedulesModal: {
                id: schedulesCopy[id].sch_id,
                schedule: schedulesCopy[id].sch_schedule
            },
            firstTime: false,
            modal: true
        })
    }
    //set input values for open modal
    toggle = async (id) => {
        if (schedulesCopy[id] !== undefined) {
            this.setDataModalSchedules(id)
        } else {
            console.log('demasiadas peticiones vuelve a intentarlo')
        }
    }

    //dismiss modal on close
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal,
            firstTime: false
        });
    }

    handleClickEditSchedules = (e) => this.toggle(e.target.id);

    handleClickDeleteSchedules = e => this.deleteAlert(e.target.id);

    //handle input onChange event
    handleChangeSchedule = (e) => {
        this.setState({
            firstTime: false,
            schedulesModal: {
                id: this.state.schedulesModal.id,
                schedule: e.target.value
            }
        });
    }

    //get first data from API
    async componentDidMount() {
        if (this.state.schedules === undefined) {
            const res = await axios.get(`schedules`)
            if (res.data.status === 200) {
                const respuesta = res.data.msg;
                this.setState({
                    schedules: respuesta.schedules,
                    ordenados: true
                })
            }
        }
    };

    setSchedulesHandle = async () => {
        let i = 0;
        await this.state.schedules.forEach(element => {
            element.handle =
                <div className="text-center">
                    <MDBBtn id={i} color="orange" size="sm" onClick={this.handleClickEditSchedules}><MDBIcon icon="pen" className="mr-2" /> Editar</MDBBtn>
                    <MDBBtn id={i} color="red" size="sm" onClick={this.handleClickDeleteSchedules}><MDBIcon icon="times" className="mr-2" /> Eliminar</MDBBtn>
                </div>
            i++;
        });
        schedulesCopy = this.state.schedules
    }



    render() {
        if (this.state.ordenados) {
            if (this.state.firstTime) {
                this.setSchedulesHandle()
            }
        }
        return (
            <div className="text-center">
                <Navbar />
                <MDBContainer fluid>
                    <MDBRow center className="my-5">
                        <MDBCol>
                            <MDBCard>
                                <MDBCardHeader>
                                    <h1 className="text-center">Mantenimientos</h1>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBRow className="my-5">
                                        <MDBCol size="12" md="6">
                                            <MDBCard>
                                                <MDBCardHeader>
                                                    <h1 className="text-center">Horarios</h1>
                                                </MDBCardHeader>
                                                <MDBCardBody>
                                                    <MDBTable btn responsive hover className="text-center">
                                                        <MDBTableHead columns={this.columnsSchedule} />
                                                        {
                                                            //if data exists
                                                            this.state.schedules
                                                            &&
                                                            <MDBTableBody rows={this.state.schedules} />
                                                        }
                                                    </MDBTable>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                        <MDBCol size="12" md="6">
                                            <MDBCard>
                                                <MDBCardHeader>
                                                    <h1 className="text-center">Cursos</h1>
                                                </MDBCardHeader>
                                                <MDBCardBody>

                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    {
                        //if data exists
                        this.state.ordenados
                        &&
                        <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <MDBModalHeader toggle={this.toggleModal}>Editar Horario</MDBModalHeader>
                            <MDBModalBody>
                                <form>
                                    <MDBInput label="Codigo:" hint={String(this.state.schedulesModal.id)} disabled type="text" />
                                    <MDBInput label="Nombre:" name="nombre" value={this.state.schedulesModal.schedule} type="text" onChange={this.handleChangeSchedule} />
                                    <div className="float-right">
                                        <MDBBtn color="secondary" onClick={this.toggleModal}>Cerrar</MDBBtn>
                                        <MDBBtn color="primary" onClick={() => { this.updateAlert(this.state.schedulesModal.id) }} >Guardar cambios</MDBBtn>
                                    </div>
                                </form>
                            </MDBModalBody>
                        </MDBModal>
                    }
                </MDBContainer>
            </div>
        );
    }
}



export default Candidates;