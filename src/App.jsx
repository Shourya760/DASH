import { AppRoutes } from './routes/AppRoutes.jsx'
import { ScrollToTop } from './routes/ScrollToTop.jsx'

/**
 * Root app shell. Routes, layouts, and providers live in ./routes and ./main.
 */
export default function App() {
  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  )
}
