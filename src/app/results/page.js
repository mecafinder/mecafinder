"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

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
      brand: "renault",
      model: "clio 4",
      description: "Jeu de plaquettes pour Clio 4, bon rapport qualité/prix.",
      rating: 4.6,
      discount: "-25%",
      image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1200&auto=format&fit=crop",
      link: "https://www.amazon.fr/",
    },
    {
      name: "Disque de frein Clio 4",
      price: "49,90 €",
      oldPrice: "59,90 €",
      source: "Oscaro",
      type: "disque",
      brand: "renault",
      model: "clio 4",
      description: "Pièce compatible avec Clio 4, disponible rapidement.",
      rating: 4.7,
      discount: "-16%",
      image: "https://images.unsplash.com/photo-1613214150384-df8d2eb2c2f6?q=80&w=1200&auto=format&fit=crop",
      link: "https://www.oscaro.com/",
    },
    {
      name: "Amortisseur Clio 4",
      price: "89,90 €",
      oldPrice: "109,90 €",
      source: "Norauto",
      type: "amortisseur",
      brand: "renault",
      model: "clio 4",
      description: "Amortisseur compatible Clio 4, offre en promotion.",
      rating: 4.4,
      discount: "-18%",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1200&auto=format&fit=crop",
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
      description: "Batterie auto fiable pour Peugeot, prête à monter.",
      rating: 4.5,
      discount: "-17%",
      image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1200&auto=format&fit=crop",
      link: "https://www.feuvert.fr/",
    },
    {
      name: "Disque de frein Peugeot 308",
      price: "59,90 €",
      oldPrice: "74,90 €",
      source: "Autodoc",
      type: "disque",
      brand: "peugeot",
      model: "308",
      description: "Disque de frein compatible Peugeot 308.",
      rating: 4.3,
      discount: "-20%",
      image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1200&auto=format&fit=crop",
      link: "https://www.autodoc.fr/",
    },
    {
      name: "Volant moteur Clio 3",
      price: "179,90 €",
      oldPrice: "219,90 €",
      source: "Mister Auto",
      type: "volant",
      brand: "renault",
      model: "clio 3",
      description: "Volant moteur compatible Renault Clio 3.",
      rating: 4.2,
      discount: "-18%",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      link: "https://www.mister-auto.com/",
    },
  ];

  const words = query.split(" ").filter(Boolean);
  const types = ["disque", "plaquette", "amortisseur", "batterie", "volant"];
  const searchedType = types.find((t) => query.includes(t));

  const filtered = products.filter((product) => {
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
        <div className="result-card pro-card">
          <div className="pro-card-content">
            <h2>Aucun résultat trouvé 😢</h2>
            <p className="result-description">
              Essaie avec : disque clio, plaquette clio, amortisseur clio,
              batterie peugeot ou volant clio.
            </p>
          </div>
        </div>
      ) : (
        filtered.map((item, index) => (
          <div key={index} className="result-card pro-card">
            <div className="product-image-wrap">
              <img
                src={item.image}
                alt={item.name}
                className="product-image"
              />
              <span className="discount-badge">{item.discount}</span>
            </div>

            <div className="pro-card-content">
              <div className="result-top pro-top">
                <span className="best-badge">
                  {index === 0 ? "Meilleur match" : "Résultat"}
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

              <p className="result-description">{item.description}</p>

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