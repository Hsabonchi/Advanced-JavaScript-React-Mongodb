// 1
// What is outputed to the console when this code is run?
let greet = 'hello'
const cartoon = 'garfield'
greet = greet + cartoon
console.log(greet)


// 2
// What is outputed to the console when this code is run?
const n = 1
const add = (number) => {
    number += 7
    console.log(number)
}
add(n)

// 3
// What is outputed to the console when this code is run?
const numbers = [1, 2, 3]
numbers.push(4)
numbers.push(5)
numbers.pop()
numbers.shift()
numbers.unshift(0)

console.log(numbers)

// 4
// What is outputed to the console when this code is run?
const x = 1
const y = '1'
console.log(x == y, x === y)


// 5
// What is outputed to the console when this code is run?
const game = {
    name: 'The Legend of Zelda',
    firstRelease: '02/21/86'
}
const genre = 'Adventure'
game[genre] = genre
game.lastRelease = '03/03/17'

console.log(game)


// 6
// What is outputed to the console when this code is run?
const gameV2 = {
    name: 'The Legend of Zelda',
}
const mainCharacters = ['Link', 'Princess Zelda']
const firstRelease = '02/21/86'
Object.assign(gameV2, { characters: mainCharacters }, { firstRelease })

console.log(gameV2)

// 7
// What is outputed to the console when this code is run?
const gameV3 = {
    name: 'Apex Legends',
    type: 'Battle Royale'
}

const companies = {}
const developer = 'Respawn'
const publisher = 'EA'

companies[developer] = developer
companies.publisher = publisher

Object.assign(gameV3, { companies })
console.log(gameV3)
