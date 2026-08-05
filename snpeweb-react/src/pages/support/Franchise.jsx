import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import TranslatedInquiryPage from '../../components/common/TranslatedInquiryPage'
import { dataStore } from '../../lib/dataStore'
import { CheckCircle, ArrowRight, AlertCircle, Send } from 'lucide-react'

const INITIAL_FORM = {
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

const comparison = [
  { label: '운영 자격', center: 'SNPE 바른자세 지도사 자격증 취득자', studio: 'SNPE 바른자세 지도사 자격증 취득자' },
  { label: '운영 컨셉', center: '본사 표준 시스템 기반의 전문 교육 센터', studio: '운영 자율성 기반의 프라이빗 스튜디오' },
  { label: '핵심 가치', center: '브랜드 통일성 및 체계적인 교육 서비스', studio: '개별 특성에 맞는 유연한 운영' },
  { label: '교육 과정', center: '본사 공통 커리큘럼 및 정기 교육 필수', studio: '운영자 재량에 따른 프로그램 구성 가능' },
  { label: '매장 규모', center: '중대형 권장 (표준 규격 준수)', studio: '소형/컴팩트 매장 (공간 효율 극대화)' },
  { label: '권한 범위', center: 'CI/BI 및 본사 독점 시스템 전체 활용', studio: '브랜드 사용 승인 및 디자인 소스 활용' },
  { label: '영업권 보장', center: '반경 1km 이내 입점 제한 보호', studio: '반경 1km 이내 입점 제한 보호' },
]

const supports = [
  { title: '브랜드 및 인프라', items: ['SNPE 공식 상호 및 로고(CI/BI) 사용권', '시스템 활용 권리'] },
  { title: '가맹점 특화 지원', items: ['본사 차원의 정기적인 교육 업데이트', '운영 정책 밀착 가이드'] },
  { title: '마케팅 & 디자인', items: ['각종 운영 양식, 홍보물 가이드', '지역별 시장 니즈 분석 데이터', '그래픽 디자인 요소 지원'] },
  { title: '개설 시 혜택', items: ['SNPE 전용 도구 도입 시 할인 혜택', '비용 구조 개별 안내'] },
]

const steps = [
  { num: '01', title: '개설 문의', desc: '개설 상담 양식을 작성하여 제출합니다.' },
  { num: '02', title: '담당자 상담', desc: '담당자가 확인 후 순차적으로 연락드립니다.' },
  { num: '03', title: '자격 심사', desc: '강사 자격 및 사업 역량을 심사합니다.' },
  { num: '04', title: '계약 체결', desc: '가맹/인증점 계약을 체결하고 개설합니다.' },
]

export default function Franchise() {
  const { t, i18n } = useTranslation()
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    if (!form.type || !form.name || !form.phone || !form.certLevel || !form.region || !form.agree) return

    setSubmitting(true)
    setError(null)
    try {
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
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('가맹점 개설 문의 저장 실패:', err)
      setError('신청 접수 중 오류가 발생했습니다. 잠시 후 다시 시도하시거나 snpeedu@mycuring.com 으로 직접 문의 부탁드립니다.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!i18n.resolvedLanguage?.startsWith('ko')) return <TranslatedInquiryPage variant="franchise" />

  if (submitted) {
    return (
      <>
        <PageBanner
          title={t('pages.franchise')}
          subtitle="개설 상담이 접수되었습니다"
        />
        <section className="py-24">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-snpe-dark/10 text-snpe-dark flex items-center justify-center mx-auto mb-6">
              <Send size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">개설 문의가 접수되었습니다</h2>
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
        title={t('pages.franchise')}
        subtitle={t('pages.franchiseSub')}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 space-y-20">

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">SNPE와 함께 바른자세의 가치를 전파할 파트너를 모십니다</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">전문센터(가맹점)와 SNPE STUDIO(인증점) 두 가지 모델로 파트너십을 운영합니다.</p>
          </div>

          {/* Comparison Table */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">가맹점 vs 인증점 비교</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 rounded-tl-xl w-1/5">구분</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 w-2/5">SNPE 전문센터 (가맹점)</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 rounded-tr-xl w-2/5">SNPE STUDIO (인증점)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.label} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-3 font-medium text-gray-900">{row.label}</td>
                      <td className="px-4 py-3 text-gray-600">{row.center}</td>
                      <td className="px-4 py-3 text-gray-600">{row.studio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">본사 지원 사항</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {supports.map((s) => (
                <div key={s.title} className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3">{s.title}</h4>
                  <ul className="space-y-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle size={14} className="text-snpe-dark flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">개설 절차</h3>
            <div className="flex flex-col md:flex-row items-stretch gap-4">
              {steps.map((s, i) => (
                <div key={i} className="flex-1 flex items-center gap-4">
                  <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                    <span className="text-3xl font-heading font-bold text-snpe/30">{s.num}</span>
                    <h4 className="text-lg font-bold text-gray-900 mt-2 mb-1">{s.title}</h4>
                    <p className="text-xs text-gray-500">{s.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight size={20} className="text-gray-300 hidden md:block flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">개설 문의 양식</h3>
            <p className="text-sm text-gray-500 text-center mb-8">내용을 상세히 기재해 주시면 담당자가 확인 후 순차적으로 연락드리겠습니다.</p>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">1. 신청 모델 선택 *</label>
                <div className="space-y-2">
                  {[
                    { value: 'center', label: 'SNPE 전문센터 (가맹점 - 중대형, 본사 표준 시스템)' },
                    { value: 'studio', label: 'SNPE STUDIO (인증점 - 소형/컴팩트, 운영 자율성 중심)' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 cursor-pointer hover:border-snpe-dark transition-colors">
                      <input type="radio" name="type" value={opt.value} checked={form.type === opt.value} onChange={() => handleChange('type', opt.value)} className="accent-snpe-dark" />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">성함 *</label>
                  <input type="text" value={form.name} onChange={(e) => handleChange('name', e.target.value)} className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">연락처 *</label>
                  <input type="tel" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="010-0000-0000" className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">SNPE 강사 자격증 보유 현황 *</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    { value: 'level2', label: 'LEVEL 2 자격 취득' },
                    { value: 'level3', label: 'LEVEL 3 전문가 과정 이수' },
                    { value: 'inProgress', label: '취득 예정 (교육 수강 중)' },
                    { value: 'none', label: '미보유' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-gray-200 cursor-pointer text-sm text-gray-700 hover:border-snpe-dark transition-colors">
                      <input type="radio" name="certLevel" value={opt.value} checked={form.certLevel === opt.value} onChange={() => handleChange('certLevel', opt.value)} className="accent-snpe-dark" />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">개설 희망 지역 *</label>
                <input type="text" value={form.region} onChange={(e) => handleChange('region', e.target.value)} placeholder="예: 서울시 강남구, 경기도 양주시 등" className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">개설 입지(상가) 보유 여부</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    { value: 'owned', label: '보유 중 (상가 계약 완료/본인 소유)' },
                    { value: 'reviewing', label: '검토 중 (특정 매물 확인 중)' },
                    { value: 'none', label: '미보유 (상권 분석 필요)' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-gray-200 cursor-pointer text-sm text-gray-700 hover:border-snpe-dark transition-colors">
                      <input type="radio" name="hasSpace" value={opt.value} checked={form.hasSpace === opt.value} onChange={() => handleChange('hasSpace', opt.value)} className="accent-snpe-dark" />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">개설 희망 시기</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    { value: 'immediate', label: '즉시 (1~2개월 내)' },
                    { value: '3months', label: '3개월 이내' },
                    { value: '6months', label: '6개월 이내' },
                    { value: 'inquiry', label: '단순 문의 (장기 계획)' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-gray-200 cursor-pointer text-sm text-gray-700 hover:border-snpe-dark transition-colors">
                      <input type="radio" name="timing" value={opt.value} checked={form.timing === opt.value} onChange={() => handleChange('timing', opt.value)} className="accent-snpe-dark" />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">기타 문의 사항</label>
                <textarea value={form.note} onChange={(e) => handleChange('note', e.target.value)} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-snpe focus:ring-1 focus:ring-snpe resize-none" />
              </div>

              <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={form.agree} onChange={(e) => handleChange('agree', e.target.checked)} className="accent-snpe-dark mt-0.5" />
                <span>개인정보 수집 및 이용에 동의합니다. (가맹/인증점 상담 및 안내 목적, 상담 종료 후 1년 보유)</span>
              </label>

              {error && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !form.type || !form.name || !form.phone || !form.certLevel || !form.region || !form.agree}
                className="w-full h-12 bg-snpe-darker text-white rounded-xl font-medium hover:bg-snpe-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? '신청 중...' : '개설 상담 신청하기'}
              </button>
            </form>
          </div>

          <div className="text-center text-sm text-gray-500">
            문의 : <a href="mailto:snpeedu@mycuring.com" className="text-snpe-dark hover:underline">snpeedu@mycuring.com</a>
          </div>

        </div>
      </section>
    </>
  )
}
