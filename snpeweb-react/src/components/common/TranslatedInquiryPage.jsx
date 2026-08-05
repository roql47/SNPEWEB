import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from './PageBanner'
import { dataStore } from '../../lib/dataStore'
import { Send, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react'

const corporateInitial = {
  organization: '',
  manager: '',
  phone: '',
  email: '',
  preferredDate: '',
  participants: '',
  venueType: '',
  requestType: '',
  budget: '',
  address: '',
  message: '',
  agree: false,
}

const franchiseInitial = {
  type: '',
  name: '',
  phone: '',
  certLevel: '',
  region: '',
  hasSpace: '',
  timing: '',
  note: '',
  agree: false,
}

export default function TranslatedInquiryPage({ variant }) {
  const { t } = useTranslation()
  const isFranchise = variant === 'franchise'
  const [form, setForm] = useState(isFranchise ? franchiseInitial : corporateInitial)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const prefix = isFranchise ? 'translatedInquiry.franchise' : 'translatedInquiry.corporate'
  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const agreeText = isFranchise
    ? t('translatedInquiry.franchise.agree', { defaultValue: t('translatedInquiry.agree') })
    : t('translatedInquiry.corporate.agree', { defaultValue: t('translatedInquiry.agree') })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.agree || submitting) return
    setSubmitting(true)
    setError(null)
    try {
      if (isFranchise) {
        await dataStore.addFranchiseInquiry({
          type: form.type,
          name: form.name,
          phone: form.phone,
          cert_level: form.certLevel,
          region: form.region,
          has_space: form.hasSpace,
          timing: form.timing,
          note: form.note,
        })
      } else {
        await dataStore.addInquiry({
          organization: form.organization,
          manager: form.manager,
          phone: form.phone,
          email: form.email,
          preferred_date: form.preferredDate,
          participants: form.participants ? Number(form.participants) : null,
          venue_type: form.venueType,
          request_type: form.requestType,
          budget: form.budget,
          address: form.address,
          message: form.message,
        })
      }
      setSubmitted(true)
    } catch (err) {
      console.error('[TranslatedInquiryPage] submit failed:', err)
      setError(t('translatedInquiry.error'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageBanner
        title={t(prefix + '.title')}
        subtitle={submitted ? t('translatedInquiry.thanksSub') : t(prefix + '.subtitle')}
      />

      {isFranchise && !submitted && <FranchiseIntro t={t} />}

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 rounded-full bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mx-auto mb-6">
                <Send size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('translatedInquiry.submittedTitle')}</h2>
              <p className="text-gray-600 mb-8">{t('translatedInquiry.submittedBody')}</p>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setForm(isFranchise ? franchiseInitial : corporateInitial)
                }}
                className="px-6 py-2.5 bg-snpe-darker text-white rounded-lg font-medium hover:bg-snpe-dark transition-colors"
              >
                {t('translatedInquiry.writeAgain')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t(prefix + '.heading')}</h2>
                <p className="text-gray-600 leading-relaxed">{t(prefix + '.desc')}</p>
              </div>
              {isFranchise ? (
                <FranchiseFields form={form} update={update} t={t} />
              ) : (
                <CorporateFields form={form} update={update} t={t} />
              )}
              <label className="flex items-start gap-2.5 text-sm text-gray-700">
                <input
                  type="checkbox"
                  required
                  checked={form.agree}
                  onChange={update('agree')}
                  className="mt-0.5 rounded border-gray-300 text-snpe-dark focus:ring-snpe-dark"
                />
                <span>{agreeText}</span>
              </label>
              {error && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={submitting || !form.agree}
                className="w-full h-12 bg-snpe-darker text-white rounded-lg font-medium hover:bg-snpe-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                {submitting ? t('translatedInquiry.submitting') : t(prefix + '.submit')}
              </button>
              {isFranchise && (
                <p className="text-center text-sm text-gray-400">{t(prefix + '.contact')}</p>
              )}
            </form>
          )}
        </div>
      </section>
    </>
  )
}

function FranchiseIntro({ t }) {
  const comparison = t('translatedInquiry.franchise.comparison', { returnObjects: true })
  const supports = t('translatedInquiry.franchise.supports', { returnObjects: true })
  const steps = t('translatedInquiry.franchise.steps', { returnObjects: true })
  const rows = Array.isArray(comparison) ? comparison : []
  const supportList = Array.isArray(supports) ? supports : []
  const stepList = Array.isArray(steps) ? steps : []

  return (
    <>
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {t('translatedInquiry.franchise.heroTitle')}
          </h2>
          <p className="text-gray-600 leading-relaxed">{t('translatedInquiry.franchise.heroDesc')}</p>
        </div>
      </section>

      {rows.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              {t('translatedInquiry.franchise.compareTitle')}
            </h3>
            <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-left font-medium text-gray-500 w-28" />
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">
                      {t('translatedInquiry.franchise.centerHeader')}
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">
                      {t('translatedInquiry.franchise.studioHeader')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">{row.label}</td>
                      <td className="px-4 py-3 text-gray-600">{row.center}</td>
                      <td className="px-4 py-3 text-gray-600">{row.studio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {supportList.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">
              {t('translatedInquiry.franchise.supportTitle')}
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {supportList.map((item) => (
                <div key={item.title} className="border border-gray-100 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle size={16} className="text-snpe-dark" />
                    {item.title}
                  </h4>
                  <ul className="space-y-2">
                    {(item.items || []).map((line) => (
                      <li key={line} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-snpe-dark">·</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {stepList.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">
              {t('translatedInquiry.franchise.stepsTitle')}
            </h3>
            <div className="grid sm:grid-cols-4 gap-4">
              {stepList.map((step) => (
                <div key={step.num} className="bg-white rounded-xl p-5 border border-gray-100 text-center relative">
                  <p className="text-snpe-dark font-bold text-sm mb-2">{step.num}</p>
                  <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                  <ArrowRight size={14} className="hidden sm:block absolute top-1/2 -right-3 text-gray-300 -translate-y-1/2 last:hidden" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function CorporateFields({ form, update, t }) {
  const venueOptions = t('translatedInquiry.venueOptions', { returnObjects: true }) || {}
  const requestOptions = t('translatedInquiry.requestOptions', { returnObjects: true }) || {}

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label={t('translatedInquiry.organization')} required>
          <input
            required
            value={form.organization}
            onChange={update('organization')}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
          />
        </Field>
        <Field label={t('translatedInquiry.manager')} required>
          <input
            required
            value={form.manager}
            onChange={update('manager')}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
          />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label={t('translatedInquiry.phone')} required>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
          />
        </Field>
        <Field label={t('translatedInquiry.email')} required>
          <input
            required
            type="email"
            value={form.email}
            onChange={update('email')}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
          />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label={t('translatedInquiry.preferredDate')} required>
          <input
            required
            value={form.preferredDate}
            onChange={update('preferredDate')}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
          />
        </Field>
        <Field label={t('translatedInquiry.participants')} required>
          <input
            required
            type="number"
            min="1"
            value={form.participants}
            onChange={update('participants')}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
          />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label={t('translatedInquiry.venueType')} required>
          <select
            required
            value={form.venueType}
            onChange={update('venueType')}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
          >
            <option value="">{t('translatedInquiry.select')}</option>
            {Object.entries(venueOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t('translatedInquiry.requestType')} required>
          <select
            required
            value={form.requestType}
            onChange={update('requestType')}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
          >
            <option value="">{t('translatedInquiry.select')}</option>
            {Object.entries(requestOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label={t('translatedInquiry.budget')}>
        <input
          value={form.budget}
          onChange={update('budget')}
          className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
        />
      </Field>
      <Field label={t('translatedInquiry.address')} required>
        <input
          required
          value={form.address}
          onChange={update('address')}
          className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
        />
      </Field>
      <Field label={t('translatedInquiry.message')} required>
        <textarea
          required
          value={form.message}
          onChange={update('message')}
          rows={6}
          className="w-full px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white py-3 resize-none"
        />
      </Field>
    </>
  )
}

function FranchiseFields({ form, update, t }) {
  const cert = t('translatedInquiry.franchise.certOptions', { returnObjects: true }) || {}
  const space = t('translatedInquiry.franchise.spaceOptions', { returnObjects: true }) || {}
  const timing = t('translatedInquiry.franchise.timingOptions', { returnObjects: true }) || {}

  return (
    <>
      <Field label={t('translatedInquiry.model')} required>
        <select
          required
          value={form.type}
          onChange={update('type')}
          className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
        >
          <option value="">{t('translatedInquiry.select')}</option>
          <option value="center">{t('translatedInquiry.franchise.modelCenter')}</option>
          <option value="studio">{t('translatedInquiry.franchise.modelStudio')}</option>
        </select>
      </Field>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label={t('translatedInquiry.name')} required>
          <input
            required
            value={form.name}
            onChange={update('name')}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
          />
        </Field>
        <Field label={t('translatedInquiry.phone')} required>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
          />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label={t('translatedInquiry.certLevel')} required>
          <select
            required
            value={form.certLevel}
            onChange={update('certLevel')}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
          >
            <option value="">{t('translatedInquiry.select')}</option>
            {Object.entries(cert).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t('translatedInquiry.region')} required>
          <input
            required
            value={form.region}
            onChange={update('region')}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
          />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label={t('translatedInquiry.hasSpace')}>
          <select
            value={form.hasSpace}
            onChange={update('hasSpace')}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
          >
            <option value="">{t('translatedInquiry.select')}</option>
            {Object.entries(space).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t('translatedInquiry.timing')}>
          <select
            value={form.timing}
            onChange={update('timing')}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
          >
            <option value="">{t('translatedInquiry.select')}</option>
            {Object.entries(timing).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label={t('translatedInquiry.message')}>
        <textarea
          value={form.note}
          onChange={update('note')}
          rows={5}
          className="w-full px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white py-3 resize-none"
        />
      </Field>
    </>
  )
}

function Field({ label, required = false, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required ? ' *' : ''}
      </label>
      {children}
    </div>
  )
}
