// import moment from 'moment';
import * as moment from 'moment';

const time = document.querySelector('#time');
const leftBtn = document.querySelector('#minus');
const rightBtn = document.querySelector('#plus');
const startBtn = document.querySelector('#start-button');
const label = document.querySelector('#label');

leftBtn.addEventListener('click', changeTimer(time, false));
rightBtn.addEventListener('click', changeTimer(time));
startBtn.addEventListener('click', () => {
    startTimer(time, label);
})

function changeTimer(timeNode: Element, incr: boolean = true) {
    if (incr) {
        return () => {
            let changeItem: number = +timeNode.innerHTML;
            changeItem++;
            timeNode.innerHTML = changeItem.toString();
        }
    }
    else {
        return () => {
            let changeItem: number = +timeNode.innerHTML;
            if (changeItem != 0) {
                changeItem--;
                timeNode.innerHTML = changeItem.toString();
            }
        }
    }
}

function startTimer(timeNode: Element, labelNode: Element): void {
    const duration = moment.duration({
        seconds: 0,
        minutes: +timeNode.innerHTML,
    });

    // if (duration.minutes()!==0) {

    // }

    labelNode.innerHTML = 'Осталось:';

    toggleHideBtns(leftBtn, rightBtn, startBtn);

    const onTimer = setInterval(() => {
        if (duration.minutes() === 0 && duration.seconds() === 0) {
            clearInterval(onTimer);
            toggleHideBtns(leftBtn, rightBtn, startBtn);
            labelNode.innerHTML = 'Укажите время в минутах';
            timeNode.innerHTML = '0';
        } else {
            duration.subtract(1, 'seconds');
            timeNode.innerHTML = `${addZero(duration.minutes())}:${addZero(duration.seconds())}`
        }
    }, 1000)

}

function toggleHideBtns(...btns: Element[]) {
    btns.forEach(item => {
        item.classList.toggle('hide');
    })
}

function addZero(timeItem: number): string {
    let number: number|string = timeItem;
    if (number < 10) {
        number = `0${number}`
        return number;
    }
    return number.toString();
}