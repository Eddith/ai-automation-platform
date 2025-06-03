# 🧠 AI Automation Platform with n8n + LLM

Yapay zeka destekli otomasyon sistemidir. `n8n` üzerinde custom node'lar geliştirilerek, OpenAI gibi LLM servisleriyle entegre bir yapı kurulmuştur.

## 🚀 Özellikler

- n8n + Docker kurulumu
- Go ile yazılmış LLM Proxy (OpenAI veya yerel modellerle çalışabilir)
- Custom n8n node: AiPromptNode
- Otomatik e-posta cevaplama gibi akıllı iş akışları

## 📦 Kurulum

```bash
git clone https://github.com/ali-kullanici/ai-automation-platform.git
cd ai-automation-platform
cp .env.example .env
docker-compose up --build
```
