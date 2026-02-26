import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        cv: 'CV',
        experiences: 'Experiences',
        projects: 'Projects',
        certificates: 'Certificates',
        blog: 'Blog'
      },
      home: {
        title: 'Cybersecurity Specialist',
        subtitle: 'Portfolio & Professional Experience',
        welcome: 'Welcome to my portfolio'
      },
      cv: {
        title: 'Curriculum Vitae',
        personalInfo: 'Personal Information',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
        education: 'Education',
        skills: 'Technical Skills'
      },
      experiences: {
        title: 'Professional Experience',
        position: 'Position',
        company: 'Company',
        duration: 'Duration',
        responsibilities: 'Responsibilities'
      },
      projects: {
        title: 'Projects',
        category: 'Category',
        tags: 'Tags',
        tryDemo: 'Try Demo',
        viewRepo: 'View Repository',
        allCategories: 'All Categories',
        description: 'Description'
      },
      certificates: {
        title: 'Certificates & Certifications',
        issuer: 'Issuer',
        date: 'Issue Date',
        viewCredential: 'View Credential',
        subCertificates: 'Related Certificates'
      },
      blog: {
        title: 'Blog Posts',
        readMore: 'Read More',
        publishedOn: 'Published on',
        author: 'Author'
      },
      chatbot: {
        title: 'Support Chat',
        placeholder: 'Type your message...',
        send: 'Send',
        greeting: 'Hello! How can I help you today?'
      },
      landing: {
        hero: {
          badge: 'Cybersecurity Professional',
          headlinePart1: 'Securing the',
          headlineGradient: 'Digital Future',
          subtitle: 'Ethical Hacker\u00a0·\u00a0Cloud Security Expert\u00a0·\u00a0Penetration Tester',
          ctaPortfolio: 'Explore Portfolio',
          ctaCV: 'View CV',
          scroll: 'Scroll'
        },
        stats: {
          years: 'Years Experience',
          projects: 'Projects Completed',
          certs: 'Certifications',
          posts: 'Blog Posts'
        },
        expertise: {
          pentest: 'Penetration Testing',
          cloud: 'Cloud Security',
          network: 'Network Security',
          dev: 'Secure Development'
        },
        about: {
          label: 'About Me',
          heading1: 'Building a Safer',
          heading2: 'Digital World',
          para1: 'I\'m a cybersecurity professional with a passion for protecting digital assets and helping organizations build secure infrastructures — with expertise in penetration testing, cloud security, and secure development practices.',
          para2: 'My mission is to make the digital world safer, one system at a time — identifying vulnerabilities, implementing controls, and educating teams on best practices.',
          cta: 'View Full CV'
        },
        tryhackme: {
          badge: 'Cybersecurity Training',
          title: 'TryHackMe Activity',
          subtitle: 'Continuous learning journey in cybersecurity',
          viewProfile: 'View Profile',
          level: 'Level',
          rank: 'Rank',
          topPercent: 'Top',
          league: 'League',
          stats: {
            points: 'Total Points',
            rooms: 'Rooms Completed',
            streak: 'Day Streak',
            badges: 'Badges Earned'
          },
          heatmap: 'Activity Heatmap',
          heatmapLess: 'Less',
          heatmapMore: 'More',
          badgesTitle: 'Rare Badges',
          rarity: {
            common: 'Common',
            rare: 'Rare',
            epic: 'Epic',
            legendary: 'Legendary'
          },
          percentHave: 'have this'
        }
      }
    }
  },
  ar: {
    translation: {
      nav: {
        cv: 'السيرة الذاتية',
        experiences: 'الخبرات',
        projects: 'المشاريع',
        certificates: 'الشهادات',
        blog: 'المدونة'
      },
      home: {
        title: 'متخصص في الأمن السيبراني',
        subtitle: 'المحفظة والخبرة المهنية',
        welcome: 'مرحباً بك في محفظتي'
      },
      cv: {
        title: 'السيرة الذاتية',
        personalInfo: 'المعلومات الشخصية',
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        location: 'الموقع',
        education: 'التعليم',
        skills: 'المهارات التقنية'
      },
      experiences: {
        title: 'الخبرة المهنية',
        position: 'المنصب',
        company: 'الشركة',
        duration: 'المدة',
        responsibilities: 'المسؤوليات'
      },
      projects: {
        title: 'المشاريع',
        category: 'الفئة',
        tags: 'الوسوم',
        tryDemo: 'جرب العرض التوضيحي',
        viewRepo: 'عرض المستودع',
        allCategories: 'جميع الفئات',
        description: 'الوصف'
      },
      certificates: {
        title: 'الشهادات والاعتمادات',
        issuer: 'الجهة المصدرة',
        date: 'تاريخ الإصدار',
        viewCredential: 'عرض الوثيقة',
        subCertificates: 'الشهادات ذات الصلة'
      },
      blog: {
        title: 'مقالات المدونة',
        readMore: 'اقرأ المزيد',
        publishedOn: 'نشر في',
        author: 'الكاتب'
      },
      chatbot: {
        title: 'دعم الدردشة',
        placeholder: 'اكتب رسالتك...',
        send: 'إرسال',
        greeting: 'مرحباً! كيف يمكنني مساعدتك اليوم؟'
      },
      landing: {
        hero: {
          badge: 'متخصص في الأمن السيبراني',
          headlinePart1: 'تأمين',
          headlineGradient: 'المستقبل الرقمي',
          subtitle: 'مخترق أخلاقي\u00a0·\u00a0خبير أمن السحابة\u00a0·\u00a0مختبر اختراق',
          ctaPortfolio: 'استعرض الأعمال',
          ctaCV: 'عرض السيرة الذاتية',
          scroll: 'مرر'
        },
        stats: {
          years: 'سنوات الخبرة',
          projects: 'مشاريع منجزة',
          certs: 'شهادات احترافية',
          posts: 'مقالات المدونة'
        },
        expertise: {
          pentest: 'اختبار الاختراق',
          cloud: 'أمن السحابة',
          network: 'أمن الشبكات',
          dev: 'التطوير الآمن'
        },
        about: {
          label: 'نبذة عني',
          heading1: 'نحو عالم رقمي',
          heading2: 'أكثر أماناً',
          para1: 'أنا متخصص في الأمن السيبراني، شغوف بحماية الأصول الرقمية ومساعدة المؤسسات في بناء بنى تحتية آمنة — بخبرة واسعة في اختبار الاختراق وأمن السحابة وممارسات التطوير الآمن.',
          para2: 'مهمتي جعل العالم الرقمي أكثر أماناً، نظاماً تلو الآخر — من خلال اكتشاف الثغرات وتطبيق الضوابط الأمنية وتثقيف الفرق حول أفضل الممارسات.',
          cta: 'عرض السيرة الذاتية الكاملة'
        },
        tryhackme: {
          badge: 'تدريب الأمن السيبراني',
          title: 'نشاط TryHackMe',
          subtitle: 'رحلة التعلم المستمر في الأمن السيبراني',
          viewProfile: 'عرض الملف الشخصي',
          level: 'المستوى',
          rank: 'الترتيب',
          topPercent: 'أعلى',
          league: 'الدوري',
          stats: {
            points: 'إجمالي النقاط',
            rooms: 'الغرف المكتملة',
            streak: 'أيام متتالية',
            badges: 'الشارات المكتسبة'
          },
          heatmap: 'خريطة النشاط',
          heatmapLess: 'أقل',
          heatmapMore: 'أكثر',
          badgesTitle: 'الشارات النادرة',
          rarity: {
            common: 'شائع',
            rare: 'نادر',
            epic: 'ملحمي',
            legendary: 'أسطوري'
          },
          percentHave: 'يمتلكون هذا'
        }
      }
    }
  },
  tr: {
    translation: {
      nav: {
        cv: 'Özgeçmiş',
        experiences: 'Deneyimler',
        projects: 'Projeler',
        certificates: 'Sertifikalar',
        blog: 'Blog'
      },
      home: {
        title: 'Siber Güvenlik Uzmanı',
        subtitle: 'Portfolyo ve Profesyonel Deneyim',
        welcome: 'Portfolyoma hoş geldiniz'
      },
      cv: {
        title: 'Özgeçmiş',
        personalInfo: 'Kişisel Bilgiler',
        name: 'İsim',
        email: 'E-posta',
        phone: 'Telefon',
        location: 'Konum',
        education: 'Eğitim',
        skills: 'Teknik Beceriler'
      },
      experiences: {
        title: 'Profesyonel Deneyim',
        position: 'Pozisyon',
        company: 'Şirket',
        duration: 'Süre',
        responsibilities: 'Sorumluluklar'
      },
      projects: {
        title: 'Projeler',
        category: 'Kategori',
        tags: 'Etiketler',
        tryDemo: 'Demoyu Dene',
        viewRepo: 'Depoyu Görüntüle',
        allCategories: 'Tüm Kategoriler',
        description: 'Açıklama'
      },
      certificates: {
        title: 'Sertifikalar ve Belgeler',
        issuer: 'Veren Kurum',
        date: 'Veriliş Tarihi',
        viewCredential: 'Belgeyi Görüntüle',
        subCertificates: 'İlgili Sertifikalar'
      },
      blog: {
        title: 'Blog Yazıları',
        readMore: 'Devamını Oku',
        publishedOn: 'Yayınlanma',
        author: 'Yazar'
      },
      chatbot: {
        title: 'Destek Sohbeti',
        placeholder: 'Mesajınızı yazın...',
        send: 'Gönder',
        greeting: 'Merhaba! Size nasıl yardımcı olabilirim?'
      },
      landing: {
        hero: {
          badge: 'Siber Güvenlik Uzmanı',
          headlinePart1: 'Güvenli Bir',
          headlineGradient: 'Dijital Gelecek',
          subtitle: 'Etik Hacker\u00a0·\u00a0Bulut Güvenliği Uzmanı\u00a0·\u00a0Sızma Testi Uzmanı',
          ctaPortfolio: 'Portföyü Keşfet',
          ctaCV: 'Özgeçmişi Gör',
          scroll: 'Kaydır'
        },
        stats: {
          years: 'Yıllık Deneyim',
          projects: 'Tamamlanan Proje',
          certs: 'Sertifika',
          posts: 'Blog Yazısı'
        },
        expertise: {
          pentest: 'Penetrasyon Testi',
          cloud: 'Bulut Güvenliği',
          network: 'Ağ Güvenliği',
          dev: 'Güvenli Geliştirme'
        },
        about: {
          label: 'Hakkımda',
          heading1: 'Daha Güvenli Bir',
          heading2: 'Dijital Dünya',
          para1: 'Dijital varlıkları koruma konusunda tutkuluyum ve kuruluşların güvenli altyapılar inşa etmesine yardım ediyorum — penetrasyon testi, bulut güvenliği ve güvenli geliştirme uygulamalarındaki uzmanlığımla.',
          para2: 'Misyonum dijital dünyayı tek tek sistemler üzerinden daha güvenli hale getirmek — açıkları tespit ederek, kontroller uygulayarak ve ekiplere en iyi uygulamaları öğreterek.',
          cta: 'Tam Özgeçmişi Gör'
        },
        tryhackme: {
          badge: 'Siber Güvenlik Eğitimi',
          title: 'TryHackMe Aktivitesi',
          subtitle: 'Siber güvenlikte sürekli öğrenme yolculuğu',
          viewProfile: 'Profili Görüntüle',
          level: 'Seviye',
          rank: 'Sıralama',
          topPercent: 'En İyi',
          league: 'Lig',
          stats: {
            points: 'Toplam Puan',
            rooms: 'Tamamlanan Oda',
            streak: 'Günlük Seri',
            badges: 'Kazanılan Rozet'
          },
          heatmap: 'Aktivite Haritası',
          heatmapLess: 'Az',
          heatmapMore: 'Çok',
          badgesTitle: 'Nadir Rozetler',
          rarity: {
            common: 'Yaygın',
            rare: 'Nadir',
            epic: 'Epik',
            legendary: 'Efsanevi'
          },
          percentHave: 'sahip'
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
