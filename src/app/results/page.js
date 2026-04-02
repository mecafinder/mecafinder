"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const products = [
    {
      name: "Disque de frein Clio 4",
      price: "49,90 €",
      oldPrice: "59,90 €",
      source: "Oscaro",
      type: "disque",
      description: "Pièce compatible avec recherche demandée. Offre disponible chez Oscaro.",
      link: "https://www.oscaro.com/",
    },
    {
      name: "Plaquette Clio 4",
      price: "29,90 €",
      oldPrice: "39,90 €",
      source: "Amazon",
      type: "plaquette",
      description: "Jeu de plaquettes pour Clio 4, bon rapport qualité/prix.",
      link: "https://www.amazon.fr/",
    },
    {
      name: "Amortisseur Clio 4",
      price: "89,90 €",
      oldPrice: "109,90 €",
      source: "Norauto",
      type: "amortisseur",
      description: "Amortisseur compatible Clio 4, offre en promotion.",
      link: "https://www.norauto.fr/",
    },
    {
      name: "Batterie Peugeot 208",
      price: "79,90 €",
      oldPrice: "95,90 €",
      source: "Feu Vert",
      type: "batterie",
      description: "Batterie auto fiable pour Peugeot, prête à monter.",
      link: "https://www.feuvert.fr/",
    },
    {
      name: "Disque de frein Peugeot 308",
      price: "59,90 €",
      oldPrice: "74,90 €",
      source: "Autodoc",
      type: "disque",
      description: "Disque de frein compatible Peugeot 308.",
      link: "https://www.autodoc.fr/",
    },
  ];

  const words = query.split(" ").filter(Boolean);

  const filtered = products.filter((product) =>
    words.some(
      (word) =>
        product.type.toLowerCase().includes(word) ||
        product.name.toLowerCase().includes(word) ||
        product.description.toLowerCase().includes(word)
    )
  );

  return (
    <main className="results-wrap">
      <Link href="/" className="back-link">
        ← Retour
      </Link>

      <h1>Résultats 🔎</h1>

      <p className="subtitle">
        Recherche demandée : <strong>{query}</strong>
      </p>

      {filtered.length === 0 ? (
        <p>Aucun résultat trouvé 😢</p>
      ) : (
        filtered.map((item, index) => (
          <div key={index} className="result-card">
            <div className="result-top">
              <span className="best-badge">Meilleur prix</span>
              <span className="source-name">{item.source}</span>
            </div>

            <h2>{item.name}</h2>

            <div className="price-row">
              <span className="new-price">{item.price}</span>
              <span className="old-price">{item.oldPrice}</span>
            </div>

            <p className="result-description">{item.description}</p>

            <a href={item.link} target="_blank" rel="noreferrer">
              <button className="offer-button">Voir l’offre</button>
            </a>
          </div>
        ))
      )}
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<main className="results-wrap">Chargement...</main>}>
      <ResultsContent />
    </Suspense>
  );
}