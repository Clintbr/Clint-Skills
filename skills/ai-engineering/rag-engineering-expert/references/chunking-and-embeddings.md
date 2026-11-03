# Chunking Strategies & Embedding Model Selection

## 1. Chunking-Strategien im Vergleich

| Strategie | Chunk-Größe | Overlap | Bester Anwendungsfall | Typische Risiken |
|---|---|---|---|---|
| **Fixed Size (Tokens)** | 500 Tokens | 50 Tokens | Homogene Textkorpora | Zerschneidet Sätze oder logische Argumente |
| **Recursive Character** | 800 Zeichen | 100 Zeichen | Markdown, Wiki, Artikel | Trennt Absätze priorisiert vor Sätzen |
| **Semantic Chunking** | Variabel | N/A | Dichte Fachtexte | Höhere Latenz beim Ingestion-Schritt |
| **Parent-Child Document** | Child: 200 / Parent: 1200 | 20 Chars | Wissensdatenbanken | Höherer Speicherbedarf in Vector DB |

## 2. Embedding-Modelle (MTEB Benchmark)
- **Allrounder**: `text-embedding-3-large` (OpenAI, 1536/3072 Dimensionen, Matryoshka Repräsentationslernen).
- **Open Source / Local / Self-Hosted**:
  - `BAAI/bge-m3`: Exzellente Mehrsprachigkeit, unterstützt dichte Vektoren, sparse Vektoren und Multi-Vector ColBERT in einem Modell.
  - `nomic-embed-text-v1.5`: 8192 Context Length, dynamische Dimensionen (Matryoshka).
- **Tipp für Cross-Lingual RAG**: Immer Modelle wählen, die im MTEB Multilingual Retrieval Leaderboard mindestens 65+ NDCG@10 erreichen.

