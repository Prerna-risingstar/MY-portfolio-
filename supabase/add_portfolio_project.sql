-- Insert the Portfolio CMS project into the 'projects' table
INSERT INTO projects (
  title,
  description,
  tech_stack,
  image_url,
  github_url,
  live_url,
  category,
  featured,
  sort_order
) VALUES (
  'Dynamic Portfolio CMS',
  'A full-stack, dynamic portfolio content management system built with Next.js, React, Tailwind CSS, and Supabase. Features a complete admin dashboard for managing profile details, skills, experiences, projects, and certifications in real-time.',
  ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  'https://via.placeholder.com/800x600.png?text=Portfolio+Screenshot', -- Replace with your actual screenshot URL
  'https://github.com/Prerna-risingstar/MY-portfolio-',
  'https://your-live-demo-url.vercel.app', -- Replace with your actual live demo URL
  'Web',
  true,
  1
);
