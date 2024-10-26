import { Request, Response } from 'express';
import axios from 'axios';

const API_PROVIDERS = {
  anthropic: {
    name: 'anthropic',
    config: {
      apiKey: process.env.ANTHROPIC_API_KEY,
      region: process.env.ANTHROPIC_REGION,
      projectId: process.env.ANTHROPIC_PROJECT_ID,
      modelId: process.env.ANTHROPIC_MODEL_ID,
      maxTokens: parseInt(process.env.ANTHROPIC_MAX_TOKENS || '1000', 10),
      temperature: parseFloat(process.env.ANTHROPIC_TEMPERATURE || '0.7'),
    },
    endpoints: new Map([
      ['generate', 'https://api.anthropic.com/v1/generate'],
    ]),
    rateLimits: {
      requestsPerMinute: parseInt(process.env.ANTHROPIC_REQUESTS_PER_MINUTE || '60', 10),
      tokensPerMinute: parseInt(process.env.ANTHROPIC_TOKENS_PER_MINUTE || '1000', 10),
    },
  },
  bedrock: {
    name: 'bedrock',
    config: {
      apiKey: process.env.BEDROCK_API_KEY,
      region: process.env.BEDROCK_REGION,
      projectId: process.env.BEDROCK_PROJECT_ID,
      modelId: process.env.BEDROCK_MODEL_ID,
      maxTokens: parseInt(process.env.BEDROCK_MAX_TOKENS || '1000', 10),
      temperature: parseFloat(process.env.BEDROCK_TEMPERATURE || '0.7'),
    },
    endpoints: new Map([
      ['generate', 'https://api.bedrock.com/v1/generate'],
    ]),
    rateLimits: {
      requestsPerMinute: parseInt(process.env.BEDROCK_REQUESTS_PER_MINUTE || '60', 10),
      tokensPerMinute: parseInt(process.env.BEDROCK_TOKENS_PER_MINUTE || '1000', 10),
    },
  },
  vertex: {
    name: 'vertex',
    config: {
      apiKey: process.env.VERTEX_API_KEY,
      region: process.env.VERTEX_REGION,
      projectId: process.env.VERTEX_PROJECT_ID,
      modelId: process.env.VERTEX_MODEL_ID,
      maxTokens: parseInt(process.env.VERTEX_MAX_TOKENS || '1000', 10),
      temperature: parseFloat(process.env.VERTEX_TEMPERATURE || '0.7'),
    },
    endpoints: new Map([
      ['generate', 'https://api.vertex.com/v1/generate'],
    ]),
    rateLimits: {
      requestsPerMinute: parseInt(process.env.VERTEX_REQUESTS_PER_MINUTE || '60', 10),
      tokensPerMinute: parseInt(process.env.VERTEX_TOKENS_PER_MINUTE || '1000', 10),
    },
  },
};

export const generateText = async (req: Request, res: Response) => {
  const { provider, prompt } = req.body;

  if (!API_PROVIDERS[provider]) {
    return res.status(400).json({ message: 'Invalid provider' });
  }

  const { config, endpoints } = API_PROVIDERS[provider];

  try {
    const response = await axios.post(endpoints.get('generate')!, {
      prompt,
      max_tokens: config.maxTokens,
      temperature: config.temperature,
    }, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate text', error: error.message });
  }
};
