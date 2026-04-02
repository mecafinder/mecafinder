"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const products = [
    {
      name: "Disque de frein Clio 4",
      price: "49,90 €",
      oldPrice: "59,90 €",
      source: "Oscaro",
      type: "disque",
      car: "clio",
      tag: "Meilleur prix",
      link: "https://www.oscaro.com/",
    },
    {
      name: "Plaquette Clio 4",
      price: "29,90 €",
      oldPrice: "39,90 €",
      source: "Amazon",
      type: "plaquette",
      car: "clio",
      tag: "Top vente",
      link: "https://www.amazon.fr/",
    },
    {
      name: "Amortisseur Clio 4",
      price: "89,90 €",
      oldPrice: "99,90 €",
      source: "Norauto",
      type: "amortisseur",
      car: "clio",
      tag: "Bon plan",
      link: "https://www.norauto.fr/",
    },
    {
      name: "Disque de frein Peugeot 308",
      price: "59,90 €",
      oldPrice: "69,90 €",
      source: "Autodoc",
      type: "disque",
      car: "peugeot",
      tag: "En promo",
      link: "https://www.autodoc.fr/",
    },
  ];

  const filtered = products.filter((p) => {
    const words = query.split(" ");

    const matchType = words.some((word) => p.type.includes(word));
    const matchCar = words.some((word) => p.car.includes(word));

    return matchType && (matchCar || words.length === 1);
  });

  return (
    <main className="results-page">
      <div className="results-header">
        <Link href="/" className="back-link">← Retour</Link>

        <h1>Résultats 🔎</h1>
        <p className="subtitle">
          Recherche demandée : <strong>{query}</strong>
        </p>
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <h3>Aucun résultat trouvé</h3>
          <p>Essaie avec un autre mot-clé comme disque, plaquette ou amortisseur.</p>
        </div>
      )}

      <div className="results-grid">
        {filtered.map((item, index) => (
          <div key={index} className="product-card">
            <div className="product-top">
              <span className="product-tag">{item.tag}</span>
              <span className="product-source">{item.source}</span>
            </div>

            <h3 className="product-title">{item.name}</h3>

            <div className="price-box">
              <span className="current-price">{item.price}</span>
              <span className="old-price">{item.oldPrice}</span>
            </div>

            <p className="product-desc">
              Pièce compatible avec recherche demandée. Offre disponible chez {item.source}.
            </p>

            <a href={item.link} target="_blank" rel="noreferrer" className="offer-link">
              <button className="offer-button">Voir l’offre</button>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}