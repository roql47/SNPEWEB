import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LogIn } from 'lucide-react'

export default function Login() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ email: '', password: '' })
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(t('loginPage.preparing'))
  }

  return (
    <section className="py-20 md:py-32 bg-gray-50 min-h-[70vh] flex items-center">
      <div className="max-w-md mx-auto px-4 w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <Link to="/">
              <img src="/images/기본로고_01.svg" alt="SNPE" className="h-10 mx-auto mb-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{t('loginPage.title')}</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('loginPage.email')}</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                placeholder={t('loginPage.emailPlaceholder')}
                className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('loginPage.password')}</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={update('password')}
                placeholder={t('loginPage.passwordPlaceholder')}
                className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-snpe-darker text-white rounded-lg font-medium hover:bg-snpe-dark transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={16} />
              {t('loginPage.submit')}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm">
            <button type="button" className="text-gray-400 hover:text-snpe-dark transition-colors">
              {t('loginPage.forgotPassword')}
            </button>
            <Link to="/provision" className="text-snpe-dark font-medium hover:underline">
              {t('loginPage.register')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
