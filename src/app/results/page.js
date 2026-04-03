"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function ResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.trim() || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/parts?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
      setLoading(false);
    }

    if (query) fetchData();
  }, [query]);

  return (
    <main style={{ padding: 40, color: "white" }}>
      <Link href="/">← Retour</Link>

      <h1 style={{ fontSize: 48 }}>Résultats</h1>

      <p>Recherche : <strong>{query}</strong></p>

      {loading && <p>Chargement...</p>}

      {!loading && results.map((item) => (
        <div key={item.id} style={{ marginTop: 20, padding: 20, background: "#111", borderRadius: 10 }}>
          <h2>{item.name}</h2>
          <p>{item.price} €</p>
          <p>{item.source}</p>

          <a href={item.link} target="_blank">
            <button style={{ background: "orange", padding: 10 }}>
              Voir l’offre
            </button>
          </a>
        </div>
      ))}
    </main>
  );
}

export default function Page() {
  return (
    <Suspense>
      <ResultsContent />
    </Suspense>
  );
}