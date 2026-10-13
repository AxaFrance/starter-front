/**
 * Types for Axe Core violations and results
 */

export interface AxeNode {
  html: string;
  target: string[];
  failureSummary?: string;
}

export type ImpactLevel = 'critical' | 'serious' | 'moderate' | 'minor';

export interface AxeViolation {
  id: string;
  impact: ImpactLevel;
  description: string;
  help: string;
  helpUrl: string;
  nodes: AxeNode[];
  tags: string[];
}

export interface AxePass {
  id: string;
  impact?: ImpactLevel;
  description: string;
  help: string;
  helpUrl: string;
  nodes: AxeNode[];
  tags: string[];
}

export interface AxeIncomplete {
  id: string;
  impact?: ImpactLevel;
  description: string;
  help: string;
  helpUrl: string;
  nodes: AxeNode[];
  tags: string[];
}

export interface AxeInapplicable {
  id: string;
  description: string;
  help: string;
  helpUrl: string;
  tags: string[];
}

export interface AxeResults {
  violations: AxeViolation[];
  passes: AxePass[];
  incomplete: AxeIncomplete[];
  inapplicable: AxeInapplicable[];
  timestamp: string;
  url: string;
}
