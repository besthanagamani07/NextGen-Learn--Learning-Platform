/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, Download, ExternalLink, ShieldCheck, Share2, Linkedin, QrCode, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

export default function Certificates() {
  const certificates = [
    {
      id: '1',
      title: 'Advanced React & AI Integration',
      date: 'May 12, 2026',
      grade: 'Distinction (98%)',
      issuer: 'NextGen Learn Academy',
      color: 'from-amber-400 to-yellow-600',
    },
    {
      id: '2',
      title: 'Full-Stack Web Architecture',
      date: 'April 05, 2026',
      grade: 'A+ Elite',
      issuer: 'NextGen Learn Academy',
      color: 'from-blue-400 to-indigo-600',
    },
  ];

  const handleDownload = async (cert: any) => {
    const element = document.createElement('div');
    // Using inline styles with HEX colors to avoid OKLCH parsing issues in html2canvas
    element.style.display = 'flex';
    element.style.flexDirection = 'column';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';
    element.style.padding = '80px';
    element.style.backgroundColor = '#0f172a'; // slate-900
    element.style.color = '#ffffff';
    element.style.width = '1000px';
    element.style.height = '700px';
    element.style.border = '30px solid rgba(245, 158, 11, 0.2)'; // amber-500/20
    element.style.position = 'fixed';
    element.style.left = '-9999px';
    element.style.overflow = 'hidden';
    element.style.fontFamily = 'Inter, sans-serif';
    
    element.innerHTML = `
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at center, rgba(245, 158, 11, 0.1) 0%, transparent 70%);"></div>
      <div style="z-index: 10; text-align: center; display: flex; flex-direction: column; gap: 40px;">
        <div style="color: #f59e0b; font-weight: 900; letter-spacing: 0.3em; text-transform: uppercase; font-size: 20px;">Certificate of Excellence</div>
        <div style="color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; font-size: 14px;">This is to certify that the user has mastered</div>
        <div style="font-size: 72px; font-weight: 900; letter-spacing: -0.05em; color: #ffffff;">${cert.title}</div>
        <div style="font-size: 24px; color: #cbd5e1;">Awarded with a grade of <span style="color: #f59e0b; font-weight: 900;">${cert.grade}</span></div>
        <div style="margin-top: 80px; padding-top: 40px; display: flex; justify-content: space-between; width: 100%; border-top: 1px solid rgba(255, 255, 255, 0.1);">
          <div style="text-align: left;">
            <div style="color: #ffffff; font-weight: 900; font-size: 18px;">${cert.issuer}</div>
            <div style="color: #64748b; font-size: 10px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em;">Authorized Institution</div>
          </div>
          <div style="text-align: right;">
            <div style="color: #ffffff; font-weight: 900; font-size: 18px;">${cert.date}</div>
            <div style="color: #64748b; font-size: 10px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em;">Date of Issue</div>
          </div>
        </div>
        <div style="color: #475569; font-size: 12px; font-family: monospace;">Verify at: nextgen-learn.com/verify/NG-${cert.id}</div>
      </div>
    `;

    document.body.appendChild(element);

    try {
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#0f172a' // slate-900 equivalent in HEX
      });
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1000, 700] });
      doc.addImage(imgData, 'PNG', 0, 0, 1000, 700);
      doc.save(`NextGen-Cert-${cert.id}.pdf`);
    } finally {
      document.body.removeChild(element);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black uppercase tracking-widest">
            <Award className="w-4 h-4" /> Professional Credentials
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-main tracking-tighter">My <span className="text-gradient">Certificates</span></h1>
          <p className="text-xl text-muted font-medium">Industry-verified proof of your technical expertise.</p>
        </div>
        <img 
          src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://nextgen-learn.com/profile/certified" 
          alt="QR Verification"
          className="w-24 h-24 rounded-2xl border border-glass p-2 grayscale hover:grayscale-0 transition-all cursor-pointer"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden bg-bg-card rounded-[3rem] p-1 border border-glass shadow-2xl"
          >
            {/* Premium Gold Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-transparent to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative glass-card rounded-[2.8rem] p-10 h-full flex flex-col">
              <div className="flex items-start justify-between mb-12">
                <div className={`w-20 h-20 bg-gradient-to-br ${cert.color} rounded-3xl flex items-center justify-center shadow-2xl rotate-6 group-hover:rotate-0 transition-transform`}>
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                  <ShieldCheck className="w-4 h-4" /> Fully Verified
                </div>
              </div>

              <div className="space-y-6 flex-1">
                <h3 className="text-3xl font-black tracking-tighter text-main leading-tight group-hover:text-[#6C5CE7] transition-colors">
                  {cert.title}
                </h3>
                
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-muted mb-2">Grade</p>
                    <p className="text-lg font-black text-main">{cert.grade}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-muted mb-2">Issue Date</p>
                    <p className="text-lg font-black text-main">{cert.date}</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-glass flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-muted mb-1">ID</p>
                    <p className="text-xs font-mono text-main">NG-CERT-{cert.id}-2026</p>
                  </div>
                  <QrCode className="w-8 h-8 text-muted opacity-50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-12">
                <button 
                  onClick={() => handleDownload(cert)}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-[#6C5CE7] text-white font-black rounded-2xl shadow-xl shadow-[#6C5CE7]/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <Download className="w-5 h-5" /> Download
                </button>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center px-4 bg-white/5 border border-glass text-main font-black rounded-2xl hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all group/btn">
                    <Linkedin className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                  </button>
                  <button className="flex-1 flex items-center justify-center px-4 bg-white/5 border border-glass text-main font-black rounded-2xl hover:bg-white/10 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="relative group rounded-[3rem] p-1 bg-gradient-to-br from-glass to-transparent border-2 border-dashed border-glass flex items-center justify-center text-center p-12 hover:border-[#6C5CE7]/40 transition-all cursor-pointer">
           <div className="space-y-6">
             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#6C5CE7]/10 transition-colors">
               <Rocket className="w-10 h-10 text-muted group-hover:text-[#6C5CE7] transition-colors" />
             </div>
             <h3 className="text-2xl font-black text-main tracking-tight">Level Up for More</h3>
             <p className="text-muted text-sm max-w-[280px]">Complete your ongoing certifications to unlock elite premium credentials.</p>
             <Link to="/courses" className="inline-block px-8 py-3 bg-white/5 border border-glass text-main font-black rounded-2xl hover:bg-[#6C5CE7] hover:text-white transition-all">
              Continue Learning
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
