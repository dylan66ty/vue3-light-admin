import { defineComponent } from 'vue'
import BreadCrumb from './components/BreadCrumb.vue'
import User from './components/User.vue'
import SettingIcon from './components/SettingIcon.vue'

export default defineComponent({
  setup() {
    return () => {
      return (
        <header class="app-header">
          <BreadCrumb />
          <div class="flex items-center">
            <User />
            <SettingIcon />
          </div>
        </header>
      )
    }
  }
})
