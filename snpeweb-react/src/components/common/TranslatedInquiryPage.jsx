import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from './PageBanner'
import { dataStore } from '../../lib/dataStore'
import { Send, AlertCircle } from 'lucide-react'

const corporateInitial = { organization: '', manager: '', phone: '', email: '', preferredDate: '', participants: '', address: '', message: '', agree: false }
const franchiseInitial = { type: '', name: '', phone: '', certLevel: '', region: '', note: '', agree: false }

export default function TranslatedInquiryPage({ variant }) {
  const { t } = useTranslation()
  const isFranchise = variant === 'franchise'
  const [form, setForm] = useState(isFranchise ? franchiseInitial : corporateInitial)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const prefix = isFranchise ? 'translatedInquiry.franchise' : 'translatedInquiry.corporate'
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.agree || submitting) return
    setSubmitting(true)
    setError(null)
    try {
      if (isFranchise) await dataStore.addFranchiseInquiry({ type: form.type, name: form.name, phone: form.phone, cert_level: form.certLevel, region: form.region, note: form.note })
      else await dataStore.addInquiry({ organization: form.organization, manager: form.manager, phone: form.phone, email: form.email, preferred_date: form.preferredDate, participants: form.participants ? Number(form.participants) : null, address: form.address, message: form.message })
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
      <PageBanner title={t(prefix + '.title')} subtitle={submitted ? t('translatedInquiry.thanksSub') : t(prefix + '.subtitle')} />
      <section className="py-16 md:py-24"><div className="max-w-3xl mx-auto px-4">
        {submitted ? <div className="text-center py-10"><div className="w-20 h-20 rounded-full bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mx-auto mb-6"><Send size={32} /></div><h2 className="text-2xl font-bold text-gray-900 mb-4">{t('translatedInquiry.submittedTitle')}</h2><p className="text-gray-600 mb-8">{t('translatedInquiry.submittedBody')}</p><button onClick={() => { setSubmitted(false); setForm(isFranchise ? franchiseInitial : corporateInitial) }} className="px-6 py-2.5 bg-snpe-darker text-white rounded-lg font-medium hover:bg-snpe-dark transition-colors">{t('translatedInquiry.writeAgain')}</button></div> :
        <form onSubmit={handleSubmit} className="space-y-6"><div className="text-center mb-10"><h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t(prefix + '.heading')}</h2><p className="text-gray-600 leading-relaxed">{t(prefix + '.desc')}</p></div>{isFranchise ? <FranchiseFields form={form} update={update} t={t} /> : <CorporateFields form={form} update={update} t={t} />}<label className="flex items-start gap-2.5 text-sm text-gray-700"><input type="checkbox" required checked={form.agree} onChange={update('agree')} className="mt-0.5 rounded border-gray-300 text-snpe-dark focus:ring-snpe-dark" /><span>{t('translatedInquiry.agree')}</span></label>{error && <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700"><AlertCircle size={18} className="flex-shrink-0 mt-0.5" /><span>{error}</span></div>}<button type="submit" disabled={submitting || !form.agree} className="w-full h-12 bg-snpe-darker text-white rounded-lg font-medium hover:bg-snpe-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"><Send size={16} />{submitting ? t('translatedInquiry.submitting') : t(prefix + '.submit')}</button></form>}
      </div></section>
    </>
  )
}

function CorporateFields({ form, update, t }) { return <><div className="grid sm:grid-cols-2 gap-6"><Field label={t('translatedInquiry.organization')} required><input required value={form.organization} onChange={update('organization')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white" /></Field><Field label={t('translatedInquiry.manager')} required><input required value={form.manager} onChange={update('manager')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white" /></Field></div><div className="grid sm:grid-cols-2 gap-6"><Field label={t('translatedInquiry.phone')} required><input required type="tel" value={form.phone} onChange={update('phone')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white" /></Field><Field label={t('translatedInquiry.email')} required><input required type="email" value={form.email} onChange={update('email')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white" /></Field></div><div className="grid sm:grid-cols-2 gap-6"><Field label={t('translatedInquiry.preferredDate')}><input value={form.preferredDate} onChange={update('preferredDate')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white" /></Field><Field label={t('translatedInquiry.participants')}><input type="number" min="1" value={form.participants} onChange={update('participants')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white" /></Field></div><Field label={t('translatedInquiry.address')}><input value={form.address} onChange={update('address')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white" /></Field><Field label={t('translatedInquiry.message')} required><textarea required value={form.message} onChange={update('message')} rows={6} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white py-3 h-auto resize-none" /></Field></> }
function FranchiseFields({ form, update, t }) { return <><Field label={t('translatedInquiry.model')} required><select required value={form.type} onChange={update('type')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"><option value="">{t('translatedInquiry.select')}</option><option value="center">SNPE Professional Center</option><option value="studio">SNPE STUDIO</option></select></Field><div className="grid sm:grid-cols-2 gap-6"><Field label={t('translatedInquiry.name')} required><input required value={form.name} onChange={update('name')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white" /></Field><Field label={t('translatedInquiry.phone')} required><input required type="tel" value={form.phone} onChange={update('phone')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white" /></Field></div><div className="grid sm:grid-cols-2 gap-6"><Field label={t('translatedInquiry.certLevel')} required><input required value={form.certLevel} onChange={update('certLevel')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white" /></Field><Field label={t('translatedInquiry.region')} required><input required value={form.region} onChange={update('region')} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white" /></Field></div><Field label={t('translatedInquiry.message')}><textarea value={form.note} onChange={update('note')} rows={5} className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white py-3 h-auto resize-none" /></Field></> }
function Field({ label, required = false, children }) { return <div><label className="block text-sm font-medium text-gray-700 mb-2">{label}{required ? ' *' : ''}</label>{children}</div> }
