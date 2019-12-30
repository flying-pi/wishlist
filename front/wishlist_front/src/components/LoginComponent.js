import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './../App.css'


export default function CenteredGrid() {

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        background: {}
    }));
    const classes = useStyles();

    return (
        <Paper className={'loginContainer'}>
            <Grid container justify="center" alignItems="center"
                  spacing={1}>

                <Grid item xs={12}>
                    <Typography variant="h5" component="h3" align={'center'}>
                        Auth
                    </Typography>
                </Grid>
                <Grid item xs={3} align={'center'}>
                    <TextField id="filled-basic" label="email" variant="filled"/>
                </Grid>
                <Grid item xs={3} align={'center'}>
                    <TextField id="filled-basic" label="password" variant="filled" type={'password'}/>
                </Grid>
                <Grid item xs={3} align={'center'}>

                </Grid>
                <Grid item xs={2} align={'end'}>
                    <Button variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </Grid>
                <Grid item xs={3} align={'center'}>
                    <TextField id="filled-basic" label="Name" variant="filled"/>
                </Grid>
                <Grid item xs={3} align={'center'}>
                    <TextField id="filled-basic" label="Email" variant="filled"/>
                </Grid>
                <Grid item xs={3} align={'center'}>
                    <TextField id="filled-basic" label="Password" variant="filled" type={'password'}/>
                </Grid>
                <Grid item xs={2} align={'end'}>
                    <Button variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                </Grid>
            </Grid>
        </Paper>

    );
}
