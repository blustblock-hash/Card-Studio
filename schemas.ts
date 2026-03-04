
import { CardSchema } from '../types';

export const CARD_SCHEMAS: Record<string, CardSchema> = {
  policy: {
    type: 'policy',
    title: 'Policy Card',
    fields: [
      { id: 'code', label: 'Policy Code/ID', type: 'text', placeholder: 'e.g. POL-2024-001' },
      { id: 'title', label: 'Policy Title', type: 'text', required: true, placeholder: 'Enter policy title' },
      { id: 'statement', label: 'Policy Statement', type: 'textarea', required: true },
      { id: 'rationale', label: 'Rationale', type: 'textarea' },
      { id: 'outcomes', label: 'Intended Outcomes', type: 'bullets' },
      { id: 'stakeholders', label: 'Target Stakeholders', type: 'chips' },
      { id: 'horizon', label: 'Implementation Horizon', type: 'select', options: ['Short-term', 'Medium-term', 'Long-term'] },
      { id: 'owner', label: 'Owner/Lead Entity', type: 'text' },
      { id: 'pillar', label: 'Strategic Pillar', type: 'text' },
    ]
  },
  objective: {
    type: 'objective',
    title: 'Objective Card',
    fields: [
      { id: 'title', label: 'Objective Title', type: 'text', required: true },
      { id: 'statement', label: 'Objective Statement', type: 'textarea', required: true },
      { id: 'baseline', label: 'Baseline', type: 'text' },
      { id: 'target', label: 'Target', type: 'text' },
      { id: 'timeline', label: 'Timeline', type: 'text' },
      { id: 'pillar', label: 'Strategic Pillar', type: 'text' },
      { id: 'enablers', label: 'Key Enablers', type: 'bullets' },
    ]
  },
  'executive-summary': {
    type: 'executive-summary',
    title: 'Executive Summary Card',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', required: true },
      { id: 'context', label: 'Context', type: 'bullets' },
      { id: 'findings', label: 'Key Findings', type: 'bullets' },
      { id: 'recommendations', label: 'Recommendations', type: 'bullets' },
      { id: 'nextSteps', label: 'Next Steps', type: 'bullets' },
      { id: 'approvalLine', label: 'Approval Line', type: 'text', visibilityToggle: true },
    ]
  },
  kpi: {
    type: 'kpi',
    title: 'KPI Card',
    fields: [
      { id: 'name', label: 'KPI Name', type: 'text', required: true },
      { id: 'definition', label: 'Definition', type: 'textarea' },
      { id: 'formula', label: 'Formula', type: 'text' },
      { id: 'unit', label: 'Unit', type: 'text' },
      { id: 'baseline', label: 'Baseline', type: 'text' },
      { id: 'target', label: 'Target', type: 'text' },
      { id: 'source', label: 'Data Source', type: 'text' },
      { id: 'frequency', label: 'Frequency', type: 'select', options: ['Monthly', 'Quarterly', 'Annually'] },
      { id: 'owner', label: 'Owner', type: 'text' },
    ]
  },
  initiative: {
    type: 'initiative',
    title: 'Initiative Card',
    fields: [
      { id: 'name', label: 'Initiative Name', type: 'text', required: true },
      { id: 'objective', label: 'Objective Supported', type: 'text' },
      { id: 'scope', label: 'Scope Summary', type: 'textarea' },
      { id: 'deliverables', label: 'Key Deliverables', type: 'bullets' },
      { id: 'timeline', label: 'Timeline', type: 'text' },
      { id: 'budget', label: 'Budget', type: 'text' },
      { id: 'dependencies', label: 'Dependencies', type: 'chips' },
      { id: 'risks', label: 'Risks', type: 'bullets' },
      { id: 'status', label: 'Status (RAG)', type: 'rag' },
    ]
  },
  task: {
    type: 'task',
    title: 'Task Card',
    fields: [
      { id: 'title', label: 'Task Title', type: 'text', required: true },
      { id: 'description', label: 'Description', type: 'textarea' },
      { id: 'owner', label: 'Owner', type: 'text' },
      { id: 'dueDate', label: 'Due Date', type: 'text' },
      { id: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
      { id: 'status', label: 'Status', type: 'select', options: ['Not Started', 'In Progress', 'Completed', 'On Hold'] },
      { id: 'checklist', label: 'Checklist', type: 'bullets' },
    ]
  },
  'evidence-response': {
    type: 'evidence-response',
    title: 'Evidence-Based Response Card',
    fields: [
      { id: 'question', label: 'Question/Claim', type: 'text', required: true },
      { id: 'answer', label: 'Short Answer', type: 'textarea' },
      { id: 'evidence', label: 'Evidence Bullets', type: 'bullets' },
      { id: 'confidence', label: 'Confidence Level', type: 'select', options: ['Low', 'Medium', 'High'] },
      { id: 'notes', label: 'Notes/Caveats', type: 'textarea' },
    ]
  }
};
