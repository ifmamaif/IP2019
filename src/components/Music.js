import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class Music extends React.Component {
    state = {
        play: true
    };
    audio = new Audio(this.props.url);

    componentDidMount() {
        this.audio.play();
        this.audio.volume="0.85"
    }

    togglePlay = () => {
        this.setState({ play: !this.state.play }, () => {
            this.state.play ? this.audio.play() : this.audio.pause();
        });
    };

    render() {
        return (
            <div>
                <div  className="music">{this.state.play ? <FontAwesomeIcon icon="volume-up" onClick={this.togglePlay} /> : <FontAwesomeIcon icon="volume-mute"  onClick={this.togglePlay}/>}</div>
            </div>
        );
    }
}

export default Music;