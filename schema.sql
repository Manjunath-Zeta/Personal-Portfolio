-- Create the users table (Supabase manages the auth.users, but we might want a profile extension)
create table public.profile_info (
  id uuid references auth.users not null primary key,
  full_name text not null,
  headline text,
  bio text,
  email text,
  github_url text,
  linkedin_url text,
  twitter_url text,
  resume_url text,
  profile_image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security
alter table public.profile_info enable row level security;
create policy "Allow public read access" on public.profile_info for select using (true);
create policy "Allow auth update access" on public.profile_info for update using (auth.uid() = id);

-- Experience Table
create table public.experience (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  company text not null,
  role text not null,
  location text,
  start_date date not null,
  end_date date,
  current boolean default false,
  description text,
  achievements text[],
  company_logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.experience enable row level security;
create policy "Allow public read access" on public.experience for select using (true);
create policy "Allow all actions for authenticated users" on public.experience for all using (auth.uid() = user_id);

-- Skills Table
create table public.skills (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  category text not null, -- 'Frontend', 'Backend', 'Tools' etc.
  proficiency integer check (proficiency > 0 and proficiency <= 100),
  icon_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.skills enable row level security;
create policy "Allow public read access" on public.skills for select using (true);
create policy "Allow all actions for authenticated users" on public.skills for all using (auth.uid() = user_id);

-- Projects Table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  short_description text not null,
  full_description text,
  image_url text,
  github_url text,
  live_url text,
  technologies text[] not null,
  featured boolean default false,
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.projects enable row level security;
create policy "Allow public read access" on public.projects for select using (true);
create policy "Allow all actions for authenticated users" on public.projects for all using (auth.uid() = user_id);

-- Certifications Table
create table public.certifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  issuer text not null,
  issue_date date not null,
  url text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.certifications enable row level security;
create policy "Allow public read access" on public.certifications for select using (true);
create policy "Allow all actions for authenticated users" on public.certifications for all using (auth.uid() = user_id);

-- Achievements Table
create table public.achievements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  description text not null,
  date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.achievements enable row level security;
create policy "Allow public read access" on public.achievements for select using (true);
create policy "Allow all actions for authenticated users" on public.achievements for all using (auth.uid() = user_id);

-- Storage bucket for images
insert into storage.buckets (id, name, public) values ('portfolio-images', 'portfolio-images', true) ON CONFLICT DO NOTHING;

create policy "Images are publicly accessible." on storage.objects for select using (bucket_id = 'portfolio-images');
create policy "Anyone can upload images." on storage.objects for insert with check (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');
create policy "Anyone can update images." on storage.objects for update using (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');
create policy "Anyone can delete images." on storage.objects for delete using (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

-- Generic triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profile_info_updated_at BEFORE UPDATE ON public.profile_info FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON public.experience FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON public.certifications FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON public.achievements FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
