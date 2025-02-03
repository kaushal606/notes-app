export interface ChatCompletion {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Choice[];
    usage: Usage;
    systemFingerprint: string;
    xGroq: { id: string };
  }
  
  interface Choice {
    index: number;
    message: Message;
    logprobs: any;
    finishReason: string;
  }
  
  interface Message {
    role: string;
    content: string;
  }
  
  interface Usage {
    queueTime: number;
    promptTokens: number;
    promptTime: number;
    completionTokens: number;
    completionTime: number;
    totalTokens: number;
    totalTime: number;
  }