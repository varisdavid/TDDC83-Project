import React, {useState} from 'react';
import {Button, Link, Modal} from "@material-ui/core";
import {NotificationImportant} from '@material-ui/icons';
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

//Renders a notification with a value and a text with possibilities to click on with the help of modals
const Notification = ({value, text, id, date, measurement, updatedBy}) => {

    var color;
    if (value === 1) {
        color = '#FF6464';
    } else if (value === 2) {
        color = '#FED765';
    } else if (value === 3) {
        color = '#27AE60';
    } else if (value === 0) {
        color = '#FFF'; // This is for rendering bug, empty cell not taking same space.
    }

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);

    const href = "/patient/overview/" + id;
    const history = useHistory();

    // Keeps track of whether or not the popup for a specific alert  has been toggled.
    const [openWarningConfirm, setOpenWarningConfirm] = useState(false);
    const [openWarningConfirm2, setOpenWarningConfirm2] = useState(false);
    const [openWarningConfirm3, setOpenWarningConfirm3] = useState(false);

    // Handles opening of modal window
    const handleOpenConfirmation = () => {
        setOpenWarningConfirm(true);
    };

    // Handles closing of modal window
    const handleCloseConfirmation = () => {
        setOpenWarningConfirm(false); // Close modal
    };
    //Handels closing of modal no.2 window
    const handleCloseConfirmation2 = () => {
        setOpenWarningConfirm2(false); // Close modal
    };
    //Handels closing of modal no.3 window
    const handleCloseConfirmation3 = () => {
        setOpenWarningConfirm3(false); // Close modal
    };
    //Closes the first modal and opens the second one
    const OpenWarning2 = () => {
        setOpenWarningConfirm2(true); //Open modal no. 2
        setOpenWarningConfirm(false); // Close modal
    };
    //Sends us to the PatientView Overview
    const sendToPatient = () => {
        history.push(href); //Should be switched to patientview overview refrens
        setOpenWarningConfirm2(false); // Close modal no.2
    };
    //Closes the second modal and opens the third
    const OpenWarning3 = () => {
        setOpenWarningConfirm3(true);
        setOpenWarningConfirm2(false);
    };

    const ConfirmWarning = ({date, measurement, updatedBy}) => {

        return (
            <Modal
                open={openWarningConfirm}
                onClose={handleCloseConfirmation}
                aria-labelledby='modal-popup'
            >
                <div key="modal-popup-div" style={modalStyle} className={classes.paper}>
                    <NotificationImportant style={{
                        color: color,
                        fontSize: '30px',
                    }}/>
                    <text className='font-bold mt-2' id='modal-popup'>Uppmärksammat mätvärde</text>
                    <h2 className='font-bold mt-3'
                        id='modal-popup'>{date} uppmättes {text} {measurement} av {updatedBy}</h2>

                    <h2 className='font-bold mt-3 flex justify-center' id='modal-popup'> Vill du hantera mätvärdet?</h2>
                    <div className="flex" style={{width: "100%"}}>
                        <Button
                            id='noticesCancel'
                            className='flex shadow'
                            style={{
                                border: '2px solid #0066B3',
                                borderRadius: "0px",
                                width: '110px',
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginTop: "1.5rem"
                            }}
                            onClick={handleCloseConfirmation}>
                            Avbryt
                        </Button>
                        <Button
                            id='noticesConfirm1'
                            className='flex shadow'
                            style={{
                                border: '2px solid #0066B3',
                                borderRadius: "0px",
                                width: '110px',
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginTop: "1.5rem"
                            }}
                            onClick={OpenWarning2}>
                            Kvittera
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    }

    const ConfirmWarning2 = ({date, measurement, updatedBy}) => {
        return (
            <Modal
                open={openWarningConfirm2}
                onClose={handleCloseConfirmation2}
                aria-labelledby='modal-popup'
            >
                <div key="modal-popup-div" style={modalStyle} className={classes.paper}>
                    <NotificationImportant style={{
                        color: color,
                        fontSize: '30px',
                    }}/>
                    <text className='font-bold mt-2' id='modal-popup'>Uppmärksammat mätvärde</text>
                    <h2 className='font-bold mt-3' id='modal-popup'>{date} uppmättes
                        vikten {measurement} av {updatedBy}</h2>
                    <button className='flex shadow'
                            style={{
                                border: '2px solid #0066B3',
                                borderRadius: "0px",
                                width: '350px',
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginTop: "1.5rem",
                                height: "40px",
                                justifyContent: "center",
                                alignItems: 'center'
                            }}
                            onClick={sendToPatient}>
                        GÅ TILL PATIENTENS KONTAKTUPPGIFTER
                    </button>

                    <div className="flex" style={{width: "100%"}}>

                        <Button
                            id='noticesRetake'
                            className='flex shadow'
                            style={{
                                border: '2px solid #0066B3',
                                borderRadius: "0px",
                                width: '180px',
                                marginLeft: "auto",
                                marginRight: "10px",
                                marginTop: "1.5rem"
                            }}
                            onClick={OpenWarning3}>
                            Ta om mätvärde
                        </Button>
                        <Button
                            id='noticesConfirm2'
                            className='flex shadow'
                            style={{
                                border: '2px solid #0066B3',
                                borderRadius: "0px",
                                width: '180px',
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginTop: "1.5rem"
                            }}
                            onClick={handleCloseConfirmation2}>
                            Godkänn mätvärde
                        </Button>
                    </div>
                </div>
            </Modal>
        );

    }
    const ConfirmWarning3 = () => {
        return (
            <Modal
                open={openWarningConfirm3}
                onClose={handleCloseConfirmation3}
                aria-labelledby='modal-popup'
            >
                <div key="modal-popup-div" style={modalStyle} className={classes.paper}>
                    <NotificationImportant style={{
                        color: color,
                        fontSize: '30px',
                    }}/>
                    <text className='font-bold mt-2' id='modal-popup'>Uppmärksammat mätvärde</text>
                    <h2 className='font-bold mt-3' id='modal-popup'>Notis har skickats till patient. Ombedd att ta ett
                        nytt mätvärde</h2>
                    <div align='right' style={{
                        marginRight: "10px",
                        marginBottom: "10px"
                    }}>
                        <Button
                            id='noticesConfirm3'
                            className='flex shadow'
                            style={{
                                border: '2px solid #0066B3',
                                borderRadius: "0px",
                                width: '110px',
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginTop: "1.5rem"
                            }}
                            onClick={handleCloseConfirmation3}>
                            Ok
                        </Button>
                    </div>
                </div>
            </Modal>
        );

    }


    return (
        <>
            <Link
                component="button"
                style={{color: "#000"}}
                onClick={handleOpenConfirmation}
            >
                <NotificationImportant style={{
                    color: color,
                    fontSize: '30px',
                }}
                />
            </Link>
            <ConfirmWarning date={date} measurement={measurement} updatedBy={updatedBy}/>
            <ConfirmWarning2 date={date} measurement={measurement} updatedBy={updatedBy}/>
            <ConfirmWarning3/>
        </>

    )
}

// Used to fix the placement of the triggered modal
const getModalStyle = () => {

    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
// Styling of the triggered modal + the text and select fields.
const useStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: '600px',
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '3px solid #0066B3',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default Notification;