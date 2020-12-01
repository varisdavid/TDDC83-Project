import React from 'react';

//Creates a form for changing when notifications should be sent
const FormPatientAdmin = () => {

    return (
        <form style={{
            marginTop: "1.5rem !important",
            marginBottom: "1.5rem !important",
            display: "table",
            marginLeft: "20px !important"
        }}>
            <p style={{ display: "table-row" }}>
            <label style={{ display: "table-cell" }}> &nbsp; </label>
                <label style={{
                    display: "table-cell !important", 
                    marginLeft: '20px',
                    marginRight: '20px',
                    marginTop: '0.5rem',
                }}> Missade tagningar</label>
                <label style={{
                    display: "table-cell !important", 
                    marginLeft: '20px',
                    marginRight: '20px',
                    marginTop: '0.5rem',
                }}> Dagar efter missad tagning</label>
            </p>
            <p style={{ display: "table-row" }}>
                <label style={{ display: "table-cell" }}> Låg varning </label>
                <input className='input-form' type='number' />
                <input className='input-form' type='number' />
            </p>
            <p style={{ display: "table-row" }}>
                <label style={{ display: "table-cell" }}> Medel varning</label>
                <input className='input-form' type='number' />
                <input className='input-form' type='number' />
            </p>
            <p style={{ display: "table-row" }}>
                <label style={{ display: "table-cell" }}> Hög varning </label>
                <input className='input-form' type='number' />
                <input className='input-form' type='number' />
            </p>
        </form>
    );
};
export default FormPatientAdmin;
/* Reserv 
*/