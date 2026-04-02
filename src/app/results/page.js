"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function getProductEmoji(type) {
  switch (type) {
    case "plaquette":
      return "🟫";
    case "disque":
      return "⚙️";
    case "amortisseur":
      return "🛞";
    case "batterie":
      return "🔋";
    default:
      return "🔧";
  }
}

function getProductLabel(type) {
  switch (type) {
    case "plaquette":
      return "Plaquettes de frein";
    case "disque":
      return "Disque de frein";
    case "amortisseur":
      return "Amortisseur";
    case "batterie":
      return "Batterie auto";
    default:
      return "Pièce auto";
  }
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase().trim() || "";

  const products = [
    {
      name: "Plaquettes de frein Clio 4",
      price: "29,90 €",
      oldPrice: "39,90 €",
      source: "Amazon",
      type: "plaquette",
      brand: "Brembo",
      model: "clio 4",
      compatibility: "Renault Clio 4",
      delivery: "Livraison : 2 à 4 jours",
      description: "Jeu de plaquettes de frein avant, bon rapport qualité/prix.",
      rating: 4.6,
      discount: "-25%",
      link: "https://www.amazon.fr/",
    },
    {
      name: "Disque de frein Clio 4",
      price: "49,90 €",
      oldPrice: "59,90 €",
      source: "Oscaro",
      type: "disque",
      brand: "Bosch",
      model: "clio 4",
      compatibility: "Renault Clio 4",
      delivery: "Livraison : 2 à 5 jours",
      description: "Disque de frein avant compatible Clio 4.",
      rating: 4.7,
      discount: "-16%",
      link: "https://www.oscaro.com/",
    },
    {
      name: "Amortisseur Clio 4",
      price: "89,90 €",
      oldPrice: "109,90 €",
      source: "Norauto",
      type: "amortisseur",
      brand: "Monroe",
      model: "clio 4",
      compatibility: "Renault Clio 4",
      delivery: "Livraison : 3 à 5 jours",
      description: "Amortisseur compatible Clio 4.",
      rating: 4.4,
      discount: "-18%",
      link: "https://www.norauto.fr/",
    },
    {
      name: "Batterie Peugeot 208",
      price: "79,90 €",
      oldPrice: "95,90 €",
      source: "Feu Vert",
      type: "batterie",
      brand: "Varta",
      model: "208",
      compatibility: "Peugeot 208",
      delivery: "Livraison : 1 à 3 jours",
      description: "Batterie fiable prête à monter.",
      rating: 4.5,
      discount: "-17%",
      link: "https://www.feuvert.fr/",
    },
    {
      name: "Disque de frein Peugeot 308",
      price: "59,90 €",
      oldPrice: "74,90 €",
      source: "Autodoc",
      type: "disque",
      brand: "Valeo",
      model: "308",
      compatibility: "Peugeot 308",
      delivery: "Livraison : 2 à 4 jours",
      description: "Disque compatible Peugeot 308.",
      rating: 4.3,
      discount: "-20%",
      link: "https://www.autodoc.fr/",
    },
  ];

  const words = query.split(" ").filter(Boolean);
  const types = ["disque", "plaquette", "amortisseur", "batterie"];
  const searchedType = types.find((t) => query.includes(t));

  const filtered = products.filter((product) => {
    if (searchedType && product.type !== searchedType) return false;

    const text =
      `${product.name} ${product.brand} ${product.model} ${product.compatibility}`.toLowerCase();

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
        <div className="result-card pro-card">
          <div className="pro-card-content">
            <h2>Aucun résultat trouvé 😢</h2>
            <p className="result-description">
              Essaie avec : disque clio, plaquette clio, amortisseur clio,
              batterie peugeot.
            </p>
          </div>
        </div>
      ) : (
        filtered.map((item, index) => (
          <div key={index} className="result-card pro-card">
            <div className="product-image-wrap fake-product-visual">
              <span className="discount-badge">{item.discount}</span>
              <div className="fake-product-icon">{getProductEmoji(item.type)}</div>
              <div className="fake-product-title">{getProductLabel(item.type)}</div>
              <div className="fake-product-subtitle">{item.compatibility}</div>
            </div>

            <div className="pro-card-content">
              <div className="result-top pro-top">
                <span className="best-badge">
                  {index === 0 ? "🔥 Meilleur prix" : "Résultat"}
                </span>
                <span className="source-name">{item.source}</span>
              </div>

              <h2>{item.name}</h2>

              <div className="rating-row">
                <span className="stars">⭐⭐⭐⭐☆</span>
                <span className="rating-value">{item.rating}/5</span>
              </div>

              <div className="price-row">
                <span className="new-price">{item.price}</span>
                <span className="old-price">{item.oldPrice}</span>
              </div>

              <div className="product-meta">
                <span className="meta-pill">Marque : {item.brand}</span>
                <span className="meta-pill">Compatible : {item.compatibility}</span>
              </div>

              <p className="result-description">{item.description}</p>

              <p className="delivery-text">{item.delivery}</p>

              <p className="stock-alert">⚡ Plus que 3 en stock</p>

              <a href={item.link} target="_blank" rel="noreferrer">
                <button className="offer-button">Voir l’offre</button>
              </a>
            </div>
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