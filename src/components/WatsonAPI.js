import React from 'react'
import { ReactMic } from 'react-mic';
import RecordRTC from 'recordrtc';
import ajax from"../services/sendAudio"
import { Link, withRouter } from 'react-router-dom'
import AudioRecorders from 'audio-recorders'

// import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone'
// import * as WatsonSpeech from "watson-speech";
class WatsonAPI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            text :"",
        }

    }
    startRecording = () => {
        // console.log("am intrat in recording")
        // debugger;
        // fetch('http://localhost:3002/api/speech-to-text/token')
        //     .then(function(response) {
        //         return response.text();
        //         console.log("token",response);
        //     }).then(function (token) {
        //
        //         console.log("token este ", token);
        //     var stream = ReactMic({
        //         token: token, // use `access_token` as the parameter name if using an RC service
        //         objectMode: true, // send objects instead of text
        //         format: false // optional - performs basic formatting on the results such as capitals an periods
        //
        //     });
        //     console.log("stream",stream);
        //
        //     stream.on('data', function(data) {
        //         console.log(data);
        //     });
        //
        //     stream.on('error', function(err) {
        //         console.log(err);
        //     });
        //
        //     document.querySelector('#stop').onclick = stream.stop.bind(stream);
        //
        // }).catch(function(error) {
        //     console.log(error);
        // });
    };

    stopRecording = () => {

    };


    render() {
        return (
            <div>
                <h1> Eu sunt Watson API</h1>
                <button onClick={this.startRecording} type="button">Start</button>
                <button onClick={this.stopRecording} type="button">Stop</button>
                <p>textul este {this.state.text}</p>
            </div>
        );
    }
}

export default withRouter(WatsonAPI);