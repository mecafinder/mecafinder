"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function ResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.trim() || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`/api/parts?query=${encodeURIComponent(query)}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Réponse API invalide");
        }

        const data = await res.json();

        if (!cancelled) {
          setResults(data.results || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Impossible de charger les résultats.");
          setResults([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (query) {
      fetchData();
    } else {
      setResults([]);
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <main style={{ padding: 40, color: "white" }}>
      <Link href="/" style={{ color: "#ff8a00", textDecoration: "none", fontWeight: 700 }}>
        ← Retour
      </Link>

      <h1 style={{ fontSize: 48, marginTop: 20, marginBottom: 20 }}>Résultats</h1>

      <p style={{ fontSize: 18 }}>
        Recherche : <strong>{query}</strong>
      </p>

      {loading && <p>Chargement...</p>}

      {!loading && error && (
        <div
          style={{
            marginTop: 20,
            padding: 20,
            background: "#2a1212",
            border: "1px solid #7a2b2b",
            borderRadius: 10,
            color: "#ffb3b3",
          }}
        >
          {error}
        </div>
      )}

      {!loading && !error && results.length === 0 && (
        <div
          style={{
            marginTop: 20,
            padding: 20,
            background: "#111",
            borderRadius: 10,
          }}
        >
          Aucun résultat trouvé.
        </div>
      )}

      {!loading &&
        !error &&
        results.map((item) => (
          <div
            key={item.id}
            style={{
              marginTop: 20,
              padding: 20,
              background: "#111",
              borderRadius: 10,
              border: "1px solid #222",
            }}
          >
            <h2 style={{ marginBottom: 10 }}>{item.name}</h2>
            <p style={{ margin: "6px 0" }}>
              Prix : <strong>{item.price.toFixed(2).replace(".", ",")} €</strong>
            </p>
            <p style={{ margin: "6px 0" }}>Source : {item.source}</p>
            <p style={{ margin: "6px 0" }}>Marque : {item.brand}</p>
            <p style={{ margin: "6px 0" }}>Compatible : {item.compatibility}</p>

            <a href={item.link} target="_blank" rel="noreferrer">
              <button
                style={{
                  marginTop: 14,
                  background: "orange",
                  color: "white",
                  border: "none",
                  padding: "12px 18px",
                  borderRadius: 8,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
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
    <Suspense fallback={<main style={{ padding: 40, color: "white" }}>Chargement...</main>}>
      <ResultsContent />
    </Suspense>
  );
}