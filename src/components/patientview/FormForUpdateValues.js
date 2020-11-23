import React from 'react';
import {Button} from "@material-ui/core";

const FormForUpdateValues = () => {

    return (
        <div>
            <form style={{
                border: '1px solid lightgrey',
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "1.5rem",
                boxShadow: "5px 7px 20px lightgrey",

            }}>
                <h1 style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    marginTop: "10px",
                    fontWeight: "500"
                }}>Uppdatera
                            information</h1>
                <br />
                <text style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    marginTop: "10px"
                }}>Datum:
                        </text>
                <input style={{
                    border: '1px solid lightgrey',
                    marginLeft: "auto",
                    marginRight: "auto",
                    boxShadow: "inset 0 2px 3px lightgrey"
                }} name="date" />
                <br />
                <text style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    marginTop: "10px"
                }}>Fyll i nytt uppmät värde
                        </text>
                <input style={{
                    border: '1px solid lightgrey',
                    marginLeft: "auto",
                    marginRight: "20px",
                    marginTop: "1.5rem",
                    boxShadow: "inset 0 2px 3px lightgrey",
                }} name="BloodPressureMeasurement" />
                <br />
                <div align='right' style={{
                    marginRight: "10px",
                    marginBottom: "10px"
                }}>
                    <Button
                        className='flex shadow'
                        style={{
                            border: '2px solid #0066B3',
                            borderRadius: "0px",
                            width: '110px',
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "1.5rem",
                        }}>
                        Bekräfta
                            </Button>
                </div>
            </form>
        </div>
    );
};
export default FormForUpdateValues;