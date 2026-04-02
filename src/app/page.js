"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const suggestions = [
    "disque clio",
    "plaquette clio",
    "amortisseur clio",
    "batterie peugeot",
    "disque peugeot",
    "plaquette peugeot",
  ];

  const filteredSuggestions = useMemo(() => {
    if (!search.trim()) return [];
    return suggestions
      .filter((item) => item.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5);
  }, [search]);

  const handleSearch = (value = search) => {
    if (!value.trim()) return;
    router.push(`/results?query=${encodeURIComponent(value)}`);
  };

  return (
    <main className="home-page">
      <div className="hero-box">
        <p className="hero-badge">MecaFinder</p>

        <h1 className="hero-title">
          Trouve les meilleures pièces auto au meilleur prix
        </h1>

        <p className="hero-subtitle">
          Recherche rapidement des pièces automobiles et compare les offres disponibles en quelques secondes.
        </p>

        <div className="search-area">
          <div className="search-box">
            <input
              type="text"
              placeholder="Ex : disque de frein Clio 4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="search-input"
            />

            <button onClick={() => handleSearch()} className="search-button">
              Rechercher
            </button>
          </div>

          {filteredSuggestions.length > 0 && (
            <div className="suggestions-box">
              {filteredSuggestions.map((item, index) => (
                <button
                  key={index}
                  className="suggestion-item"
                  onClick={() => {
                    setSearch(item);
                    handleSearch(item);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="quick-search">
          <span onClick={() => setSearch("disque clio")} className="chip">Disque</span>
          <span onClick={() => setSearch("plaquette clio")} className="chip">Plaquettes</span>
          <span onClick={() => setSearch("amortisseur clio")} className="chip">Amortisseurs</span>
          <span onClick={() => setSearch("batterie peugeot")} className="chip">Batterie</span>
        </div>

        {/* SECTION CONFIANCE */}
        <div className="trust-section">
          <div className="trust-card">
            <h3>Recherche rapide</h3>
            <p>Trouve une pièce en quelques secondes grâce à une recherche simple et claire.</p>
          </div>

          <div className="trust-card">
            <h3>Comparaison facile</h3>
            <p>Compare rapidement plusieurs offres et repère le meilleur prix plus vite.</p>
          </div>

          <div className="trust-card">
            <h3>Expérience simple</h3>
            <p>Une interface propre, pensée pour aller droit au but sans complexité inutile.</p>
          </div>
        </div>

      </div>
    </main>
  );
}