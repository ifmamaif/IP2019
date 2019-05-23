const URI = 'http://ec2-18-220-99-193.us-east-2.compute.amazonaws.com:9190';

export default {

    async fetchResources(path) {
        try {
            const config = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            };

            let response = await fetch(URI + '/resources/' + path, config);
            return await response.blob();
        } catch (e) {
            console.log("EROAREA ESTE ", e)
        }
    }
}