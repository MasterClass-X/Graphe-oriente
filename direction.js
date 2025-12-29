const SERP_API_KEY = "e60ebeb762be200deea6e063b62dccd12338f8af25cf097e27e6fbe1b4a600b7";

// Coordonnées obtenues à l'étape précédente

async function getDirections() {
    const url = new URL("https://serpapi.com/search");

    url.search = new URLSearchParams({
        engine: "google_maps_directions",

        // PARAMÈTRES CORRECTS
        start_addr: `Rond-Point de la Victoire, Kinshasa, République démocratique du Congo`,
        end_addr: `Place de La Gare Centrale, Kinshasa, République démocratique du Congo`,


        // Contexte RDC
        hl: "fr",
        gl: "cd",
        google_domain: "google.cd",

        api_key: SERP_API_KEY
    });

    const response = await fetch(url);
    const data = await response.json();

    const route = data.directions

    return route;
}


module.exports.getDirections = getDirections;