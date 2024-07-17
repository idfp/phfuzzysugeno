// Membership Functions
function sangatAsam(pH) {
    if (pH <= 2) return 1;
    else if (pH > 2 && pH <= 4) return (4 - pH) / 2;
    else return 0;
}

function asam(pH) {
    if (pH <= 2 || pH >= 6) return 0;
    else if (pH > 2 && pH <= 4) return (pH - 2) / 2;
    else if (pH > 4 && pH < 6) return (6 - pH) / 2;
    else return 0;
}

function normal(pH) {
    if (pH <= 4 || pH >= 8) return 0;
    else if (pH > 4 && pH <= 6) return (pH - 4) / 2;
    else if (pH > 6 && pH < 8) return (8 - pH) / 2;
    else return 0;
}

function basa(pH) {
    if (pH <= 6 || pH >= 10) return 0;
    else if (pH > 6 && pH <= 8) return (pH - 6) / 2;
    else if (pH > 8 && pH < 10) return (10 - pH) / 2;
    else return 0;
}

function sangatBasa(pH) {
    if (pH <= 10) return 0;
    else if (pH > 10 && pH <= 12) return (pH - 10) / 2;
    else return 1;
}
// Sugeno inference function
function classifyAcidity(pH) {
    let w1 = sangatAsam(pH);
    let y1 = 1; 

    let w2 = asam(pH);
    let y2 = 2; 

    let w3 = normal(pH);
    let y3 = 3; 

    let w4 = basa(pH);
    let y4 = 4; 

    let w5 = sangatBasa(pH);
    let y5 = 5; 

    let weightedSum = w1 * y1 + w2 * y2 + w3 * y3 + w4 * y4 + w5 * y5;
    let totalWeight = w1 + w2 + w3 + w4 + w5;

    if (totalWeight === 0) return 'Unknown';
    let result = weightedSum / totalWeight;

    if (result < 1.5) return 'Sangat Asam';
    else if (result < 2.5) return 'Asam';
    else if (result < 3.5) return 'Normal';
    else if (result < 4.5) return 'Basa';
    else return 'Sangat Basa';
}

// example usage
let pH = 12;
let classification = classifyAcidity(pH);
console.log(`Substance X with pH ${pH} is classified as: ${classification}`);
