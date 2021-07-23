
import nextTick from './main'

interface JWindow extends Window {
    [key: string]: any 
}

(window as JWindow).nextTick = nextTick;
console.log('Method "nextTick" was added to the window object.')
