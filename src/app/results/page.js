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
      brand: "Renault",
      description: "Pièce compatible avec Clio 4, disponible rapidement.",
      link: "https://www.oscaro.com/",
    },
    {
      name: "Plaquettes de frein Clio 4",
      price: "29,90 €",
      oldPrice: "39,90 €",
      source: "Amazon",
      type: "plaquette",
      brand: "Renault",
      description: "Jeu de plaquettes compatible Clio 4, bon rapport qualité/prix.",
      link: "https://www.amazon.fr/",
    },
    {
      name: "Amortisseur Clio 4",
      price: "89,90 €",
      oldPrice: "109,90 €",
      source: "Norauto",
      type: "amortisseur",
      brand: "Renault",
      description: "Amortisseur avant compatible Renault Clio 4.",
      link: "https://www.norauto.fr/",
    },
    {
      name: "Batterie Peugeot 208",
      price: "79,90 €",
      oldPrice: "95,90 €",
      source: "Feu Vert",
      type: "batterie",
      brand: "Peugeot",
      description: "Batterie fiable pour Peugeot 208, prête à monter.",
      link: "https://www.feuvert.fr/",
    },
    {
      name: "Disque de frein Peugeot 308",
      price: "59,90 €",
      oldPrice: "74,90 €",
      source: "Autodoc",
      type: "disque",
      brand: "Peugeot",
      description: "Disque de frein compatible Peugeot 308.",
      link: "https://www.autodoc.fr/",
    },
    {
      name: "Volant moteur Clio 3",
      price: "179,90 €",
      oldPrice: "219,90 €",
      source: "Mister Auto",
      type: "volant",
      brand: "Renault",
      description: "Volant moteur compatible Renault Clio 3.",
      link: "https://www.mister-auto.com/",
    },
  ];

  const words = query.split(" ").filter(Boolean);

  const filtered = products.filter((product) => {
    const fullText = `
      ${product.name}
      ${product.type}
      ${product.brand}
      ${product.description}
      ${product.source}
    `.toLowerCase();

    return words.every((word) => fullText.includes(word));
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
          <p className="result-description">
            Essaie avec des mots comme disque, plaquette, amortisseur, batterie
            ou volant.
          </p>
        </div>
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