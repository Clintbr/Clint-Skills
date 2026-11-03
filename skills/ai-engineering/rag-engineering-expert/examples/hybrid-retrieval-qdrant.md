# Production RAG Implementation: Hybrid Search mit Qdrant

```python
from qdrant_client import QdrantClient, models
from sentence_transformers import SentenceTransformer, CrossEncoder

# 1. Initialisiere Vector Store & Modelle
client = QdrantClient(host="localhost", port=6333)
dense_model = SentenceTransformer("BAAI/bge-m3")
reranker = CrossEncoder("BAAI/bge-reranker-large")

COLLECTION_NAME = "enterprise_knowledge"

def hybrid_retrieve(query_text: str, top_k: int = 5) -> list[dict]:
    # 2. Generiere dense embedding
    dense_vector = dense_model.encode(query_text).tolist()

    # 3. Hybrid Query via Qdrant Prefetch & Reciprocal Rank Fusion
    results = client.query_points(
        collection_name=COLLECTION_NAME,
        prefetch=[
            models.Prefetch(
                query=dense_vector,
                using="dense",
                limit=25
            ),
            models.Prefetch(
                query=models.SparseVector(indices=[...], values=[...]), # BM25 Sparse
                using="sparse",
                limit=25
            )
        ],
        query=models.FusionQuery(fusion=models.Fusion.RRF),
        limit=20
    )

    # 4. Reranking mit Cross-Encoder
    candidate_texts = [point.payload["text"] for point in results.points]
    pairs = [[query_text, text] for text in candidate_texts]
    rerank_scores = reranker.predict(pairs)

    ranked_candidates = sorted(
        zip(results.points, rerank_scores),
        key=lambda x: x[1],
        reverse=True
    )

    # 5. Finale Top-K Chunks mit Metadaten
    return [
        {
            "id": point.id,
            "text": point.payload["text"],
            "source": point.payload.get("source"),
            "score": float(score)
        }
        for point, score in ranked_candidates[:top_k]
    ]
```

