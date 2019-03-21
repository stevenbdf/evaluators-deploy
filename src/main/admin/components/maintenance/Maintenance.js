import React, { Component } from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader,MDBBtn, MDBIcon
} from 'mdbreact';
import Navbar from '../../../../navbar/components/Navbar';
import ModalComponent from './Modal';
import TableComponent from './Table';
import Swal from 'sweetalert2';
import axios from '../candidates/axios';

let schedulesCopy = []
let levelsCopy = []

class Candidates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstTime: true,
            schedules: undefined,
            schedulesModal: {
                id: undefined,
                schedule: undefined
            },
            levels: undefined,
            levelsModal:{
                id: undefined,
                level: undefined
            }
            ,
            render: false,
            modal: false,
            modalAdd: false,
            modalLvl: false,
            modalAddLvl: false
        }
    }

    //schedules' table columns, added on header
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

    //levels' table columns , added on header
    columnsLevel = [
        {
            label: '#',
            field: 'id',
            sort: 'asc'
        },
        {
            label: 'Nivel',
            field: 'nivel',
            sort: 'asc'
        },
        {
            label: 'Acciones',
            field: 'handle',
            sort: 'asc'
        }

    ];

    //update Schedules function (call from modal only)
    updateAlert = async (sch_id) => {
        await this.setState({
            render: false,
        });

        const res = await axios.post(`schedules/update/${sch_id}`, {
            request: {
                msg: {
                    schedule: String(this.state.schedulesModal.schedule)
                }
            }
        })

        if (res.data.code === 205) {
            await Swal.fire(
                '¡Actualizado!',
                'Horario actualizado.',
                'success'
            )
            await this.getNewData()
            await this.setState({
                render: true,
                modal: false,
                firstTime: false
            })
        } else {
            console.log('Error al actualizar evaluador')
        }
    }

    //update Levels function (call from modal only)
    updateLevelAlert = async (lv_id) => {
        await this.setState({
            render: false,
        });

        const res = await axios.post(`levels/update/${lv_id}`, {
            request: {
                msg: {
                    name: String(this.state.levelsModal.level)
                }
            }
        })

        if (res.data.code === 205) {
            await Swal.fire(
                '¡Actualizado!',
                'Nivel actualizado.',
                'success'
            )
            await this.getNewData()
            await this.setState({
                render: true,
                modalLvl: false,
                firstTime: false
            })
        } else {
            console.log('Error al actualizar nivel')
        }
    }

    //add schedules function (call from modal only)
    addAlert = async () => {
        await this.setState({
            render: false,
        });

        const res = await axios.post(`schedules/add`, {
            request: {
                msg: {
                    schedule: String(this.state.schedulesModal.schedule)
                }
            }
        })
        if (res.data.code === 205) {
            await Swal.fire(
                '¡Guardado!',
                'Horario agregado.',
                'success'
            )
            await this.getNewData()
            await this.setState({
                render: true,
                modalAdd: false,
                firstTime: false
            })
        } else {
            Swal.fire(
                '¡Error!',
                'Evaluador ya registrado.',
                'error'
            )
            await this.setState({
                render: true
            })
        }
    }

    //add levels function (call from modal only)
    addLevelAlert = async () => {
        await this.setState({
            render: false,
        });

        const res = await axios.post(`levels/add`, {
            request: {
                msg: {
                    name: String(this.state.levelsModal.level)
                }
            }
        })
        console.log(res.data)
        if (res.data.code === 205) {
            await Swal.fire(
                '¡Guardado!',
                'Nivel agregado.',
                'success'
            )
            await this.getNewData()
            await this.setState({
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
            await this.setState({
                render: true
            })
        }
    }

    //delete schedules function (call from modal only)
    deleteAlert = async (sch_id) => {
        await this.setState({
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
            .then(async () => {
                const res = await axios.post(`schedules/delete`, {
                    request: {
                        msg: {
                            id: schedulesCopy[sch_id].sch_id
                        }
                    }
                })

                if (res.data.code === 205) {
                    await Swal.fire(
                        '¡Eliminado!',
                        'Horario eliminado.',
                        'success'
                    )
                    await this.getNewData()
                    this.setState({
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
                    this.setState({
                        render: true,
                        modal: false,
                        firstTime: false
                    })
                } else {
                    console.log(res)
                }
            })
    }

    //delete function (call from modal only)
    deleteLevelAlert = async (lv_id) => {
        await this.setState({
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
            .then(async () => {
                const res = await axios.post(`levels/delete`, {
                    request: {
                        msg: {
                            id: levelsCopy[lv_id].lv_id
                        }
                    }
                })

                if (res.data.code === 205) {
                    await Swal.fire(
                        '¡Eliminado!',
                        'Nivel eliminado.',
                        'success'
                    )
                    await this.getNewData()
                    this.setState({
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
                    this.setState({
                        render: true,
                        modalLvl: false,
                        firstTime: false
                    })
                } else {
                    console.log(res)
                }
            })
    }

    
    getNewData = async () => {
        try {
            const resSche = await axios.get(`schedules`)

            if (resSche.data.status === 200) {
                const respuesta = resSche.data.msg;
                await this.setState({
                    schedules: respuesta.schedules
                });
                
            }

            const resLvl = await axios.get(`levels`)

            if (resLvl.data.status === 200) {
                const respuesta = resLvl.data.msg;
                await this.setState({
                    levels: respuesta.level
                });
                
            }

            await this.setHandles()
        } catch (error) {
            console.log(error)
        }
    }

    setDataModalSchedules = async (id) => {
        await this.setState({
            schedulesModal: {
                id: schedulesCopy[id].sch_id,
                schedule: schedulesCopy[id].sch_schedule
            },
            firstTime: false,
            modal: true
        })
    }
    //set schedules input values for open modal
    toggle = async (id) => {
        if (schedulesCopy[id] !== undefined) {
            this.setDataModalSchedules(id)
        }
    }

    //set input values for open modal
    toggleAdd(){
        this.setState({
            schedulesModal: {
                id: '',
                schedule: ''
            },
            firstTime: false,
            modalAdd: true
        })
    }

    setDataModalLevels = async (id) => {
        await this.setState({
            levelsModal: {
                id: levelsCopy[id].lv_id,
                level: levelsCopy[id].lv_name
            },
            firstTime: false,
            modalLvl: true
        })
    }

    //set levels input values for open modal
    toggleLevels = async (id) => {
        if (levelsCopy[id] !== undefined) {
            this.setDataModalLevels(id)
        }
    }

    toggleAddLevels(){
        this.setState({
            levelsModal:{
                id: '',
                level: ''
            },
            firstTime: false,
            modalAddLvl: true
        })
    }

    //dismiss modal on close
    toggleModal = () => {
        this.setState({
            modal: false,
            modalLvl: false,
            modalAdd: false,
            modalAddLvl: false
        });
    }

    /*Schedules clicks */

    handleClickEditSchedules = (e) => this.toggle(e.target.id);

    handleClickAddSchedules = (e) => this.toggleAdd();

    handleClickDeleteSchedules = e => this.deleteAlert(e.target.id);

    /*Levels clicks */

    handleClickEditLevels = (e) => this.toggleLevels(e.target.id);

    handleClickAddLevels = (e) => this.toggleAddLevels();

    handleClickDeleteLevels = (e) => this.deleteLevelAlert(e.target.id);

    

    //handle input onChange event
    handleChangeSchedule = (e) => {
        this.setState({
            firstTime: false,
            schedulesModal: {
                id: this.state.schedulesModal.id,
                schedule: e.target.value
            }
        });
    }

    //handle input onChange event
    handleChangeLevels = (e) => {
        this.setState({
            firstTime: false,
            levelsModal: {
                id: this.state.levelsModal.id,
                level: e.target.value
            }
        });
    }

    async getDataTables(){
        if (this.state.schedules === undefined) {
            const res = await axios.get(`schedules`)
            if (res.data.status === 200) {
                const respuesta = res.data.msg;
                this.setState({
                    schedules: respuesta.schedules
                })
            }
        }
        if(this.state.levels === undefined){
            const res = await axios.get(`levels`)
            if (res.data.status === 200) {
                const respuesta = res.data.msg;
                this.setState({
                    levels: respuesta.level
                })
            }
        }
    }

    //get first data from API
    async componentDidMount() {
        await this.getDataTables()
        await this.setHandles()
    };

    setHandles = async () => {
        let i = 0;
        await this.state.schedules.forEach(element => {
            element.handle =
                <div className="text-center">
                    <MDBBtn id={i} color="orange" size="sm" onClick={this.handleClickEditSchedules}><MDBIcon icon="pen" className="mr-2" /> Editar</MDBBtn>
                    <MDBBtn id={i} color="red" size="sm" onClick={this.handleClickDeleteSchedules}><MDBIcon icon="times" className="mr-2" /> Eliminar</MDBBtn>
                </div>
            i++;
        });
        let j = 0;
        await this.state.levels.forEach(element => {
            element.handle =
                <div className="text-center">
                    <MDBBtn id={j} color="orange" size="sm" onClick={this.handleClickEditLevels}><MDBIcon icon="pen" className="mr-2" /> Editar</MDBBtn>
                    <MDBBtn id={j} color="red" size="sm" onClick={this.handleClickDeleteLevels}><MDBIcon icon="times" className="mr-2" /> Eliminar</MDBBtn>
                </div>
            j++;
        });
        schedulesCopy = this.state.schedules
        levelsCopy = this.state.levels
        
        this.setState({
            render: true
        })

    }



    render() {
        return (
            <div className="text-center">
                <Navbar />
                <MDBContainer fluid>
                    <MDBRow center className="my-5">
                        <MDBCol>
                            <MDBCard>
                                <MDBCardHeader>
                                    <h1 className="text-center">Mantenimientos</h1>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBRow className="my-5">
                                        <MDBCol size="12" md="6">
                                            <MDBCard>
                                                <MDBCardHeader>
                                                    <h1 className="text-center">Horarios</h1>
                                                    <MDBBtn  color="green" size="sm" onClick={this.handleClickAddSchedules}><MDBIcon icon="plus " className="mr-2" /> Agregar</MDBBtn>
                                                </MDBCardHeader>
                                                <MDBCardBody>            
                                                    {
                                                        //if data exists
                                                        this.state.schedules
                                                        &&
                                                        <TableComponent 
                                                        columns={this.columnsSchedule}
                                                        rows={this.state.schedules}
                                                        />
                                                    }
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                        <MDBCol size="12" md="6">
                                            <MDBCard>
                                                <MDBCardHeader>
                                                    <h1 className="text-center">Niveles</h1>
                                                    <MDBBtn  color="green" size="sm" onClick={this.handleClickAddLevels}><MDBIcon icon="plus " className="mr-2" /> Agregar</MDBBtn>
                                                </MDBCardHeader>
                                                <MDBCardBody>
                                                    {
                                                        //if data exists
                                                        this.state.levels
                                                        &&
                                                        <TableComponent 
                                                        columns={this.columnsLevel}
                                                        rows={this.state.levels}
                                                        />
                                                    }
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    {
                        //if data exists
                        this.state.render
                        &&
                        <ModalComponent
                        modal={this.state.modal}
                        title={'Modificar horario'}
                        toggleModal={this.toggleModal}
                        id={this.state.schedulesModal.id}
                        name={this.state.schedulesModal.schedule}
                        handleChange={this.handleChangeSchedule}
                        handleModalClick={this.updateAlert}
                        />
                    }
                    {
                        //if data exists
                        this.state.render
                        &&
                        <ModalComponent
                        modal={this.state.modalAdd}
                        title={'Agregar horario'}
                        toggleModal={this.toggleModal}
                        id={this.state.schedulesModal.id}
                        name={this.state.schedulesModal.schedule}
                        handleChange={this.handleChangeSchedule}
                        handleModalClick={this.addAlert}
                        />
                    }
                    {
                        //if data exists
                        this.state.render
                        &&
                        <ModalComponent
                        modal={this.state.modalAddLvl}
                        title={'Agregar nivel'}
                        toggleModal={this.toggleModal}
                        id={this.state.levelsModal.id}
                        name={this.state.levelsModal.level}
                        handleChange={this.handleChangeLevels}
                        handleModalClick={this.addLevelAlert}
                        />
                    }
                    {
                        //if data exists
                        this.state.render
                        &&
                        <ModalComponent
                        modal={this.state.modalLvl}
                        title={'Modificar nivel'}
                        toggleModal={this.toggleModal}
                        id={this.state.levelsModal.id}
                        name={this.state.levelsModal.level}
                        handleChange={this.handleChangeLevels}
                        handleModalClick={this.updateLevelAlert}
                        />
                    }
                    
                </MDBContainer>
            </div>
        );
    }
}



export default Candidates;