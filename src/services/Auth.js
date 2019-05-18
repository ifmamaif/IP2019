const URI = 'http://ec2-18-220-99-193.us-east-2.compute.amazonaws.com:9190/tfm_login';
// const URI = 'https://jsonplaceholder.typicode.com/todos/1';
// const URI = 'voiceRecognition.py/Listen';

export default {

    async sotryAuth() {
        try {
            let response = await fetch(URI);
            return await response.json();
        }
        catch(e) {
            console.log(e)
        }
    }
}