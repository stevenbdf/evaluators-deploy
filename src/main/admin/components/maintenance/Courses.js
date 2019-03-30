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
        const name = target.name
        
        let valoresState = {
            course: this.context.state.coursesModal.course,
            teacher: this.context.state.coursesModal.teacher,
            local: this.context.state.coursesModal.local,
            level: this.context.state.coursesModal.level
        }
              
        switch(name){
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
          coursesModal:{
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

    //add courses function (call from modal only)
    addCourseAlert = async () => {
        await this.context.setState({
            render: false,
        });

        
        // Falta obtener id de nivel y cursos,
        // luego ejecutar peticiones para guardar
        // curso


        const res = await axios.post(`levels/add`, {
            request: {
                msg: {
                    name: String(this.context.state.levelsModal.level)
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