import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App'
import { setupRouter } from './router'
import { setupStore } from './store'
import { usePlugins } from '@/plugins'
import './styles/app.scss'

const app = createApp(App)

usePlugins(app)
setupStore(app)
setupRouter(app)
app.use(MotionPlugin)

app.mount('#app')
