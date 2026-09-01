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
      label: 'Module 2: Your Agentic IaC Workstation',
      items: [
        'm02-your-workstation/lesson',
        'm02-your-workstation/lab',
        'm02-your-workstation/reference',
        'm02-your-workstation/projects',
        'm02-your-workstation/quiz',
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
      label: 'Module 5: MCP and the Tool Layer',
      items: [
        'm05-mcp-tool-layer/lesson',
        'm05-mcp-tool-layer/lab',
        'm05-mcp-tool-layer/reference',
        'm05-mcp-tool-layer/projects',
        'm05-mcp-tool-layer/quiz',
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
    {
      type: 'category',
      label: 'Module 7: Spec-Driven Infrastructure',
      items: [
        'm07-spec-driven-infra/lesson',
        'm07-spec-driven-infra/lab',
        'm07-spec-driven-infra/reference',
        'm07-spec-driven-infra/projects',
        'm07-spec-driven-infra/quiz',
      ],
    },
    {
      type: 'category',
      label: 'Module 8: Harness Engineering',
      items: [
        'm08-harness-engineering/lesson',
        'm08-harness-engineering/lab',
        'm08-harness-engineering/reference',
        'm08-harness-engineering/projects',
        'm08-harness-engineering/quiz',
      ],
    },
    {
      type: 'category',
      label: 'Module 9: Verifying AI-Generated Infrastructure',
      items: [
        'm09-verifying-ai-infra/lesson',
        'm09-verifying-ai-infra/lab',
        'm09-verifying-ai-infra/reference',
        'm09-verifying-ai-infra/projects',
        'm09-verifying-ai-infra/quiz',
      ],
    },
    {
      type: 'category',
      label: 'Module 10: Agentic Kubernetes and Platform IaC',
      items: [
        'm10-agentic-kubernetes/lesson',
        'm10-agentic-kubernetes/lab',
        'm10-agentic-kubernetes/reference',
        'm10-agentic-kubernetes/projects',
        'm10-agentic-kubernetes/quiz',
      ],
    },
    {
      type: 'category',
      label: 'Module 11: Agentic GitOps and Pipelines',
      items: [
        'm11-agentic-gitops/lesson',
        'm11-agentic-gitops/lab',
        'm11-agentic-gitops/reference',
        'm11-agentic-gitops/projects',
        'm11-agentic-gitops/quiz',
      ],
    },
    {
      type: 'category',
      label: 'Module 12: Loop Engineering, Multi-Agent Ops, Economics',
      items: [
        'm12-loop-multiagent-economics/lesson',
        'm12-loop-multiagent-economics/lab',
        'm12-loop-multiagent-economics/reference',
        'm12-loop-multiagent-economics/projects',
        'm12-loop-multiagent-economics/quiz',
      ],
    },
  ],
};

export default sidebars;
