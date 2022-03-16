let fNum = '';
let sNum = '';
let sign = '';
let previusSign = '';
let counter = 0;
let result = false;

const numb = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const action = ['/', 'x', '-', '+'];
const oneAction = ['%', '±'];

const screen = document.querySelector('.screen_calc p');

// Functions
function allClear() {
    fNum = '';
    sNum = '';
    sign = '';
    counter = 0;
    result = false;
    screen.textContent = 0;
}

function dotFix() {
    fNum = +(fNum.toFixed(7))
}

function calculate() {
    switch (sign) {
        case '+':
            fNum = (+fNum) + (+sNum)
            break
        case '-':
            fNum = fNum - sNum
            break
        case 'x':
            fNum = fNum * sNum
            break
        case '/':
            fNum = fNum / sNum
            if (fNum == Infinity || isNaN(fNum)) {
                allClear()
                screen.textContent = 'Ошибка'
                return
            }
            break
        case '±':
            fNum *= -1
            break
        case '%':
            fNum = fNum / 100
            break
    }
    dotFix()
    screen.textContent = fNum;
}

document.querySelector('.btns').onclick = (event) => {

    if (!event.target.classList.contains('btn')) return;

    const key = event.target.textContent;

    if (key === 'AC') allClear();


    if (numb.includes(key)) {
        if (screen.textContent.length > 8 && !sign) return;
        if (key === '.' && screen.textContent.includes('.')) {
            return
        }

        if (!screen.textContent.includes('.') && screen.textContent[0] === '0' && key === '0') return;

        if (sNum === '' && sign === '') {

            if (!screen.textContent.includes('.') && fNum[0] === '0' && key === '.') {
                fNum = '0'
            } else if ((key === '.' && !fNum)) {
                fNum += '0'
            }
            fNum += key;

            screen.textContent = fNum
            console.log('lOx')
        } else if (fNum !== '' && sNum !== '' && result) {
            sNum = key;
            result = false;
            screen.textContent = sNum
        } else {
            if (!screen.textContent.includes('.') && sNum[0] === '0' && key === '.') {
                sNum = '0'
            } else if ((key === '.' && !sNum)) {
                sNum += '0'
            }
            sNum += key
            if (sNum.length > 9) return;
            screen.textContent = sNum

        }
    }

    if (action.includes(key) && sign == '') {
        sign = key;
        if (fNum === '') {
            fNum = 0
        }
        screen.textContent = fNum;
        counter += 1;
        console.log(counter);
    } else if (action.includes(key)) {
        screen.textContent = fNum;
        counter += 1;
    }


    if (oneAction.includes(key)) {
        sign = key;
        if (!fNum) {
            fNum = 0;
        }
        calculate();
        result = true;
    }

    if (key === '=' || counter == 2) {
        if (sNum === '') sNum = fNum;
        if (fNum === '0') fNum = '0';

        calculate();

        if (counter == 2 && action.includes(key)) {
            sign = key;
            counter = 1;
        } else {
            sign = '';
            counter = 0;
            console.log('123s')
        }
        result = true;
    }

    if (screen.textContent.length > 9) {
        allClear();
        screen.textContent = 'Ошибка';
    }
}