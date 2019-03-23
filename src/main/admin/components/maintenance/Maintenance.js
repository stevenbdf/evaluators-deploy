import React, { Component } from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBBtn, MDBIcon
} from 'mdbreact';
import Navbar from '../../../../navbar/components/Navbar';
import ModalComponent from './Modal';
import TableComponent from './Table';
import axios from '../candidates/axios';
import Schedules from './Schedules.js';
import Levels from './Levels.js';
import Locals from './Locals.js';


class Maintenance extends Component {
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
            levelsModal: {
                id: undefined,
                level: undefined
            },
            locals: undefined,
            localsModal:{
                id: undefined,
                local: undefined
            },
            render: false,
            modal: false,
            modalAdd: false,
            modalLvl: false,
            modalAddLvl: false,
            modalLocal: false,
            modalAddLocal: false
        }
    }
    // instance classes
    SchedulesInstancia = new Schedules(this);

    LevelsInstancia = new Levels(this);

    LocalsInstancia = new Locals(this);

    //dismiss all modals
    toggleModal = () => {
        this.setState({
            modal: false,
            modalLvl: false,
            modalAdd: false,
            modalAddLvl: false,
            modalLocal: false,
            modalAddLocal: false
        });
    }

    /*Schedules handle clicks */

    handleClickEditSchedules = (e) => this.SchedulesInstancia.toggle(e.target.id);

    handleClickAddSchedules = (e) => this.SchedulesInstancia.toggleAdd();

    handleClickDeleteSchedules = e => this.SchedulesInstancia.deleteAlert(e.target.id);

    /*Levels handle clicks */

    handleClickEditLevels = (e) => this.LevelsInstancia.toggleLevels(e.target.id);

    handleClickAddLevels = (e) => this.LevelsInstancia.toggleAddLevels();

    handleClickDeleteLevels = (e) => this.LevelsInstancia.deleteLevelAlert(e.target.id);
    
    /*Locals handle clicks */

    handleClickEditLocals = (e) => this.LocalsInstancia.toggleLocals(e.target.id);

    handleClickAddLocals = (e) => this.LocalsInstancia.toggleAddLocals();

    handleClickDeleteLocals = (e) => this.LocalsInstancia.deleteLocalAlert(e.target.id);

    //reload data manually
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

            const resLocal = await axios.get(`locals`)

            if (resLocal.data.status === 200) {
                const respuesta = resLocal.data.msg;
                await this.setState({
                    locals: respuesta.locals
                });

            }

            await this.setHandles()
        } catch (error) {
            console.log(error)
        }
    }

    //reload data in mount
    getDataTables = async () => {
        if (this.state.schedules === undefined) {
            const res = await axios.get(`schedules`)
            if (res.data.status === 200) {
                const respuesta = res.data.msg;
                this.setState({
                    schedules: respuesta.schedules
                })
            }
        }
        if (this.state.levels === undefined) {
            const res = await axios.get(`levels`)
            if (res.data.status === 200) {
                const respuesta = res.data.msg;
                this.setState({
                    levels: respuesta.level
                })
            }
        }
        if (this.state.locals === undefined) {
            const res = await axios.get(`locals`)
            if (res.data.status === 200) {
                const respuesta = res.data.msg;
                this.setState({
                    locals: respuesta.locals
                })
            }
        }
    }
    
    //set buttons
    setHandles = async () => {
        await this.state.schedules.map((element,index) => {
            return(
                element.handle =
                <div className="text-center">
                    <MDBBtn id={index} color="orange" size="sm" onClick={this.handleClickEditSchedules}><MDBIcon icon="pen" className="mr-2" /> Editar</MDBBtn>
                    <MDBBtn id={index} color="red" size="sm" onClick={this.handleClickDeleteSchedules}><MDBIcon icon="times" className="mr-2" /> Eliminar</MDBBtn>
                </div>
            )
            
        });
        await this.state.levels.map((element,index) => {
            return(
                element.handle =
                <div className="text-center">
                    <MDBBtn id={index} color="orange" size="sm" onClick={this.handleClickEditLevels}><MDBIcon icon="pen" className="mr-2" /> Editar</MDBBtn>
                    <MDBBtn id={index} color="red" size="sm" onClick={this.handleClickDeleteLevels}><MDBIcon icon="times" className="mr-2" /> Eliminar</MDBBtn>
                </div>
            )
        });
        await this.state.locals.map((element,index) => {
            return(
                element.handle =
                <div className="text-center">
                    <MDBBtn id={index} color="orange" size="sm" onClick={this.handleClickEditLocals}><MDBIcon icon="pen" className="mr-2" /> Editar</MDBBtn>
                    <MDBBtn id={index} color="red" size="sm" onClick={this.handleClickDeleteLocals}><MDBIcon icon="times" className="mr-2" /> Eliminar</MDBBtn>
                </div>
            )
        });
        this.LocalsInstancia.setLocalsCopy(this.state.locals)
        this.LevelsInstancia.setLevelsCopy(this.state.levels);
        this.SchedulesInstancia.setSchedulesCopy(this.state.schedules);

        this.setState({
            render: true
        })

    }

    //set data for every render
    async componentDidMount() {
        await this.getDataTables()
        await this.setHandles()
    };

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
                                    <MDBRow className="d-flex justify-content-center">
                                        <MDBCol size="12" md="6" className="mt-4">
                                            <MDBCard>
                                                <MDBCardHeader>
                                                    <h1 className="text-center">Horarios</h1>
                                                    <MDBBtn color="green" size="sm" onClick={this.handleClickAddSchedules}><MDBIcon icon="plus " className="mr-2" /> Agregar</MDBBtn>
                                                </MDBCardHeader>
                                                <MDBCardBody>
                                                    {
                                                        //if data exists
                                                        this.state.schedules
                                                        &&
                                                        <TableComponent
                                                            columns={this.SchedulesInstancia.getColumnsSchedule()}
                                                            rows={this.state.schedules}
                                                        />
                                                    }
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                        <MDBCol size="12" md="6" className="mt-4">
                                            <MDBCard>
                                                <MDBCardHeader>
                                                    <h1 className="text-center">Niveles</h1>
                                                    <MDBBtn color="green" size="sm" onClick={this.handleClickAddLevels}><MDBIcon icon="plus " className="mr-2" /> Agregar</MDBBtn>
                                                </MDBCardHeader>
                                                <MDBCardBody>
                                                    {
                                                        //if data exists
                                                        this.state.levels
                                                        &&
                                                        <TableComponent
                                                            columns={this.LevelsInstancia.getColumnsLevel()}
                                                            rows={this.state.levels}
                                                        />
                                                    }
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                        <MDBCol size="12" md="6" className="mt-4">
                                            <MDBCard>
                                                <MDBCardHeader>
                                                    <h1 className="text-center">Locales</h1>
                                                    <MDBBtn color="green" size="sm" onClick={this.handleClickAddLocals}><MDBIcon icon="plus " className="mr-2" /> Agregar</MDBBtn>
                                                </MDBCardHeader>
                                                <MDBCardBody>
                                                    {
                                                        //if data exists
                                                        this.state.levels
                                                        &&
                                                        <TableComponent
                                                            columns={this.LocalsInstancia.getColumnsLocal()}
                                                            rows={this.state.locals}
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
                            modal={this.state.modalAdd}
                            title={'Agregar horario'}
                            toggleModal={this.toggleModal}
                            id={this.state.schedulesModal.id}
                            name={this.state.schedulesModal.schedule}
                            handleChange={this.SchedulesInstancia.handleChangeSchedule}
                            handleModalClick={this.SchedulesInstancia.addAlert}
                        />
                    }
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
                            handleChange={this.SchedulesInstancia.handleChangeSchedule}
                            handleModalClick={this.SchedulesInstancia.updateAlert}
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
                            handleChange={this.LevelsInstancia.handleChangeLevels}
                            handleModalClick={this.LevelsInstancia.addLevelAlert}
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
                            handleChange={this.LevelsInstancia.handleChangeLevels}
                            handleModalClick={this.LevelsInstancia.updateLevelAlert}
                        />
                    }
                    {
                        //if data exists
                        this.state.render
                        &&
                        <ModalComponent
                            modal={this.state.modalAddLocal}
                            title={'Agregar local'}
                            toggleModal={this.toggleModal}
                            id={this.state.localsModal.id}
                            name={this.state.localsModal.local}
                            handleChange={this.LocalsInstancia.handleChangeLocals}
                            handleModalClick={this.LocalsInstancia.addLocalAlert}
                        />
                    }
                    {
                        //if data exists
                        this.state.render
                        &&
                        <ModalComponent
                            modal={this.state.modalLocal}
                            title={'Modificar local'}
                            toggleModal={this.toggleModal}
                            id={this.state.localsModal.id}
                            name={this.state.localsModal.local}
                            handleChange={this.LocalsInstancia.handleChangeLocals}
                            handleModalClick={this.LocalsInstancia.updateLocalAlert}
                        />
                    }

                </MDBContainer>
            </div>
        );
    }
}



export default Maintenance;