const URI = 'http://ec2-18-220-99-193.us-east-2.compute.amazonaws.com:9190';

export default {

    async fetchStory(token) {
        try {
            console.log("loginData este",token)
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Credentials' :'true'
                },
                body: JSON.stringify(token)
            };
            let response = await fetch(URI + '/tfm_get_all_stories',config);
            // console.log(response);
            // console.log(response.status);
            //
            return await response.json();
        }
        catch(e) {
            console.log(e)
        }
    }
}