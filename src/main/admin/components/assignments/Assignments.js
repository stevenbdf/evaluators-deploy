import React, { Component } from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader,
    MDBBtn, MDBIcon, MDBDataTable, MDBInput, MDBModal, MDBModalHeader, MDBModalBody
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
            selectedValues: {
                schedule: undefined,
                evaluator: undefined,
                level: undefined,
                course: undefined
            },
            assignments: undefined,
            evaluators: undefined,
            schedules: undefined,
            levels: undefined,
            courses: undefined,
            renderDataTable: false
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
            field: 'evaluator',
            sort: 'asc'
        },
        {
            label: 'Nivel',
            field: 'level',
            sort: 'asc'
        },
        {
            label: 'Curso',
            field: 'course',
            sort: 'asc'
        },
        {
            label: 'Acciones',
            field: 'handle'
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

    addAssignmentAlert = async () => {
        const res = await axios.post('assignments/add', {
            request: {
                msg: {
                    cou_id: String(this.state.selectedValues.course),
                    ev_id: String(this.state.selectedValues.evaluator)
                }
            }
        })
        if (res.data.code === 205) {
            await Swal.fire(
                '¡Guardado!',
                'Assignacion realizada.',
                'success'
            )
            this.getNewData();
        } else {
            Swal.fire(
                '¡Error!',
                'Leer consola',
                'error'
            )
            console.log(res)
        }
    }

    scheduleSelectChange = async (event) => {
        this.handleChange(event)
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
        this.handleChange(event)
        const response = await this.state.levels.filter(item => item.lv_name === event.target.value)
        if (response.length === 1) {
            const resCou = await axios.post('levels/getCourses', {
                request: {
                    msg: {
                        id: String(response[0].lv_id)
                    }
                }
            })
            if (resCou.status === 200) {
                const respuesta = resCou.data.msg;
                this.setState({
                    courses: respuesta.courses
                })
            }
        } else {
            console.log('Error: más de una coincidencia en el nombre del nivel')
        }
    }

    handleChange = async (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name

        let valoresState = {
            schedule: this.state.selectedValues.schedule,
            evaluator: this.state.selectedValues.evaluator,
            level: this.state.selectedValues.level,
            course: this.state.selectedValues.course
        }

        switch (name) {
            case 'schedule':
                valoresState.schedule = value
                break;
            case 'evaluator':
                const responseEv = await this.state.evaluators.filter(item => item.ev_name === value)
                responseEv.length === 1
                    ? (valoresState.evaluator = responseEv[0].ev_id)
                    : console.log('Error: más de una coincidencia en el nombre del evaluador')
                break;
            case 'level':
                valoresState.level = value
                break;
            case 'course':
                const responseCou = await this.state.courses.filter(item => item.cou_name === value)
                responseCou.length === 1
                    ? (valoresState.course = responseCou[0].cou_id)
                    : console.log('Error: más de una coincidencia en el nombre del curso')
                break;
            default:
                console.log('Error: input name sin coincidencias')
                break;
        }

        this.setState({
            selectedValues: {
                schedule: valoresState.schedule,
                evaluator: valoresState.evaluator,
                level: valoresState.level,
                course: valoresState.course
            }
        });
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

    async setHandles() {
        if (this.state.assignments !== undefined) {
            await this.state.assignments.map((element, index) => {
                const levelName = this.state.levels.filter(item => item.lv_id === element.course.lv_id)
                return (
                    element.level = (levelName.length === 1 ? levelName[0].lv_name : 'Error:indefinido'),
                    element.course = element.course.cou_name,
                    element.evaluator = element.evaluator.ev_name,
                    element.handle =
                    <div className="text-center">
                        <MDBBtn id={index} color="orange" size="sm"><MDBIcon icon="pen" className="mr-2" /> Editar</MDBBtn>
                        <MDBBtn id={index} color="red" size="sm"><MDBIcon icon="times" className="mr-2" /> Eliminar</MDBBtn>
                    </div>
                )
            });
        }
        this.setState({
            renderDataTable: true
        })
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
        if (resLvl.status === 200) {
            const respuesta = resLvl.data.msg;
            this.setState({
                levels: respuesta.level
            })
        }
    }

    async getNewData() {
        try {
            const res = await axios.get(`assignments/`)
            if (res.status === 200) {
                const respuesta = res.data.msg;
                this.setState({
                    assignments: respuesta.assignments,
                    renderDataTable: false
                })
            }
            await this.setHandles()
        } catch (error) {
            console.log(error)
        }
    }

    async getDataTable() {
        if (this.state.assignments === undefined) {
            const res = await axios.get(`assignments/`)
            if (res.status === 200) {
                const respuesta = res.data.msg;
                this.setState({
                    assignments: respuesta.assignments
                })
            }
        }
    }

    async componentDidMount() {
        await this.getDataOptions()
        await this.getDataTable()
        await this.setHandles()
    }

    render() {
        const data = {
            columns: this.columns,
            rows: this.state.assignments
        }
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
                                                    <select name="schedule" className="browser-default custom-select" onChange={this.scheduleSelectChange}>
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
                                                    <select name="evaluator" className="browser-default custom-select" onChange={this.handleChange}>
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
                                                    <select name="level" className="browser-default custom-select" onChange={this.levelSelectChange}>
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
                                                    <select name="course" className="browser-default custom-select" onChange={this.handleChange}>
                                                        <option>Seleccione un curso...</option>
                                                        {
                                                            this.state.courses !== undefined
                                                            &&
                                                            this.state.courses.map(item =>
                                                                <option key={item.cou_id} value={item.cou_name}> {item.cou_name} </option>
                                                            )
                                                        }
                                                    </select>
                                                </label>

                                                <div className="text-center py-4 mt-3">

                                                    <MDBBtn color="teal" onClick={() => {
                                                        this.addAssignmentAlert()
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
                                </MDBCardHeader>
                                <MDBCardBody>
                                    {
                                        this.state.renderDataTable
                                        &&
                                        <MDBDataTable
                                            hover
                                            searchLabel="Buscar"
                                            entriesLabel="Mostrar entradas"
                                            paginationLabel={["Anterior", "Siguiente"]}
                                            infoLabel={["Mostrando de", "a", "de", "entradas"]}
                                            striped
                                            entriesOptions={[5, 10, 20, 50, 100]}
                                            entries={5}
                                            responsive
                                            bordered
                                            data={data}
                                        />
                                    }
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <MDBModalHeader toggle={this.toggleModal}>Editar Evaluador</MDBModalHeader>
                    <MDBModalBody>
                        <form>
                            {/* <label className="d-block mt-3"> Evaluador
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
                            </label> */}
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