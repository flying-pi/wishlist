import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from "react";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from "axios"

import './../App.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class CenteredGrid extends React.PureComponent {


    constructor(props) {
        super(props);

        this.loginEmail = React.createRef();
        this.loginPassword = React.createRef();

        this.registrationName = React.createRef();
        this.registrationEmail = React.createRef();
        this.registrationPassword = React.createRef();

        this.state = {
            isWelcomeDialogOpen: false
        }

    }


    login = _ => {
        axios.post(this.props.backend_urls.login,
            {
                email: this.loginEmail.current.value,
                password: this.loginPassword.current.value,

            }
        ).then(response => this.props.auth_callback(response.data.token, response.data.key))
    };

    register = _ => {
        axios.post(this.props.backend_urls.signup,
            {
                email: this.registrationEmail.current.value,
                password: this.registrationPassword.current.value,
                username: this.registrationName.current.value,

            }
        ).then(response => this.setState({isWelcomeDialogOpen: true}))
    };

    render() {

        return (
            <Paper className={'loginContainer'}>
                <Dialog open={this.state.isWelcomeDialogOpen}
                        onClose={() => this.setState({isWelcomeDialogOpen: false})}>
                    <DialogTitle id="simple-dialog-title">Welcome</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            To finish registration please check you email
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({isWelcomeDialogOpen: false})} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
                <Grid container justify="center" alignItems="center"
                      spacing={1}>

                    <Grid item xs={12}>
                        <Typography variant="h5" component="h3" align={'center'}>
                            Auth
                        </Typography>
                    </Grid>
                    <Grid item xs={3} align={'center'}>
                        <TextField id="filled-basic" label="email" variant="filled" inputRef={this.loginEmail}/>
                    </Grid>
                    <Grid item xs={3} align={'center'}>
                        <TextField
                            id="filled-basic"
                            label="password"
                            variant="filled"
                            type={'password'}
                            inputRef={this.loginPassword}
                        />
                    </Grid>
                    <Grid item xs={3} align={'center'}>

                    </Grid>
                    <Grid item xs={2} align={'end'}>
                        <Button variant="contained" color="primary" fullWidth onClick={this.login}>
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={3} align={'center'}>
                        <TextField id="filled-basic" label="Name" variant="filled" inputRef={this.registrationName}/>
                    </Grid>
                    <Grid item xs={3} align={'center'}>
                        <TextField id="filled-basic" label="Email" variant="filled" inputRef={this.registrationEmail}/>
                    </Grid>
                    <Grid item xs={3} align={'center'}>
                        <TextField
                            id="filled-basic"
                            label="Password"
                            variant="filled"
                            type={'password'}
                            inputRef={this.registrationPassword}
                        />
                    </Grid>
                    <Grid item xs={2} align={'end'}>
                        <Button variant="contained" color="primary" fullWidth onClick={this.register}>
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

        );
    }
}

export default CenteredGrid;
