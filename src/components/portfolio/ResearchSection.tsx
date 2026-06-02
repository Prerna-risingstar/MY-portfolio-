'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { Brain, FileText, ChevronRight, Download } from 'lucide-react';
import Link from 'next/link';

export function ResearchSection() {
  return (
    <SectionWrapper id="research">
      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span className="section-tag" style={{ marginBottom: '16px' }}>
            <FileText size={12} />
            Research
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.02em' }}>Research & Publications</h2>
          <p style={{ color: 'var(--text-muted)' }}>Exploring the intersection of human intelligence and artificial systems.</p>
        </motion.div>
        
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card"
            style={{ 
              padding: '40px', 
              position: 'relative', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              backgroundColor: '#13131A',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}
          >
            {/* Background Glow */}
            <div style={{
              position: 'absolute',
              top: 0, right: 0,
              width: '300px', height: '300px',
              background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
              transform: 'translate(30%, -30%)',
              pointerEvents: 'none'
            }} />
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))',
                border: '1px solid rgba(139,92,246,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <Brain size={32} color="#8b5cf6" />
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '8px', lineHeight: 1.3 }}>
                  Can we control machines using just our thoughts?
                </h3>
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600 }}>
                  <FileText size={16} />
                  Independent Research Paper • BCI & AI
                </p>
              </div>
            </div>

            <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p>
                An exploration into Brain-Computer Interfaces (BCI), EEG, MEG, and AI-Powered Prosthetic Limbs — a fascinating field where Computer Science meets the Human Brain and Artificial Intelligence 🧠🤖
              </p>
              <p>
                This research paper discusses how emerging technologies enable direct communication between the human brain and machines, opening new possibilities in healthcare and assistive technologies. Technology isn't just about building applications — it's about creating solutions that improve lives.
              </p>
            </div>

            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              alignItems: 'center', 
              gap: '16px', 
              marginTop: '16px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(255,255,255,0.08)'
            }}>
              <Link 
                href="/RESEARCH_PAPER_BY_PRERNA.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <FileText size={18} />
                Read Full Paper
              </Link>
              
              <Link 
                href="/RESEARCH_PAPER_BY_PRERNA.pdf" 
                download="Research_Paper_Prerna_Patel.pdf"
                className="btn-outline"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <Download size={18} />
                Download PDF
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
