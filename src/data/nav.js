// ─────────────────────────────────────────────────────────────
//  Navigation + Command Palette items.
// ─────────────────────────────────────────────────────────────

import { profile } from './profile.js'

export const navLinks = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

// Items shown in the Cmd+K palette
export const paletteItems = [
  { group: 'Navigate', label: 'Home',           action: { type: 'scroll', target: 'home' } },
  { group: 'Navigate', label: 'About',          action: { type: 'scroll', target: 'about' } },
  { group: 'Navigate', label: 'Skills',         action: { type: 'scroll', target: 'skills' } },
  { group: 'Navigate', label: 'Projects',       action: { type: 'scroll', target: 'projects' } },
  { group: 'Navigate', label: 'Experience',     action: { type: 'scroll', target: 'experience' } },
  { group: 'Navigate', label: 'Certifications', action: { type: 'scroll', target: 'certifications' } },
  { group: 'Navigate', label: 'Contact',        action: { type: 'scroll', target: 'contact' } },

  { group: 'Connect',  label: 'Email Priyanshi',   action: { type: 'open', url: `mailto:${profile.email}` } },
  { group: 'Connect',  label: 'Open GitHub',       action: { type: 'open', url: profile.social.github } },
  { group: 'Connect',  label: 'Open LinkedIn',     action: { type: 'open', url: profile.social.linkedin } },
  { group: 'Connect',  label: 'Copy Email Address',action: { type: 'copy', value: profile.email } },

  { group: 'Resources',label: 'Download Resume',  action: { type: 'open', url: profile.resume } },
  { group: 'Resources',label: 'Open AI Chatbot',  action: { type: 'chatbot' } },
]
