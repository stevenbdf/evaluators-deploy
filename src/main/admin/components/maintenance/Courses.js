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
            field: 'id',
            sort: 'asc'
        },
        {
            label: 'Curso',
            field: 'curso',
            sort: 'asc'
        },
        {
            label: 'Profesor/a Guia',
            field: 'guia',
            sort: 'asc'
        },
        {
            label: 'Nivel',
            field: 'nivel',
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

    getColumnsCourses(){
        return this.columnsCourses;
    }

    setCoursesCopy(param) {
        this.coursesCopy = param;
    }
    
    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.context.setState({
          coursesModal:{
            id: this.context.state.coursesModal.id,
            [name]: value
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

    //add courses function (call from modal only)
    addCourseAlert = async () => {
        await this.context.setState({
            render: false,
        });

        const res = await axios.post(`course/add`, {
            request: {
                msg: {
                    name: String(this.context.state.levelsModal.level),
                    
                }
            }
        })
        if (res.data.code === 205) {
            await Swal.fire(
                '¡Guardado!',
                'Nivel agregado.',
                'success'
            )
            await this.context.getNewData()
            await this.context.setState({
                render: true,
                modalAddLvl: false,
                firstTime: false
            })
        } else {
            Swal.fire(
                '¡Error!',
                'Nivel ya registrado.',
                'error'
            )
            await this.context.setState({
                render: true
            })
        }
    }
}