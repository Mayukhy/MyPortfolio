import { Code, Github, Linkedin, ShoppingCart, Twitter } from "lucide-react";

  // All available themes (30 total)
  export const allThemes = [
    { name: "warm", emoji: "🔥", desc: "Warm" },
    { name: "cool", emoji: "❄️", desc: "Cool" },
    { name: "neutral", emoji: "⚪", desc: "Neutral" },
    { name: "vibrant", emoji: "🌈", desc: "Vibrant" },
    { name: "pastel", emoji: "🌸", desc: "Pastel" },
    { name: "monochrome", emoji: "⚫", desc: "Monochrome" },
    { name: "sunset", emoji: "🌅", desc: "Sunset" },
    { name: "midnight", emoji: "🌙", desc: "Midnight" },
    { name: "trees", emoji: "🌲", desc: "Trees" },
    { name: "desert", emoji: "🏜️", desc: "Desert" },
    { name: "aurora", emoji: "🌌", desc: "Aurora" },
    { name: "neon", emoji: "💫", desc: "Neon" },
    { name: "spring", emoji: "🌱", desc: "Spring" },
    { name: "summer", emoji: "☀️", desc: "Summer" },
    { name: "autumn", emoji: "🍂", desc: "Autumn" },
    { name: "winter", emoji: "❄️", desc: "Winter" },
    { name: "cosmic", emoji: "🌠", desc: "Cosmic" },
    { name: "galaxy", emoji: "🌌", desc: "Galaxy" },
    { name: "ocean", emoji: "🌊", desc: "Ocean" },
    { name: "mountain", emoji: "⛰️", desc: "Mountain" },
    { name: "city", emoji: "🏙️", desc: "City" },
    { name: "vintage", emoji: "📷", desc: "Vintage" },
    { name: "retro", emoji: "🎮", desc: "Retro" },
    { name: "cyberpunk", emoji: "🤖", desc: "Cyberpunk" },
    { name: "steampunk", emoji: "⚙️", desc: "Steampunk" },
    { name: "minimalist", emoji: "⬜", desc: "Minimalist" },
    { name: "luxury", emoji: "💎", desc: "Luxury" },
    { name: "rustic", emoji: "🪵", desc: "Rustic" },
    { name: "tropical", emoji: "🌴", desc: "Tropical" },
    { name: "arctic", emoji: "🧊", desc: "Arctic" },
    { name: "sahara", emoji: "🏜️", desc: "Sahara" },
    { name: "forest", emoji: "🌳", desc: "Forest" },
    { name: "cafe", emoji: "☕", desc: "Cafe" },
  ];

  // Navigation items
  export const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ]

  // Projects
  export const projects = [
    {
      id: 1,
      title: "Das Entertainment",
      description: "A Movie and TV show streaming platform with movie details and ratings.",
      image: "/projects/movie.png",
      technologies: ["React", "JavaScript", "SCSS", "TMDB API"],
      liveUrl: "https://dasentertainment.netlify.app",
      githubUrl: "https://github.com/Mayukhy/Movieapp-Das-Entertainment-using-React-Redux",
      featured: true,
    },
    {
      id: 2,
      title: "Tv Experience",
      description: "A tv play app with channels, drag-and-drop functionality for channels categories",
      image: "/projects/tv.png",
      technologies: ["React", "Node.js", "Material UI", "Tailwind CSS"],
      liveUrl: "https://tv-remote-channels.netlify.app",
      githubUrl: "https://github.com/Mayukhy/React-Real-TV-experiance",
      featured: true
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A creative portfolio website showcasing projects with smooth animations and modern design principles.",
      image: "/projects/portfolio.png",
      technologies: ["Next.js", "Framer Motion", "TypeScript", "Tailwind CSS", "GSAP"],
      liveUrl: "https://mayukh-das.vercel.app",
      githubUrl: "https://github.com/Mayukhy/Portfolio-Website",
      featured: false,
    },
    {
      id: 4,
      title: "Google Form Clone",
      description: "A google form clone with google form features.",
      image: "/projects/gform.png",
      technologies: ["React", "Node.js", "JavaScript", "Material UI", "MERN Stack"],
      liveUrl: "https://googleformclonemayukh.netlify.app",
      githubUrl: "https://github.com/Mayukhy/Google-Form-clone",
      featured: false,
    },
    {
      id: 5,
      title: "Media Connect",
      description: "A social media platform with user authentication, and content sharing capabilities.",
      image: "/projects/media.png",
      technologies: ["React", "Sanity", "Tailwind CSS"],
      liveUrl: "https://mediaconnect2023.netlify.app",
      githubUrl: "https://github.com/Mayukhy/MediaConnect-Full-Stack-Media-Application",
      featured: false,
    },
    {
      id: 6,
      title: "EHS Ecommerce",
      description: "Designed and developed a client-designer interaction workflow, enabling clients to collaborate with designers more effectively, in real time",
      image: "/projects/ehs.jpg",
      technologies: ["MERN", "WebSocket", "Socket.io", "Tailwind CSS", "Material UI"],
      liveUrl: "https://stencii.com",
      githubUrl: "https://github.com/ehsprints21",
      featured: false,
      asociatedWith: ["EHS Paints", "EHS Prints"],
    },
    {
      id: 7,
      title: "YT AI Application",
      description: "An AI-powered Video/ Studio with AI companion intelligent response generation.",
      image: "/projects/aiyt.jpg",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Replicate", "NeonDB", "Postgres", "Node.js", "MUX"],
      demoVideo: "https://www.loom.com/share/0c036366aedf4c4caacce0ceaaac3702?sid=ea331188-23f2-431b-89ba-9d5fc808bbbf",
      featured: false,
    },
    {
      id: 8,
      title: "Escentric Molecules",
      description: "A Shopify store with a custom theme for client's perfumery brand business.",
      image: "/projects/esm.png",
      technologies: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      liveUrl: "https://www.escentric.com",
      featured: false,
      asociatedWith: ["Tech Mahindra", "TechM"],
    },
    {
      id: 9,
      title: "Jewells",
      description: "A Shopify store with a custom theme for client's jewellery business.",
      image: "/projects/jewells.png",
      technologies: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      liveUrl: "https://jewells.com",
      featured: false,
      asociatedWith: ["Tech Mahindra", "TechM"],
    }
  ]

  // Filter Tags
  export const filterTags = ["All", "Shopify", "React", "Next.js", "Node.js", "MERN", "TypeScript"]

  // Experiences
  export const experiences = [
    {
      company: "Tech Mahindra",
      position: "Software Engineer",
      location: "Kolkata, India",
      duration: "March 2025 - Current",
      icon: ShoppingCart,
      highlights: [
        "Worked with end-to-end development on luxury Shopify stores, including Escentric Molecules, Jewells, Metamark, Chelsea Peers and more, delivering fully customized e-commerce experiences aligned with each brand's premium positioning.",
        "Custom Feature Implementation: Developed free gifts with purchase logic based on cart value or product combinations.",
        "Built a dynamic free sample allocation system that adjusted in real-time based on cart quantity.",
        "Created advanced cart and checkout logic for gifting, product bundling, and promotions tailored to specific customer behaviors.",
        "Theme Development & Customization: Extended Shopify's default themes with custom Liquid templates, JavaScript, and Shopify Scripts, enabling features not available out-of-the-box.",
        "UI/UX Design Integration: Collaborated closely with design teams to implement elegant, intuitive interfaces that matched the luxury feel of each brand.",
        "Mobile Optimization & Performance Tuning: Delivered fully responsive designs across all screen sizes and conducted in-depth cross-browser and cross-device QA testing.",
        "Cross-Functional Collaboration: Worked with product managers, designers, and QA to translate business goals into seamless digital experiences."
      ]
    },
    {
      company: "Tech Mahindra",
      position: "Associate Software Engineer",
      location: "Kolkata, India",
      duration: "March 2024 - March 2025",
      icon: ShoppingCart,
      highlights: [
        "Contributed to the development of high-end Shopify stores like Escentric Molecules and Chelsea Peers.",
        "Built custom features such as free gifts based on cart value and product combinations.",
        "Implemented dynamic sample allocation logic that updated in real-time with cart changes.",
        "Customized Shopify themes using Liquid, JavaScript, and Shopify Scripts.",
        "Ensured mobile responsiveness and performed cross-browser/device testing.",
        "Worked closely with cross-functional teams to deliver features aligned with business needs."
      ]
    },
    {
      company: "EHS Prints",
      position: "MERN Developer",
      location: "Remote, India",
      duration: "November 2023 - February 2024",
      icon: Code,
      highlights: [
        "Implemented new features to enhance the functionality and overall user experience of the company's web platform.",
        "Designed and developed a client-designer interaction workflow, enabling clients to collaborate with designers more effectively, in real time.",
        "Built an interactive instruction form, allowing clients to submit design briefs and visualize their instructions through a responsive UI, improving clarity, and reducing back-and-forth revisions.",
        "Worked with the MERN stack (MongoDB, Express, React.js, Node.js) to build a scalable and maintainable application structure."
      ]
    }
  ]
  
  // Social Links
  export const socialLinks = [
    { icon: Github, href: "https://github.com/Mayukhy", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mayukh-das-536185238", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/MayukhDas_2000", label: "Twitter" },
  ]

  // Emojisphere configurations for different sections
  export const emojiConfigs = {
    hero: {
      emojis: ["👏", "✨", "💖", "🎉", "🎊", "🎈"],
      description: "Appreciation vibes"
    },
    about: {
      emojis: ["👨‍💻", "🧐", "🔍️", "💡", "💻", "💬", "✏️"],
      description: "Coding & Dev vibes"
    },
    projects: {
      emojis: ["🔍️", "🧩", "💻", "📁", "📌", "🚀", "📱"],
      description: "Library & Tools"
    },
    testimonials: {
      emojis: ["🙏", "🌟", "💬", "💝", "🤝", "👍"],
      description: "Gratitude & Praise"
    },
    contact: {
      emojis: ["💬", "📞", "📱", "✏️", "🤙", "💬", "📧"],
      description: "Contact & Feedback"
    },
    achievements: {
      emojis: ["🏆", "🎉", "🎖️", "🔖", "🎗️", "🎯"],
      description: "Achievements & Awards"
    },
    experience: {
      emojis: ["💼", "🚀", "⚡", "🎯", "📈", "🔧"],
      description: "Work Experience"
    }
  }