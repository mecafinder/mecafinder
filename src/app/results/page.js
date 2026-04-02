"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function getProductVisual(type) {
  switch (type) {
    case "plaquette":
      return {
        icon: "🟫",
        title: "Plaquettes de frein",
        gradient: "linear-gradient(135deg, #1b2236 0%, #0f172a 100%)",
      };
    case "disque":
      return {
        icon: "⚙️",
        title: "Disque de frein",
        gradient: "linear-gradient(135deg, #1d2438 0%, #111827 100%)",
      };
    case "amortisseur":
      return {
        icon: "🛞",
        title: "Amortisseur",
        gradient: "linear-gradient(135deg, #1b233a 0%, #0b1220 100%)",
      };
    case "batterie":
      return {
        icon: "🔋",
        title: "Batterie auto",
        gradient: "linear-gradient(135deg, #1f2b3d 0%, #0f172a 100%)",
      };
    default:
      return {
        icon: "🔧",
        title: "Pièce auto",
        gradient: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
      };
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
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 24px 80px",
        color: "white",
      }}
    >
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginBottom: "24px",
          color: "#ff8a00",
          fontWeight: 800,
          textDecoration: "none",
          fontSize: "18px",
        }}
      >
        ← Retour
      </Link>

      <h1 style={{ fontSize: "64px", margin: "0 0 20px", fontWeight: 900 }}>
        Résultats 🔎
      </h1>

      <p
        style={{
          fontSize: "20px",
          color: "#cfd6e4",
          marginBottom: "28px",
        }}
      >
        Recherche demandée : <strong>{query}</strong>
      </p>

      {filtered.length === 0 ? (
        <div
          style={{
            background: "rgba(18, 24, 38, 0.92)",
            border: "1px solid rgba(73, 97, 135, 0.28)",
            borderRadius: "24px",
            padding: "28px",
          }}
        >
          <h2 style={{ fontSize: "30px", marginBottom: "12px" }}>
            Aucun résultat trouvé 😢
          </h2>
          <p style={{ fontSize: "20px", color: "#dbe2ee", lineHeight: 1.6 }}>
            Essaie avec : disque clio, plaquette clio, amortisseur clio,
            batterie peugeot.
          </p>
        </div>
      ) : (
        filtered.map((item, index) => {
          const visual = getProductVisual(item.type);

          return (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "340px 1fr",
                gap: "24px",
                background: "rgba(18, 24, 38, 0.92)",
                border: "1px solid rgba(73, 97, 135, 0.28)",
                borderRadius: "24px",
                padding: "22px",
                boxShadow: "0 14px 40px rgba(0, 0, 0, 0.28)",
                marginTop: "24px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  minHeight: "260px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: visual.gradient,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "14px",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    background: "linear-gradient(135deg, #ff8a00, #ff5e00)",
                    color: "white",
                    fontWeight: 900,
                    fontSize: "16px",
                    padding: "10px 14px",
                    borderRadius: "999px",
                  }}
                >
                  {item.discount}
                </span>

                <div style={{ fontSize: "84px", lineHeight: 1 }}>
                  {visual.icon}
                </div>

                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 900,
                    color: "white",
                  }}
                >
                  {visual.title}
                </div>

                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#cfd6e4",
                  }}
                >
                  {item.compatibility}
                </div>

                <div
                  style={{
                    marginTop: "6px",
                    fontSize: "14px",
                    color: "#8fa1c2",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.brand}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      background: "rgba(255, 138, 0, 0.16)",
                      color: "#ff9d2f",
                      fontWeight: 800,
                      fontSize: "14px",
                      padding: "8px 14px",
                      borderRadius: "999px",
                    }}
                  >
                    {index === 0 ? "🔥 Meilleur prix" : "Résultat"}
                  </span>

                  <span
                    style={{
                      color: "#c8d2e3",
                      fontWeight: 700,
                      fontSize: "18px",
                    }}
                  >
                    {item.source}
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: "26px",
                    margin: "12px 0 10px",
                    fontWeight: 900,
                  }}
                >
                  {item.name}
                </h2>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    margin: "8px 0 14px",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>⭐⭐⭐⭐☆</span>
                  <span
                    style={{
                      color: "#d5dbea",
                      fontWeight: 600,
                      fontSize: "18px",
                    }}
                  >
                    {item.rating}/5
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    margin: "10px 0 18px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "38px",
                      fontWeight: 900,
                      color: "white",
                    }}
                  >
                    {item.price}
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#8f99ad",
                      textDecoration: "line-through",
                    }}
                  >
                    {item.oldPrice}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      background: "rgba(90, 107, 143, 0.2)",
                      border: "1px solid rgba(90, 107, 143, 0.3)",
                      color: "#d9e2f2",
                      padding: "8px 12px",
                      borderRadius: "999px",
                      fontSize: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Marque : {item.brand}
                  </span>

                  <span
                    style={{
                      background: "rgba(90, 107, 143, 0.2)",
                      border: "1px solid rgba(90, 107, 143, 0.3)",
                      color: "#d9e2f2",
                      padding: "8px 12px",
                      borderRadius: "999px",
                      fontSize: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Compatible : {item.compatibility}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "20px",
                    lineHeight: 1.6,
                    color: "#dbe2ee",
                    marginBottom: "12px",
                  }}
                >
                  {item.description}
                </p>

                <p
                  style={{
                    color: "#9fe870",
                    fontWeight: 700,
                    marginBottom: "12px",
                    fontSize: "16px",
                  }}
                >
                  {item.delivery}
                </p>

                <p
                  style={{
                    color: "#ff5e00",
                    fontWeight: 800,
                    marginBottom: "16px",
                    fontSize: "16px",
                  }}
                >
                  ⚡ Plus que 3 en stock
                </p>

                <a href={item.link} target="_blank" rel="noreferrer">
                  <button
                    style={{
                      width: "100%",
                      border: "none",
                      background: "linear-gradient(135deg, #ff8a00, #ff6a00)",
                      color: "white",
                      fontSize: "20px",
                      fontWeight: 800,
                      padding: "18px 22px",
                      borderRadius: "18px",
                      cursor: "pointer",
                    }}
                  >
                    Voir l’offre
                  </button>
                </a>
              </div>
            </div>
          );
        })
      )}
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<main style={{ padding: 40, color: "white" }}>Chargement...</main>}>
      <ResultsContent />
    </Suspense>
  );
}