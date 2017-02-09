/* SENG 513 Assignment 2 - Alexander (Sasha) Ivanov */

//
// this is just a stub for a function you need to implement
//
function getStats(txt) {
    return {
        nChars: getNumChars(txt),
        nWords: getNumWords(txt),
        nLines: getNumLines(txt),
        nNonEmptyLines: getNumNonEmptyLines(txt),
        averageWordLength: getAvgWordLength(txt),
        maxLineLength: getMaxLineLength(txt),
        palindromes: getPalindromes(txt),
        longestWords: getLongestWords(txt,10),
        mostFrequentWords: getMostFrequentWords(txt,10)
    };
}

function getNumChars(txt){
    return txt.length;
}

/* 
Uses AD7six's solution to replace all non alphanumeric characters with a space character http://stackoverflow.com/questions/9364400/remove-not-alphanumeric-characters-from-string-having-trouble-with-the-char 

Uses T.J. Crowder's solution to remove empty elements from array after splitting http://stackoverflow.com/questions/35476948/remove-empty-or-whitespace-strings-from-array-javascript
*/

function getWordsInArray(txt){
    return txt.replace(/[^0-9a-z]/gi, ' ').toLowerCase().split(' ').filter(function(word) { 
        return word.trim() != ''; 
    });
}

function getNumWords(txt){
    return getWordsInArray(txt).length;
}


/* 
Uses mercator's solution for guidance as to what counts as a 'new line' character in javascript http://stackoverflow.com/questions/1155678/javascript-string-newline-character
*/

function getLinesInArray(txt){
    return txt.split(/\r\n|\r|\n/g);
}


function getNumLines(txt){
    if (txt){
        return getLinesInArray(txt).length;
    }
    
    return 0;
}


function getNumNonEmptyLines(txt){
    return getLinesInArray(txt).filter(function(line) { 
        return line.trim() != '';
    }).length;
}


/* 
Based off of Florian Margaine's example of reduce function syntax in Javascript http://stackoverflow.com/questions/35476948/remove-empty-or-whitespace-strings-from-array-javascript
*/
function getAvgWordLength(txt){
    
    if (txt && getNumNonEmptyLines(txt) > 0){
        return getWordsInArray(txt).map(function (word){
            return word.length;
        }).reduce(function (a, b){
            return a + b;
        }, 0)/getWordsInArray(txt).length;
    }
    
    return 0;
}


function getMaxLineLength(txt){
    
    
    if (txt && getNumNonEmptyLines(txt) > 0){
        return Math.max(...getLinesInArray(txt).filter(function(line) { 
            return line.trim() != '';
        }).map(function (line){
            return line.length;
        }));
    }
    
    return 0;
}


/* 
Uses belacqua's solution for reversing a string 
http://stackoverflow.com/questions/958908/how-do-you-reverse-a-string-in-place-in-javascript

Found a super cool trick for removing duplicates using sets by Christian Landgren
http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
*/


function getPalindromes(txt){
    return [...new Set(getWordsInArray(txt).filter(function (word) {
        return word.length > 2;
    }).filter(function (word) {
        return word == word.split('').reverse().join('');
    }))]
}


function getLongestWords(txt,num){
    return [...new Set(getWordsInArray(txt))].sort(function(a,b){
        return b.length - a.length
    }).slice(0,num);
}

/*
Uses j08691's solution for extracting string between two brackets
http://stackoverflow.com/questions/12059284/get-text-between-two-rounded-brackets
*/
function getMostFrequentWords(txt,num){
        return [...new Set(getWordsInArray(txt).map(function (word){
            return word.concat('(').concat(getWordsInArray(txt).filter(function(element){
                return element == word;
            }).length).concat(')');
        }))].sort(function(a,b){
            return b.match(/\((.*)\)/)[1] - a.match(/\((.*)\)/)[1]
        }).slice(0,num);
}