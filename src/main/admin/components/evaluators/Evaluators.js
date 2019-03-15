import React, { Component } from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader,
    MDBTableHead, MDBTable, MDBTableBody, MDBBtn, MDBIcon, MDBInput,
    MDBModal, MDBModalBody, MDBModalHeader
} from 'mdbreact';
import Navbar from '../../../../navbar/components/Navbar';
import axios from '../candidates/axios';
import Swal from 'sweetalert2';

const url = "10.20.0.103";

let evaluatorsCopy = []

class Evaluators extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            evaluators: undefined,
            schedules: undefined,
            updated: false,
            ordenados: false,
            id: 0,
            nombre: undefined,
            correo: undefined,
            telefono: undefined,
            horario: undefined,
            nivel: undefined,
            firstTime: true
        }
    }


    //table columns , added on header
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
            label: 'Nivel Academico',
            field: 'nivel',
            sort: 'asc'
        },
        {
            label: 'Horario',
            field: 'horario',
            sort: 'asc'
        },
        {
            label: 'Acciones',
            field: 'acciones',
            sort: 'asc'
        }

    ];

    //set input values for open modal
    toggle = async (id) => {
        await this.setState({
            idModal: evaluatorsCopy[id].ev_id,
            firstTime: false,
            nombre: evaluatorsCopy[id].ev_name,
            correo: evaluatorsCopy[id].ev_email,
            telefono: evaluatorsCopy[id].ev_phone,
            horario: evaluatorsCopy[id].schedules,
            nivel: evaluatorsCopy[id].ev_academic_level,
            modal: true
        })
    }

    //dismiss modal on close
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal,
            firstTime: false,
            updated: false
        });
    }


    //update function (call from modal only)
    aproveAlert = async (ev_id) => {
        await this.setState({
            ordenados: false,
        });
        const sche = await axios.post(`http://${url}:3001/schedules/findBySchedule`, {
            request: {
                msg: {
                    schedule: this.state.horario
                }
            }
        })

        const res = await axios.post(`http://${url}:3001/evaluators/update/${ev_id}`, {
            request: {
                msg: {
                    name: this.state.nombre,
                    email: this.state.correo,
                    phone: this.state.telefono,
                    academic_level: this.state.nivel,
                    status: "1",
                    sch_id: sche.data.msg.sch_id
                }
            }
        })

        if (res.data.code === 205) {
            await Swal.fire(
                '¡Actualizado!',
                'Evaluador actualizado.',
                'success'
            )
            await this.setButtons()
            this.setState({
                ordenados: true,
                modal: false,
                firstTime: false
            })
        } else {
            console.log('Error al actualizar evaluador')
        }

    }

    //iterates the evaluators adding buttons and detailed schedule
    setEvaluatorsHandle = async () => {
        let i = 0;
        await this.state.evaluators.forEach(element => {
            element.schedules = element.schedules.sch_schedule
            element.handle =
                <div className="text-center">
                    <MDBBtn id={i} color="orange" size="sm" onClick={this.handleClick}><MDBIcon icon="pen" className="mr-2" /> Editar</MDBBtn>
                </div>
            i++;
        });
        evaluatorsCopy = this.state.evaluators
    }

    //set handle attr for evaluators (table rows)
    setButtons = async () => {
        try {
            const res = await axios.get(`evaluators/status/1`)
            const respuesta = res.data.msg;
            this.setState({
                evaluators: respuesta.evaluators
            });

            if (res.data.status === 200) {
                this.setEvaluatorsHandle()
            }
        } catch (error) {
            console.log(error)
        }
    }

    //handle input onChange event
    handleChange = (e) => {
        const name = e.target.name
        this.setState({
            firstTime: false,
            [name]: e.target.value
        });
    }


    handleClick = (e) => this.toggle(e.target.id);



    //get first data from API
    async componentDidMount() {
        if (this.state.evaluators === undefined) {
            const res = await axios.get(`evaluators/status/1`)
            const respuesta = res.data.msg;
            this.setState({
                evaluators: respuesta.evaluators
            });

            if (res.data.status === 200) {

                const res = await axios.get(`schedules/`)
                const respuesta = res.data.msg;
                this.setState({
                    schedules: respuesta.schedules
                })

                this.setState({
                    ordenados: true
                })
            }
        }
    };


    render() {
        if (this.state.ordenados) {
            if (this.state.firstTime) {
                this.setEvaluatorsHandle()
            }
        }
        return (
            <div>
                <Navbar />
                <MDBContainer fluid>
                    <MDBRow center className="my-5">
                        <MDBCol>
                            <MDBCard>
                                <MDBCardHeader>
                                    <h1 className="text-center">Evaluadores Aprobados</h1>
                                    <MDBCol md="4" className="offset-md-8" >
                                        <MDBInput label="Buscar" icon="search" />
                                    </MDBCol>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBTable btn responsive hover className="text-center">
                                        <MDBTableHead columns={this.columns} />
                                        {
                                            //if data exists
                                            this.state.ordenados
                                            &&
                                            <MDBTableBody rows={this.state.evaluators} />
                                        }
                                    </MDBTable>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    {
                        //if data exists
                        this.state.ordenados
                        &&
                        <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <MDBModalHeader toggle={this.toggleModal}>Editar Evaluador</MDBModalHeader>
                            <MDBModalBody>
                                <form>
                                    <MDBInput label="Codigo:" hint={String(this.state.idModal)} disabled type="text" />
                                    <MDBInput label="Nombre:" name="nombre" value={this.state.nombre} type="text" onChange={this.handleChange} />
                                    <MDBInput label="Correo:" name="correo" value={(this.state.correo)} type="email" onChange={this.handleChange} />
                                    <MDBInput label="Telefono:" name="telefono" value={(this.state.telefono)} type="text" onChange={this.handleChange} />
                                    <label className="d-block">Horario:
                                    <select name="horario" className="browser-default custom-select" value={(this.state.horario)} onChange={this.handleChange} >
                                            {
                                                this.state.schedules !== undefined
                                                &&
                                                this.state.schedules.map(item =>
                                                    <option key={item.sch_id} value={item.sch_schedule}> {item.sch_schedule} </option>
                                                )
                                            }
                                        </select>
                                    </label>
                                    <label className="d-block">
                                        Nivel Academico:
                                    <select name="nivel" className="browser-default custom-select" value={this.state.nivel} onChange={this.handleChange} >
                                            <option value="Bachillerato Técnico">Bachillerato Técnico</option>
                                            <option value="Técnico Universitario">Técnico Universitario</option>
                                            <option value="Ingenieria">Ingenieria</option>
                                            <option value="Licenciatura">Licenciatura</option>
                                            <option value="Maestria">Maestria</option>
                                            <option value="Doctorado">Doctorado</option>
                                        </select>
                                    </label>
                                    <div className="float-right">
                                        <MDBBtn color="secondary" onClick={this.toggleModal}>Cerrar</MDBBtn>
                                        <MDBBtn color="primary" onClick={() => { this.aproveAlert(this.state.idModal) }} >Guardar cambios</MDBBtn>
                                    </div>
                                </form>
                            </MDBModalBody>
                        </MDBModal>
                    }
                </MDBContainer>
            </div>
        );
    };
}

export default Evaluators;