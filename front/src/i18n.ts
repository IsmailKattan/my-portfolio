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
        responsibilities: 'Responsibilities',
        noContent: 'No experience entries available in this language yet.'
      },
      projects: {
        title: 'Projects',
        category: 'Category',
        tags: 'Tags',
        tryDemo: 'Try Demo',
        viewRepo: 'View Repository',
        allCategories: 'All Categories',
        noContent: 'No projects available in this language yet.',
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
        author: 'Author',
        category: 'Category',
        allCategories: 'All Categories',
        tags: 'Tags',
        readTime: 'min read',
        noContent: 'No blog posts available in this language yet.'
      },
      chatbot: {
        title: 'Support Chat',
        placeholder: 'Type your message...',
        send: 'Send',
        greeting: 'Hello! How can I help you today?'
      },
      landing: {
        hero: {
          badge: 'Cybersecurity Enthusiast',
          headlinePart1: 'Breaking Into',
          headlineGradient: 'Cybersecurity',
          subtitle: 'CTF Player\u00a0·\u00a0Security Learner\u00a0·\u00a0Fresh Graduate',
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
          heading1: 'Passionate About',
          heading2: 'Cybersecurity',
          para1: 'I\'m a fresh cybersecurity graduate with a deep curiosity for how systems are attacked and defended. I spend my time on CTF challenges, hands-on labs, and personal projects to sharpen my skills and turn theory into practice.',
          para2: 'I\'m actively working toward my first role in the field — earning certifications, building a real project portfolio, and engaging with the security community to grow a little every single day.',
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
        responsibilities: 'المسؤوليات',
        noContent: 'لا توجد خبرات متاحة بهذه اللغة بعد.'
      },
      projects: {
        title: 'المشاريع',
        category: 'الفئة',
        tags: 'الوسوم',
        tryDemo: 'جرب العرض التوضيحي',
        viewRepo: 'عرض المستودع',
        allCategories: 'جميع الفئات',
        noContent: 'لا توجد مشاريع متاحة بهذه اللغة بعد.',
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
        author: 'الكاتب',
        category: 'الفئة',
        allCategories: 'جميع الفئات',
        tags: 'الوسوم',
        readTime: 'د قراءة',
        noContent: 'لا توجد مقالات متاحة بهذه اللغة بعد.'
      },
      chatbot: {
        title: 'دعم الدردشة',
        placeholder: 'اكتب رسالتك...',
        send: 'إرسال',
        greeting: 'مرحباً! كيف يمكنني مساعدتك اليوم؟'
      },
      landing: {
        hero: {
          badge: 'مهتم بالأمن السيبراني',
          headlinePart1: 'طريقي نحو',
          headlineGradient: 'الأمن السيبراني',
          subtitle: 'لاعب CTF\u00a0·\u00a0متعلم متحمس\u00a0·\u00a0خريج حديث',
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
          heading1: 'شغف حقيقي',
          heading2: 'بالأمن السيبراني',
          para1: 'أنا خريج حديث في الأمن السيبراني، أحمل فضولاً عميقاً لفهم أساليب الهجوم والدفاع. أقضي وقتي في تحديات CTF والمختبرات العملية والمشاريع الشخصية لأحوّل المعرفة النظرية إلى مهارات تطبيقية.',
          para2: 'أعمل بجد للحصول على أولى فرصي المهنية في هذا المجال — باكتساب الشهادات وبناء محفظة أعمال حقيقية والتواصل مع مجتمع الأمن لأتطور كل يوم.',
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
        responsibilities: 'Sorumluluklar',
        noContent: 'Bu dilde henüz deneyim girişi bulunmamaktadır.'
      },
      projects: {
        title: 'Projeler',
        category: 'Kategori',
        tags: 'Etiketler',
        tryDemo: 'Demoyu Dene',
        viewRepo: 'Depoyu Görüntüle',
        allCategories: 'Tüm Kategoriler',
        noContent: 'Bu dilde henüz proje bulunmamaktadır.',
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
        author: 'Yazar',
        category: 'Kategori',
        allCategories: 'Tüm Kategoriler',
        tags: 'Etiketler',
        readTime: 'dk okuma',
        noContent: 'Bu dilde henüz blog yazısı bulunmamaktadır.'
      },
      chatbot: {
        title: 'Destek Sohbeti',
        placeholder: 'Mesajınızı yazın...',
        send: 'Gönder',
        greeting: 'Merhaba! Size nasıl yardımcı olabilirim?'
      },
      landing: {
        hero: {
          badge: 'Siber Güvenlik Meraklısı',
          headlinePart1: 'Siber Güvenliğe',
          headlineGradient: 'Adım Atıyorum',
          subtitle: 'CTF Oyuncusu\u00a0·\u00a0Güvenlik Öğrencisi\u00a0·\u00a0Yeni Mezun',
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
          heading1: 'Siber Güvenliğe',
          heading2: 'Tutkuyla Bağlıyım',
          para1: 'Sistemlerin nasıl saldırıya uğradığını ve nasıl savunulduğunu anlamaya derin bir merak duyan, yeni mezun bir siber güvenlik öğrencisiyim. CTF yarışmaları, uygulamalı laboratuvarlar ve kişisel projeler üzerinde çalışarak teorik bilgiyi pratiğe dönüştürüyorum.',
          para2: 'Sertifikalar kazanarak, gerçek projelerden oluşan bir portföy inşa ederek ve güvenlik topluluğuyla bağlantı kurarak sektöre girmeye her gün aktif olarak çalışıyorum.',
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
