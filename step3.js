const fs = require('fs');
const axios = require('axios');
const argv = process.argv;

function cat(path, flag=null, data=null) {
    if (flag && data) {
        fs.appendFile(path, data, "utf8", err => {
            if (err) {
                console.error(`Couldn't write ${path}`,err.message);
                process.exit(1);
            }
        });
    } else {
        fs.readFile(path, 'utf8', function(err, data) {
            if (err) {
                console.log(err);
                process.exit(1);
            } else {
                if (flag) {
                    cat(argv[3], flag, data);
                } else {
                    console.log(`file contents: ${data}`);
                }
            }
        });
    }
}

async function webCat(url, flag) {
    try {
        const resp = await axios.get(url);
        if (flag) {
            cat(argv[3], flag, resp.data);
        } else {
            console.log(resp);
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

function fileOrWeb(i, flag=null) {
    if (flag) {
        if (argv[i].includes('http://')) {
            webCat(argv[i], argv[2]);
        } else if (argv[i].includes('.txt')) {
            cat(argv[i], argv[2]);
        }
    } else {
        if (argv[i].includes('http://')) {
            webCat(argv[i]);
        } else if (argv[i].includes('.txt')) {
            cat(argv[i]);
        }
    }
}

if (argv[2] == '--out') {
    fileOrWeb(4, argv[2]);
} else if (!argv[3]) {
    fileOrWeb(2);
} else return;