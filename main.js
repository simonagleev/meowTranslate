

const fromTextarea = document.querySelector('#from-textarea');
const toTextarea = document.querySelector('#to-textarea');
const translateBtn = document.querySelector('.translate-button');
const swapBtn = document.querySelector('.swap-button');
const toLanguage = document.querySelector('.toLanguage');
const fromLanguage = document.querySelector('.fromLanguage');

const alphabet = {
    A: "meow",
    B: "MuR",
    C: "mEow",
    D: "FR",
    E: "MeoW",
    G: "fr",
    H: "MEow",
    I: "Fr",
    J: "mEOW",
    K: "MEOW",
    L: "fR",
    M: "mur",
    O: "meoW",
    Q: "meo",
    R: "meOW",
    T: "mUr",
    U: "Meow",
    V: "Meo",
    W: "muR",
    X: "MEOw",
    Y: "MEO",
    Z: "meOw",
    F: "me",
    N: "Me",
    P: "ME",
    S: "mE",
};

const symbols = new Set(`!@#$%^&*()_+=-~{[]};:'"\`\\|,<.>/?1234567890`.split(''));

const lettersAllowed = new Set(`mMwWeEoOFfuUrR`.split(''))

const lettersNotAllowed = new Set('qtyipadgjklzxcvhbnQTYIPADGJKLZXCVBNйцукенгшщзхъфывапролджэячсмитьбюёЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮЁ'.split(''));

const translateToMeow = (msg) => {
    return msg.split('').map((char) => (alphabet[char] !== 'SHHH') ? alphabet[char.toUpperCase()] || char : alphabet["!"]).join('');
}

const toMeowphabet = (message) => {
    const words = message.split(' ');
    const meows = Object.values(alphabet);
    const newWords = words.map((word) => {
        if (meows.includes(word)) {
            return word;
        } else if (/[а-яa-dg-lnp-qstvx-z]/i.test(word)) {
            return translateToMeow(word);
        } else {
            for (let i = 0; i <= word.length; i++) {
                if (word[i + 1] === word[i + 2] || word[i + 2] === word[i + 3] || word[i + 3] === word[i + 4]) {
                    return translateToMeow(word);
                }
                if (word[i] === word[i + 1]) {
                    return translateToMeow(word);
                } else if (word[i].toLowerCase() === 'f') {
                    if (i === word.length - 1) {
                        return translateToMeow(word);
                    } else if (i === word.length - 2 && (word[i + 1].toUpperCase() !== 'R')) {
                        return translateToMeow(word);
                    } else if ((i === word.length - 3) && (word[i + 1].toUpperCase() === 'R') && (word[i + 2].toLowerCase() === 'm')) {
                        return word;
                    } else if ((i !== word.length - 3) && (word[i + 1].toUpperCase() === 'R') && (word[i + 2].toLowerCase() === 'm')) {
                        return word;
                    } else if (word[i + 1] === word[i + 2]) {
                        return translateToMeow(word);
                    } else {
                        return word;
                    }
                } else if (word[i].toLowerCase() === 'm') {
                    if (word[i + 1].toLowerCase() === 'e' || word[i + 1].toLowerCase() === 'u') {
                        return word;
                    } else {
                        return translateToMeow(word);
                    }
                } else {
                    return translateToMeow(word);
                }
            }
        }
    })
    return newWords.join(' ');
};

const reverseTranslate = (message) => {
    let phrase = ''

    for (let i = 0; i <= message.length; i++) {
        let wordLong = message[i] + message[i + 1] + message[i + 2] + message[i + 3]
        let wordMedium = message[i] + message[i + 1] + message[i + 2];
        let wordShort = message[i] + message[i + 1];
        if (message[i] === ' ') {
            phrase += message[i];
            continue;
        }
        if (symbols.has(message[i])) {
            phrase += message[i];
            continue;
        }
        for (let key in alphabet) {
            if (wordLong === alphabet[key]) {
                phrase += key.toLowerCase();
                i = i + 3;
                break;
            }
            if (wordMedium === alphabet[key]) {
                phrase += key.toLowerCase();
                i = i + 2;
                break;
            }
            if (wordShort === alphabet[key]) {
                phrase += key.toLowerCase();
                i = i + 1;
                break;
            }
        }
    }
    return phrase;
}

const isMeowLanguage = (message) => {
    let value = false;
    if (message.length === 1 && symbols.has(message)) {
        return value = true
    }
    for (let i = 0; i < message.length; i++) {
        if (message.length === 1) {
            value = false;
            break;
        }
        if (message.length === 2 && symbols.has(message[0])) {
            value = false;
            break;
        }
        if ((i < message.length - 1 && message[i].toLowerCase() === message[i + 1].toLowerCase()) && (message[i + 1] !== ' ' && !symbols.has(message[i]))) {
            value = false;
            console.log('if')
            break;
        }
        if (lettersAllowed.has(message[i])) {
            console.log('cool')
            value = true;
        }
        if (symbols.has(message[i])) {
            console.log('coolSYMBOL')
            value = true;
        }
        if (!lettersAllowed.has(message[i]) && message[i] !== ' ' && !symbols.has(message[i])) {
            console.log('not cool')
            console.log(message[i])
            value = false
            break;
        }
    }
    console.log('VALUE = ' + value)
    return value;
};


translateBtn.addEventListener('click', function () {
    toTextarea.innerHTML = '';
    const fromValue = fromTextarea.value;
    console.log(isMeowLanguage(fromValue))
    if (isMeowLanguage(fromValue)) {
        fromLanguage.innerHTML = 'Meow'
        toLanguage.innerHTML = 'English'
        console.log(1)
        toTextarea.innerHTML = reverseTranslate(fromValue)
    } else if (isMeowLanguage(fromValue) === false) {
        fromLanguage.innerHTML = 'English'
        toLanguage.innerHTML = 'Meow'
        console.log(2)
        toTextarea.innerHTML = toMeowphabet(fromValue)
    } else {
        console.log(3)
    }
    
})


