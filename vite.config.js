import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server:{
  //   proxy:{'/':'https://creator07portfolio.netlify.app'}
  // },
  plugins: [react()],
})
