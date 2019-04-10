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
                id: undefined,
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

    assignmentsCopy = []

    columns = [
        {
            label: '#',
            field: 'asg_id',
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

    toggle = async (id) => {
        if(this.assignmentsCopy[id] !== undefined){
            await this.setState({
                selectedValues: {
                    id: this.assignmentsCopy[id].asg_id,
                    schedule: this.state.selectedValues.schedule,
                    evaluator: this.state.selectedValues.evaluator,
                    level: this.state.selectedValues.level,
                    course: this.state.selectedValues.course
                },
                modal: !this.state.modal
            });
        }else{
            console.log('demasiadas peticiones por favor espere')
        }
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

    updateAssignmentAlert = async () => {
        const res = await axios.post(`assignments/update/${this.state.selectedValues.id}`, {
            request: {
                msg: {
                    cou_id: String(this.state.selectedValues.course),
                    ev_id: String(this.state.selectedValues.evaluator)
                }
            }
        })
        if (res.data.code === 205) {
            await Swal.fire(
                '¡Modificado!',
                'Assignacion modificada.',
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

    deleteAssignmentAlert(id) {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras recuperar la información de una assignación eliminada.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, rechazar'
        }).then(async (result) => {
            if (result.value) {
                const res = await axios.post(`assignments/delete`, {
                    request: {
                        msg: {
                            id: String(this.assignmentsCopy[id].asg_id)
                        }
                    }
                })
                if (res.data.code === 205) {
                    await Swal.fire(
                        '¡Eliminado!',
                        'Assignacion eliminada',
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
        })
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
                id: this.state.selectedValues.id,
                schedule: valoresState.schedule,
                evaluator: valoresState.evaluator,
                level: valoresState.level,
                course: valoresState.course
            }
        });
    }

    handleClick = async (e) => await this.toggle(e.target.id);

    handleClickDelete = (e) => this.deleteAssignmentAlert(e.target.id)

    async setHandles() {
        if (this.state.assignments !== undefined) {
            await this.state.assignments.map((element, index) => {
                const levelName = this.state.levels.filter(item => item.lv_id === element.course.lv_id)
                return (
                    element.evaluator = element.evaluator.ev_name,
                    element.course = element.course.cou_name,
                    element.level = (levelName.length === 1 ? levelName[0].lv_name : 'Error:indefinido'),
                    element.handle =
                    <div className="text-center">
                        <MDBBtn id={index} color="orange" size="sm" onClick={this.handleClick} ><MDBIcon icon="pen" className="mr-2" /> Editar</MDBBtn>
                        <MDBBtn id={index} color="red" size="sm" onClick={this.handleClickDelete}><MDBIcon icon="times" className="mr-2" /> Eliminar</MDBBtn>
                    </div>
                )
            });
            this.assignmentsCopy = await this.state.assignments
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
        var data
        if (this.state.assignments !== undefined) {
            data = {
                columns: this.columns,
                rows:
                    this.state.assignments.map(item => {
                        return (
                            {
                                asg_id: item.asg_id,
                                evaluator: item.evaluator,
                                level: item.level,
                                course: item.course,
                                handle: item.handle
                            }
                        )
                    })
            }
        }
        return (
            <div >
                <Navbar />
                <MDBContainer fluid>
                    <MDBRow center className="my-5">
                        <MDBCol size="12" md="8">
                            <MDBCard>
                                <MDBCardHeader>
                                    <h1 className="text-center">Asignar Evaluadores a Proyectos</h1>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol size="12" md="6" className="offset-md-3">
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
                        <MDBCol size="12" className="mt-5">
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
                    <MDBModalHeader toggle={this.toggleModal}>Editar Asignación</MDBModalHeader>
                    <MDBModalBody>
                        <form>
                            <MDBInput
                                label="Codigo:"
                                hint={String(this.state.selectedValues.id)}
                                disabled
                                type="text"
                            />
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
                            <div className="float-right">
                                <MDBBtn color="secondary" onClick={this.toggleModal}>Cerrar</MDBBtn>
                                <MDBBtn color="primary" onClick={() => { this.updateAssignmentAlert() }} >Guardar cambios</MDBBtn>
                            </div>
                        </form>
                    </MDBModalBody>
                </MDBModal>
            </div>

        );
    };
}

export default Assignments;