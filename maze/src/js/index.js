import Map from './map.js'
import Person from './person.js'

const canvas = document.getElementById('app')
const ctx = canvas.getContext('2d')

Map.createRoute([0, 20], [79, 59])
Map.createRoute([10, 59], [69, 59])
Map.coverStone(ctx)

// let routes = Map.route
// let size = Map.stoneSize
// Person.createPerson(ctx, [0, 0])
// for (let i = 1, len = routes.length; i < len; i++) {
//   setTimeout(() => {
//     ctx.clearRect(routes[i - 1][0] * size, routes[i - 1][1] * size, size, size)
//     Person.createPerson(ctx, routes[i])
//   }, i * 50)
// }

// Map.route = [[1, 2], [0, 0], [1, 1], [1, 0]]

Person.findRoute([0, 20])

// console.log(Person.route)

let route = Person.route
let size = Map.stoneSize
console.log(route)
Person.createPerson(ctx, [0, 20])
for (let i = 1, len = route.length; i < len; i++) {
  setTimeout(() => {
    ctx.clearRect(route[i - 1][0] * size, route[i - 1][1] * size, size, size)
    Person.createPerson(ctx, route[i])
  }, i * 50)
}

window.Person = Person
