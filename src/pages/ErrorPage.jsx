import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft, HiHome } from 'react-icons/hi'
import { Button } from '../components/ui/Button.jsx'

export function ErrorPage() {
  const location = useLocation()

  return (
    <div className="mx-auto flex min-h-[64vh] max-w-4xl items-center px-4 py-14 md:px-6">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10"
      >
        <p className="text-sm font-extrabold uppercase tracking-[0.28em] text-blue-700 dark:text-cyan-300">
          404
        </p>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-950 dark:text-white md:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
          The page {location.pathname} is not available in this frontend demo.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/">
            <Button className="w-full gap-2 sm:w-auto">
              <HiHome className="h-5 w-5" />
              Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="w-full gap-2 sm:w-auto">
              <HiArrowLeft className="h-5 w-5" />
              Dashboard
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

