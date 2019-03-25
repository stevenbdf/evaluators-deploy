import Swal from 'sweetalert2';
import axios from '../candidates/axios';

export default class Locals {
    constructor(context) {
        this.context = context
    }

    localsCopy = [];

    columnsLocals = [
        {
            label: '#',
            field: 'id',
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

    setLocalsCopy(param) {
        this.localsCopy = param;
    }

    getColumnsLocal(){
        return this.columnsLocals;
    }

    //handle input onChange event
    handleChangeLocals = (e) => {
        this.context.setState({
            firstTime: false,
            localsModal: {
                id: this.context.state.localsModal.id,
                local: e.target.value
            }
        });
    }

    toggleAddLocals() {
        this.context.setState({
            localsModal: {
                id: '',
                local: ''
            },
            firstTime: false,
            modalAddLocal: true
        })
    }

    //add levels function (call from modal only)
    addLocalAlert = async () => {
        await this.context.setState({
            render: false,
        });

        const res = await axios.post(`locals/add`, {
            request: {
                msg: {
                    name: String(this.context.state.localsModal.local)
                }
            }
        })
        if (res.data.code === 205) {
            await Swal.fire(
                '¡Guardado!',
                'Local agregado.',
                'success'
            )
            await this.context.getNewData()
            await this.context.setState({
                render: true,
                modalAddLocal: false,
                firstTime: false
            })
        } else {
            Swal.fire(
                '¡Error!',
                'Local ya registrado.',
                'error'
            )
            await this.context.setState({
                render: true
            })
        }
    }

    setDataModalLocals = async (id) => {
        await this.context.setState({
            localsModal: {
                id: this.localsCopy[id].lc_id,
                local: this.localsCopy[id].lc_name
            },
            firstTime: false,
            modalLocal: true
        })
    }

    //set locals input values for open modal
    toggleLocals = async (id) => {
        if (this.localsCopy[id] !== undefined) {
            this.setDataModalLocals(id)
        }
    }

    //update Locals function (call from modal only)
    updateLocalAlert = async (lc_id) => {
        await this.context.setState({
            render: false,
        });

        const res = await axios.post(`locals/update/${lc_id}`, {
            request: {
                msg: {
                    name: String(this.context.state.localsModal.local)
                }
            }
        })

        if (res.data.code === 205) {
            await Swal.fire(
                '¡Actualizado!',
                'Local actualizado.',
                'success'
            )
            await this.context.getNewData()
            await this.context.setState({
                render: true,
                modalLocal: false,
                firstTime: false
            })
        } else {
            console.log('Error al actualizar local')
        }
    }

    //delete function (call from modal only)
    deleteLocalAlert = async (lc_id) => {
        await this.context.setState({
            render: false,
        });

        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras recuperar la información de un local eliminado.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar'
        })
            .then(async (result) => {
                if (result.value) {
                    const res = await axios.post(`locals/delete`, {
                        request: {
                            msg: {
                                id: this.localsCopy[lc_id].lc_id
                            }
                        }
                    })

                    if (res.data.code === 205) {
                        await Swal.fire(
                            '¡Eliminado!',
                            'Local eliminado.',
                            'success'
                        )
                        await this.context.getNewData()
                        this.context.setState({
                            render: true,
                            modalLocal: false,
                            firstTime: false
                        })
                    } else if (res.data.code === 400) {
                        await Swal.fire(
                            '¡No borrado!',
                            'Existen cursos relacionados a este local.',
                            'error'
                        )
                        this.context.setState({
                            render: true,
                            modalLocal: false,
                            firstTime: false
                        })
                    } else {
                        console.log(res)
                    }
                } else {
                    this.context.setState({
                        render: true,
                        modalLocal: false,
                        firstTime: false
                    })
                }
            })
    }

}