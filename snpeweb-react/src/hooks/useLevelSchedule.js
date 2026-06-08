import { useEffect, useState } from 'react'
import { dataStore } from '../lib/dataStore'

// 모집 상태 우선순위: 모집 중 > 마감 임박 > 마감 > 종료
const STATUS_PRIORITY = { open: 0, closing: 1, closed: 2, done: 3 }

/**
 * 특정 카테고리(level1/level2/level3)의 교육 일정 1건을 불러온다.
 * 모집 중 → 마감 임박 → … 순, 동일 상태면 시작일이 최신인 건을 우선한다.
 * 어드민 "교육과정 일정 관리"에서 입력한 값을 LEVEL 페이지 교육일정 박스에 반영하기 위한 훅.
 * 데이터가 없으면 null 을 반환하므로, 호출부에서 하드코딩 기본값으로 fallback 한다.
 */
export default function useLevelSchedule(category) {
  const [edu, setEdu] = useState(null)

  useEffect(() => {
    let active = true
    dataStore
      .getEducations(category)
      .then((rows) => {
        if (!active || !rows || rows.length === 0) return
        const sorted = [...rows].sort((a, b) => {
          const pa = STATUS_PRIORITY[a.status] ?? 9
          const pb = STATUS_PRIORITY[b.status] ?? 9
          if (pa !== pb) return pa - pb
          return (b.start_date || '').localeCompare(a.start_date || '')
        })
        setEdu(sorted[0])
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [category])

  return edu
}

/**
 * 하드코딩 기본 일정(items: [{ label, value, ... }])에 교육 일정(edu) 값을 덮어쓴다.
 * labelMap: { '개강': 'schedule_open', ... } 형태로 label ↔ edu 필드를 매핑.
 * edu 의 해당 필드가 비어있으면 기존 value 를 유지한다.
 */
export function mergeSchedule(items, edu, labelMap) {
  if (!edu) return items
  return items.map((item) => {
    const field = labelMap[item.label]
    const value = field ? edu[field] : null
    return value ? { ...item, value } : item
  })
}
