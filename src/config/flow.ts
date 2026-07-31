/**
 * 依頼の流れ と お約束。
 *
 * ▼ 内容の編集
 *   実データは src/data/flow.json にあります。
 *   管理画面（/admin/）の「依頼の流れ」から編集できます。
 */

import flowData from '../data/flow.json';

export interface FlowStep {
  title: string;
  body: string;
}

interface FlowData {
  steps: FlowStep[];
  assurances: string[];
}

const data = flowData as FlowData;

export const flowSteps = data.steps;
export const assurances = data.assurances;
