export const locales = ["en", "th"] as const;
export type Locale = (typeof locales)[number];
export type Translated<T> = Record<Locale, T>;

const portrait = {
  src: "/images/portrait.jpg",
  alt: { en: "Portrait of Pratchaya Phusodnil", th: "ภาพถ่าย Pratchaya Phusodnil" },
};

export const site = {
  defaultLocale: "en" as Locale,
  brand: "Portfolio",
  name: { en: "Pratchaya Phusodnil", th: "Pratchaya Phusodnil" },
  role: { en: "Digital Science and Technology student", th: "นักศึกษาวิทยาการและเทคโนโลยีดิจิทัล" },
  bio: {
    en: "Digital Science and Technology student at the Faculty of ICT, Mahidol University, with a strong interest in AI, Machine Learning, and Computer Vision. I am passionate about developing innovative software solutions and exploring how AI can solve real-world problems.",
    th: "นักศึกษาสาขาวิทยาการและเทคโนโลยีดิจิทัล คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยมหิดล สนใจด้าน AI, Machine Learning และ Computer Vision ชอบพัฒนาซอฟต์แวร์และเรียนรู้ว่า AI สามารถช่วยแก้ปัญหาในชีวิตจริงได้อย่างไร",
  },
  home: {
    statement: { en: "Exploring how AI can solve real-world problems.", th: "เรียนรู้ว่า AI ช่วยแก้ปัญหาในชีวิตจริงได้อย่างไร" },
    heroImage: portrait,
    aboutImage: portrait,
  },
  skills: [
    { category: { en: "Programming languages", th: "ภาษาโปรแกรม" }, tools: "Python, JavaScript / TypeScript" },
    { category: { en: "Frontend", th: "เว็บส่วนหน้า" }, tools: "HTML / CSS, React / Next.js" },
    { category: { en: "Backend", th: "เว็บส่วนหลัง" }, tools: "Node.js / Express" },
    { category: { en: "Databases", th: "ฐานข้อมูล" }, tools: "SQL" },
    { category: { en: "Computer vision", th: "คอมพิวเตอร์วิทัศน์" }, tools: "OpenCV / MediaPipe" },
  ],
  education: {
    university: { en: "Mahidol University", th: "มหาวิทยาลัยมหิดล" },
    faculty: { en: "Faculty of Information and Communication Technology", th: "คณะเทคโนโลยีสารสนเทศและการสื่อสาร" },
    program: { en: "Digital Science and Technology", th: "วิทยาการและเทคโนโลยีดิจิทัล" },
    logo: "/images/education/mahidol-ict.png",
    url: "https://www.ict.mahidol.ac.th/",
  },
  languages: {
    thai: { name: { en: "Thai", th: "ไทย" }, detail: { en: "Primary language", th: "ภาษาหลัก" } },
    english: { name: { en: "English", th: "อังกฤษ" }, test: "TOEIC", score: 605 },
  },
  experience: [
    {
      company: "TENSHI DOT LIFE Co., Ltd.",
      year: { en: "April–August 2026", th: "เมษายน–สิงหาคม 2026" },
      role: { en: "Web Application Developer", th: "นักพัฒนาเว็บแอปพลิเคชัน" },
      project: "Chapterly",
      description: {
        en: "Developed a full-stack e-commerce application for physical books, digital eBooks, and online reading. Built the frontend, backend services, and administrative management system, and integrated APIs and the Stripe payment gateway. Gained hands-on experience in system integration, payment processing, and end-to-end web application delivery.",
        th: "พัฒนา Chapterly เว็บอีคอมเมิร์ซแบบ Full-stack สำหรับซื้อหนังสือเล่ม eBook และอ่านหนังสือออนไลน์ ดูแลทั้งส่วนติดต่อผู้ใช้ บริการหลังบ้าน และระบบจัดการสำหรับผู้ดูแล เชื่อมต่อ API และ Stripe Payment Gateway พร้อมเก็บประสบการณ์ด้านการเชื่อมระบบ การชำระเงิน และการส่งมอบเว็บแอปพลิเคชันครบกระบวนการ",
      },
    },
  ],
  socials: {
    github: "https://github.com/Yoshioka1311",
    linkedin: "https://www.linkedin.com/in/pratchaya-phusodnil/",
    email: "pratchayaphusodnil@gmail.com",
    other: "[OTHER]",
  },
} satisfies {
  defaultLocale: Locale;
  brand: string;
  name: Translated<string>;
  role: Translated<string>;
  bio: Translated<string>;
  home: { statement: Translated<string>; heroImage: typeof portrait; aboutImage: typeof portrait };
  skills: { category: Translated<string>; tools: string }[];
  education: { university: Translated<string>; faculty: Translated<string>; program: Translated<string>; logo: string; url: string };
  languages: {
    thai: { name: Translated<string>; detail: Translated<string> };
    english: { name: Translated<string>; test: string; score: number };
  };
  experience: {
    company: string;
    year: Translated<string>;
    project: string;
    role: Translated<string>;
    description: Translated<string>;
  }[];
  socials: Record<"github" | "linkedin" | "email" | "other", string>;
};

export const languageOptions = [
  { locale: "en", flag: "/flags/en.svg", name: "English" },
  { locale: "th", flag: "/flags/th.svg", name: "ไทย" },
] as const;

export const copy = {
  en: {
    profile: "Personal profile",
    seo: {
      home: "Personal portfolio and selected projects.",
      work: "Browse the project archive and read the case studies.",
      project: "Read the project case study, including its role, tools and details.",
      about: "Read about my education, experience, skills and languages.",
      contact: "Find my email, social profiles and contact form.",
      imageAlt: "Monochrome personal portfolio cover",
    },
    skipToContent: "Skip to content",
    language: "Language",
    transition: { opening: "Opening" },
    languageNames: { en: "Switch to English", th: "เปลี่ยนเป็นภาษาไทย" },
    nav: { home: "Home", work: "Work", about: "About", contact: "Contact", label: "Main navigation" },
    menu: { open: "Open menu", close: "Close menu", label: "Menu" },
    home: { selectedWork: "Selected work", about: "About me", contact: "Get in touch", intro: "Introduction", allWork: "All work", readAbout: "More about me", contactLink: "Contact", scroll: "Scroll to explore", previous: "Previous project", next: "Next project", featuredNavigation: "Featured project navigation", cursor: "View" },
    work: {
      title: "Work", view: "View project", year: "Year", role: "Role",
      tools: "Tools", next: "Next project", live: "Live site", source: "GitHub",
      collection: "Project archive", overview: "Project story", back: "All work", cursor: "View",
    },
    about: { title: "About", story: "My story", education: "Education", skills: "Skills", experience: "Experience", languages: "Languages" },
    contact: {
      title: "Contact", name: "Name", email: "Email", message: "Message",
      submit: "Check message", sending: "Checking…", success: "Your message passed validation.",
      form: "Message form", linkedin: "LinkedIn", preview: "Form preview. Messages entered here are checked without being saved or delivered.",
      tooLong: "Shorten this field before trying again.",
      required: "Complete this field.", invalidEmail: "Enter a valid email address.",
      error: "The form check failed. Try again.",
    },
    footer: { backToTop: "Back to top", socials: "Social links" },
    notFound: { title: "Page not found", back: "Back to home" },
  },
  th: {
    profile: "เว็บไซต์ส่วนตัว",
    seo: {
      home: "เว็บไซต์ส่วนตัวและผลงานที่คัดเลือก",
      work: "ดูผลงานทั้งหมดและอ่านรายละเอียดของแต่ละโครงการ",
      project: "อ่านรายละเอียดโครงการ บทบาท และเครื่องมือที่ใช้",
      about: "อ่านประวัติการศึกษา ประสบการณ์ ทักษะ และภาษาที่ใช้",
      contact: "ดูอีเมล โซเชียลมีเดีย และแบบฟอร์มติดต่อ",
      imageAlt: "ภาพปกเว็บไซต์ส่วนตัวโทนขาวดำ",
    },
    skipToContent: "ข้ามไปยังเนื้อหา",
    language: "ภาษา",
    transition: { opening: "กำลังเปิด" },
    languageNames: { en: "Switch to English", th: "เปลี่ยนเป็นภาษาไทย" },
    nav: { home: "หน้าหลัก", work: "ผลงาน", about: "เกี่ยวกับฉัน", contact: "ติดต่อ", label: "เมนูหลัก" },
    menu: { open: "เปิดเมนู", close: "ปิดเมนู", label: "เมนู" },
    home: { selectedWork: "ผลงานที่เลือก", about: "เกี่ยวกับฉัน", contact: "ติดต่อฉัน", intro: "แนะนำตัว", allWork: "ผลงานทั้งหมด", readAbout: "อ่านเรื่องของฉัน", contactLink: "ติดต่อ", scroll: "เลื่อนเพื่อดูต่อ", previous: "ผลงานก่อนหน้า", next: "ผลงานถัดไป", featuredNavigation: "เลือกผลงานที่แนะนำ", cursor: "ดู" },
    work: {
      title: "ผลงาน", view: "ดูผลงาน", year: "ปี", role: "บทบาท",
      tools: "เครื่องมือ", next: "ผลงานถัดไป", live: "เปิดเว็บไซต์", source: "GitHub",
      collection: "รวมผลงาน", overview: "เรื่องราวของผลงาน", back: "ผลงานทั้งหมด", cursor: "ดู",
    },
    about: { title: "เกี่ยวกับฉัน", story: "เรื่องราวของฉัน", education: "การศึกษา", skills: "ทักษะ", experience: "ประสบการณ์", languages: "ภาษา" },
    contact: {
      title: "ติดต่อ", name: "ชื่อ", email: "อีเมล", message: "ข้อความ",
      submit: "ตรวจสอบข้อความ", sending: "กำลังตรวจสอบ…", success: "ข้อมูลในข้อความผ่านการตรวจสอบแล้ว",
      form: "แบบฟอร์มข้อความ", linkedin: "LinkedIn", preview: "แบบฟอร์มทดลองสำหรับตรวจสอบข้อมูล ระบบจะไม่บันทึกหรือส่งข้อความ",
      tooLong: "กรอกข้อมูลให้สั้นลงแล้วลองอีกครั้ง",
      required: "กรุณากรอกข้อมูลช่องนี้", invalidEmail: "กรุณากรอกอีเมลให้ถูกต้อง",
      error: "ตรวจสอบแบบฟอร์มไม่สำเร็จ กรุณาลองอีกครั้ง",
    },
    footer: { backToTop: "กลับด้านบน", socials: "โซเชียลมีเดีย" },
    notFound: { title: "ไม่พบหน้านี้", back: "กลับหน้าหลัก" },
  },
} satisfies Translated<{
  profile: string;
  seo: Record<"home" | "work" | "project" | "about" | "contact" | "imageAlt", string>;
  skipToContent: string;
  language: string;
  transition: { opening: string };
  languageNames: Translated<string>;
  nav: Record<"home" | "work" | "about" | "contact" | "label", string>;
  menu: Record<"open" | "close" | "label", string>;
  home: Record<"selectedWork" | "about" | "contact" | "intro" | "allWork" | "readAbout" | "contactLink" | "scroll" | "previous" | "next" | "featuredNavigation" | "cursor", string>;
  work: Record<"title" | "view" | "year" | "role" | "tools" | "next" | "live" | "source" | "collection" | "overview" | "back" | "cursor", string>;
  about: Record<"title" | "story" | "education" | "skills" | "experience" | "languages", string>;
  contact: Record<"title" | "name" | "email" | "message" | "submit" | "sending" | "success" | "form" | "linkedin" | "preview" | "required" | "invalidEmail" | "tooLong" | "error", string>;
  footer: { backToTop: string; socials: string };
  notFound: Record<"title" | "back", string>;
}>;

export type Project = {
  slug: string;
  featured: boolean;
  title: Translated<string>;
  year: string;
  role: Translated<string>;
  tools: Translated<string[]>;
  summary: Translated<string>;
  details: Translated<string[]>;
  cover: { src: string; alt: Translated<string> };
  gallery: { src: string; alt: Translated<string> }[];
  links: { live: string; github: string };
};

export const projects: Project[] = [
  {
    slug: "project-one",
    featured: true,
    title: { en: "Arduino Workbench", th: "Arduino Workbench" },
    year: "2026",
    role: { en: "Personal project", th: "โปรเจคส่วนตัว" },
    tools: { en: ["React", "TypeScript", "Three.js", "avr8js"], th: ["React", "TypeScript", "Three.js", "avr8js"] },
    summary: {
      en: "Build circuits in a 3D workspace, write Arduino sketches, and explore how the components respond in a browser simulation.",
      th: "เว็บจำลอง Arduino สำหรับจัดวางอุปกรณ์และต่อวงจรในพื้นที่ 3 มิติ เขียนโค้ดและทดลองดูการทำงานของวงจรผ่านเบราว์เซอร์",
    },
    details: {
      en: ["An Arduino Uno and breadboard workspace with a component library, wiring tools, and a code editor.", "Guided lessons cover an LED blink, a button-controlled LED, and a buzzer with a switch. Projects can be saved in the browser or exported as JSON.", "The workbench currently runs locally, so this portfolio links to the project overview instead of a public demo."],
      th: ["พื้นที่ทดลอง Arduino Uno และเบรดบอร์ด พร้อมคลังอุปกรณ์ เครื่องมือต่อสาย และตัวแก้ไขโค้ด", "มีบทเรียน LED กะพริบ ปุ่มควบคุม LED และบัซเซอร์ร่วมกับสวิตช์ บันทึกโปรเจคในเบราว์เซอร์หรือส่งออกเป็น JSON ได้", "ขณะนี้ Workbench ยังรันอยู่ในเครื่อง จึงแสดงหน้าแนะนำโปรเจกต์แทนลิงก์ทดลองสาธารณะ"],
    },
    cover: { src: "/images/projects/arduino.jpg", alt: { en: "Arduino Workbench with a 3D Uno board, breadboard, and component library", th: "หน้า Arduino Workbench พร้อมบอร์ด Uno เบรดบอร์ด 3 มิติ และคลังอุปกรณ์" } },
    gallery: [],
    links: { live: "", github: "" },
  },
  {
    slug: "project-two",
    featured: true,
    title: { en: "HandPrint", th: "HandPrint" },
    year: "2026",
    role: { en: "Personal project", th: "โปรเจคส่วนตัว" },
    tools: { en: ["HTML", "CSS", "JavaScript"], th: ["HTML", "CSS", "JavaScript"] },
    summary: {
      en: "Learn American Sign Language with an English–Thai dictionary, illustrated signing guides, short lessons, and review quizzes.",
      th: "เว็บเรียนภาษามืออเมริกัน พร้อมพจนานุกรมอังกฤษ–ไทย ภาพและขั้นตอนการทำท่า บทเรียนสั้น ๆ และแบบทดสอบทบทวน",
    },
    details: {
      en: ["Look up letters and vocabulary, follow illustrated instructions, and save words for later practice.", "Lessons, quizzes, and scheduled review track learning progress in the browser. Camera practice provides a reference preview. The web version does not recognize signs."],
      th: ["ค้นหาตัวอักษรและคำศัพท์ ดูภาพพร้อมขั้นตอนการทำท่า และบันทึกคำโปรดไว้ฝึกต่อ", "มีบทเรียน แบบทดสอบ และการทบทวนคำศัพท์ พร้อมเก็บความคืบหน้าในเบราว์เซอร์ หน้าฝึกกล้องใช้ดูภาพอ้างอิง โดยรุ่นเว็บยังไม่รู้จำท่า"],
    },
    cover: { src: "/images/projects/handprint.jpg", alt: { en: "HandPrint learning homepage with ASL illustrations and lesson navigation", th: "หน้าเรียน HandPrint พร้อมภาพภาษามือและเมนูบทเรียน" } },
    gallery: [],
    links: { live: "https://yoshioka1311.github.io/HandPrint/", github: "https://github.com/Yoshioka1311/HandPrint" },
  },
  {
    slug: "project-three",
    featured: true,
    title: { en: "CheckOn", th: "CheckOn" },
    year: "2026",
    role: { en: "Personal project", th: "โปรเจคส่วนตัว" },
    tools: { en: ["HTML", "CSS", "JavaScript", "Python", "PatchCore"], th: ["HTML", "CSS", "JavaScript", "Python", "PatchCore"] },
    summary: {
      en: "Explore saved visual inspection results with original images, anomaly overlays, and recorded model decisions, including missed defects and false alarms.",
      th: "เว็บดูผลทดลองตรวจหาความผิดปกติจากภาพ เปรียบเทียบภาพต้นฉบับ ภาพแสดงจุดผิดปกติ และผลที่บันทึกไว้ รวมทั้งข้อผิดพลาดของโมเดล",
    },
    details: {
      en: ["A gallery of ten recorded cases from a VisA PCB1 anomaly inspection experiment. Compare source images, prepared inputs, saved overlays, and dataset masks.", "The walkthrough keeps caught defects, missed defects, and a false alarm visible alongside the frozen threshold. It displays saved experiment outputs without running a live model."],
      th: ["รวมตัวอย่างที่บันทึกไว้ 10 เคสจากการทดลองตรวจหาความผิดปกติบนชุดข้อมูล VisA PCB1 เปรียบเทียบภาพต้นฉบับ ภาพก่อนเข้าโมเดล ภาพจุดผิดปกติ และมาสก์จากชุดข้อมูลได้", "แสดงทั้งเคสที่ตรวจพบ เคสที่พลาด และการแจ้งเตือนผิดพลาด พร้อมเกณฑ์ตัดสินที่ใช้ในการทดลอง โดยเว็บแสดงผลที่บันทึกไว้และไม่ได้รันโมเดลสด"],
    },
    cover: { src: "/images/projects/checkon.jpg", alt: { en: "CheckOn saved inspection gallery with case selection and an original inspection image", th: "หน้า CheckOn แสดงรายการเคสและภาพต้นฉบับจากผลตรวจที่บันทึกไว้" } },
    gallery: [],
    links: { live: "https://yoshioka1311.github.io/CheckOn/", github: "https://github.com/Yoshioka1311/CheckOn" },
  },
];

export function isPlaceholder(value: string): boolean {
  return value.trim().startsWith("[") && value.trim().endsWith("]");
}

export function getRouteTitle(pathname: string, locale: Locale): string {
  if (pathname === "/") return copy[locale].nav.home;
  if (pathname === "/work") return copy[locale].nav.work;
  if (pathname === "/about") return copy[locale].nav.about;
  if (pathname === "/contact") return copy[locale].nav.contact;
  const projectMatch = projects.find((item) => pathname === `/work/${item.slug}`);
  return projectMatch?.title[locale] ?? copy[locale].notFound.title;
}
