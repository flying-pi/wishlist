import React from "react";
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


import './../App.css'

function Header() {
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
        <div
            id={'main_root'}
            className={'mainContainerHeader'}
            style={{
                display: 'flex',
                alignItems: 'flex-baseline',
            }}
        >
            <TextField
                label="Share link"
                id="outlined-size-small"
                defaultValue="http://example.com"
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
            >
                Copy Link
            </Button>
            <Button
                variant="contained"
                color="secondary"
                style={{
                    alignSelf: 'center'
                }}
            >
                Logout
            </Button>

        </div>
    );
}

function EditItemDialog() {

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
        fileSelector.onchange = e => console.log(e.target.files);
        fileSelector.click();

    };

    return (
        <div
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
                        image={image_stub}
                        title="Contemplative Reptile"
                        onClick={uploadFile}
                        id="item-image-edit"
                    />
                    <CardContent>
                        <TextField
                            id="item-name-input"
                            label="Name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            margin="dense"
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
                        />
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Save
                    </Button>
                    <Button size="small" color="secondary">
                        Delete
                    </Button>
                </CardActions>
            </Card>

        </div>
    )
}

function Wishes() {
    const row_size = 7;
    const items = Array.from(Array(200).keys());
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
                        <GridListTile key={tile} cols={items_width[tile][0]} rows={items_width[tile][1]}>
                            <img src={image_stub} alt={tile}/>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
    );

}


export default function MainComponent() {

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
                height:'100vh'
            }}>
                <Header/>
                <Wishes/>
            </div>
            <Fab
                color="primary"
                aria-label="add"
                style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                }}
            >
                <AddIcon/>
            </Fab>

            {/*<EditItemDialog/>*/}
        </div>
    )
}
