import Swal from 'sweetalert2';
import axios from '../candidates/axios';

export default class Schedules {
    constructor ( context ) {
        this.context = context
    }
    schedulesCopy = [];

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
    
    getColumnsSchedule(){
        return this.columnsSchedule
    }
    
    setSchedulesCopy(param){
        this.schedulesCopy = param;
    }

    //handle input onChange event
    handleChangeSchedule = (e) => {
        this.context.setState({
            firstTime: false,
            schedulesModal: {
                id: this.context.state.schedulesModal.id,
                schedule: e.target.value
            }
        });
    }

    //set input values for open modal
    toggleAdd(){
        this.context.setState({
            schedulesModal: {
                id: '',
                schedule: ''
            },
            firstTime: false,
            modalAdd: true
        })
    }

    //delete schedules function (call from modal only)
    deleteAlert = async (sch_id) => {
        await this.context.setState({
            render: false,
        });

        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras recuperar la información de un horario eliminado.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar'
        })
            .then(async (result) => {
                if(result.value){
                    const res = await axios.post(`schedules/delete`, {
                        request: {
                            msg: {
                                id: this.schedulesCopy[sch_id].sch_id
                            }
                        }
                    })
    
                    if (res.data.code === 205) {
                        await Swal.fire(
                            '¡Eliminado!',
                            'Horario eliminado.',
                            'success'
                        )
                        await this.context.getNewData()
                        this.context.setState({
                            render: true,
                            modal: false,
                            firstTime: false
                        })
                    } else if (res.data.code === 400) {
                        await Swal.fire(
                            '¡No borrado!',
                            'Existen evaluadores y/o candidatos relacionados a este horario.',
                            'error'
                        )
                        this.context.setState({
                            render: true,
                            modal: false,
                            firstTime: false
                        })
                    } else {
                        console.log(res)
                    }
                }else{
                    this.context.setState({
                        render: true,
                        modal: false,
                        firstTime: false
                    })
                }
            })
    }

    setDataModalSchedules = async (id) => {
        await this.context.setState({
            schedulesModal: {
                id: this.schedulesCopy[id].sch_id,
                schedule: this.schedulesCopy[id].sch_schedule
            },
            firstTime: false,
            modal: true
        })
    }

    //set schedules input values for open modal
    toggle = async (id) => {
        if (this.schedulesCopy[id] !== undefined) {
            this.setDataModalSchedules(id)
        }
    }

    //add schedules function (call from modal only)
    addAlert = async () => {
        await this.context.setState({
            render: false,
        });

        const res = await axios.post(`schedules/add`, {
            request: {
                msg: {
                    schedule: String(this.context.state.schedulesModal.schedule)
                }
            }
        })
        if (res.data.code === 205) {
            await Swal.fire(
                '¡Guardado!',
                'Horario agregado.',
                'success'
            )
            await this.context.getNewData()
            await this.context.setState({
                render: true,
                modalAdd: false,
                firstTime: false
            })
        } else {
            Swal.fire(
                '¡Error!',
                'Horario ya registrado.',
                'error'
            )
            await this.context.setState({
                render: true
            })
        }
    }

    //update Schedules function (call from modal only)
    updateAlert = async (sch_id) => {
        await this.context.setState({
            render: false,
        });

        const res = await axios.post(`schedules/update/${sch_id}`, {
            request: {
                msg: {
                    schedule: String(this.context.state.schedulesModal.schedule)
                }
            }
        })

        if (res.data.code === 205) {
            await Swal.fire(
                '¡Actualizado!',
                'Horario actualizado.',
                'success'
            )
            await this.context.getNewData()
            await this.context.setState({
                render: true,
                modal: false,
                firstTime: false
            })
        } else {
            console.log('Error al actualizar evaluador')
        }
    }

  }