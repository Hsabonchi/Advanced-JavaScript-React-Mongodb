// //# 1 What is logged to the console?
const math = ({ a = 1, b = 0 }, callback) => {
    if (b > 0)
        callback(null, a / b)
    else
        callback('cannot divide by 0', null)
}

const doMath = a => {
    const obj = { a, b: 2 }
    math(obj, (error, result) => {
        if (error)
            console.log(error)
        else
            console.log(result)
    })
}
doMath(3)


// # 2 What is logged to the console?
const routine = item => new Promise(resolve => resolve(item))
routine('wakeup')
    .then(item => {
        return routine(item + ',' + ' drink coffee')
    })
    .then(item => {
        return routine(item + ',' + ' code')
    })
    .then(item => {
        return routine(item + ',' + ' sleep')
    })
    .then(item => console.log(item))


// # 3  What is logged to the console?
const numbers = [1, 2, 3, 4]
async function evenOrOdd(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (n % 2 == 0)
                resolve(`${n}`)
            else
                reject(`${n}`)
        }, 1)
    })
}

const allEvenOrOdd = (numbers) => {
    const evens = []
    for (let i = 0, l = numbers.length; i < l; i++) {
        const number = numbers[i]
        evenOrOdd(number)
            .then(result => {
                evens.push(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    console.log(evens)
}

allEvenOrOdd(numbers)


// #4 What is logged to the console?
const numbers = [1, 2, 3, 4]
async function evenOrOdd(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (n % 2 == 0)
                resolve(`${n}`)
            else
                reject(`${n}`)
        }, 1)
    })
}

const awaitEvenOrOdd = async (numbers) => {
    const evens = []
    for (let i = 0, l = numbers.length; i < l; i++) {
        const number = numbers[i]
        try {
            const result = await evenOrOdd(number)
            evens.push(result)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(evens)
}

awaitEvenOrOdd(numbers)
