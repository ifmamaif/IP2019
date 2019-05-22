const URI = 'http://ec2-18-220-99-193.us-east-2.compute.amazonaws.com:9190';
// const URI = 'http://192.168.100.23:9190';
// const URI = 'https://jsonplaceholder.typicode.com/todos/1';
// const URI = 'voiceRecognition.py/Listen';


export default {
    async login(loginData) {
        try {
            // let data = {
            //     "email" : "tap@tap.com",
            //     "password" : "tap"
            // };
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
            let response = await fetch(URI + '/tfm_login',config);
            let json = await response.json();
            console.log(json);
            return await json;
        }
        catch(e) {
            console.log(e)
            console.log()
        }
    }
}