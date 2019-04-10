import React, { Component } from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader,
    MDBBtn, MDBIcon, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBModal, MDBModalHeader, MDBModalBody
} from 'mdbreact';
import Navbar from '../../../../navbar/components/Navbar';
import Swal from 'sweetalert2'
import axios from '../candidates/axios';

class Assignments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            id: 0,
            nombre: '',
            nivel: '',
            curso: '',
            evaluators: undefined,
            schedules: undefined,
            levels: undefined
        }
    }




    aproveAlert(titulo, descrip) {
        Swal.fire(
            titulo,
            descrip,
            'success'
        )
    };

    rejectAlert() {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras recuperar la información de un candidato rechazado.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, rechazar'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    '¡Rechazado!',
                    'Evaluador rechazado.',
                    'success'
                )
            }
        })
    }

    columns = [
        {
            label: '#',
            field: 'id',
            sort: 'asc'
        },
        {
            label: 'Evaluador',
            field: 'evaluador',
            sort: 'asc'
        },
        {
            label: 'Nivel',
            field: 'nivel',
            sort: 'asc'
        },
        {
            label: 'Curso',
            field: 'curso',
            sort: 'asc'
        }

    ];

    dataRows = [
        {
            "id": 1,
            "nombre": "Steven Benjamin Diaz Flores",
            "nivel": "Primer año bachillerato",
            "curso": "Desarrollo de Software Grupo 1",
            "handle": ""
        },
        {
            "id": 2,
            "nombre": "Rodrigo Alejandro Castillo Monterrosa",
            "nivel": "Primer año bachillerato",
            "curso": "Desarrollo de Software Grupo 1",
            "handle": ""
        },
        {
            "id": 3,
            "nombre": "Katherine Michelle Fuentes Medrano",
            "nivel": "Primer año bachillerato",
            "curso": "Electromecanica Grupo 2",
            "handle": ""
        },
        {
            "id": 4,
            "nombre": "Alicia Alejandra Mendizabal Figueroa",
            "nivel": "9no Grado",
            "curso": "D",
            "handle": ""
        },
        {
            "id": 5,
            "nombre": "Boris Ilich Huezo Arriola",
            "nivel": "Segundo año bachillerato",
            "curso": "Administrativo Contable Grupo 1",
            "handle": ""
        }
    ]


    toggle = (id) => {
        console.log(id)
        this.setState({
            id: id,
            nombre: this.dataRows[id - 1].nombre,
            nivel: this.dataRows[id - 1].nivel,
            curso: this.dataRows[id - 1].curso,
            modal: !this.state.modal
        });

    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    scheduleSelectChange = async (event) => {
        const response = await this.state.schedules.filter(item => item.sch_schedule === event.target.value)
        if (response.length === 1) {
            const resEv = await axios.post('evaluators/findBySchedule', {
                request: {
                    msg: {
                        id: String(response[0].sch_id)
                    }
                }
            })
            if (resEv.status === 200) {
                const respuesta = resEv.data.msg;
                this.setState({
                    evaluators: respuesta.evaluator
                })
            }
        } else {
            console.log('Error: más de una coincidencia en el nombre del horario')
        }
    }

    levelSelectChange = async (event) => {
        const response = await this.state.levels.filter(item => item.lv_name === event.target.value)
        if (response.length === 1) {
            const resEv = await axios.post('evaluators/findBySchedule', {
                request: {
                    msg: {
                        id: String(response[0].sch_id)
                    }
                }
            })
            if (resEv.status === 200) {
                const respuesta = resEv.data.msg;
                this.setState({
                    evaluators: respuesta.evaluator
                })
            }
        } else {
            console.log('Error: más de una coincidencia en el nombre del horario')
        }
    }

    handleClick = e => this.toggle(e.target.id);


    componentWillMount() {
        for (var i = 0; i < this.dataRows.length; i++) {
            var idActual = this.dataRows[i].id;
            this.dataRows[i].handle =
                <div className="text-center">
                    <MDBBtn id={idActual} color="orange" size="sm" onClick={this.handleClick} ><MDBIcon icon="pen" className="mr-2" /> Editar</MDBBtn>
                    <MDBBtn color="red" size="sm" onClick={this.rejectAlert}><MDBIcon icon="times" className="mr-2" /> Eliminar</MDBBtn>
                </div>
        }
    }

    async getDataOptions() {
        const resSche = await axios.get(`schedules/`)
        if (resSche.status === 200) {
            const respuesta = resSche.data.msg;
            this.setState({
                schedules: respuesta.schedules
            })
        }
        const resLvl = await axios.get(`levels/`)
        if(resLvl.status === 200){
            const respuesta = resLvl.data.msg;
            this.setState({
                levels: respuesta.level
            })
        }
    }

    async componentDidMount() {
        await this.getDataOptions()
        console.log(this.state.schedules, this.state.evaluators)
    }


    render() {

        return (
            <div >
                <Navbar />
                <MDBContainer fluid>
                    <MDBRow center className="my-5">
                        <MDBCol size="8">
                            <MDBCard>
                                <MDBCardHeader>
                                    <h1 className="text-center">Asignar Evaluadores a Proyectos</h1>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol size="6" className="offset-3">
                                            <form>
                                                <label className="d-block mt-3"> Horario
                                                    <select className="browser-default custom-select" onChange={this.scheduleSelectChange}>
                                                        <option>Seleccione un horario...</option>
                                                        {
                                                            this.state.schedules !== undefined
                                                            &&
                                                            this.state.schedules.map(item =>
                                                                <option key={item.sch_id} value={item.sch_schedule}> {item.sch_schedule} </option>
                                                            )
                                                        }
                                                    </select>
                                                </label>
                                                <label className="d-block mt-3"> Evaluador
                                                    <select className="browser-default custom-select">
                                                        <option>Seleccione un evaluador...</option>
                                                        {
                                                            this.state.evaluators !== undefined
                                                            &&
                                                            this.state.evaluators.map(item =>
                                                                <option key={item.ev_id} value={item.ev_name}> {item.ev_name} </option>
                                                            )
                                                        }
                                                    </select>
                                                </label>
                                                <label className="d-block mt-3"> Nivel
                                                    <select className="browser-default custom-select" onChange={this.levelSelectChange}>
                                                        <option>Seleccione un nivel...</option>
                                                        {
                                                            this.state.levels !== undefined
                                                            &&
                                                            this.state.levels.map(item =>
                                                                <option key={item.lv_id} value={item.lv_name}> {item.lv_name} </option>
                                                            )
                                                        }
                                                    </select>
                                                </label>
                                                <label className="d-block mt-3"> Curso
                                                    <select className="browser-default custom-select">
                                                        <option>Seleccione un curso...</option>
                                                        <option value="1">A</option>
                                                        <option value="2">B</option>
                                                        <option value="3">C</option>
                                                        <option value="4">D</option>
                                                        <option value="5">Desarrollo de Software Grupo 1</option>
                                                        <option value="6">Electronica Grupo 1</option>
                                                        <option value="7">Electromecanica Grupo 2</option>
                                                        <option value="8">Administrativo Contable Grupo 1</option>
                                                    </select>
                                                </label>

                                                <div className="text-center py-4 mt-3">

                                                    <MDBBtn color="teal" onClick={() => {
                                                        this.aproveAlert('¡Guardada!', 'Asignación guardada.')
                                                    }}>
                                                        Asignar
                                                        <MDBIcon icon="paper-plane" className="ml-2" />
                                                    </MDBBtn>

                                                </div>
                                            </form>

                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol className="mt-5">
                            <MDBCard>
                                <MDBCardHeader>
                                    <h1 className="text-center">Listado de asignaciones</h1>
                                    <MDBCol md="4" className="offset-md-8" >
                                        <MDBInput label="Buscar" icon="search" />
                                    </MDBCol>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBTable btn responsive hover className="text-center">
                                        <MDBTableHead columns={this.columns} />
                                        <MDBTableBody rows={this.dataRows} />
                                    </MDBTable>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <MDBModalHeader toggle={this.toggleModal}>Editar Evaluador</MDBModalHeader>
                    <MDBModalBody>
                        <form>
                            <label className="d-block mt-3"> Evaluador
                                <select name="nombre" className="browser-default custom-select" value={this.state.nombre} onChange={this.handleChange}>
                                    <option>Seleccione un evaluador...</option>
                                    <option value="Steven Benjamin Diaz Flores">Steven Benjamin Diaz Flores</option>
                                    <option value="Rodrigo Alejadro Castillo Monterrosa">Rodrigo Alejadro Castillo Monterrosa</option>
                                    <option value="Katherine Michelle Fuentes Medrano">Katherine Michelle Fuentes Medrano</option>
                                    <option value="Alicia Alejandra Mendizabal Figueroa">Alicia Alejandra Mendizabal Figueroa</option>
                                    <option value="Boris Ilich Huezo Arriola">Boris Ilich Huezo Arriola</option>
                                </select>
                            </label>
                            <label className="d-block mt-3"> Nivel
                                <select name="nivel" className="browser-default custom-select" value={this.state.nivel} onChange={this.handleChange}>
                                    <option>Seleccione un nivels...</option>
                                    <option value="7mo Grado">7mo Grado</option>
                                    <option value="8vo Grado">8vo Grado</option>
                                    <option value="9no Grado">9no Grado</option>
                                    <option value="Primer año bachillerato">Primer año bachillerato</option>
                                    <option value="Segundo año bachillerato">Segundo año bachillerato</option>
                                    <option value="Tercer año bachillerato">Tercer año bachillerato</option>
                                </select>
                            </label>
                            <label className="d-block mt-3"> Curso
                                <select name="curso" className="browser-default custom-select" value={this.state.curso} onChange={this.handleChange}>
                                    <option>Seleccione un curso...</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="Desarrollo de Software Grupo 1">Desarrollo de Software Grupo 1</option>
                                    <option value="Electronica Grupo 1">Electronica Grupo 1</option>
                                    <option value="Electromecanica Grupo 2">Electromecanica Grupo 2</option>
                                    <option value="Administrativo Contable Grupo 1">Administrativo Contable Grupo 1</option>
                                </select>
                            </label>
                            <div className="float-right">
                                <MDBBtn color="secondary" onClick={this.toggleModal}>Cerrar</MDBBtn>
                                <MDBBtn color="primary" onClick={() => { this.aproveAlert('¡Modificado!', 'Asignación modificada.') }} >Guardar cambios</MDBBtn>
                            </div>
                        </form>
                    </MDBModalBody>
                </MDBModal>
            </div>

        );
    };
}



export default Assignments;