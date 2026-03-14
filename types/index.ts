export type ProfileInfo = {
  id: string
  full_name: string
  headline: string | null
  bio: string | null
  email: string | null
  github_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  resume_url: string | null
  profile_image_url: string | null
  created_at: string
  updated_at: string
}

export type Experience = {
  id: string
  user_id: string
  company: string
  role: string
  location: string | null
  start_date: string
  end_date: string | null
  current: boolean
  description: string | null
  achievements: string[] | null
  created_at: string
  updated_at: string
}

export type Skill = {
  id: string
  user_id: string
  name: string
  category: string
  proficiency: number | null
  icon_url: string | null
  created_at: string
  updated_at: string
}

export type Project = {
  id: string
  user_id: string
  title: string
  short_description: string
  full_description: string | null
  image_url: string | null
  github_url: string | null
  live_url: string | null
  technologies: string[]
  featured: boolean
  order: number
  created_at: string
  updated_at: string
}

export type Certification = {
  id: string
  user_id: string
  name: string
  issuer: string
  issue_date: string
  url: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export type Achievement = {
  id: string
  user_id: string
  title: string
  description: string
  date: string | null
  created_at: string
  updated_at: string
}
