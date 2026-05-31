export const mainNav = [
  {
    titleKey: 'nav.about',
    path: '/about',
    children: [
      { titleKey: 'subnav.aboutSnpe', path: '/about' },
      { titleKey: 'subnav.philosophy', path: '/philosophy' },
      { titleKey: 'subnav.evolution', path: '/history' },
      { titleKey: 'subnav.research', path: '/research' },
      { titleKey: 'subnav.brandAssets', path: '/brand-assets' },
    ],
  },
  {
    titleKey: 'nav.exercise',
    path: '/beginnerguide',
    children: [
      { titleKey: 'subnav.beginnerGuide', path: '/beginnerguide' },
      { titleKey: 'subnav.programs', path: '/programs' },
      { titleKey: 'subnav.assessment', path: '/assessment' },
      { titleKey: 'subnav.snpeApp', path: '/snpeapp' },
      { titleKey: 'subnav.baseExercise', path: '/baseexercise' },
      { titleKey: 'subnav.experienceCase', path: '/experiencecase' },
    ],
  },
  {
    titleKey: 'nav.education',
    path: '/degree',
    children: [
      { titleKey: 'subnav.degree', path: '/degree' },
      { titleKey: 'subnav.level1', path: '/level1' },
      { titleKey: 'subnav.level2', path: '/level2' },
      { titleKey: 'subnav.level3', path: '/level3' },
      { titleKey: 'subnav.master', path: '/master' },
    ],
  },
  {
    titleKey: 'nav.news',
    path: '/notice',
    children: [
      { titleKey: 'subnav.notice', path: '/notice' },
      // 언론보도는 활동소식(/activity) 내부 탭으로 통합되어 헤더 메뉴에서는 제거
      { titleKey: 'subnav.activity', path: '/activity' },
    ],
  },
  {
    titleKey: 'nav.support',
    path: '/search-center',
    children: [
      { titleKey: 'subnav.searchCenter', path: '/search-center' },
      { titleKey: 'subnav.studio', path: '/studio' },
      { titleKey: 'subnav.certTeacher', path: '/certification-teacher' },
      { titleKey: 'subnav.franchise', path: '/franchise' },
      { titleKey: 'subnav.faq', path: '/faq' },
      { titleKey: 'subnav.corporate', path: '/customerinquiry' },
    ],
  },
]
