import { supabase } from './supabase'

// 로컬(브라우저/한국) 기준 YYYY-MM-DD 문자열 — toISOString()의 UTC 변환으로 인한 날짜 밀림 방지
const localDateString = (d = new Date()) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// PostgREST 기본 1,000행 조회 제한을 우회하여 전체 행을 페이지네이션으로 가져옴
const fetchAll = async (table, { order } = {}) => {
  const PAGE = 1000
  let from = 0
  let all = []
  for (;;) {
    let query = supabase.from(table).select('*')
    if (order) query = query.order(order.column, { ascending: order.ascending ?? true })
    const { data, error } = await query.range(from, from + PAGE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all = all.concat(data)
    if (data.length < PAGE) break
    from += PAGE
  }
  return all
}

// field mapping helpers
const mapActivity = (row) => row ? { ...row, desc: row.description } : null
const mapResearch = (row) => row ? { ...row, desc: row.description } : null
const toActivityRow = (obj) => { const { desc, ...rest } = obj; return { ...rest, description: desc ?? '' } }
const toResearchRow = (obj) => { const { desc, ...rest } = obj; return { ...rest, description: desc ?? '' } }

export const dataStore = {
  // ── Storage (이미지 업로드) ──────────────────────────────────────────────
  // 사용 전 Supabase Storage에 'page-images' 버킷 생성 + public 정책 필요
  uploadImage: async (file, folder = 'degree') => {
    const ext = file.name.split('.').pop()
    const filename = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`
    const { error } = await supabase.storage
      .from('page-images')
      .upload(filename, file, { upsert: false, cacheControl: '3600' })
    if (error) throw error
    const { data } = supabase.storage.from('page-images').getPublicUrl(filename)
    return data.publicUrl
  },

  // ── Page Contents (페이지별 JSONB CMS) ──────────────────────────────────
  getPageContent: async (slug) => {
    const { data } = await supabase
      .from('page_contents')
      .select('content')
      .eq('slug', slug)
      .maybeSingle()
    return data?.content || null
  },
  updatePageContent: async (slug, content) => {
    const { data } = await supabase
      .from('page_contents')
      .upsert(
        { slug, content, updated_at: new Date().toISOString() },
        { onConflict: 'slug' }
      )
      .select()
      .single()
    return data
  },

  // ── Branches (메인 홈 직영점) ─────────────────────────────────────────────
  getBranches: async () => {
    const { data } = await supabase.from('branches').select('*').order('sort_order').order('created_at')
    return data || []
  },
  addBranch: async (branch) => {
    const { data } = await supabase.from('branches').insert([branch]).select().single()
    return data
  },
  updateBranch: async (id, updates) => {
    const { data } = await supabase.from('branches').update(updates).eq('id', id).select().single()
    return data
  },
  deleteBranch: async (id) => {
    await supabase.from('branches').delete().eq('id', id)
  },

  // ── Centers ─────────────────────────────────────────────────────────────
  getCenters: async () => {
    const { data } = await supabase.from('centers').select('*').order('name')
    return data || []
  },
  getCenter: async (id) => {
    const { data } = await supabase.from('centers').select('*').eq('id', id).single()
    return data
  },
  addCenter: async (center) => {
    const { data } = await supabase.from('centers').insert([center]).select().single()
    return data
  },
  updateCenter: async (id, updates) => {
    const { data } = await supabase.from('centers').update(updates).eq('id', id).select().single()
    return data
  },
  deleteCenter: async (id) => {
    await supabase.from('centers').delete().eq('id', id)
  },

  // ── Studios ──────────────────────────────────────────────────────────────
  getStudios: async () => {
    const { data } = await supabase.from('studios').select('*').order('name')
    return data || []
  },
  addStudio: async (studio) => {
    const { data } = await supabase.from('studios').insert([studio]).select().single()
    return data
  },
  updateStudio: async (id, updates) => {
    const { data } = await supabase.from('studios').update(updates).eq('id', id).select().single()
    return data
  },
  deleteStudio: async (id) => {
    await supabase.from('studios').delete().eq('id', id)
  },

  // ── Notices ──────────────────────────────────────────────────────────────
  getNotices: async () => {
    const { data } = await supabase
      .from('notices')
      .select('*')
      .order('pinned', { ascending: false })
      .order('date', { ascending: false })
    return data || []
  },
  addNotice: async (notice) => {
    const { data, error } = await supabase.from('notices').insert([notice]).select().single()
    if (error) throw error
    return data
  },
  updateNotice: async (id, updates) => {
    const { data, error } = await supabase.from('notices').update(updates).eq('id', id).select().single()
    if (error) throw error
    return data
  },
  deleteNotice: async (id) => {
    const { error } = await supabase.from('notices').delete().eq('id', id)
    if (error) throw error
  },
  // 메인 홈 팝업 노출용: popup_active=true 이고 오늘이 노출 기간 내인 공지만 반환
  getActivePopupNotices: async () => {
    // 한국(로컬) 기준 오늘 날짜 — UTC 변환 시 자정 전후 off-by-one 방지
    const today = localDateString()
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .eq('popup_active', true)
      .or(`popup_start_date.is.null,popup_start_date.lte.${today}`)
      .or(`popup_end_date.is.null,popup_end_date.gte.${today}`)
      .order('pinned', { ascending: false })
      .order('date', { ascending: false })
    if (error) throw error
    return data || []
  },

  // ── News ─────────────────────────────────────────────────────────────────
  getNews: async () => {
    const { data } = await supabase.from('news').select('*').order('date', { ascending: false })
    return data || []
  },
  addNews: async (news) => {
    const { data } = await supabase.from('news').insert([news]).select().single()
    return data
  },
  updateNews: async (id, updates) => {
    const { data } = await supabase.from('news').update(updates).eq('id', id).select().single()
    return data
  },
  deleteNews: async (id) => {
    await supabase.from('news').delete().eq('id', id)
  },

  // ── Activities ───────────────────────────────────────────────────────────
  getActivities: async () => {
    const { data } = await supabase.from('activities').select('*').order('date', { ascending: false })
    return (data || []).map(mapActivity)
  },
  addActivity: async (activity) => {
    const { data } = await supabase.from('activities').insert([toActivityRow(activity)]).select().single()
    return mapActivity(data)
  },
  updateActivity: async (id, updates) => {
    const { data } = await supabase.from('activities').update(toActivityRow(updates)).eq('id', id).select().single()
    return mapActivity(data)
  },
  deleteActivity: async (id) => {
    await supabase.from('activities').delete().eq('id', id)
  },

  // ── Teachers ─────────────────────────────────────────────────────────────
  // PostgREST 기본 1,000행 제한을 우회하여 전체 강사 목록을 반환
  getTeachers: async () => {
    return fetchAll('teachers', { order: { column: 'name', ascending: true } })
  },
  getFeaturedTeachers: async () => {
    const { data } = await supabase.from('teachers').select('*').eq('featured', true).order('name')
    return data || []
  },
  addTeacher: async (teacher) => {
    const { data } = await supabase.from('teachers').insert([teacher]).select().single()
    return data
  },
  updateTeacher: async (id, updates) => {
    const { data } = await supabase.from('teachers').update(updates).eq('id', id).select().single()
    return data
  },
  deleteTeacher: async (id) => {
    await supabase.from('teachers').delete().eq('id', id)
  },

  // ── Experience Cases ─────────────────────────────────────────────────────
  getExperienceCases: async () => {
    const { data } = await supabase.from('experience_cases').select('*').order('created_at')
    return data || []
  },
  addExperienceCase: async (item) => {
    const { data } = await supabase.from('experience_cases').insert([item]).select().single()
    return data
  },
  updateExperienceCase: async (id, updates) => {
    const { data } = await supabase.from('experience_cases').update(updates).eq('id', id).select().single()
    return data
  },
  deleteExperienceCase: async (id) => {
    await supabase.from('experience_cases').delete().eq('id', id)
  },

  // ── Research Papers ──────────────────────────────────────────────────────
  getResearchPapers: async () => {
    const { data } = await supabase.from('research_papers').select('*').order('year', { ascending: false })
    return (data || []).map(mapResearch)
  },
  addResearchPaper: async (paper) => {
    const { data } = await supabase.from('research_papers').insert([toResearchRow(paper)]).select().single()
    return mapResearch(data)
  },
  updateResearchPaper: async (id, updates) => {
    const { data } = await supabase.from('research_papers').update(toResearchRow(updates)).eq('id', id).select().single()
    return mapResearch(data)
  },
  deleteResearchPaper: async (id) => {
    await supabase.from('research_papers').delete().eq('id', id)
  },

  // ── FAQs ────────────────────────────────────────────────────────────────
  getFaqs: async () => {
    const { data } = await supabase.from('faqs').select('*').order('sort_order').order('created_at')
    return data || []
  },
  addFaq: async (faq) => {
    const { data } = await supabase.from('faqs').insert([faq]).select().single()
    return data
  },
  updateFaq: async (id, updates) => {
    const { data } = await supabase.from('faqs').update(updates).eq('id', id).select().single()
    return data
  },
  deleteFaq: async (id) => {
    await supabase.from('faqs').delete().eq('id', id)
  },

  // ── Educations (교육과정 일정) ───────────────────────────────────────────
  getEducations: async (category) => {
    let query = supabase.from('educations').select('*').order('start_date', { ascending: false })
    if (category) query = query.eq('category', category)
    const { data } = await query
    return data || []
  },
  addEducation: async (item) => {
    const { data } = await supabase.from('educations').insert([item]).select().single()
    return data
  },
  updateEducation: async (id, updates) => {
    const { data } = await supabase.from('educations').update(updates).eq('id', id).select().single()
    return data
  },
  deleteEducation: async (id) => {
    await supabase.from('educations').delete().eq('id', id)
  },

  // ── Inquiries (기업특강 신청) ────────────────────────────────────────────
  getInquiries: async () => {
    const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    return data || []
  },
  addInquiry: async (item) => {
    const { data, error } = await supabase.from('inquiries').insert([item]).select().single()
    if (error) throw error
    return data
  },
  updateInquiry: async (id, updates) => {
    const { data, error } = await supabase.from('inquiries').update(updates).eq('id', id).select().single()
    if (error) throw error
    return data
  },
  deleteInquiry: async (id) => {
    await supabase.from('inquiries').delete().eq('id', id)
  },

  // ── Franchise Inquiries (가맹점·인증점 개설 문의) ───────────────────────
  getFranchiseInquiries: async () => {
    const { data } = await supabase.from('franchise_inquiries').select('*').order('created_at', { ascending: false })
    return data || []
  },
  addFranchiseInquiry: async (item) => {
    const { data, error } = await supabase.from('franchise_inquiries').insert([item]).select().single()
    if (error) throw error
    return data
  },
  updateFranchiseInquiry: async (id, updates) => {
    const { data, error } = await supabase.from('franchise_inquiries').update(updates).eq('id', id).select().single()
    if (error) throw error
    return data
  },
  deleteFranchiseInquiry: async (id) => {
    await supabase.from('franchise_inquiries').delete().eq('id', id)
  },

  // ── Bulk import / delete (관리자 일괄 업로드용) ──────────────────────────
  bulkAddTeachers: async (rows) => {
    if (!rows || rows.length === 0) return { inserted: 0, deleted: 0, notFound: 0 }

    const toDelete = rows.filter((r) => r._delete)
    const toInsert = rows.filter((r) => !r._delete).map(({ _delete, ...rest }) => rest)

    let deleted = 0
    let notFound = 0
    let inserted = 0

    const norm = (v) => String(v ?? '').replace(/[\s-]/g, '').trim()

    // 삭제 처리: 이름으로 매칭 (동명이인일 경우 전화번호·생년월일로 구분)
    if (toDelete.length > 0) {
      // 1,000행 제한 없이 전체 강사 로드 (페이지네이션)
      const PAGE = 1000
      let from = 0
      let list = []
      for (;;) {
        const { data, error } = await supabase
          .from('teachers')
          .select('id, name, phone, birth_date')
          .order('name')
          .range(from, from + PAGE - 1)
        if (error) throw error
        if (!data || data.length === 0) break
        list = list.concat(data)
        if (data.length < PAGE) break
        from += PAGE
      }

      // 동일 대상을 중복 삭제하지 않도록 이미 처리한 id 추적
      const usedIds = new Set()
      const idsToDelete = []
      for (const row of toDelete) {
        const matches = list.filter((e) => e.name === row.name && !usedIds.has(e.id))
        let target = null
        if (matches.length === 1) {
          target = matches[0]
        } else if (matches.length > 1) {
          // 동명이인: 전화번호 → 생년월일 순으로 정규화 비교
          target =
            (row.phone && matches.find((e) => norm(e.phone) === norm(row.phone))) ||
            (row.birth_date && matches.find((e) => norm(e.birth_date) === norm(row.birth_date))) ||
            matches[0]
        }
        if (target) {
          usedIds.add(target.id)
          idsToDelete.push(target.id)
        } else {
          notFound++
        }
      }

      // id 목록을 묶어서 일괄 삭제 (개별 호출 대신 in 필터)
      if (idsToDelete.length > 0) {
        const DEL_CHUNK = 200
        for (let i = 0; i < idsToDelete.length; i += DEL_CHUNK) {
          const chunk = idsToDelete.slice(i, i + DEL_CHUNK)
          const { error } = await supabase.from('teachers').delete().in('id', chunk)
          if (error) throw error
          deleted += chunk.length
        }
      }
    }

    // 추가 처리: 행 수가 많을 수 있으므로 청크 단위 insert
    if (toInsert.length > 0) {
      const INS_CHUNK = 500
      for (let i = 0; i < toInsert.length; i += INS_CHUNK) {
        const chunk = toInsert.slice(i, i + INS_CHUNK)
        const { data, error } = await supabase.from('teachers').insert(chunk).select('id')
        if (error) throw error
        inserted += data?.length || 0
      }
    }

    return { inserted, deleted, notFound }
  },

  // ── Reset (admin dashboard) ───────────────────────────────────────────────
  resetAll: async () => {
    await Promise.all([
      supabase.from('centers').delete().neq('id', ''),
      supabase.from('studios').delete().neq('id', ''),
      supabase.from('notices').delete().neq('id', ''),
      supabase.from('news').delete().neq('id', ''),
      supabase.from('activities').delete().neq('id', ''),
      supabase.from('teachers').delete().neq('id', ''),
      supabase.from('experience_cases').delete().neq('id', ''),
      supabase.from('research_papers').delete().neq('id', ''),
      supabase.from('faqs').delete().neq('id', ''),
      supabase.from('educations').delete().neq('id', ''),
    ])
  },
}
