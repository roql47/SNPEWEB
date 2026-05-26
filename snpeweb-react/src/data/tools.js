// SNPE 도구 데이터
//
// 이미지 파일은 PPTX(`SNPE 도구 설명.pptx`)에서 추출된 image1.png ~ image13.png 입니다.
// `scripts/extract-tools-images.ps1` 스크립트로 추출하여 public/images/tools/ 에 저장됩니다.
//
// 이미지 ↔ 도구 매핑 (PPTX 슬라이드 좌표 분석 기반):
//   기본도구 4개는 좌표 매칭으로 확정.
//   추천도구는 위치 추정값이며, 실제 페이지에서 확인 후 필요 시 img 경로만 교체해 주세요.

export const toolGroups = [
  {
    id: 'basic',
    titleKey: 'pages.tools.basic.title',
    subKey: 'pages.tools.basic.sub',
  },
  {
    id: 'recommend',
    titleKey: 'pages.tools.recommend.title',
    subKey: 'pages.tools.recommend.sub',
  },
]

export const tools = [
  // === SNPE 기본도구 (4종) — 좌표 매칭 확정 ===
  {
    slug: 'belt',
    group: 'basic',
    nameKey: 'pages.tools.items.belt.name',
    descKey: 'pages.tools.items.belt.desc',
    img: '/images/tools/image1.png',
  },
  {
    slug: 'pelvic-band',
    group: 'basic',
    nameKey: 'pages.tools.items.pelvicBand.name',
    descKey: 'pages.tools.items.pelvicBand.desc',
    img: '/images/tools/image2.png',
  },
  {
    slug: 'wave-pillow',
    group: 'basic',
    nameKey: 'pages.tools.items.wavePillow.name',
    descKey: 'pages.tools.items.wavePillow.desc',
    img: '/images/tools/image3.png',
  },
  {
    slug: 'danason',
    group: 'basic',
    nameKey: 'pages.tools.items.danason.name',
    descKey: 'pages.tools.items.danason.desc',
    img: '/images/tools/image4.png',
  },

  // === SNPE 추천도구 (7종) — 시각 확인 후 매핑 조정 권장 ===
  {
    slug: 'oval-ceramic',
    group: 'recommend',
    nameKey: 'pages.tools.items.ovalCeramic.name',
    descKey: 'pages.tools.items.ovalCeramic.desc',
    img: '/images/tools/image5.png',
  },
  {
    slug: 'two-rail',
    group: 'recommend',
    nameKey: 'pages.tools.items.twoRail.name',
    descKey: 'pages.tools.items.twoRail.desc',
    img: '/images/tools/image6.png',
  },
  {
    slug: 'dokkaebi',
    group: 'recommend',
    nameKey: 'pages.tools.items.dokkaebi.name',
    descKey: 'pages.tools.items.dokkaebi.desc',
    img: '/images/tools/image7.png',
  },
  {
    slug: 'wave-roller',
    group: 'recommend',
    nameKey: 'pages.tools.items.waveRoller.name',
    descKey: 'pages.tools.items.waveRoller.desc',
    img: '/images/tools/image8.png',
  },
  {
    slug: 'wave-stick',
    group: 'recommend',
    nameKey: 'pages.tools.items.waveStick.name',
    descKey: 'pages.tools.items.waveStick.desc',
    img: '/images/tools/image9.png',
  },
  {
    slug: 'eight-cells',
    group: 'recommend',
    nameKey: 'pages.tools.items.eightCells.name',
    descKey: 'pages.tools.items.eightCells.desc',
    img: '/images/tools/image10.png',
  },
  {
    slug: 'double-foam-roller',
    group: 'recommend',
    nameKey: 'pages.tools.items.doubleFoamRoller.name',
    descKey: 'pages.tools.items.doubleFoamRoller.desc',
    img: '/images/tools/image11.png',
  },
]

export function getToolsByGroup(groupId) {
  return tools.filter((tool) => tool.group === groupId)
}
