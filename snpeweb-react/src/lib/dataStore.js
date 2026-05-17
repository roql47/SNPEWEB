import { supabase } from './supabase'

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
    const { data } = await supabase.from('notices').insert([notice]).select().single()
    return data
  },
  updateNotice: async (id, updates) => {
    const { data } = await supabase.from('notices').update(updates).eq('id', id).select().single()
    return data
  },
  deleteNotice: async (id) => {
    await supabase.from('notices').delete().eq('id', id)
  },
  // 메인 홈 팝업 노출용: popup_active=true 이고 오늘이 노출 기간 내인 공지만 반환
  getActivePopupNotices: async () => {
    const today = new Date().toISOString().slice(0, 10)
    const { data } = await supabase
      .from('notices')
      .select('*')
      .eq('popup_active', true)
      .or(`popup_start_date.is.null,popup_start_date.lte.${today}`)
      .or(`popup_end_date.is.null,popup_end_date.gte.${today}`)
      .order('pinned', { ascending: false })
      .order('date', { ascending: false })
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
  getTeachers: async () => {
    const { data } = await supabase.from('teachers').select('*').order('name')
    return data || []
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

  // ── Bulk import (관리자 일괄 업로드용) ──────────────────────────────────
  bulkAddTeachers: async (rows) => {
    if (!rows || rows.length === 0) return { inserted: 0 }
    const { data, error } = await supabase.from('teachers').insert(rows).select()
    if (error) throw error
    return { inserted: data?.length || 0 }
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
