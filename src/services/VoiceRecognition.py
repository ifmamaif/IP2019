# Voice Recognition Module

# git clone http://people.csail.mit.edu/hubert/git/pyaudio.git
# cd pyaudio
# sudo python setup.py install
# sudo apt-get installl libportaudio-dev
# sudo apt-get install python-dev
# sudo apt-get install libportaudio0 libportaudio2 libportaudiocpp0 portaudio19-dev
# sudo pip3 install SpeechRecognition
import speech_recognition as sr

# You should call this function before anything to have some audio from microphone
def Listen( secondsToListen ):
    print("Please wait. Calibrating microphone...")
    r = sr.Recognizer()
    with sr.Microphone() as source:
        # listen for 1 second and create the ambient noise energy level
        r.adjust_for_ambient_noise(source, duration=1)
        print("Say something!")
        audio = r.listen(source,phrase_time_limit=secondsToListen)
    return audio

# You need to call Listen first to get audio as input for this function
def GetResponseFromGoogle( audio ):
    try:
        response = sr.Recognizer().recognize_google(audio)
        return "Google Speech Recognition thinks you said '" + response + "'"
    except sr.UnknownValueError:
        return "Google Speech Recognition could not understand audio"
    except sr.RequestError as e:
        return "Could not request results from Google Speech Recognition service; {0}".format(e)