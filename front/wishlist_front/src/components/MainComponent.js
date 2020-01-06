import React, {useRef, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import image_stub from './../static/images/new_image_stub.png'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Dialog from '@material-ui/core/Dialog';
import axios from "axios"
import Snackbar from '@material-ui/core/Snackbar';


import './../App.css'

function Header(props) {
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

    const [isToastBarOpen, setToastBarOpen] = useState(false);

    const pageLink = `${process.env.REACT_APP_FRONT_URL}?key=${props.currentKey || props.userKey}`;

    const copyToClipboard = () => {
        const el = document.createElement('textarea');
        el.value = pageLink;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setToastBarOpen(true);
        setTimeout(() => setToastBarOpen(false), 1500);
    };

    return (
        <div
            id={'main_root'}
            className={'mainContainerHeader'}
            style={{
                display: 'flex',
                alignItems: 'flex-baseline',
            }}
        >
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                key={`${'top'},${'center'}`}
                open={isToastBarOpen}
                onClose={() => setToastBarOpen(false)}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Copied link: {pageLink}</span>}
            />
            <TextField
                label="Share link"
                id="outlined-size-small"
                defaultValue={pageLink}
                variant="outlined"
                size="small"
                InputProps={{
                    readOnly: true,
                }}
                style={{
                    flexGrow: 1
                }}
            />
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<FileCopyIcon/>}
                style={{
                    marginLeft: '8px',
                    marginRight: '8px',
                    alignSelf: 'center'
                }}
                onClick={copyToClipboard}
            >
                Copy Link
            </Button>
            <Button
                variant="contained"
                color="secondary"
                style={{
                    alignSelf: 'center'
                }}
                disabled={props.userKey !== props.currentKey}
                onClick={props.logout}
            >
                Logout
            </Button>

        </div>
    );
}


function EditItemDialog(props) {

    const name = useRef(null);
    const description = useRef(null);


    const useStyles = makeStyles({
        card: {
            maxWidth: 720,
        },
        media: {
            height: 300,
        },
    });

    const classes = useStyles();

    const uploadFile = (e) => {
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('multiple', 'multiple');
        fileSelector.setAttribute('accept', 'image/x-png,image/gif,image/jpeg');
        fileSelector.onchange = e => {
            console.log(e.target.files);
            let formData = new FormData();
            formData.append('file', e.target.files[0]);
            axios.post(
                props.backendUrls.uploadImage,
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            ).then(response => props.updateWish({...props.wish, image: response.data.file}))
        };
        fileSelector.click();

    };

    return (
        <Dialog
            open={props.wish !== null}
            onClose={props.onClose}
            style={{
                position: 'absolute',
                'top': 0,
                left: 0,
                'width': '100%',
                height: '100%',
                'background': 'rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

            }}
        >
            <Card className={classes.card}>

                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.wish && props.wish.image || image_stub}
                        title="Contemplative Reptile"
                        onClick={props.editable && uploadFile}
                        id="item-image-edit"
                        enable={props.editable}
                    />
                    <CardContent>
                        <TextField
                            id="item-name-input"
                            label="Name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            onChange={event => props.updateWish({...props.wish, name: event.target.value})}
                            value={props.wish && props.wish.name || ''}
                            InputProps={{
                                readOnly: !props.editable,
                            }}

                        />
                        <TextField
                            id="item-description-input"
                            label="description"
                            type="text"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows="4"
                            margin="dense"
                            value={props.wish && props.wish.description || ''}
                            onChange={event => props.updateWish({...props.wish, description: event.target.value})}
                            InputProps={{
                                readOnly: !props.editable,
                            }}
                        />
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={props.onSave}
                        disabled={!props.editable}

                    >
                        Save
                    </Button>
                    <Button
                        size="small"
                        color="secondary"
                        onClick={props.onDelete}
                        disabled={props.wish && !props.wish.id || !props.editable}
                    >
                        Delete
                    </Button>

                </CardActions>
            </Card>
        </Dialog>
    );

}


function Wishes(props) {
    const row_size = 7;
    const items = props.wishlist;
    let items_width = [];
    let i = 0;
    while (i < items.length) {
        let left_space = row_size;
        let line = [];
        let contains_big = Math.random() > 0.4;
        while (left_space > 0 && i < items.length) {
            let width = Math.floor(Math.random() * Math.min(left_space, 3)) || 1;
            // contains_big = contains_big || width >=2;
            line.push(width);
            left_space -= width;
            i++
        }
        for (let j = 0; j < line.length; j++) {
            items_width.push([line[j], contains_big ? 5 : 4])
        }

    }


    return (

        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                overflow: 'auto',
                flex: 1,

            }}
        >
            <GridList cellHeight={30} cols={row_size} spacing={4}>
                {Array.from(Array(items.length).keys()).map(tile => (
                    <GridListTile
                        key={tile}
                        cols={items_width[tile][0]}
                        rows={items_width[tile][1]}
                        onClick={() => props.onWishClick(items[tile])}
                    >
                        <img src={items[tile].image} alt={tile}/>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );

}

class MainComponent extends React.PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            wishlist: [],
            editedWish: null,

        };
        this.loadWishList()
    }

    addNewWish = () => {
        this.setState({editedWish: {}});
    };

    saveWish = () => {
        if (this.state.editedWish.id) {
            axios.patch(
                `${this.props.backendUrls.wishDetail}${this.state.editedWish.id}`, this.state.editedWish
            ).then(this.loadWishList);
        } else {
            axios.post(this.props.backendUrls.wishDetail, this.state.editedWish).then(this.loadWishList);
        }
        this.setState({editedWish: null});
    };

    deleteWish = () => {
        axios.delete(`${this.props.backendUrls.wishDetail}${this.state.editedWish.id}`).then(this.loadWishList);
    };

    loadWishList = () => {
        axios.get(`${this.props.backendUrls.wishList}${this.props.currentKey}`).then(
            response => this.setState({wishlist: response.data})
        )
    };

    openWish = wish => {
        this.setState({editedWish: wish});
    };

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    buttom: 0
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh'
                }}>
                    <Header
                        logout={this.props.logoutCallback}
                        currentKey={this.props.currentKey}
                        userKey={this.props.userKey}

                    />
                    <Wishes
                        wishlist={this.state.wishlist}
                        onWishClick={this.openWish}
                    />
                </div>
                <Fab
                    color="primary"
                    aria-label="add"
                    style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                    }}
                    onClick={this.addNewWish}
                >
                    <AddIcon/>
                </Fab>

                <EditItemDialog
                    wish={this.state.editedWish}
                    updateWish={wish => this.setState({editedWish: wish})}
                    onClose={() => this.setState({editedWish: null})}
                    onSave={this.saveWish}
                    onDelete={this.deleteWish}
                    backendUrls={this.props.backendUrls}
                    editable={this.props.userKey === this.props.currentKey}
                />
            </div>
        )
    }
}

export default MainComponent;