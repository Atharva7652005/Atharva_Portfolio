import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
  hero: {
    name: String,
    roles: [String],
    subtitle: String,
    ctaText: String,
    socialLinks: [{ platform: String, url: String }],
    codeSnippet: [String]
  },
  about: {
    bio: String,
    terminalLines: [{ prefix: String, command: String, text: String, color: String }],
    funFacts: [{ label: String, value: String }],
    profileImage: String
  },
  skills: [{
    title: String,
    skills: [{ name: String, level: Number, icon: String }]
  }],
  projects: [{
    id: String,
    title: String,
    description: String,
    techStack: [String],
    liveUrl: String,
    githubUrl: String,
    featured: Boolean
  }],
  experience: [{
    id: String,
    title: String,
    company: String,
    location: String,
    period: String,
    description: [String],
    technologies: [String]
  }],
  contact: {
    heading: String,
    subtext: String,
    location: String,
    email: String,
    socialLinks: [{ platform: String, url: String, color: String }]
  }
}, { timestamps: true });

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
