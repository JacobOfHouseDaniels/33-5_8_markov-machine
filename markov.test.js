const { MarkovMachine } = require("./markov");


const sampleText = 'the cat in the hat';
const mm = new MarkovMachine(sampleText);

describe("makeChains", function() {
    test('test expected chain behavior', function(){

        const chains = mm.makeChains(sampleText);
        expect(chains).toBe({"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]});

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