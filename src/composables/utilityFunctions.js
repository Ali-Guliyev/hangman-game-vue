const randomItem = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const replaceAtIndex = (str, index, letter) => {
    let arr = [];
    let newStr = "";

    for (let i = 0; i < str.length; i++) {
        arr.push(str[i]);
    }

    arr[index] = letter;

    for (let i = 0; i < arr.length; i++) {
        newStr += arr[i];
    }

    return newStr;
};

export { randomItem, replaceAtIndex };
