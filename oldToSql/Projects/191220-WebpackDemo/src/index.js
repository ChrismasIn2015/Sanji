import './style.css'
import imgFile from './image.jpg'

console.log('Webpack build bundle.js by ./src/index.js')
console.log('1.CSS need')
console.log('2.Image need', imgFile)

if (module.hot) {
    module.hot.accept()
}
