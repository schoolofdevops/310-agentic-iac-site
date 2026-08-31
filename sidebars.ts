import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  courseSidebar: [
    'intro',
    'course-build-status',
    {
      type: 'category',
      label: 'Module 1: From ClickOps to Agents',
      items: [
        'm01-clickops-to-agents/lesson',
        'm01-clickops-to-agents/lab',
        'm01-clickops-to-agents/reference',
        'm01-clickops-to-agents/projects',
        'm01-clickops-to-agents/quiz',
      ],
    },
  ],
};

export default sidebars;
