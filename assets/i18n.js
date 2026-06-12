/* ============================================
   i18n — EN / ES translations
   ============================================ */

const translations = {

  /* -------- Shared / Navigation -------- */
  en: {
    // Nav
    "nav.home": "Home",
    "nav.about": "About",

    // Badge
    "badge.available": "Open to work",

    // Hero Home
    "hero.name": "Adam Ben Ahmed",
    "hero.typing": "Cybersecurity Analyst & SysAdmin",

    // Feed
    "feed.title": "Activity",
    "feed.filter.all": "All",
    "feed.filter.lab": "Lab",
    "feed.filter.project": "Project",
    "feed.filter.cert": "Certification",
    "feed.filter.job": "Job Search",
    "feed.filter.learning": "Learning",

    // Feed entries
    "feed.1.title": "Published Q-Gunter on GitHub",
    "feed.1.desc": "Q-Gunter — an autonomous AI-powered pentesting SaaS B2B platform. Includes automated recon, vulnerability scanning, and intelligent exploitation workflows.",
    "feed.1.link": "View repository",

    "feed.2.title": "Studying for CySA+",
    "feed.2.desc": "Preparing for the CompTIA Cybersecurity Analyst (CySA+) certification. Focusing on threat detection, security analytics, incident response, and vulnerability management.",

    "feed.3.title": "Studying for AZ-900",
    "feed.3.desc": "Preparing for the Microsoft Azure Fundamentals certification. Covering cloud concepts, Azure services, security, privacy, compliance, and pricing.",

    "feed.4.title": "Master's in Cybersecurity — Completed",
    "feed.4.desc": "Successfully completed the Master's in Cybersecurity Specialization at ITB (Institut Tecnològic de Barcelona). Covered advanced threat analysis, incident response, digital forensics, and security architecture.",

    // Footer
    "footer.copy": "© 2026 Adam Ben Ahmed. Built with purpose.",

    // -------- About page --------

    // Hero About
    "about.hero.bio": "Cybersecurity professional based in Barcelona with hands-on experience in vulnerability assessment, SIEM monitoring, systems administration, and network security. Passionate about building secure infrastructure and hunting threats.",
    "about.hero.stat.exp": "months exp.",
    "about.hero.stat.project": "projects",
    "about.hero.stat.langs": "languages",

    // Work Experience
    "about.work.label": "Experience",
    "about.work.title": "Work Experience",

    "about.work.1.role": "IT Support Technician",
    "about.work.1.company": "Devoteam (client: Cuatrecasas)",
    "about.work.1.date": "Sep 2024 — Oct 2025",
    "about.work.1.location": "Barcelona",
    "about.work.1.desc": "Managed 1,000+ tickets/month across a 500+ user base. Coordinated with IT teams across 6 countries. Administered Active Directory, GPOs, SCCM deployments, and Hyper-V environments. Provided L1/L2 support for hardware, software, and network issues.",

    "about.work.2.role": "IT / Cybersecurity Intern",
    "about.work.2.company": "Halcyon Expert SRL",
    "about.work.2.date": "Jun — Jul 2024",
    "about.work.2.location": "Arad, Romania",
    "about.work.2.desc": "Configured and maintained firewalls, managed LAN/WAN infrastructure, and implemented network monitoring solutions. Gained hands-on experience with enterprise security tools and network troubleshooting.",

    // Education
    "about.edu.label": "Education",
    "about.edu.title": "Education",

    "about.edu.1.degree": "BSc (Hons) Cyber Security and Networking",
    "about.edu.1.school": "University of Central Lancashire",
    "about.edu.1.date": "2024 — 2026",
    "about.edu.1.mode": "Online",

    "about.edu.2.degree": "Master's in Cybersecurity Specialization",
    "about.edu.2.school": "ITB — Institut Tecnològic de Barcelona",
    "about.edu.2.date": "2025 — 2026",
    "about.edu.2.mode": "Completed",

    "about.edu.3.degree": "CFGS Network Systems Administration + Cybersecurity",
    "about.edu.3.school": "ITB — Institut Tecnològic de Barcelona",
    "about.edu.3.date": "2023 — 2025",
    "about.edu.3.mode": "Completed",

    "about.edu.4.degree": "42 Barcelona — Programming Campus",
    "about.edu.4.school": "Fundación Telefónica",
    "about.edu.4.date": "2023 — 2024",
    "about.edu.4.mode": "Peer-to-peer learning",

    // Certifications
    "about.cert.label": "Credentials",
    "about.cert.title": "Certifications",

    "about.cert.1.name": "AZ-900",
    "about.cert.1.issuer": "Microsoft Azure Fundamentals",
    "about.cert.1.status": "In progress",

    "about.cert.2.name": "CySA+",
    "about.cert.2.issuer": "CompTIA Cybersecurity Analyst",
    "about.cert.2.status": "In progress",

    "about.cert.3.name": "English C1",
    "about.cert.3.issuer": "Certified — Cambridge / equivalent",
    "about.cert.3.status": "Certified",

    "about.cert.4.name": "Catalan C1",
    "about.cert.4.issuer": "Certified — Generalitat de Catalunya",
    "about.cert.4.status": "Certified",

    // Languages
    "about.lang.label": "Communication",
    "about.lang.title": "Languages",

    "about.lang.1.name": "Spanish",
    "about.lang.1.level": "Native",
    "about.lang.2.name": "Catalan",
    "about.lang.2.level": "Native — C1 certified",
    "about.lang.3.name": "English",
    "about.lang.3.level": "C1 — Certified",
    "about.lang.4.name": "Arabic",
    "about.lang.4.level": "85% - Native",

    // Skills
    "about.skills.label": "Technical",
    "about.skills.title": "Skills & Tools",

    "about.skills.cat.siem": "SIEM & Monitoring",
    "about.skills.cat.vuln": "Vulnerability Management",
    "about.skills.cat.firewall": "Firewalls & Network Security",
    "about.skills.cat.offensive": "Offensive Tools",
    "about.skills.cat.systems": "Systems & Virtualization",
    "about.skills.cat.iac": "IaC & DevOps",
    "about.skills.cat.cloud": "Cloud & Infrastructure",
    "about.skills.cat.automation": "Automation & AI",
    "about.skills.cat.methods": "Methodologies",

    // Projects
    "about.projects.label": "Portfolio",
    "about.projects.title": "Projects",

    "about.project.1.name": "Q-Gunter",
    "about.project.1.desc": "Autonomous AI-powered pentesting SaaS platform. Automates reconnaissance, vulnerability scanning, and exploitation with intelligent decision-making. Built with Python, Docker, and integrated AI workflows.",
    "about.project.1.github": "GitHub",
    "about.project.1.demo": "Watch Demo",

    "about.project.2.name": "Burblit",
    "about.project.2.desc": "End-to-end encrypted web messaging prototype with post-quantum considerations. Built with TypeScript and modern cryptographic primitives for forward secrecy and quantum resistance.",
    "about.project.2.github": "GitHub",
    // Contact
    "about.contact.label": "Get in touch",
    "about.contact.title": "Contact",
    "about.contact.email.label": "Email — click to copy",
    "about.contact.github.label": "GitHub",
    "about.contact.copied": "Copied!",
    "about.contact.repos": "Public repos",
    "about.contact.stars": "Total stars",
    "about.contact.followers": "Followers",
  },


  /* -------- ESPAÑOL -------- */
  es: {
    // Nav
    "nav.home": "Inicio",
    "nav.about": "Sobre mí",

    // Badge
    "badge.available": "Disponible",

    // Hero Home
    "hero.name": "Adam Ben Ahmed",
    "hero.typing": "Analista de Ciberseguridad & SysAdmin",

    // Feed
    "feed.title": "Actividad",
    "feed.filter.all": "Todo",
    "feed.filter.lab": "Lab",
    "feed.filter.project": "Proyecto",
    "feed.filter.cert": "Certificación",
    "feed.filter.job": "Empleo",
    "feed.filter.learning": "Formación",

    // Feed entries
    "feed.1.title": "Q-Gunter publicado en GitHub",
    "feed.1.desc": "Q-Gunter — plataforma SaaS B2B de pentesting autónomo con IA. Incluye reconocimiento automatizado, escaneo de vulnerabilidades y flujos de explotación inteligente.",
    "feed.1.link": "Ver repositorio",

    "feed.2.title": "Estudiando para CySA+",
    "feed.2.desc": "Preparando la certificación CompTIA Cybersecurity Analyst (CySA+). Enfocado en detección de amenazas, analítica de seguridad, respuesta a incidentes y gestión de vulnerabilidades.",

    "feed.3.title": "Estudiando para AZ-900",
    "feed.3.desc": "Preparando la certificación Microsoft Azure Fundamentals. Cubriendo conceptos cloud, servicios Azure, seguridad, privacidad, cumplimiento y precios.",

    "feed.4.title": "Máster en Ciberseguridad — Finalizado",
    "feed.4.desc": "Completado con éxito el Máster de Especialización en Ciberseguridad del ITB (Institut Tecnològic de Barcelona). Análisis avanzado de amenazas, respuesta a incidentes, forense digital y arquitectura de seguridad.",

    // Footer
    "footer.copy": "© 2026 Adam Ben Ahmed. Construido con propósito.",

    // -------- About page --------

    // Hero About
    "about.hero.bio": "Profesional de ciberseguridad en Barcelona con experiencia práctica en evaluación de vulnerabilidades, monitorización SIEM, administración de sistemas y seguridad de redes. Apasionado por construir infraestructura segura y la caza de amenazas.",
    "about.hero.stat.exp": "meses exp.",
    "about.hero.stat.project": "proyectos",
    "about.hero.stat.langs": "idiomas",

    // Work Experience
    "about.work.label": "Experiencia",
    "about.work.title": "Experiencia Laboral",

    "about.work.1.role": "Técnico de Soporte IT",
    "about.work.1.company": "Devoteam (cliente: Cuatrecasas)",
    "about.work.1.date": "Sep 2024 — Oct 2025",
    "about.work.1.location": "Barcelona",
    "about.work.1.desc": "Gestión de +1.000 tickets/mes en una base de +500 usuarios. Coordinación con equipos IT en 6 países. Administración de Active Directory, GPOs, despliegues SCCM y entornos Hyper-V. Soporte L1/L2 para hardware, software y red.",

    "about.work.2.role": "Prácticas IT / Ciberseguridad",
    "about.work.2.company": "Halcyon Expert SRL",
    "about.work.2.date": "Jun — Jul 2024",
    "about.work.2.location": "Arad, Rumanía",
    "about.work.2.desc": "Configuración y mantenimiento de firewalls, gestión de infraestructura LAN/WAN e implementación de soluciones de monitorización de red. Experiencia práctica con herramientas de seguridad empresarial.",

    // Education
    "about.edu.label": "Formación",
    "about.edu.title": "Educación",

    "about.edu.1.degree": "BSc (Hons) Cyber Security and Networking",
    "about.edu.1.school": "University of Central Lancashire",
    "about.edu.1.date": "2024 — 2026",
    "about.edu.1.mode": "Online",

    "about.edu.2.degree": "Máster de Especialización en Ciberseguridad",
    "about.edu.2.school": "ITB — Institut Tecnològic de Barcelona",
    "about.edu.2.date": "2025 — 2026",
    "about.edu.2.mode": "Completado",

    "about.edu.3.degree": "CFGS Administración de Sistemas en Red + Ciberseguridad",
    "about.edu.3.school": "ITB — Institut Tecnològic de Barcelona",
    "about.edu.3.date": "2023 — 2025",
    "about.edu.3.mode": "Completado",

    "about.edu.4.degree": "42 Barcelona — Campus de Programación",
    "about.edu.4.school": "Fundación Telefónica",
    "about.edu.4.date": "2023 — 2024",
    "about.edu.4.mode": "Aprendizaje entre iguales",

    // Certifications
    "about.cert.label": "Credenciales",
    "about.cert.title": "Certificaciones",

    "about.cert.1.name": "AZ-900",
    "about.cert.1.issuer": "Microsoft Azure Fundamentals",
    "about.cert.1.status": "En progreso",

    "about.cert.2.name": "CySA+",
    "about.cert.2.issuer": "CompTIA Cybersecurity Analyst",
    "about.cert.2.status": "En progreso",

    "about.cert.3.name": "Inglés C1",
    "about.cert.3.issuer": "Certificado — Cambridge / equivalente",
    "about.cert.3.status": "Certificado",

    "about.cert.4.name": "Catalán C1",
    "about.cert.4.issuer": "Certificado — Generalitat de Catalunya",
    "about.cert.4.status": "Certificado",

    // Languages
    "about.lang.label": "Comunicación",
    "about.lang.title": "Idiomas",

    "about.lang.1.name": "Español",
    "about.lang.1.level": "Nativo",
    "about.lang.2.name": "Catalán",
    "about.lang.2.level": "Nativo — C1 certificado",
    "about.lang.3.name": "Inglés",
    "about.lang.3.level": "C1 — Certificado",
    "about.lang.4.name": "Árabe",
    "about.lang.4.level": "85% — Nativo",

    // Skills
    "about.skills.label": "Técnico",
    "about.skills.title": "Habilidades y Herramientas",

    "about.skills.cat.siem": "SIEM y Monitorización",
    "about.skills.cat.vuln": "Gestión de Vulnerabilidades",
    "about.skills.cat.firewall": "Firewalls y Seguridad de Red",
    "about.skills.cat.offensive": "Herramientas Ofensivas",
    "about.skills.cat.systems": "Sistemas y Virtualización",
    "about.skills.cat.iac": "IaC y DevOps",
    "about.skills.cat.cloud": "Cloud e Infraestructura",
    "about.skills.cat.automation": "Automatización e IA",
    "about.skills.cat.methods": "Metodologías",

    // Projects
    "about.projects.label": "Portfolio",
    "about.projects.title": "Proyectos",

    "about.project.1.name": "Q-Gunter",
    "about.project.1.desc": "Plataforma SaaS de pentesting autónomo con IA. Automatiza reconocimiento, escaneo de vulnerabilidades y explotación con toma de decisiones inteligente. Construido con Python, Docker y flujos de IA integrados.",
    "about.project.1.github": "GitHub",
    "about.project.1.demo": "Ver Demo",

    "about.project.2.name": "Burblit",
    "about.project.2.desc": "Prototipo de mensajería web cifrada de extremo a extremo con consideraciones poscuánticas. Construido con TypeScript y primitivas criptográficas modernas para forward secrecy y resistencia cuántica.",
    "about.project.2.github": "GitHub",

    // Contact
    "about.contact.label": "Contacto",
    "about.contact.title": "Contacto",
    "about.contact.email.label": "Email — clic para copiar",
    "about.contact.github.label": "GitHub",
    "about.contact.copied": "¡Copiado!",
    "about.contact.repos": "Repos públicos",
    "about.contact.stars": "Estrellas totales",
    "about.contact.followers": "Seguidores",
  }
};
