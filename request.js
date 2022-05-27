const { get } = require('https');

get('https://www.google.com', (res) => {
    res.on('data', data => {
        // console.log(`Data chunk: ${data}`);
    });

    res.on('end', () => {
        console.log('No more data');
    });
});

console.log(module);