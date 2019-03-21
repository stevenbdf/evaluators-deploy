import React from 'react';
import {MDBTableHead, MDBTable, MDBTableBody} from 'mdbreact';

const Table = (props) => {
    return (
        <MDBTable btn responsive hover className="text-center">
            <MDBTableHead columns={props.columns} />
                <MDBTableBody rows={props.rows} />
        </MDBTable>
    )
}

export default Table;

