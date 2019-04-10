import React, { Component } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBDataTable
} from "mdbreact";
import Navbar from "../../../../navbar/components/Navbar";
import axios from "../candidates/axios";
import Swal from "sweetalert2";

const url = "localhost";

let evaluatorsCopy = [];

var data;

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
        };
    }

    //table columns , added on header
    columns = [
        {
            label: "#",
            field: "ev_id",
            sort: "asc"
        },
        {
            label: "Nombre",
            field: "ev_name",
            sort: "asc"
        },
        {
            label: "Correo",
            field: "ev_email",
            sort: "asc"
        },
        {
            label: "Telefono",
            field: "ev_phone",
            sort: "asc"
        },
        {
            label: "Nivel Academico",
            field: "ev_academic_level",
            sort: "asc"
        },
        {
            label: "Horario",
            field: "schedules",
            sort: "asc"
        },
        {
            label: "Acciones",
            field: "handle",
            sort: "asc"
        }
    ];

    //set input values for open modal
    toggle = async id => {
        if (evaluatorsCopy[id] !== undefined) {
            await this.setState({
                idModal: evaluatorsCopy[id].ev_id,
                firstTime: false,
                nombre: evaluatorsCopy[id].ev_name,
                correo: evaluatorsCopy[id].ev_email,
                telefono: evaluatorsCopy[id].ev_phone,
                horario: evaluatorsCopy[id].schedules,
                nivel: evaluatorsCopy[id].ev_academic_level,
                modal: true
            });

        } else {
            console.log("demasiadas peticiones vuelve a intentarlo");
        }
    };

    //dismiss modal on close
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal,
            updated: false
        });
    };

    //update function (call from modal only)
    aproveAlert = async ev_id => {
        this.setState({
            ordenados: false
        });
        const sche = await axios.post(
            `http://${url}:3001/schedules/findBySchedule`,
            {
                request: {
                    msg: {
                        schedule: this.state.horario
                    }
                }
            }
        );

        if (sche.data.msg.sch_id !== undefined) {
            const res = await axios.post(
                `http://${url}:3001/evaluators/update/${ev_id}`,
                {
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
                }
            );

            if (res.data.code === 205) {
                await Swal.fire("¡Actualizado!", "Evaluador actualizado.", "success");
                await this.setButtons();
            } else {
                console.log("Error al actualizar evaluador");
            }
        } else {
            console.log("error al obtener horarios");
        }
    };

    //delete function (call from modal only)
    deleteAlert = async ev_id => {
        if (evaluatorsCopy[ev_id] !== undefined) {
            Swal.fire({
                title: '¿Estas seguro?',
                text: "No podras recuperar la información de un evaluador eliminado.",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Si, eliminar'
            }).then(async (result) => {
                if (result.value) {
                    const res = await axios.post(`http://${url}:3001/evaluators/delete`, {
                        request: {
                            msg: {
                                id: evaluatorsCopy[ev_id].ev_id
                            }
                        }
                    });

                    if (res.data.code === 205) {
                        await Swal.fire("¡Eliminado!", "Evaluador eliminado.", "success");
                        await this.setButtons();

                    } else {
                        console.log("Error al eliminar evaluador", res.data);
                    }
                }
            })
        } else {
            console.log("demasiadas peticiones vuelve a intentarlo");
        }
    };


    //iterates the evaluators adding buttons and detailed schedule
    setEvaluatorsHandle = async () => {
        await this.state.evaluators.map((element, index) => {
            return (
                element.schedules = element.schedules.sch_schedule,
                element.handle = (
                    <div className="text-center">
                        <MDBBtn id={index} color="orange" size="sm" onClick={this.handleClick}>
                            <MDBIcon icon="pen" className="mr-2" /> Editar
                        </MDBBtn>
                        <MDBBtn id={index} color="red" size="sm" onClick={this.handleClickDelete}>
                            <MDBIcon icon="times" className="mr-2" /> Eliminar
                        </MDBBtn>
                    </div>
                )
            )
        });
        evaluatorsCopy = await this.state.evaluators;
    };

    //set handle attr for evaluators (table rows)
    setButtons = async () => {
        try {
            const res = await axios.get(`evaluators/status/1`);

            if (res.data.status === 200) {
                const respuesta = res.data.msg;
                this.setState({
                    evaluators: respuesta.evaluators,
                    ordenados: true,
                    firstTime: true,
                    modal: false
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    //handle input onChange event
    handleChange = e => {
        const name = e.target.name;
        this.setState({
            firstTime: false,
            [name]: e.target.value
        });
    };

    handleClick = e => this.toggle(e.target.id);

    handleClickDelete = e => this.deleteAlert(e.target.id);

    //get first data from API
    async componentDidMount() {
        if (this.state.evaluators === undefined) {
            const res = await axios.get(`evaluators/status/1`);
            const respuesta = res.data.msg;

            const resSche = await axios.get(`schedules/`);
            const respuestaSche = resSche.data.msg;

            if (res.data.status === 200) {

                this.setState({
                    evaluators: respuesta.evaluators,
                    schedules: respuestaSche.schedules,
                    ordenados: true
                });
            }
        }
    }

    render() {
        if (this.state.ordenados) {
            if (this.state.firstTime) {
                this.setEvaluatorsHandle();

            }

            data = {
                columns: this.columns,
                rows: this.state.evaluators
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
                                </MDBCardHeader>
                                <MDBCardBody>
                                    {
                                        data !== undefined
                                        &&
                                        <MDBDataTable
                                            hover
                                            searchLabel="Buscar"
                                            entriesLabel="Mostrar entradas"
                                            paginationLabel={["Anterior", "Siguiente"]}
                                            infoLabel={["Mostrando de", "a", "de", "entradas"]}
                                            striped
                                            order={['ev_id', 'asc']}
                                            responsive
                                            bordered
                                            data={data}
                                        />
                                    }
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    {//if data exists
                        this.state.ordenados && (
                            <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
                                <MDBModalHeader toggle={this.toggleModal}>
                                    Editar Evaluador
                                </MDBModalHeader>
                                <MDBModalBody>
                                    <form>
                                        <MDBInput
                                            label="Codigo:"
                                            hint={String(this.state.idModal)}
                                            disabled
                                            type="text"
                                        />
                                        <MDBInput
                                            label="Nombre:"
                                            name="nombre"
                                            value={this.state.nombre}
                                            type="text"
                                            onChange={this.handleChange}
                                        />
                                        <MDBInput
                                            label="Correo:"
                                            name="correo"
                                            value={this.state.correo}
                                            type="email"
                                            onChange={this.handleChange}
                                        />
                                        <MDBInput
                                            label="Telefono:"
                                            name="telefono"
                                            value={this.state.telefono}
                                            type="text"
                                            onChange={this.handleChange}
                                        />
                                        <label className="d-block">
                                            Horario:
                                            <select
                                                name="horario"
                                                className="browser-default custom-select"
                                                value={this.state.horario}
                                                onChange={this.handleChange}
                                            >
                                                {this.state.schedules !== undefined &&
                                                    this.state.schedules.map(item => (
                                                        <option key={item.sch_id} value={item.sch_schedule}>
                                                            {" "}
                                                            {item.sch_schedule}{" "}
                                                        </option>
                                                    ))}
                                            </select>
                                        </label>
                                        <label className="d-block">
                                            Nivel Academico:
                                            <select
                                                name='nivel'
                                                className="browser-default custom-select"
                                                value={this.state.nivel}
                                                onChange={this.handleChange}
                                            >
                                                <option value="Bachillerato Técnico">
                                                    Bachillerato Técnico
                                                </option>
                                                <option value="Técnico Universitario">
                                                    Técnico Universitario
                                                </option>
                                                <option value="Ingenieria">Ingenieria</option>
                                                <option value="Licenciatura">Licenciatura</option>
                                                <option value="Maestria">Maestria</option>
                                                <option value="Doctorado">Doctorado</option>
                                            </select>
                                        </label>
                                        <div className="float-right">
                                            <MDBBtn color="secondary" onClick={this.toggleModal}>
                                                Cerrar
                                            </MDBBtn>
                                            <MDBBtn color="primary" onClick={() => {
                                                this.aproveAlert(this.state.idModal);
                                            }}> Guardar cambios</MDBBtn>
                                        </div>
                                    </form>
                                </MDBModalBody>
                            </MDBModal>
                        )}
                </MDBContainer>
            </div>
        );
    }
}

export default Evaluators;
