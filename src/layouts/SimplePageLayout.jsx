import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../components/ui/Button.jsx'

/** Narrow content column with back link for app sub-pages */
export function SimplePageLayout({ children, backTo = '/dashboard' }) {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <Link to={backTo} className="mb-8 inline-block">
        <Button variant="ghost" type="button" className="!min-h-[48px] !shadow-none">
          ← {t('common.back')}
        </Button>
      </Link>
      {children}
    </div>
  )
}
