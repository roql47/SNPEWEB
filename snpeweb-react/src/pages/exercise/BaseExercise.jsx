import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import { Play } from 'lucide-react'

const exercises = [
  {
    num: '1번', title: '손 뒤로 깍지 끼고 의자 자세',
    desc: '바른자세벨트를 착용하고 양 손을 뒤로 깍지 끼고 의자 자세로 앉습니다. 척추 정렬과 목 디스크 예방에 효과적입니다.',
    tags: ['척추 정렬', '목 디스크', '허리 건강'],
    img: '/images/slice_icon_1.png',
    videoUrl: 'https://www.youtube.com/watch?v=example1',
  },
  {
    num: '2번', title: '무릎 꿇고 다리 묶어 뒤로 눕기',
    desc: '바른자세벨트로 다리를 묶고 무릎을 꿇은 상태에서 뒤로 눕습니다. 골반 교정과 횡격막 스트레칭에 효과적입니다.',
    tags: ['골반 교정', '횡격막', '체온 상승'],
    img: '/images/slice_icon_2.png',
    videoUrl: 'https://www.youtube.com/watch?v=example2',
  },
  {
    num: '3번', title: '엎드려 무릎 굽혀 다리 들기',
    desc: '엎드린 상태에서 무릎을 굽혀 다리를 들어올립니다. 오다리 교정과 힙업에 효과적입니다.',
    tags: ['오다리 교정', '무릎 건강', '힙업'],
    img: '/images/slice_icon_3.png',
    videoUrl: 'https://www.youtube.com/watch?v=example3',
  },
  {
    num: '4번', title: '척추 자극주며 구르기',
    desc: '바닥에 누워 무릎을 가슴으로 당기고 전후로 구릅니다. 척추 마사지와 혈액순환에 도움됩니다.',
    tags: ['척추 마사지', '혈액순환', '복근 강화'],
    img: '/images/img_c.png',
    videoUrl: 'https://www.youtube.com/watch?v=example4',
  },
  {
    num: 'C-MOVE', title: 'Cervical Movement',
    desc: '경추(목뼈) 부위의 움직임을 회복하는 동작입니다. 거북목과 목 통증 개선에 효과적입니다.',
    tags: ['경추', '거북목', '목 통증'],
    img: '/images/img_c.png',
    videoUrl: 'https://www.youtube.com/watch?v=cmove',
  },
  {
    num: 'L-MOVE', title: 'Lumbar Movement',
    desc: '요추(허리뼈) 부위의 정상적인 커브를 회복하는 동작입니다.',
    tags: ['요추 디스크', '일자허리', '허리 통증'],
    img: '/images/img_L.png',
    videoUrl: 'https://www.youtube.com/watch?v=lmove',
  },
  {
    num: 'T-MOVE', title: 'Thoracic Movement',
    desc: '흉추(등뼈) 부위의 움직임을 개선하는 동작입니다.',
    tags: ['어깨 통증', '척추측만증', '등 통증'],
    img: '/images/img_T.png',
    videoUrl: 'https://www.youtube.com/watch?v=tmove',
  },
  {
    num: 'SC-MOVE', title: 'Sacrum Coccygeal Movement',
    desc: '천골(엉치뼈)과 미추(꼬리뼈) 부위의 정렬을 바로잡는 동작입니다.',
    tags: ['골반', '미추', '하체 순환'],
    img: '/images/img_SC.png',
    videoUrl: 'https://www.youtube.com/watch?v=scmove',
  },
]

export default function BaseExercise() {
  const { t } = useTranslation()

  return (
    <>
      <PageBanner
        title={t('pages.baseExercise')}
        subtitle={t('pages.baseExerciseSub')}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">SNPE 기본동작 & 운동영상</h2>
            <a
              href="https://www.youtube.com/c/SNPElife"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-snpe-dark font-medium hover:underline"
            >
              YouTube 채널 →
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {exercises.map((ex, i) => (
              <a
                key={i}
                href={ex.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow group block"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-snpe-darker text-white text-xs font-bold">
                    {ex.num}
                  </span>
                  <div className="flex items-center gap-2">
                    <img src={ex.img} alt={ex.title} className="w-14 h-14 object-contain opacity-60" />
                    <div className="w-8 h-8 rounded-full bg-snpe-darker/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={14} fill="white" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{ex.title}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{ex.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {ex.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-snpe-dark/10 text-snpe-dark px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
