import { sum } from "./js/esModule.js";
const { priceFormat } = require("./js/commonJS.js")
import './js/css.js'
import './css/style.css'
import './css/style.less'
import './css/autoprefixer.css'

console.log(sum(20,30));
console.log(priceFormat());

//为了方便看，我分开来写
import {createApp} from 'vue'
import App from './vue/App.vue'
// const app = createApp({
//     template:'<h2>我是vue渲染出来的</h2>',
//     data(){
//         return {
//             title: 'vue'
//         }
//     }
// })
const app = createApp({App})
app.mount('#app')