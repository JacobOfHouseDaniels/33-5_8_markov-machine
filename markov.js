/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains(this.words);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(words) {
    const chain = {};

    words.forEach((word, idx, arr)=>{

      const nextWord = arr[idx+1] ? arr[idx+1] : null;

      if(chain[word] && !chain[word].includes(nextWord)){

        chain[word] ? chain[word].push(nextWord) : Object.assign  (chain, {word: [nextWord]});

        } else {
          chain[`${word}`] = [nextWord]
        };
    });

    return chain;
  };


  /** return random text from chains */

  makeText(numWords = 100) {

    let wordsIdx = this.rngGenerator(this.words.length);
    let currentWord = this.words[wordsIdx];

    const text = [currentWord.replace(/^./, word => word.toUpperCase())];

    while(text.length < numWords + 1){
      
      const nextWordSelection = this.chains[currentWord];
      const nextWord = nextWordSelection[this.rngGenerator(nextWordSelection.length)];
      
      if(nextWord === null){

        currentWord = this.words[this.rngGenerator(this.words.length)];
        text.push((currentWord).replace(/^./, word => word.toUpperCase()));
        

      } else {

        currentWord = nextWord;
        text.push(nextWord);

      };

    };

    return text.join(' ');

  };

  rngGenerator(ceiling){

    const rng = Math.floor(Math.random()*ceiling);
    return rng;

  };
};


module.exports = {MarkovMachine};

