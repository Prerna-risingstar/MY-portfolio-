'use client'

import { motion } from 'framer-motion'
import { Code2, LayoutTemplate, Database, LineChart, Wrench } from 'lucide-react'
import { FaPython, FaJs, FaPhp, FaDatabase, FaHtml5, FaCss3Alt, FaMicrochip, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma, FaChartBar, FaChartLine, FaChartPie, FaChartArea, FaCode } from 'react-icons/fa'
import { SiTypescript, SiCplusplus, SiNextdotjs, SiFlask, SiMysql, SiMongodb, SiPandas, SiNumpy, SiJupyter, SiVercel } from 'react-icons/si'

interface SkillsSectionProps {
  skills?: any
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: <Code2 className="w-5 h-5" />,
    gradient: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
    skills: [
      { name: 'JavaScript', icon: <FaJs size={32} color="#F7DF1E" />, level: 'Advanced' },
      { name: 'Python', icon: <FaPython size={32} color="#3776AB" />, level: 'Advanced' },
      { name: 'TypeScript', icon: <SiTypescript size={32} color="#3178C6" />, level: 'Intermediate' },
      { name: 'C++', icon: <SiCplusplus size={32} color="#00599C" />, level: 'Intermediate' },
      { name: 'PHP', icon: <FaPhp size={32} color="#777BB4" />, level: 'Intermediate' },
      { name: 'SQL', icon: <FaDatabase size={32} color="#336791" />, level: 'Advanced' },
      { name: 'HTML5', icon: <FaHtml5 size={32} color="#E34F26" />, level: 'Advanced' },
      { name: 'CSS3', icon: <FaCss3Alt size={32} color="#1572B6" />, level: 'Advanced' },
      { name: 'x86 Assembly', icon: <FaMicrochip size={32} color="#A8B9CC" />, level: 'Basic' },
    ]
  },
  {
    title: 'Frameworks & Libraries',
    icon: <LayoutTemplate className="w-5 h-5" />,
    gradient: 'linear-gradient(90deg, #3b82f6, #6366f1)',
    skills: [
      { name: 'React.js', icon: <FaReact size={32} color="#61DAFB" />, level: 'Advanced' },
      { name: 'Next.js', icon: <SiNextdotjs size={32} color="#ffffff" />, level: 'Intermediate' },
      { name: 'Node.js/Express', icon: <FaNodeJs size={32} color="#339933" />, level: 'Intermediate' },
      { name: 'Flask', icon: <SiFlask size={32} color="#ffffff" />, level: 'Intermediate' },
    ]
  },
  {
    title: 'Databases & Tools',
    icon: <Database className="w-5 h-5" />,
    gradient: 'linear-gradient(90deg, #10b981, #059669)',
    skills: [
      { name: 'MySQL', icon: <SiMysql size={32} color="#4479A1" />, level: 'Advanced' },
      { name: 'MongoDB', icon: <SiMongodb size={32} color="#47A248" />, level: 'Intermediate' },
    ]
  },
  {
    title: 'Data Science & Analytics',
    icon: <LineChart className="w-5 h-5" />,
    gradient: 'linear-gradient(90deg, #f97316, #ef4444)',
    skills: [
      { name: 'Pandas', icon: <SiPandas size={32} color="#150458" />, level: 'Advanced' },
      { name: 'NumPy', icon: <SiNumpy size={32} color="#013243" />, level: 'Advanced' },
      { name: 'Matplotlib', icon: <FaChartBar size={32} color="#11557c" />, level: 'Intermediate' },
      { name: 'Seaborn', icon: <FaChartLine size={32} color="#4C72B0" />, level: 'Intermediate' },
      { name: 'Power BI', icon: <FaChartPie size={32} color="#F2C811" />, level: 'Intermediate' },
      { name: 'Google Analytics', icon: <FaChartArea size={32} color="#E37400" />, level: 'Intermediate' },
    ]
  },
  {
    title: 'Tools & Platforms',
    icon: <Wrench className="w-5 h-5" />,
    gradient: 'linear-gradient(90deg, #d946ef, #a855f7)',
    skills: [
      { name: 'Git', icon: <FaGitAlt size={32} color="#F05032" />, level: 'Advanced' },
      { name: 'GitHub', icon: <FaGithub size={32} color="#ffffff" />, level: 'Advanced' },
      { name: 'VS Code', icon: <FaCode size={32} color="#007ACC" />, level: 'Advanced' },
      { name: 'Jupyter', icon: <SiJupyter size={32} color="#F37626" />, level: 'Advanced' },
      { name: 'Figma', icon: <FaFigma size={32} color="#F24E1E" />, level: 'Intermediate' },
      { name: 'Vercel', icon: <SiVercel size={32} color="#ffffff" />, level: 'Intermediate' },
    ]
  }
]

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="section" style={{ backgroundColor: '#0A0A0B', position: 'relative', overflow: 'hidden' }}>
      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.02em' }}>Technical Skills</h2>
          <p style={{ color: 'var(--text-muted)' }}>Comprehensive skill set in Full Stack Development, AI/ML, and Problem Solving</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={catIdx}
              variants={fadeUp}
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              {/* Category Banner */}
              <div style={{ 
                width: '100%', 
                borderRadius: '12px', 
                padding: '16px 24px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                background: category.gradient,
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}>
                <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>{category.icon}</div>
                <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1.15rem', margin: 0 }}>{category.title}</h3>
              </div>

              {/* Skills Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
                gap: '16px' 
              }}>
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.2)' }}
                    style={{
                      backgroundColor: '#13131A',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '12px',
                      padding: '24px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '16px',
                      textAlign: 'center',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease',
                      cursor: 'default'
                    }}
                  >
                    <div style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.9 }}>
                      {skill.icon}
                    </div>
                    <div style={{ width: '100%' }}>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0', margin: '0 0 4px 0' }}>{skill.name}</p>
                      <p style={{ 
                        fontSize: '10px', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em', 
                        fontWeight: 700, 
                        margin: 0,
                        color: skill.level === 'Advanced' ? '#4ade80' : 
                               skill.level === 'Intermediate' ? '#60a5fa' : '#9ca3af' 
                      }}>
                        {skill.level}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
