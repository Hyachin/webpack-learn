import './css/index.css'
console.log('hello main');
const sum = (...args) => {
    return args.reduce((p, c) => p + c, 0)
}
console.log(sum(1, 2, 3));