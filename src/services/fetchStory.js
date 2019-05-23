const URI = 'http://ec2-18-220-99-193.us-east-2.compute.amazonaws.com:9190';

export default {

    async fetchStory(token) {
        try {
            var aux = ((JSON.stringify(token.TFMAuthentication)).substr(1)).slice(0, -1);
            console.log("JSON.stringify(token) ",((JSON.stringify(token.TFMAuthentication)).substr(1)).slice(0, -1));


            const config = {
                method: 'GET',
                headers: {
                    'TFMAuthentication' : aux,
                },
            };
            let response = await fetch(URI + '/tfm_get_all_stories',config);
            console.log(response);
            // console.log(response.status);
            //
            return await response.json();
        }
        catch(e) {
            console.log("EROAREA ESTE " ,e)
        }
    }
}