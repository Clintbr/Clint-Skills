# RAG Evaluation: Metriken, Test-Datensätze & Frameworks

## 1. Das Ragas Evaluations-Framework

### A. Context Precision
Misst, ob relevante Chunks an den vordersten Positionen im Kontextfenster stehen.
$$\text{Context Precision@K} = \frac{\sum_{k=1}^K (\text{Precision@k} \times v_k)}{\text{Gesamtzahl relevanter Chunks in Top K}}$$
Wobei $v_k \in \{0, 1\}$ angibt, ob Chunk an Rang $k$ relevant ist.

### B. Context Recall
Misst, wie viele Fakten der Ground-Truth-Antwort durch die abgerufenen Chunks belegt werden können:
$$\text{Context Recall} = \frac{|\text{Belegte Sätze der Ground Truth}|}{|\text{Gesamtzahl Sätze der Ground Truth}|}$$

### C. Faithfulness (Groundedness)
Verhindert Halluzinationen. Misst den Anteil der Aussagen in der Antwort, die direkt aus dem Kontext abgeleitet werden können:
$$\text{Faithfulness} = \frac{|\text{Aussagen, die durch Kontext belegt sind}|}{|\text{Gesamtzahl Aussagen in der Antwort}|}$$

## 2. Test-Set Generierung
- Generiere synthetische Frage-Antwort-Paare mit Evolution (Simple, Reasoning, Multi-Context).
- Pflege einen "Gold Standard" Datensatz mit mindestens 50 repräsentativen Expertenfragen für CI/CD-Regressionstests.

