import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { UserPlus } from 'lucide-react'

export default function Register() {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    agree: false,
  })

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password !== form.passwordConfirm) {
      alert(t('registerPage.passwordMismatch'))
      return
    }
    alert(t('registerPage.preparing'))
  }

  return (
    <section className="py-20 md:py-32 bg-gray-50 min-h-[70vh] flex items-center">
      <div className="max-w-md mx-auto px-4 w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <Link to="/">
              <img src="/images/기본로고_01.svg" alt="SNPE" className="h-10 mx-auto mb-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{t('registerPage.title')}</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label={t('registerPage.name')} required>
              <input type="text" required value={form.name} onChange={update('name')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe" />
            </Field>
            <Field label={t('registerPage.email')} required>
              <input type="email" required value={form.email} onChange={update('email')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe" />
            </Field>
            <Field label={t('registerPage.password')} required>
              <input type="password" required value={form.password} onChange={update('password')} placeholder={t('registerPage.passwordPlaceholder')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe" />
            </Field>
            <Field label={t('registerPage.passwordConfirm')} required>
              <input type="password" required value={form.passwordConfirm} onChange={update('passwordConfirm')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe" />
            </Field>
            <Field label={t('registerPage.phone')}>
              <input type="tel" value={form.phone} onChange={update('phone')} placeholder="010-0000-0000" className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe" />
            </Field>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" required checked={form.agree} onChange={update('agree')} className="mt-1 accent-snpe" />
              <span className="text-xs text-gray-500 leading-relaxed">{t('registerPage.agree')}</span>
            </label>

            <button type="submit" className="w-full h-11 bg-snpe-darker text-white rounded-lg font-medium hover:bg-snpe-dark transition-colors flex items-center justify-center gap-2">
              <UserPlus size={16} />
              {t('registerPage.submit')}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            {t('registerPage.hasAccount')}{' '}
            <Link to="/login" className="text-snpe-dark font-medium hover:underline">{t('registerPage.login')}</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

function Field({ label, required = false, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}{required ? ' *' : ''}</label>
      {children}
    </div>
  )
}
