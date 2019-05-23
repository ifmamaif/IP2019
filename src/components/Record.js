import React from 'react'
import { ReactMic } from 'react-mic';
import RecordRTC from 'recordrtc';
import ajax from"../services/sendAudio"
import { Link, withRouter } from 'react-router-dom'
import AudioRecorders from 'audio-recorders'
import Artyom from "artyom.js"
var art = null;
class Record extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            href :"",
            speechToText:"",
        }

    }

    componentDidMount() {
        const artyom = new Artyom();

        art = artyom;

// This function activates artyom and will listen and execute only 1 command (for http connections)
        function startOneCommandArtyom(){
            artyom.fatality();// use this to stop any of

            setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
                artyom.initialize({
                    lang:"en-GB",// A lot of languages are supported. Read the docs !
                    continuous:false,// recognize 1 command and stop listening !
                    listen:true, // Start recognizing
                    debug:true, // Show everything in the console
                    speed:1 // talk normally
                }).then(function(){
                    console.log("Ready to work !");
                });
            },250);
        }

// This function activates artyom and will listen all that you say forever (requires https conection, otherwise a dialog will request if you allow the use of the microphone)
        function startContinuousArtyom(){
            artyom.fatality();// use this to stop any of

            setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
                artyom.initialize({
                    lang:"en-GB",// A lot of languages are supported. Read the docs !
                    continuous:true,// Artyom will listen forever
                    listen:true, // Start recognizing
                    debug:true, // Show everything in the console
                    speed:1 // talk normally
                }).then(function(){
                    console.log("Ready to work !");
                });
            },250);
        }

        var self = this;
        var UserDictation = artyom.newDictation({
            continuous:true, // Enable continuous if HTTPS connection
            onResult:function(text){
                // Do something with the text
                console.log(text);
                // console.log("this",self)
                self.setState({
                    speechToText:text,
                })
            },
            onStart:function(){
                console.log("Dictation started by the user");
            },
            onEnd:function(){
                alert("Dictation stopped by the user");
            }
        });

        setInterval(()=>  console.log("ce a vrut sa zica este :",this.state.speechToText),5000);

        UserDictation.start();
        // setTimeout(()=>  artyom.fatality(),5000);
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
        console.log("art este",art);
      art.fatality();
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