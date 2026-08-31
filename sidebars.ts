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
    {
      type: 'category',
      label: 'Module 4: Agent Skills for IaC',
      items: [
        'm04-agent-skills/lesson',
        'm04-agent-skills/lab',
        'm04-agent-skills/reference',
        'm04-agent-skills/projects',
        'm04-agent-skills/quiz',
      ],
    },
    {
      type: 'category',
      label: 'Module 6: Guardrails: Permissions, Hooks, Blast Radius',
      items: [
        'm06-guardrails/lesson',
        'm06-guardrails/lab',
        'm06-guardrails/reference',
        'm06-guardrails/projects',
        'm06-guardrails/quiz',
      ],
    },
  ],
};

export default sidebars;
