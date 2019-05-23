const URI = 'http://ec2-18-220-99-193.us-east-2.compute.amazonaws.com:9190';

export default {

    async tfm_send_chapter_response(token,chaptersID,text) {
        try {
            var dto = {
                "chapter_id" : chaptersID,
                "player_input" :text
            }
            console.log("capitole : ",chaptersID);
            console.log("token : ",token);
            console.log("TFM...", token.TFMAuthentication);
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Credentials' :'true',
                    'TFMAuthentication' : token.TFMAuthentication,
                },
                body: JSON.stringify(dto)
            };
            let response = await fetch(URI + '/tfm_send_chapter_response',config);
            // console.log(response);
            // console.log("response.body", await response.json());
            //
            return await response.json();
        }
        catch(e) {
            console.log(e)
        }
    }
}