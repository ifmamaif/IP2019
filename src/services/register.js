const URI = 'http://ec2-18-220-99-193.us-east-2.compute.amazonaws.com:9190';
// const URI = 'http://192.168.100.23:9190';
// const URI = 'https://jsonplaceholder.typicode.com/todos/1';
// const URI = 'voiceRecognition.py/Listen';

export default {

    async register(loginData) {
        try {
            console.log("loginData este",loginData)
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Credentials' :'true'
                },
                body: JSON.stringify(loginData)
            };
            let response = await fetch(URI + '/tfm_register',config);
            // console.log(response);
            // console.log(response.status);
            //
            // let json = await response.json();
            return response.status;
        }
        catch(e) {
            console.log(e)
        }
    }
}