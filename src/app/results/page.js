"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase().trim() || "";

  const products = [
    {
      name: "Disque de frein Clio 4",
      price: "49,90 €",
      oldPrice: "59,90 €",
      source: "Oscaro",
      type: "disque",
      brand: "renault",
      model: "clio 4",
      description: "Pièce compatible avec Clio 4",
      link: "https://www.oscaro.com/",
    },
    {
      name: "Plaquettes de frein Clio 4",
      price: "29,90 €",
      oldPrice: "39,90 €",
      source: "Amazon",
      type: "plaquette",
      brand: "renault",
      model: "clio 4",
      description: "Jeu de plaquettes pour Clio 4",
      link: "https://www.amazon.fr/",
    },
    {
      name: "Amortisseur Clio 4",
      price: "89,90 €",
      oldPrice: "109,90 €",
      source: "Norauto",
      type: "amortisseur",
      brand: "renault",
      model: "clio 4",
      description: "Amortisseur Clio 4",
      link: "https://www.norauto.fr/",
    },
    {
      name: "Batterie Peugeot 208",
      price: "79,90 €",
      oldPrice: "95,90 €",
      source: "Feu Vert",
      type: "batterie",
      brand: "peugeot",
      model: "208",
      description: "Batterie Peugeot",
      link: "https://www.feuvert.fr/",
    },
  ];

  const words = query.split(" ").filter(Boolean);

  // détecter type recherché
  const types = ["disque", "plaquette", "amortisseur", "batterie", "volant"];
  const searchedType = types.find((t) => query.includes(t));

  const filtered = products.filter((product) => {
    // si type trouvé → filtrer strictement
    if (searchedType && product.type !== searchedType) return false;

    const text = `${product.name} ${product.brand} ${product.model}`.toLowerCase();

    return words.every((word) => text.includes(word));
  });

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
        <div className="result-card">
          <h2>Aucun résultat trouvé 😢</h2>
        </div>
      ) : (
        filtered.map((item, index) => (
          <div key={index} className="result-card">
            <div className="result-top">
              <span className="best-badge">
                {index === 0 ? "Meilleur match" : "Résultat"}
              </span>
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