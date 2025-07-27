const { makeText, urlCheck, prefixHttpCheck }  = require("./makeText");

describe("makeChains", function() {
    test('test expected chain behavior', function(){

        const chains = mm.makeChains(sampleText);
        expect(chains).toEqual({"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]});

    })
});

describe("makeText", function() {

    const sentence = mm.makeText(10);

    test('test sentence is as long as chosen length', function(){

        expect(sentence.split(' ').length).toBe(10);

    });

    test('test sentence structure follows chain', function(){

        const splitSentence = sentence.split(' ');

        for(let wordIdx in splitSentence){

            if(wordIdx === splitSentence.length){break};

            let currentWord = splitSentence[wordIdx];
            let nextWord = splitSentence[wordIdx+1];
            

            expect(mm.chains[currentWord].includes(nextWord)).toBe(true);

        };

    });

});

describe("urlCheck", function() {
    test('test url pattern regex', function(){

        expect(urlCheck('www.google.com')).toBe(true);
        expect(urlCheck('google.co')).toBe(false);

    })
});

describe("prefixHttpCheck", function() {

    test('test prefix check to recognize or apply http as needed', function(){

        expect(prefixHttpCheck('http://www.google.com')).toEqual('http://www.google.com');
        expect(prefixHttpCheck('www.google.com')).toEqual('https://www.google.com');

    });

    test('test sentence structure follows chain', function(){

        const splitSentence = sentence.split(' ');

        for(let wordIdx in splitSentence){

            if(wordIdx === splitSentence.length-1){break};

            let currentWord = splitSentence[wordIdx];
            let nextWord = splitSentence[wordIdx+1];
            

            expect(mm.chains[currentWord].includes(nextWord)).toBe(true);

        };

    });

});