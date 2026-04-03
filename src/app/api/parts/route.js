import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.toLowerCase().trim() || "";

    const products = [
      {
        id: 1,
        name: "Plaquettes de frein Clio 4",
        price: 29.9,
        oldPrice: 39.9,
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
        id: 2,
        name: "Disque de frein Clio 4",
        price: 49.9,
        oldPrice: 59.9,
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
        id: 3,
        name: "Amortisseur Clio 4",
        price: 89.9,
        oldPrice: 109.9,
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
        id: 4,
        name: "Batterie Peugeot 208",
        price: 79.9,
        oldPrice: 95.9,
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
        id: 5,
        name: "Disque de frein Peugeot 308",
        price: 59.9,
        oldPrice: 74.9,
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
      {
        id: 6,
        name: "Plaquettes de frein Peugeot 308",
        price: 34.9,
        oldPrice: 44.9,
        source: "Mister Auto",
        type: "plaquette",
        brand: "Valeo",
        model: "308",
        compatibility: "Peugeot 308",
        delivery: "Livraison : 2 à 4 jours",
        description: "Plaquettes avant compatibles Peugeot 308.",
        rating: 4.4,
        discount: "-22%",
        link: "https://www.mister-auto.com/",
      },
    ];

    const words = query.split(" ").filter(Boolean);
    const types = ["disque", "plaquette", "amortisseur", "batterie"];
    const searchedType = types.find((t) => query.includes(t));

    const filtered = products
      .filter((product) => {
        if (searchedType && product.type !== searchedType) return false;

        const text =
          `${product.name} ${product.brand} ${product.model} ${product.compatibility}`.toLowerCase();

        return words.every((word) => text.includes(word));
      })
      .sort((a, b) => a.price - b.price);

    return NextResponse.json({
      ok: true,
      query,
      total: filtered.length,
      results: filtered,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Erreur serveur API parts",
      },
      { status: 500 }
    );
  }
}
