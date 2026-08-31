import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Agentic Infrastructure as Code',
  tagline: 'Build real infra with Claude Code & Codex: Agent Skills, MCP, spec-driven Terraform, guardrails & GitOps.',
  favicon: 'img/favicon.ico',

  url: 'https://schoolofdevops.github.io',
  baseUrl: '/310-agentic-iac-site/',
  organizationName: 'schoolofdevops',
  projectName: '310-agentic-iac',

  onBrokenLinks: 'throw',

  future: { v4: true, faster: true },

  i18n: { defaultLocale: 'en', locales: ['en'] },

  markdown: { mermaid: true, hooks: { onBrokenMarkdownLinks: 'warn' } },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    ['classic', {
      docs: { sidebarPath: './sidebars.ts', routeBasePath: 'docs' },
      blog: false,
      theme: { customCss: './src/css/custom.css' },
    } satisfies Preset.Options],
  ],

  themeConfig: {
    navbar: {
      title: 'Agentic Infrastructure as Code',
      items: [
        { type: 'docSidebar', sidebarId: 'courseSidebar', position: 'left', label: 'Course' },
        { to: '/docs/course-build-status', label: 'Build Status', position: 'left' },
        { href: 'https://github.com/schoolofdevops/310-agentic-iac-labs', label: 'Labs (GitHub)', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        { title: 'Course', items: [{ label: 'Introduction', to: '/docs/intro' }] },
        { title: 'School of DevOps & AI', items: [
          { label: 'GitHub', href: 'https://github.com/schoolofdevops' },
        ]},
      ],
      copyright: `Copyright © ${new Date().getFullYear()} School of DevOps & AI. Built with Docusaurus.`,
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  } satisfies Preset.ThemeConfig,
};

export default config;
