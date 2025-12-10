import { get } from '../api';
import type { PipelineDefinition } from './types';

interface ExampleApiResponse {
  ok: boolean;
  message: string;
  timestamp: number;
}

interface DemoPipelineInput {
  refresh?: boolean;
}

export interface DemoPipelineOutput {
  uppercasedMessage: string;
  timestamp: number;
}

export const demoPipeline: PipelineDefinition<DemoPipelineInput, DemoPipelineOutput> = {
  id: 'demo:example-api',
  description: 'Fetch example-api.json, transform message and expose it to the UI.',
  run: async (_input, ctx) => {
    ctx.track('demo_pipeline_fetch_start');
    const data = await get<ExampleApiResponse>('/mock/example-api.json');
    ctx.track('demo_pipeline_fetch_success', { timestamp: data.timestamp });
    const uppercasedMessage = data.message.toUpperCase();
    ctx.track('demo_pipeline_transform', { messageLength: data.message.length });
    return {
      uppercasedMessage,
      timestamp: data.timestamp,
    };
  },
};

