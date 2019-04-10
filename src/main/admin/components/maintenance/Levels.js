import Swal from 'sweetalert2';
import axios from '../candidates/axios';

export default class Levels {
    constructor(context) {
        this.context = context
    }
    levelsCopy = [];

    columnsLevel = [
        {
            label: '#',
            field: 'lv_id',
            sort: 'asc'
        },
        {
            label: 'Nivel',
            field: 'lv_name',
            sort: 'asc'
        },
        {
            label: 'Acciones',
            field: 'handle',
            sort: 'asc'
        }
    ];

    getColumnsLevel() {
        return this.columnsLevel;
    }

    setLevelsCopy(param) {
        this.levelsCopy = param;
    }

    //handle input onChange event
    handleChangeLevels = (e) => {
        this.context.setState({
            firstTime: false,
            levelsModal: {
                id: this.context.state.levelsModal.id,
                level: e.target.value
            }
        });
    }

    setDataModalLevels = async (id) => {
        await this.context.setState({
            levelsModal: {
                id: this.levelsCopy[id].lv_id,
                level: this.levelsCopy[id].lv_name
            },
            firstTime: false,
            modalLvl: true
        })
    }

    //set levels input values for open modal
    toggleLevels = async (id) => {
        if (this.levelsCopy[id] !== undefined) {
            this.setDataModalLevels(id)
        }
    }

    toggleAddLevels() {
        this.context.setState({
            levelsModal: {
                id: '',
                level: ''
            },
            firstTime: false,
            modalAddLvl: true
        })
    }

    //add levels function (call from modal only)
    addLevelAlert = async () => {
        await this.context.setState({
            render: false,
        });

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

    //update Levels function (call from modal only)
    updateLevelAlert = async (lv_id) => {
        await this.context.setState({
            render: false,
        });

        const res = await axios.post(`levels/update/${lv_id}`, {
            request: {
                msg: {
                    name: String(this.context.state.levelsModal.level)
                }
            }
        })

        if (res.data.code === 205) {
            await Swal.fire(
                '¡Actualizado!',
                'Nivel actualizado.',
                'success'
            )
            await this.context.getNewData()
            await this.context.setState({
                render: true,
                modalLvl: false,
                firstTime: false
            })
        } else {
            console.log('Error al actualizar nivel')
        }
    }

    //delete function (call from modal only)
    deleteLevelAlert = async (lv_id) => {
        await this.context.setState({
            render: false,
        });

        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras recuperar la información de un nivel eliminado.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar'
        })
            .then(async (result) => {
                if (result.value) {
                    const res = await axios.post(`levels/delete`, {
                        request: {
                            msg: {
                                id: this.levelsCopy[lv_id].lv_id
                            }
                        }
                    })

                    if (res.data.code === 205) {
                        await Swal.fire(
                            '¡Eliminado!',
                            'Nivel eliminado.',
                            'success'
                        )
                        await this.context.getNewData()
                        this.context.setState({
                            render: true,
                            modalLvl: false,
                            firstTime: false
                        })
                    } else if (res.data.code === 400) {
                        await Swal.fire(
                            '¡No borrado!',
                            'Existen cursos relacionados a este nivel.',
                            'error'
                        )
                        this.context.setState({
                            render: true,
                            modalLvl: false,
                            firstTime: false
                        })
                    } else {
                        console.log(res)
                    }
                } else {
                    this.context.setState({
                        render: true,
                        modalLvl: false,
                        firstTime: false
                    })
                }
            })
    }


}