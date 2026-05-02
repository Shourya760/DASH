import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout.jsx'
import { PrivateRoute } from './PrivateRoute.jsx'
import { Home } from '../pages/Home.jsx'
import { About } from '../pages/About.jsx'
import { Features } from '../pages/Features.jsx'
import { Login } from '../pages/Login.jsx'
import { SignUp } from '../pages/SignUp.jsx'
import { Dashboard } from '../pages/Dashboard.jsx'
import { HowToVote } from '../pages/HowToVote.jsx'
import { Documents } from '../pages/Documents.jsx'
import { PollingBooth } from '../pages/PollingBooth.jsx'
import { Timeline } from '../pages/Timeline.jsx'
import { FAQ } from '../pages/FAQ.jsx'
import { PracticeVoting } from '../pages/PracticeVoting.jsx'
import { Quiz } from '../pages/Quiz.jsx'
import { Privacy } from '../pages/Privacy.jsx'
import { Terms } from '../pages/Terms.jsx'
import { ErrorPage } from '../pages/ErrorPage.jsx'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/how-to-vote"
          element={
            <PrivateRoute>
              <HowToVote />
            </PrivateRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <PrivateRoute>
              <Documents />
            </PrivateRoute>
          }
        />
        <Route
          path="/polling-booth"
          element={
            <PrivateRoute>
              <PollingBooth />
            </PrivateRoute>
          }
        />
        <Route
          path="/timeline"
          element={
            <PrivateRoute>
              <Timeline />
            </PrivateRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <PrivateRoute>
              <FAQ />
            </PrivateRoute>
          }
        />
        <Route
          path="/practice-voting"
          element={
            <PrivateRoute>
              <PracticeVoting />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}
