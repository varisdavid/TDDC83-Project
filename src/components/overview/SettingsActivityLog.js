import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: '#a9d7ff',
    }
}));

export default function ActivityLog() {
    const classes = useStyles();

    return (
        <Container align="right">
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="2020-11-02, 12.33:"
                        secondary={
                            <React.Fragment>
                                {"Per Andersson godkände oväntat mätvärde; vikt för Gunilla Johansson"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="2020-11-02, 12.30:"
                        secondary={
                            <React.Fragment>
                                {"Per Andersson besökte patienten Gunilla Johansson"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="2020-11-02, 12.30:"
                        secondary={
                            <React.Fragment>
                                {"Per Andersson besökte patienten Gunilla Johansson"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="2020-11-02, 12.30:"
                        secondary={
                            <React.Fragment>
                                {"Per Andersson besökte patienten Gunilla Johansson"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="2020-11-02, 12.30:"
                        secondary={
                            <React.Fragment>
                                {"Per Andersson besökte patienten Gunilla Johansson"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </Container>
    );
}