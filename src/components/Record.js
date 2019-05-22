import React from 'react'
import { ReactMic } from 'react-mic';
import RecordRTC from 'recordrtc';
import ajax from"../services/sendAudio"
import { Link, withRouter } from 'react-router-dom'
import AudioRecorders from 'audio-recorders'

class Record extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            href :"",
        }

    }

    startRecording = () => {
        // this.setState({
        //     record: true
        // });
        // navigator.getUserMedia = navigator.getUserMedia ||
        //     navigator.webkitGetUserMedia ||
        //     navigator.mozGetUserMedia;
        // navigator.getUserMedia({audio: true}, (stream) => {
        //     const config = {
        //         exportAudio: 'wav'
        //     };
        //
        //     this.recorder = new AudioRecorders(stream, config)
        //
        //     this.recorder.onStreamProcessor = (buffer) => {};
        //     this.recorder.onReceiveAudioBlob = (blobs) => {};
        //
        //     this.recorder.startRecord();
        //     setTimeout(()=>{this.recorder.stopRecord()}, 100000)
        // },()=>{console.log("ceva nu a a mers bine")});

        navigator.mediaDevices.getUserMedia({
            audio: true,
            video:false,
        }).then(async function(stream) {
            let recorder = RecordRTC(stream, {
                type: 'audio/wav',
                mimeType: "audio/wav"
            });
            recorder.startRecording();

            const sleep = m => new Promise(r => setTimeout(r, m));
            await sleep(5000);

            recorder.stopRecording(function() {
                let blob = recorder.getBlob();
                console.log(blob)
            });

        });
        // ajax.sendAudio(blob);



    }

    stopRecording = () => {
        // this.setState({
        //     record: false
        // });
    }

    onData(recordedBlob) {
        // console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop(blob) {
        console.log('recordedBlob is: ', blob);
        var createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL || function(){};
        let url = createObjectURL(blob);

        this.setState({
            href:url
        })

        // target filename
        this.download = 'my-download.json';

    }

    render() {
        return (
            <div>
                <button onClick={this.startRecording} type="button">Start</button>
                <button onClick={this.stopRecording} type="button">Stop</button>
            </div>
        );
    }
}

export default withRouter(Record);