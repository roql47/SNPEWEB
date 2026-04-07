import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Award, Users, Zap, BookOpen } from 'lucide-react'

const features = [
  { title: '전문 강사진 직강', desc: '차의과학대, 국민대 출신 석·박사급 전문 강사진이 직접 교육합니다.', icon: Award },
  { title: '기능해부학·신경해부학', desc: '기능해부학, 인체해부학, 신경해부학 등 심화 이론을 학습합니다.', icon: BookOpen },
  { title: '고급 티칭 스킬', desc: '다양한 케이스에 맞는 맞춤형 지도 역량을 체계적으로 심화합니다.', icon: Users },
  { title: '실전 워크숍', desc: '강사 전용 클래스와 실전 워크숍을 통해 현장 적용 능력을 강화합니다.', icon: Zap },
]

const instructors = [
  { name: '홍정기', title: '차의과학대 스포츠의학원장' },
  { name: '이재훈', title: '차의과학대 박사' },
  { name: '문나람', title: '차의과학대 박사' },
  { name: '이섬결', title: '차의과학대 박사' },
  { name: '정대영', title: '국민대 석사' },
  { name: '김세영', title: '국민대 석사' },
  { name: '김희주', title: '국민대 석사' },
  { name: '박서은', title: '국민대 석사' },
  { name: '최언미', title: 'PIC대학 교육학 박사' },
  { name: '신연화', title: '차의과학대 박사 / 국민대 석사' },
]

const curriculum = [
  '기능해부학',
  '인체해부학',
  '기초영양학',
  '신경해부학',
  'SNPE 기본동작 8가지 심화',
  '지도사 과정 심화',
  '강사전용 클래스',
]

export default function Master() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.master')}
        subtitle={t('pages.masterSub')}
        breadcrumb={[{ label: t('nav.education'), path: '/degree' }, { label: t('pages.master') }]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 space-y-20">

          <div className="text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-snpe-dark/10 text-snpe-dark text-xs font-bold mb-4">MASTER</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">SNPE 마스터 과정</h2>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
              LEVEL 3 이수 후 더 깊은 전문성을 쌓고자 하는 지도자를 위한 최고 심화 과정입니다.
              <br />
              차의과학대·국민대 출신 석·박사급 전문 강사진이 직접 교육하며, 기능해부학부터 실전 워크숍까지 아우릅니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-snpe-dark/10 text-snpe-dark flex items-center justify-center flex-shrink-0">
                  <f.icon size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{f.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">커리큘럼</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {curriculum.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                  <span className="w-8 h-8 rounded-full bg-snpe-darker text-white text-sm flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-gray-800 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">전문 강사진</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {instructors.map((inst) => (
                <div key={inst.name} className="bg-white border border-gray-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-full bg-snpe-dark/10 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-snpe-dark font-bold text-lg">{inst.name[0]}</span>
                  </div>
                  <p className="font-bold text-gray-900 text-sm">{inst.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{inst.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-snpe-dark/10 rounded-2xl p-6 md:p-8 text-center">
            <h4 className="font-bold text-gray-900 mb-2">참여 조건</h4>
            <p className="text-gray-600 text-sm">LEVEL 3 전문가 과정 이수자만 참여 가능합니다.</p>
            <p className="text-gray-500 text-xs mt-2">문의 : snpeedu@mycuring.com</p>
          </div>

        </div>
      </section>
    </>
  )
}
