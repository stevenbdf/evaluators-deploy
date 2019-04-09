import Swal from 'sweetalert2';
import axios from '../candidates/axios';

export default class Courses {
    constructor(context) {
        this.context = context
    }
    coursesCopy = [];

    columnsCourses = [
        {
            label: '#',
            field: 'cou_id',
            sort: 'asc'
        },
        {
            label: 'Curso',
            field: 'cou_name',
            sort: 'asc'
        },
        {
            label: 'Profesor/a Guia',
            field: 'cou_teacher_guide',
            sort: 'asc'
        },
        {
            label: 'Nivel',
            field: 'level',
            sort: 'asc'
        },
        {
            label: 'Local',
            field: 'local',
            sort: 'asc'
        },
        {
            label: 'Acciones',
            field: 'handle',
            sort: 'asc'
        }
    ];

    getColumnsCourses() {
        return this.columnsCourses;
    }

    setCoursesCopy(param) {
        this.coursesCopy = param;
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name

        let valoresState = {
            course: this.context.state.coursesModal.course,
            teacher: this.context.state.coursesModal.teacher,
            local: this.context.state.coursesModal.local,
            level: this.context.state.coursesModal.level
        }

        switch (name) {
            case 'curso':
                valoresState.course = value
                break;
            case 'profesor':
                valoresState.teacher = value
                break;
            case 'local':
                valoresState.local = value
                break;
            case 'nivel':
                valoresState.level = value
                break;
            default:
                console.log('Error: input name sin coincidencias')
                break;
        }

        this.context.setState({
            coursesModal: {
                id: this.context.state.coursesModal.id,
                course: valoresState.course,
                teacher: valoresState.teacher,
                local: valoresState.local,
                level: valoresState.level
            }
        });
    }

    toggleAddCourses() {
        this.context.setState({
            coursesModal: {
                id: '',
                course: '',
                teacher: '',
                local: '',
                level: ''
            },
            firstTime: false,
            modalAddCourse: true
        })
    }

    setDataModalCourses = async (id) => {
        await this.context.setState({
            coursesModal: {
                id: this.coursesCopy[id].cou_id,
                course: this.coursesCopy[id].cou_name,
                teacher: this.coursesCopy[id].cou_teacher_guide,
                local: this.coursesCopy[id].local,
                level: this.coursesCopy[id].level
            },
            firstTime: false,
            modalCourse: true
        })
    }

    //set Courses input values for open modal
    toggleCourses = async (id) => {
        if (this.coursesCopy[id] !== undefined) {
            this.setDataModalCourses(id)
        }
    }

    //add courses function (call from modal only)
    addCourseAlert = async () => {
        await this.context.setState({
            render: false,
        });

        const resLevel = await axios.post(`levels/get`, {
            request: {
                msg: {
                    name: String(this.context.state.coursesModal.level)
                }
            }
        })

        const resLocal = await axios.post(`locals/get`, {
            request: {
                msg: {
                    name: String(this.context.state.coursesModal.local)
                }
            }
        })


        const res = await axios.post(`courses/add`, {
            request: {
                msg: {
                    name: String(this.context.state.coursesModal.course),
                    teacher_guide: this.context.state.coursesModal.teacher,
                    lv_id: String(resLevel.data.msg.level[0].lv_id),
                    lc_id: String(resLocal.data.msg.local[0].lc_id)
                }
            }
        })
        console.log(res)
        if (res.data.code === 205) {
            await Swal.fire(
                '¡Guardado!',
                'Curso agregado.',
                'success'
            )
            await this.context.getNewData()
            await this.context.setState({
                render: true,
                modalAddCourse: false,
                firstTime: false
            })
        } else {
            Swal.fire(
                '¡Error!',
                'Curso ya registrado.',
                'error'
            )
            await this.context.setState({
                render: true
            })
        }
    }

    //update courses function (call from modal only)
    updateCourseAlert = async (cou_id) => {
        await this.context.setState({
            render: false,
        });

        const resLevel = await axios.post(`levels/get`, {
            request: {
                msg: {
                    name: String(this.context.state.coursesModal.level)
                }
            }
        })

        const resLocal = await axios.post(`locals/get`, {
            request: {
                msg: {
                    name: String(this.context.state.coursesModal.local)
                }
            }
        })


        const res = await axios.post(`courses/update/${cou_id}`, {
            request: {
                msg: {
                    name: String(this.context.state.coursesModal.course),
                    teacher_guide: this.context.state.coursesModal.teacher,
                    lv_id: String(resLevel.data.msg.level[0].lv_id),
                    lc_id: String(resLocal.data.msg.local[0].lc_id)
                }
            }
        })
        console.log(res)
        if (res.data.code === 205) {
            await Swal.fire(
                '¡Guardado!',
                'Curso modificado.',
                'success'
            )
            await this.context.getNewData()
            await this.context.setState({
                render: true,
                modalCourse: false,
                firstTime: false
            })
        } else {
            console.log('Error al actualizar curso')
        }
    }

    //delete function (call from modal only)
    deleteCourseAlert = async (cou_id) => {
        await this.context.setState({
            render: false,
        });

        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras recuperar la información de un curso eliminado.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar'
        })
            .then(async (result) => {
                if (result.value) {
                    const res = await axios.post(`courses/delete`, {
                        request: {
                            msg: {
                                id: this.coursesCopy[cou_id].cou_id
                            }
                        }
                    })

                    if (res.data.code === 205) {
                        await Swal.fire(
                            '¡Eliminado!',
                            'Curso eliminado.',
                            'success'
                        )
                        await this.context.getNewData()
                        this.context.setState({
                            render: true,
                            modalCourse: false,
                            firstTime: false
                        })
                    } else if (res.data.code === 400) {
                        await Swal.fire(
                            '¡No borrado!',
                            'Existen evaluadores asignados a este curso.',
                            'error'
                        )
                        this.context.setState({
                            render: true,
                            modalCourse: false,
                            firstTime: false
                        })
                    } else {
                        console.log(res)
                    }
                } else {
                    this.context.setState({
                        render: true,
                        modalCourse: false,
                        firstTime: false
                    })
                }
            })
    }
}