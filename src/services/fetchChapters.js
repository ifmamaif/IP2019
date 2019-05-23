const URI = 'http://ec2-18-220-99-193.us-east-2.compute.amazonaws.com:9190';

export default {

    async tfm_get_chapters(token, chaptersIDs) {
        try {
            console.log("capitole : ",chaptersIDs)
            console.log("token : ",token)
            console.log("TFM...", token.TFMAuthentication)
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Credentials' :'true',
                    'TFMAuthentication' : token.TFMAuthentication,
                },
                body: JSON.stringify(chaptersIDs)
            };
            let response = await fetch(URI + '/tfm_get_chapters',config);
             console.log(response);
            // console.log(response.status);
            //
            return await response.json();
        }
        catch(e) {
            console.log(e)
        }
    }
}