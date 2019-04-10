import React, { Component } from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader,
    MDBBtn, MDBIcon, MDBInput,
    MDBModal, MDBModalBody, MDBModalHeader
} from 'mdbreact';
import TableComponent from '../maintenance/Table';
import Navbar from '../../../../navbar/components/Navbar';
import axios from '../candidates/axios';
import Swal from 'sweetalert2';

const url = "localhost";

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
            firstTime: true,
            render: false
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
            label: 'Apellido',
            field: 'apellido',
            sort: 'asc'
        },
        {
            label: 'Email',
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
        this.setState({
            render: true
        })
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
        }
        this.setEvaluatorsHandle();
    };


    render() {
        return (
            <div className="text-center">
                <Navbar />
                <MDBContainer fluid>
                    <MDBRow center className="my-5">
                        <MDBCol>
                            <MDBCard>
                                <MDBCardHeader>
                                    <h1 className="text-center">Usuarios</h1>
                                    <MDBBtn color="green" size="sm"><MDBIcon icon="plus " className="mr-2" /> Agregar</MDBBtn>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    {
                                        //if data exists
                                        this.state.render
                                        &&
                                        (
                                            <TableComponent
                                                columns={this.columns}
                                                rows={this.state.evaluators}
                                            />
                                 )
                             }
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    };
}

export default Evaluators;