const { getDirections } = require("./direction");




function buildDirectedGraph(details) {
    const nodes = [];
    const edges = [];

    // Création des nœuds
    details.forEach((step, index) => {
        nodes.push({
            id: index,
            label: step.title
        });
    });

    // Création des arcs orientés
    for (let i = 0; i < details.length - 1; i++) {
        edges.push({
            from: i,
            to: i + 1,
            action: details[i].action,
            distance: details[i].distance,
            duration: details[i].duration
        });
    }

    return { nodes, edges };
}


async function main() {
    try {
        const route = await getDirections();
        const details = route[0].trips[0].details;
        const graph = buildDirectedGraph(details);

        console.log("Nœuds :", graph.nodes);
        console.log("Arcs :", graph.edges);

    } catch (err) {
        console.error("❌ Erreur :", err.message);
    }
}

main();