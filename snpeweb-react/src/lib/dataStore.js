import { supabase } from './supabase'

// field mapping helpers
const mapActivity = (row) => row ? { ...row, desc: row.description } : null
const mapResearch = (row) => row ? { ...row, desc: row.description } : null
const toActivityRow = (obj) => { const { desc, ...rest } = obj; return { ...rest, description: desc ?? '' } }
const toResearchRow = (obj) => { const { desc, ...rest } = obj; return { ...rest, description: desc ?? '' } }

export const dataStore = {
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
    ])
  },
}
