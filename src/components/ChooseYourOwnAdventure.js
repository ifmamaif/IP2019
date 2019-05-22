import React from 'react'
import "../styles/Login.css";
import Login from "../components/Login"
import ajax from "../services/fetchStory"
import Record from "../components/Record"
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import strings from '../res/strings'
import {Redirect, BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: "200px !important",
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
};

class ChooseYourOwnAdventure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories : [{
                "title" : "Povestea celor 3 purcelusi",
                "img" : "https://static1.squarespace.com/static/53abe338e4b0d980731bf5b2/t/573478e69f7266fafb5bc9c5/1463056628073/"
            },
                {
                    "title" : "O lume disparuta",
                    "img" : "https://thegrovela.com/wp-content/uploads/2018/06/GAF_JurassicPark_900x600.png"
                },
                {
                    "title" : "Povestea celor 3 purcelusi",
                    "img" : "https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2018/06/kajhlfy4897867-624x351.jpg"
                },],
        }
    }

    async componentDidMount() {

        let token = localStorage.getItem('auth_token');
        let objToken = {
            "auth_token" : token,
        };
        if(token){
            ajax.fetchStory(objToken).then((stories) => {
                if(stories !=null && typeof (stories) !== "undefined")
                {
                   // this.setState({
                   //     stories
                   // });
                    console.log("stories,",this.state.stories);
                }
                else{
                    console.log("ceva nu e bine, Tap; fara povesti azi")
                }
            }).catch(error => {
                console.log(error);
            });
            console.log("afisez state-ul ",this.state)
        }

    }


    handleSubmit = (event) => {

    };

    //Sets state for username and password ( after a key is pressed )
    handleInputChange = (event) => {
        this.setState({
                [event.target.id]: event.target.value,
                error: event.target.value,
            }
        )
    };


    render() {
        let {stories} = this.state;
        console.log(stories);
        return (
            <div>
            {stories.map((story) => {
                    return(
        <Card classes={styles.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={styles.media}
                    height="300"
                    width="300"
                    src={story.img}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {story.title}
                    </Typography>
                    <Typography component="p">
                        In caz ca ne hotaram sa punem o descriere
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Select Adventure
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>)                })}
    }
            </div>
        );
    }
}


export default withStyles(styles)(ChooseYourOwnAdventure);

