import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import PageBanner from '../../components/common/PageBanner'
import { Palette, Shield, FileCheck } from 'lucide-react'

const TABS = [
  { id: 'bi', label: 'BI 소개', icon: Palette },
  { id: 'ip', label: '지식재산권', icon: Shield },
]

const colors = [
  { label: 'MAIN COLOR', hex: '#5ac0c0', rgb: 'R90  G192  B192', cmyk: 'C62  M0  Y29  K0' },
  { label: 'SUB COLOR', hex: '#208d88', rgb: 'R32  G141  B136', cmyk: 'C79  M28  Y49  K0' },
  { label: 'SUB COLOR', hex: '#3b3c43', rgb: 'R59  G60  B67', cmyk: 'C72  M65  Y55  K46' },
]

const trademarks = [
  { no: '40-1759091', image: '/images/ip/trademark-1.png', label: 'SNPE' },
  { no: '40-1857900', image: '/images/ip/trademark-2.png', label: 'SNPE (Self Natural Posture Exercise)' },
  { no: '40-1857901', image: '/images/ip/trademark-3.png', label: 'SNPE 바른자세척추운동' },
  { no: '40-2525675', image: '/images/ip/trademark-4.png', label: 'SNPE STUDIO' },
]

const patentGroups = [
  { category: '바른자세벨트 관련', items: ['바른자세벨트 (비탄력) 구조 및 사용방법', '바른자세벨트 (탄력) 구조 및 사용방법', '바른자세벨트 조절 장치', '골반밴드 구조 및 교정 보조 장치'] },
  { category: '척추운동 도구', items: ['SNPE 웨이브베개', 'SNPE 다날 도구 시리즈', 'SNPE 풋밸런스', 'SNPE 롤러'] },
  { category: '운동 방법 특허', items: ['SNPE 바른자세 척추운동법', 'SNPE 셀프 자세 교정 운동 시스템', 'SNPE 도구 활용 운동 프로토콜'] },
  { category: '디자인 등록', items: ['바른자세벨트 외관 디자인', 'SNPE 웨이브베개 외관 디자인', 'SNPE 다날 도구 시리즈 디자인'] },
]

const prohibitedGroups = [
  {
    title: '온·오프라인 영리 목적의 홍보 및 광고',
    items: [
      { head: '클래스 개설', body: "본사 승인 없이 'SNPE' 명칭을 활용한 온라인 강의(VOD, 실시간 라이브 등) 개설 및 판매" },
      { head: '상업적 노출', body: 'SNS(인스타그램, 유튜브, 블로그 등) 내 상업적 협찬, 공동구매, 광고물 제작 시 SNPE 상표를 홍보 수단으로 활용하는 행위' },
      { head: '플랫폼 무단 등록', body: "네이버 스마트플레이스, 카카오맵 등 지도 서비스에 본사 승인 없이 'SNPE'를 사업자명이나 지점명으로 등록하는 행위" },
      { head: '관계 오인 유도', body: '본사와 정식 계약 관계인 가맹점 또는 인증점으로 오인될 수 있는 문구 사용' },
    ],
  },
  {
    title: '오프라인 영업 시설(센터/스튜디오) 오용',
    items: [{ body: '공식 계약(가맹/라이선스) 체결 없이 간판, 외부 시트지, 인테리어 등에 SNPE 상표를 사용하는 행위' }],
  },
  {
    title: '상표 도용 상품(굿즈) 제작 및 판매',
    items: [{ body: 'SNPE 상표를 무단 각인·인쇄하여 제작한 운동 기구, 의류, 소품 등을 온·오프라인에서 제작·유통·판매하는 행위' }],
  },
  {
    title: '공식 채널 사칭',
    items: [{ body: "계정명 및 프로필에 'SNPE 공식', 'SNPE 본사', 'SNPE 인증', 'SNPE 전문센터' 등 본사 및 공식 제휴처로 오인하게 하여 회원을 모집하거나 광고 수익을 취하는 등의 행위" }],
  },
]

const usageRules = [
  { label: '허용', body: "본인의 프로필(이력서) 내 'SNPE 인증 강사' 명기" },
  { label: '조건부 허용', body: '문화센터, 관공서 등 공공기관에서 진행되는 수업은 공공 교육 활동으로 분류하여, 해당 기관 내 홍보물에 한해 상표 사용을 일부 승인합니다.' },
  { label: '불허', body: '본 가이드라인 제 2조 "금지 사항"에 포함된 일체의 행위' },
]

const sanctions = [
  { title: '시정 권고', body: '위반 사항에 대한 즉각적인 삭제 및 수정 요청 (경고장 발송)' },
  { title: '자격 제재', body: '가이드라인 반복 위반 시, 내부 규정에 따른 강사 자격 정지 또는 취소' },
  { title: '법적 조치', body: '민·형사상 손해배상 청구 및 상표법·부정경쟁방지법 위반에 따른 고소/고발' },
]

function SectionTitle({ no, children }) {
  return (
    <div className="flex items-baseline gap-3 mb-5 pb-3 border-b border-gray-200">
      <span className="text-sm text-gray-400 font-mono">{no}</span>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900">{children}</h3>
    </div>
  )
}

function BiContent() {
  return (
    <div className="space-y-20">
      {/* BI 소개 */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
          BI 소개
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
          기업 이미지에 있어 고유한 요소이므로 어떠한 경우라도
          <br className="hidden md:block" />
          변형되어서는 안되며 규정에 의하여 정확하게 사용되어야 합니다.
        </p>
        <div className="mt-6 w-16 h-0.5 bg-mint-darker mx-auto" />
      </div>

      {/* Logo */}
      <div>
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-6">Logo</h3>
        <p className="text-gray-600 leading-[1.9] mb-10 max-w-3xl">
          SNPE 대표 동작인 1번 동작을 형상화하여 그 중요성을 강조합니다.
          <br />
          SNPE 운동을 통하여 인간 본연의 자세로 회복을 지향합니다.
          <br />
          <br />
          척추 본연의 곡선인 S자를 떠올릴 수 있으며,
          <br />
          동시에 Self Natural Posture Exercise 의 &lsquo;
          <strong className="text-mint-darker">S</strong>elf&rsquo;를 강조하는 의미도 있습니다.
        </p>

        <img
          src="/images/logo-guide.jpg"
          alt="SNPE 로고 가이드"
          className="w-full object-contain"
        />
      </div>

      {/* Color System */}
      <div>
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">Color System</h3>
        <p className="text-gray-600 leading-relaxed mb-10">
          민트 컬러는 SNPE 바른자세운동을 통한 힐링과 심신의 안정을 의미합니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {colors.map((c) => (
            <div key={c.hex} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="h-36 md:h-44" style={{ backgroundColor: c.hex }} />
              <div className="bg-white p-5">
                <p className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-2">
                  {c.label}
                </p>
                <p className="text-xl font-bold text-gray-900 mb-3">{c.hex}</p>
                <div className="text-xs text-gray-500 space-y-1 font-mono">
                  <p>{c.rgb}</p>
                  <p>{c.cmyk}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function IpContent() {
  return (
    <>
      {/* 등록 상표 */}
      <div className="pb-16 md:pb-20 border-b border-gray-100 mb-16 md:mb-20">
        <div className="mb-10">
          <p className="text-xs text-gray-500 mb-2">특허청 등록 상표</p>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">SNPE 등록 상표</h2>
          <p className="mt-2 text-sm text-gray-500">
            SNPE 관련 상표는 대한민국 특허청에 정식 등록되어 법적 보호를 받고 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trademarks.map((tm) => (
            <div key={tm.no} className="border border-gray-200 rounded-md overflow-hidden">
              <div className="aspect-[4/3] bg-white flex items-center justify-center p-6 border-b border-gray-100">
                <img src={tm.image} alt={tm.label} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="p-4">
                <p className="text-[11px] text-gray-400 mb-1">등록 번호</p>
                <p className="text-sm text-gray-900 font-mono">{tm.no}</p>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">{tm.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 특허 및 지식재산권 144건 */}
      <div className="pb-16 md:pb-20 border-b border-gray-100 mb-16 md:mb-20">
        <div className="mb-10">
          <p className="text-xs text-gray-500 mb-2">Patents & Design Registration</p>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">특허 및 디자인 등록</h2>
          <p className="mt-2 text-sm text-gray-500">
            SNPE는 운동 방법, 도구 구조, 디자인 등 <strong className="text-gray-700">144건 이상</strong>의 지식재산권을 보유하고 있습니다.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {patentGroups.map((group) => (
            <div key={group.category} className="bg-gray-50 rounded-2xl p-6">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm">
                <FileCheck size={15} className="text-mint-darker flex-shrink-0" />
                {group.category}
              </h4>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-mint-darker flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 가이드라인 */}
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-xs text-gray-500 mb-2">Guidelines</p>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">SNPE 상표권 사용 가이드라인</h2>
          <p className="mt-2 text-sm text-gray-500">(주)큐링의 지식재산권 보호 정책 · 홈페이지 공지용</p>
        </div>

        <div className="mb-12">
          <SectionTitle no="01">목적</SectionTitle>
          <p className="text-[15px] text-gray-700 leading-7">
            본 가이드라인은 SNPE 브랜드 가치를 유지하고, 정식 인증을 받은 강사 및 파트너사의 권익을 보호하기 위해
            수립되었습니다. (주)큐링의 소중한 지식재산권인 상표권 보호를 위해 아래 사항을 반드시 준수하여 주시기 바랍니다.
          </p>
        </div>

        <div className="mb-12">
          <SectionTitle no="02">금지 사항 · 상표 무단 사용 행위</SectionTitle>
          <p className="text-[15px] text-gray-700 leading-7 mb-6">
            본사의 사전 서면 승인 없이 아래 행위를 하는 것은, 상표법 및 부정경쟁방지법에 의거하여 엄격히 금지되며 법적 책임을 물을 수 있습니다.
          </p>
          <ol className="space-y-6">
            {prohibitedGroups.map((group, gi) => (
              <li key={group.title}>
                <h4 className="text-[15px] font-semibold text-gray-900 mb-2">
                  {gi + 1}) {group.title}
                </h4>
                <ul className="space-y-1.5 pl-4 border-l border-gray-200">
                  {group.items.map((item, i) => (
                    <li key={i} className="text-[14px] text-gray-600 leading-7 pl-3">
                      {item.head && <span className="text-gray-900">{item.head} — </span>}
                      {item.body}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div className="mb-12">
          <SectionTitle no="03">정식 인증 강사의 상표 사용 허용 범위</SectionTitle>
          <p className="text-[15px] text-gray-700 leading-7 mb-6">
            SNPE 지도자 자격증은 '교육 및 지도 능력'을 인증하는 것이며, 별도의 계약 없이 '상표권에 대한 사용권'을 부여하는 것은 아닙니다.
          </p>
          <dl className="divide-y divide-gray-200 border-t border-gray-200">
            {usageRules.map((rule) => (
              <div key={rule.label} className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-6 py-4">
                <dt className="text-sm text-gray-500">{rule.label}</dt>
                <dd className="text-[14px] text-gray-700 leading-7">{rule.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mb-12">
          <SectionTitle no="04">위반 시 조치 및 제재</SectionTitle>
          <p className="text-[15px] text-gray-700 leading-7 mb-6">
            상표권 무단 사용 및 오용 사례 적발 시, (주)큐링은 브랜드 자산 보호를 위해 단계별 법적 절차를 진행합니다.
          </p>
          <ol className="divide-y divide-gray-200 border-t border-gray-200">
            {sanctions.map((s, i) => (
              <li key={s.title} className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-6 py-4">
                <div className="text-sm text-gray-500">
                  <span className="font-mono text-gray-400 mr-2">{i + 1}</span>
                  {s.title}
                </div>
                <p className="text-[14px] text-gray-700 leading-7">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="text-xs text-gray-400 pt-6 border-t border-gray-100">
          © (주)큐링 · SNPE 상표권 사용 가이드라인
        </p>
      </div>
    </>
  )
}

export default function BrandAssets() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') === 'ip' ? 'ip' : 'bi'
  const [activeTab, setActiveTab] = useState(initialTab)

  // URL ?tab= 와 동기화
  useEffect(() => {
    const next = searchParams.get('tab') === 'ip' ? 'ip' : 'bi'
    if (next !== activeTab) setActiveTab(next)
  }, [searchParams])

  const handleTabClick = (id) => {
    setActiveTab(id)
    if (id === 'bi') {
      searchParams.delete('tab')
    } else {
      searchParams.set('tab', id)
    }
    setSearchParams(searchParams, { replace: true })
  }

  return (
    <>
      <PageBanner
        title={t('pages.brandAssets')}
        subtitle={t('pages.brandAssetsSub')}
      />

      {/* 서브 탭 */}
      <section className="bg-white border-b border-gray-100 sticky top-16 lg:top-[120px] z-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1 -mb-px">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-2 px-5 md:px-7 py-4 text-sm md:text-base font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-mint-darker border-mint-darker'
                    : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 탭 콘텐츠 */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          {activeTab === 'bi' ? <BiContent /> : <IpContent />}
        </div>
      </section>
    </>
  )
}
