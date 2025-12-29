
async function main() {

    const details = [
        {
            title: 'Prendre la direction  est  vers  Ave Kasa-Vubu',
            action: 'straight',
            distance: 75,
            duration: 50,
            formatted_distance: '75 m',
            formatted_duration: '50 s',
            icon: 'https://maps.gstatic.com/consumer/images/icons/2x/straight_grey800_18dp.png'
        },
        {
            title: 'Au rond-point, prendre  Av. De La Victoire',
            action: 'roundabout-right',
            distance: 467,
            duration: 159,
            formatted_distance: '450 m',
            formatted_duration: '3 min',
            icon: 'https://maps.gstatic.com/consumer/images/icons/2x/roundabout_grey800_18dp.png'
        },
        {
            title: 'Au rond-point, prendre la  2e  sortie et continuer sur  Av. De La Victoire',
            action: 'roundabout-right',
            distance: 518,
            duration: 110,
            formatted_distance: '500 m',
            formatted_duration: '2 min',
            icon: 'https://maps.gstatic.com/consumer/images/icons/2x/roundabout_grey800_18dp.png'
        },
        {
            title: 'Au rond-point, prendre la  1re  sortie',
            action: 'roundabout-right',
            distance: 79,
            duration: 12,
            formatted_distance: '79 m',
            formatted_duration: '12 s',
            icon: 'https://maps.gstatic.com/consumer/images/icons/2x/roundabout_grey800_18dp.png'
        },
        {
            title: 'Continuer sur  Ave Des Huileries',
            action: 'straight',
            distance: 371,
            duration: 75,
            formatted_distance: '350 m',
            formatted_duration: '1 min',
            icon: 'https://maps.gstatic.com/consumer/images/icons/2x/straight_grey800_18dp.png'
        }
    ]
    Nœuds: [
        { id: 0, label: 'Prendre la direction  est  vers  Ave Kasa-Vubu' },
        { id: 1, label: 'Au rond-point, prendre  Av. De La Victoire' },
        {
            id: 2,
            label: 'Au rond-point, prendre la  2e  sortie et continuer sur  Av. De La Victoire'
        },
        { id: 3, label: 'Au rond-point, prendre la  1re  sortie' },
        { id: 4, label: 'Continuer sur  Ave Des Huileries' }
    ]
    Arcs: [
        { from: 0, to: 1, action: 'straight', distance: 75, duration: 50 },
        {
            from: 1,
            to: 2,
            action: 'roundabout-right',
            distance: 467,
            duration: 159
        },
        {
            from: 2,
            to: 3,
            action: 'roundabout-right',
            distance: 518,
            duration: 110
        },
        {
            from: 3,
            to: 4,
            action: 'roundabout-right',
            distance: 79,
            duration: 12
        }
    ];

    const nodes = details.map((step, index) => ({
        id: index,
        label: step.title
    }));

    const links = details.slice(0, -1).map((step, index) => ({
        source: index,
        target: index + 1,
        distance: step.formatted_distance,
        duration: step.formatted_duration
    }));

    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    // Définition des flèches
    svg.append("defs")
        .append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 25)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#555");

    // Simulation
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(120))
        .force("charge", d3.forceManyBody().strength(-400))
        .force("center", d3.forceCenter(width / 2, height / 2));

    // Liens
    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("marker-end", "url(#arrow)");

    // Nœuds
    const node = svg.append("g")
        .selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(
            d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
        );

    node.append("circle")
        .attr("r", 15);

    node.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", 4)
        .text((d, i) => i);

    // Tooltip
    node.append("title")
        .text(d => d.label);

    // Mise à jour positions
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Drag
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }


}

main();