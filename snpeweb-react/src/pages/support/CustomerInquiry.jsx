import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { dataStore } from '../../lib/dataStore'
import { Send, AlertCircle } from 'lucide-react'

const INITIAL_FORM = {
  organization: '',
  manager: '',
  phone: '',
  email: '',
  preferredDate: '',
  participants: '',
  locationType: '',
  address: '',
  requestType: '',
  budget: '',
  message: '',
  agree: false,
}

export default function CustomerInquiry() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const { t } = useTranslation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.agree || submitting) return

    setSubmitting(true)
    setError(null)
    try {
      await dataStore.addInquiry({
        organization: form.organization,
        manager: form.manager,
        phone: form.phone,
        email: form.email,
        preferred_date: form.preferredDate,
        participants: form.participants ? Number(form.participants) : null,
        location_type: form.locationType,
        address: form.address,
        request_type: form.requestType,
        budget: form.budget,
        message: form.message,
      })
      setSubmitted(true)
    } catch (err) {
      console.error('기업특강 신청 저장 실패:', err)
      setError('신청 접수 중 오류가 발생했습니다. 잠시 후 다시 시도하시거나 contact@mycuring.com 으로 직접 문의 부탁드립니다.')
    } finally {
      setSubmitting(false)
    }
  }

  const update = (field) => (e) => {
    const value = field === 'agree' ? e.target.checked : e.target.value
    setForm({ ...form, [field]: value })
  }

  if (submitted) {
    return (
      <>
        <PageBanner
          title={t('pages.customerInquiry')}
          subtitle={t('pages.customerInquiryThanksSub')}
        />
        <section className="py-24">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mx-auto mb-6">
              <Send size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">기업특강 신청이 접수되었습니다</h2>
            <p className="text-gray-600 mb-8">
              담당자가 확인 후 빠르게 연락드리겠습니다.<br />
              감사합니다.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setForm(INITIAL_FORM)
              }}
              className="px-6 py-2.5 bg-snpe-darker text-white rounded-lg font-medium hover:bg-snpe-dark transition-colors"
            >
              새 신청 작성
            </button>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageBanner
        title={t('pages.customerInquiry')}
        subtitle={t('pages.customerInquirySub')}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">기업·기관 프로그램</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              SNPE 기업·기관 프로그램은 임직원의 건강한 자세, 움직임, 회복을 위한 웰니스 프로그램입니다.<br className="hidden md:block" />
              기업 및 기관 환경에 맞춘 특강·워크숍·정규 수업 형태로 운영되며,<br className="hidden md:block" />
              프로그램 신청 및 제휴 문의는 아래 내용을 작성해주세요.
            </p>
            <a
              href="#form"
              className="inline-block px-8 py-3 bg-snpe-darker text-white rounded-full font-medium hover:bg-snpe-dark transition-colors"
            >
              기업·기관 프로그램 신청하기
            </a>
          </div>

          <form id="form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">회사/기관명 *</label>
                <input
                  type="text"
                  required
                  value={form.organization}
                  onChange={update('organization')}
                  placeholder="예: 주식회사 큐링"
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">담당자명 *</label>
                <input
                  type="text"
                  required
                  value={form.manager}
                  onChange={update('manager')}
                  placeholder="담당자 성함"
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">연락처 *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="010-0000-0000"
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  placeholder="example@company.com"
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">희망 일시 *</label>
                <input
                  type="text"
                  required
                  value={form.preferredDate}
                  onChange={update('preferredDate')}
                  placeholder="예: 2026-04-10 14:00"
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">예상 인원 *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={form.participants}
                  onChange={update('participants')}
                  placeholder="예: 30"
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">진행 장소 유형 *</label>
                <select
                  required
                  value={form.locationType}
                  onChange={update('locationType')}
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
                >
                  <option value="">선택하세요</option>
                  <option value="onsite">방문 출강</option>
                  <option value="center">센터 내 진행</option>
                  <option value="online">온라인 진행</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">신청 유형 *</label>
                <select
                  required
                  value={form.requestType}
                  onChange={update('requestType')}
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe bg-white"
                >
                  <option value="">선택하세요</option>
                  <option value="one-time">1회 특강</option>
                  <option value="regular">정기 프로그램</option>
                  <option value="wellness">임직원 웰니스 프로그램</option>
                  <option value="etc">기타</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">예산 범위</label>
                <input
                  type="text"
                  value={form.budget}
                  onChange={update('budget')}
                  placeholder="예: 100만원 ~ 150만원"
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">진행 희망 장소 *</label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={update('address')}
                  placeholder="예: 서울시 강남구 ..."
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">요청 내용 *</label>
              <textarea
                required
                value={form.message}
                onChange={update('message')}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe resize-none"
                placeholder="요청 목적, 희망 프로그램, 특이사항 등을 자세히 입력해 주세요."
              />
            </div>

            <label className="flex items-start gap-2.5 text-sm text-gray-700">
              <input
                type="checkbox"
                required
                checked={form.agree}
                onChange={update('agree')}
                className="mt-0.5 rounded border-gray-300 text-snpe-dark focus:ring-snpe-dark"
              />
              <span>
                개인정보 수집 및 이용에 동의합니다. 수집된 정보는 기업특강 신청 상담 및 운영 목적에 한하여 사용됩니다.
              </span>
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
              {submitting ? '신청 중...' : '기업특강 신청하기'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
