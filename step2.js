const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(`file contents: ${data}`);
    });
}

async function webCat(url) {
    try {
        const resp = await axios.get(url);
        console.log(resp);
    } catch (e) {
        console.error('Error:', e.message);
    }
}

const argv = process.argv;


if (argv[2]) {
    if (argv[2].includes('http://')) {
        webCat(argv[2]);
    } else if (argv[2].includes('.txt')) {
        cat(argv[2]);
    }
} else return;