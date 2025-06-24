import { Injectable } from '@angular/core';
import { LLM } from '../models/llm.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LlmService {
  private readonly STORAGE_KEY = 'llm-manager-storage';
  private llms: LLM[] = [];

  constructor() {
    this.initializeLLMs(); // Load from localStorage or defaults
  }

  private initializeLLMs(): void {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    this.llms = savedData ? JSON.parse(savedData) : this.getDefaultLLMs();
  }

  private getDefaultLLMs(): LLM[] {
    return [
    { id: '1', name: 'ChatGPT', version: '4', url: 'https://chat.openai.com' },
    { id: '2', name: 'Gemini', version: '1.5', url: 'https://gemini.google.com' },
    { id: '3', name: 'Claude', version: '3', url: 'https://claude.ai' },
    { id: '4', name: 'Cohere', version: 'Command', url: 'https://cohere.com' },
    { id: '5', name: 'Mistral', version: '7B', url: 'https://mistral.ai' },
    { id: '6', name: 'Llama', version: '3', url: 'https://ai.meta.com/llama' },
    { id: '7', name: 'Perplexity', version: 'Online', url: 'https://perplexity.ai' },
    { id: '8', name: 'Pi', version: '2.0', url: 'https://pi.ai' },
    { id: '9', name: 'HuggingChat', version: 'OpenAssistant', url: 'https://huggingface.co/chat' },
    { id: '10', name: 'Bing Chat', version: 'Copilot', url: 'https://www.bing.com/chat' }
    ];
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.llms));
  }

  getLLMs(): Observable<LLM[]> {
    return of([...this.llms]); 
  }

  addLLM(llm: Omit<LLM, 'id'>): Observable<LLM> {
  const newLLM = {
    id: Date.now().toString(),
    name: llm.name,
    version: llm.version,
    url: llm.url
  };
    this.llms.push(newLLM);
    this.saveToStorage(); 
    return of(newLLM);
  }

  removeLLM(id: string): Observable<void> {
    this.llms = this.llms.filter(llm => llm.id !== id);
    this.saveToStorage(); 
    return of(undefined);
  }

 async launchAllLLMs() {
  for (const llm of this.llms) {
    await new Promise(resolve => {
      const link = document.createElement('a');
      link.href = llm.url;
      link.target = '_blank';
      link.onclick = () => setTimeout(resolve, 300);
      link.click();
    });
  }
}
}