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
    {
      type: 'category',
      label: 'Module 3: Context Engineering for Infrastructure',
      items: [
        'm03-context-engineering/lesson',
        'm03-context-engineering/lab',
        'm03-context-engineering/reference',
        'm03-context-engineering/projects',
        'm03-context-engineering/quiz',
      ],
    },
  ],
};

export default sidebars;
