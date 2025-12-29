const SERP_API_KEY = "e60ebeb762be200deea6e063b62dccd12338f8af25cf097e27e6fbe1b4a600b7";

// Centre de Kinshasa (biais géographique)
const KIN_LAT = -4.325;
const KIN_LNG = 15.322;

async function geocodePlace(placeName) {
    const url = new URL("https://serpapi.com/search");

    url.search = new URLSearchParams({
        engine: "google_maps",
        q: placeName,
        type: "search",

        // Restriction géographique
        ll: `@${KIN_LAT},${KIN_LNG},12z`, // zoom ville
        google_domain: "google.cd",
        hl: "fr",
        gl: "cd",

        api_key: SERP_API_KEY
    });

    const response = await fetch(url);
    const data = await response.json();

    if (
        data.place_results &&
        data.place_results.gps_coordinates
    ) {
        const gps = data.place_results.gps_coordinates;
        return {
            name: data.place_results.title,
            latitude: gps.latitude,
            longitude: gps.longitude
        };
    }

    throw new Error(`Lieu non trouvé à Kinshasa : ${placeName}`);
}

async function main() {
    try {
        const victoire = await geocodePlace("Rond-Point de la Victoire");
        const gare = await geocodePlace("Place de La Gare Centrale");

        console.log("Départ :", victoire);
        console.log("Arrivée :", gare);
    } catch (err) {
        console.error("Erreur :", err.message);
    }
}

main();
