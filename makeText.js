/** Command-line tool to generate Markov text. */

const mm = require("./markov");
const fs = require("node:fs/promises");
const axios = require("axios");


// Arguments made from User Input
const pathSelectionArg = (process.argv[2]).toLowerCase();
const pathArg = process.argv[3];
const numberArg = process.argv[4];


// Local file functions
const readFile = async (filePath)=>{

    try {

        const data = await fs.readFile(`${filePath}`, 'utf8');
        return data;

    } catch (err){

        console.error(err);
        process.exit(1);

    }

};


// Web Functions

/* RegEx to Make sure url meets correct schema */
const urlCheck = (urlString)=>{

    // RegEx - HTTP(S) [optional] -> www [optional]
    // -> (Domain Name) [required]
    // -> (Top Level Domain Names) [required]
    // -> Further Slashes and *Characters [optional]
    // end$ -> Full Regex case /insensitive
    const patternCheck = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+(com|net|org|gov|int|edu|mil|arpa)(\/.*)?$/i;

    return patternCheck.test(urlString);
    };

// Corrects string to include an http prefix if missing
const prefixHttpCheck = (urlString)=>{

    let prefix = "";

    if(!(urlString.toLowerCase().includes('http'))) {

        prefix = `https://`;

    };

    return prefix+urlString;

};


// Axios to get the url text
const getURLResource = async (path)=>{

    try{

        const resp = await axios.get(`${path}`)
        return resp.data;

    } catch(err) {

        console.error(`Issue making request to ${path}: ${err}`);
        process.exit(1);

    };

};



//Program Start

const programStart = async()=>{

    
    if(pathSelectionArg === 'file' || pathSelectionArg === 'url'){

        let data;

        if(pathSelectionArg === 'file'){

            data = await readFile(pathArg);

        };

        if(pathSelectionArg === 'url'){

            if(urlCheck(pathArg)){

                let url = prefixHttpCheck(pathArg);

                data = await getURLResource(url);


            } else {

                console.error(`Incorrect URL Path - "${pathArg}". Example of a correct path: http://www.google.com `);
                process.exit(1);

            };

        }

        const markov = new mm.MarkovMachine(data);
        return console.log(markov.makeText(numberArg? parseInt(numberArg) : undefined));



    } else {

        console.error("Only 'file' or 'url' are accepted key arguments. Example: file 'eggs.txt' 100");
        process.exit(1);

    };

};


// Export Modules

module.exports = {
    readFile,
    urlCheck,
    prefixHttpCheck,
    getURLResource,
    mm
};


// Program Execution

if(pathSelectionArg && pathArg){

    (async () => {
        programStart();
    })();

} else {


    const commonNames = ['Path Selection', 'File/URL Path']

    let missingArgs = '';
    
    for(let argIdx in args = [pathSelectionArg,pathArg]){

        if(!args[argIdx]){
            console.log(args[argIdx])
            missingArgs += commonNames[argIdx]+`\n`
        };
    
    };

    console.error(`Missing Arguments:\n ${missingArgs}`)

    console.error(`At least two arguments are required - ['file' or 'url'] [Path to File or URL Address] OPTIONAL:[Number of Words to Generate]`);
    process.exit(1);
}