let strings = ['https://www.w3schools.com/', 'this is not a URL', 'https://google.com/', '123461', 'https://en.wikipedia.org/wiki/JavaScript', 'http://not a valid url', 'abc http://invalid.url/'];

for (let string of strings) {
    if (string.match(/^https?:\/\/[\w.]{1,256}\.[a-z]{2,6}\b([\w]*)/)){
        console.log(`${string} - посилання`)
    } else {
        console.log(`${string} -  не посилання`)
    }
}