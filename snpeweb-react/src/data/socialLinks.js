// SNPE 공식 SNS / 외부 채널 — 단일 source of truth
// Footer.jsx 및 ResearchSlider 등에서 공통 참조 (TODO #7 통합)
//
// 운영자 변경 가이드:
//  - URL이 바뀌면 이 파일의 href만 1줄 수정 → 사이트 전역 일괄 반영
//  - 새 채널 추가 시 배열에 객체 1개 push
//  - 채널 노출 순서는 배열 순서대로 적용
import { Youtube, Instagram, BookOpen, MessageCircle, PenLine, ShoppingBag } from 'lucide-react'

export const socialLinks = [
  {
    key: 'youtube',
    label: '유튜브',
    title: 'YouTube',
    href: 'https://www.youtube.com/@SNPElife',
    icon: Youtube,
    bg: 'bg-[#ff3d00]',
    iconColor: 'text-white',
    badgeText: null,
    size: 'lg',
  },
  {
    key: 'instagram',
    label: '인스타그램',
    title: 'Instagram',
    href: 'https://www.instagram.com/snpe_korea/',
    icon: Instagram,
    bg: 'bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]',
    iconColor: 'text-white',
    badgeText: null,
  },
  {
    key: 'naver-cafe',
    label: '네이버카페',
    title: 'Naver Cafe',
    href: 'https://cafe.naver.com/snpe/',
    icon: null,
    bg: 'bg-[#03c75a]',
    iconColor: 'text-white',
    badgeText: 'N',
    badgeClass: 'font-bold text-base',
  },
  {
    key: 'blog',
    label: '블로그',
    title: 'Naver Blog',
    href: 'https://blog.naver.com/snpekorea',
    icon: PenLine,
    bg: 'bg-[#03c75a]',
    iconColor: 'text-white',
    badgeText: 'blog',
    badgeClass: 'font-bold text-xs',
  },
  {
    key: 'kakao',
    label: '카카오채널',
    title: 'Kakao Channel',
    href: 'http://pf.kakao.com/_Tqyxib',
    icon: MessageCircle,
    bg: 'bg-[#fee500]',
    iconColor: 'text-[#3c1e1e]',
    iconFill: '#3c1e1e',
    badgeText: null,
  },
  {
    key: 'ebook',
    label: '교보문고',
    title: 'E-Book',
    // 교보문고 SNPE 검색 결과 페이지 — 메인 페이지(`kyobobook.co.kr`)는 SNPE 책을 찾기 어려우므로
    // 검색어 keyword=SNPE로 직접 연결. 운영팀이 대표 도서 상세 URL을 확정하면 그 URL로 1줄 교체.
    href: 'https://search.kyobobook.co.kr/search?keyword=SNPE',
    icon: BookOpen,
    bg: 'bg-[#1f8e3d]',
    iconColor: 'text-white',
    badgeText: null,
  },
  {
    key: 'shop',
    label: 'SNPE SHOP',
    title: 'SNPE SHOP',
    href: 'https://www.snpeshop.com/',
    icon: ShoppingBag,
    bg: 'bg-[#111]',
    iconColor: 'text-white',
    badgeText: null,
  },
]
