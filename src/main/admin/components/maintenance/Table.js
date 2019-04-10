import React from 'react';
import { MDBDataTable } from 'mdbreact';

const Table = (props) => {
    const data = {
        columns: props.columns,
        rows: props.rows
    }
    return (
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
    )
}

export default Table;

