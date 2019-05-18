const URI = 'https://jsonplaceholder.typicode.com/todos/1';

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