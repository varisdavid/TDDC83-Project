import React from 'react';

//Creates a form for changing when notifications should be sent
const FormPatientAdmin = ({ inputValues, setTempValue }) => {

    //Consts handling changes in form
    const handleChangeLow0 = (event) => {
        inputValues.lowWarning[0]=parseInt(event.target.value);
        setTempValue(inputValues);
    }

    const handleChangeLow1 = (event) => {
        inputValues.lowWarning[1]=parseInt(event.target.value);
        setTempValue(inputValues);
    }

    const handleChangeMedium0 = (event) => {
        inputValues.mediumWarning[0]=parseInt(event.target.value);
        setTempValue(inputValues);
    }

    const handleChangeMedium1 = (event) => {
        inputValues.mediumWarning[1]=parseInt(event.target.value);
        setTempValue(inputValues);
    }

    const handleChangeHigh0 = (event) => {
        inputValues.highWarning[0]=parseInt(event.target.value);
        setTempValue(inputValues);
    }

    const handleChangeHigh1 = (event) => {
        inputValues.highWarning[1]=parseInt(event.target.value);
        setTempValue(inputValues);
    }

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
                <input className='input-form' type='number' defaultValue={inputValues.lowWarning[0]} onChange={handleChangeLow0}/>
                <input className='input-form' type='number' defaultValue={inputValues.lowWarning[1]} onChange={handleChangeLow1} />
            </p>
            <p style={{ display: "table-row" }}>
                <label style={{ display: "table-cell" }}> Medel varning</label>
                <input className='input-form' type='number' defaultValue={inputValues.mediumWarning[0]} onChange={handleChangeMedium0} />
                <input className='input-form' type='number' defaultValue={inputValues.mediumWarning[1]} onChange={handleChangeMedium1} />
            </p>
            <p style={{ display: "table-row" }}>
                <label style={{ display: "table-cell" }}> Hög varning </label>
                <input className='input-form' type='number' defaultValue={inputValues.highWarning[0]} onChange={handleChangeHigh0} />
                <input className='input-form' type='number' defaultValue={inputValues.highWarning[1]} onChange={handleChangeHigh1} />
            </p>
        </form>
    );
};
export default FormPatientAdmin;
/* Reserv
*/