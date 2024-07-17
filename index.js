const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const setValue = 7
// Membership functions for Sangat Asam, Asam, Normal, and Basa pH values
function sangatAsam(pH) {
    if (pH <= 3) return 1;
    else if (pH > 3 && pH <= 5) return (5 - pH) / 2;
    else return 0;
}

function asam(pH) {
    if (pH <= 3 || pH >= 6.5) return 0;
    else if (pH > 3 && pH <= 5) return (pH - 3) / 2;
    else if (pH > 5 && pH <= 6.5) return (6.5 - pH) / 1.5;
    else return 0;
}

function normal(pH) {
    if (pH <= 6 || pH >= 8) return 0;
    else if (pH > 6 && pH <= 7) return (pH - 6) / 1;
    else if (pH > 7 && pH < 8) return (8 - pH) / 1;
    else return 0;
}

function basa(pH) {
    if (pH <= 7.5 || pH >= 11) return 0;
    else if (pH > 7.5 && pH <= 9) return (pH - 7.5) / 1.5;
    else if (pH > 9 && pH < 11) return (11 - pH) / 2;
    else return 0;
}

function sangatBasa(pH) {
    if (pH <= 10) return 0;
    else if (pH > 10 && pH <= 12) return (pH - 10) / 2;
    else return 1;
}
// Sugeno fuzzy inference 
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
let phUp, phDown;
const index = {
    "Sangat Banyak": 100,
    "Banyak": 75,
    "Normal": 50,
    "Sedikit": 25,
    "Kosong": 0
}

rl.question(`insert pH> `, pH => {
    let presentValue = classifyAcidity(pH);
    switch (classifyAcidity(setValue)) {
        case "Normal":
            switch (presentValue) {
                case "Sangat Asam":
                    phUp = "Banyak"
                    phDown = "Kosong"
                    break;
                case "Asam":
                    phUp = "Sedikit"
                    phDown = "Kosong"
                    break;
                case "Normal":
                    phUp = "Kosong"
                    phDown = "Kosong"
                    break;
                case "Basa":
                    phUp = "Kosong"
                    phDown = "Sedikit"
                    break;
                case "Sangat Basa":
                    phUp = "Kosong"
                    phDown = "Banyak"
                    break;
                default:
                    break;
            }
            break;
        case "Sangat Asam":
            switch (presentValue) {
                case "Sangat Asam":
                    phUp = "Kosong"
                    phDown = "Kosong"
                    break;
                case "Asam":
                    phUp = "Kosong"
                    phDown = "Sedikit"
                    break;
                case "Normal":
                    phUp = "Kosong"
                    phDown = "Normal"
                    break;
                case "Basa":
                    phUp = "Kosong"
                    phDown = "Banyak"
                    break;
                case "Sangat Basa":
                    phUp = "Kosong"
                    phDown = "Sangat Banyak"
                    break;
                default:
                    break;
            }
            break;
        case "Asam":
            switch (presentValue) {
                case "Sangat Asam":
                    phUp = "Sedikit"
                    phDown = "Kosong"
                    break;
                case "Asam":
                    phUp = "Kosong"
                    phDown = "Kosong"
                    break;
                case "Normal":
                    phUp = "Kosong"
                    phDown = "Sedikit"
                    break;
                case "Basa":
                    phUp = "Kosong"
                    phDown = "Normal"
                    break;
                case "Sangat Basa":
                    phUp = "Kosong"
                    phDown = "Banyak"
                    break;
                default:
                    break;
            }
            break;
        case "Basa":
            switch (presentValue) {
                case "Sangat Asam":
                    phUp = "Sangat Banyak"
                    phDown = "Kosong"
                    break;
                case "Asam":
                    phUp = "Banyak"
                    phDown = "Kosong"
                    break;
                case "Normal":
                    phUp = "Sedikit"
                    phDown = "Kosong"
                    break;
                case "Basa":
                    phUp = "Kosong"
                    phDown = "Kosong"
                    break;
                case "Sangat Basa":
                    phUp = "Kosong"
                    phDown = "Sedikit"
                    break;
                default:
                    break;
            }
            break;
        case "Sangat Basa":
            switch (presentValue) {
                case "Sangat Asam":
                    phUp = "Sangat Banyak"
                    phDown = "Kosong"
                    break;
                case "Asam":
                    phUp = "Banyak"
                    phDown = "Kosong"
                    break;
                case "Normal":
                    phUp = "Sedikit"
                    phDown = "Kosong"
                    break;
                case "Basa":
                    phUp = "Sedikit"
                    phDown = "Kosong"
                    break;
                case "Sangat Basa":
                    phUp = "Kosong"
                    phDown = "Kosong"
                    break;
                default:
                    break;
            }
            break;
    }
    const result = {
        phUp: {
            value: phUp,
            index: index[phUp]
        },
        phDown: {
            value: phDown,
            index: index[phDown]
        }
    }

    console.log(result)
});
