// untuk input setvalue dan ph dari console
const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/* fungsi membership untuk masing-masing klasifikasi pH:
 * sangat Asam, asam, normal, basa dan sangat basa
 * sangat Asam ada di range pH 0 sampai 4 
 * asam ada di range pH 3 sampai 6.5
 * normal ada di range ph 6 sampai 8 
 * basa ada di range ph 7.5 sampai 11
 * dan sangat basa ada di range ph 10 sampai 14+
 * membership plot bisa diliat di https://raw.githubusercontent.com/idfp/phfuzzysugeno/main/membership-plot.png
 * 
 * Hasil dari masing masing fungsi ini disusun menjadi fuzzy set, sebagai penentu
 * decision index metode sugeno.
 */
function sangatAsam(pH) {
    if (pH <= 3) return 1;
    else if (pH > 3 && pH <= 4) return (4 - pH) / 2;
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

// Penentuan decision index metode Sugeno
function classifyAcidity(pH) {
    // ambil nilai fuzzy dari masing-masing kelas
    // beserta indeks masing-masing kelas dengan nilai bebas berurut
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

    // kalkulasikan decision index dengan metode sugeno
    // (SA * 1 + A * 2 + N * 3 + B * 4 + SB * 5) / 1 + 2 + 3 + 4 + 5
    let weightedSum = w1 * y1 + w2 * y2 + w3 * y3 + w4 * y4 + w5 * y5;
    let totalWeight = w1 + w2 + w3 + w4 + w5;

    // apabila pembilang rumus sebelumnya bernilai 0, maka kalkulasi gagal
    if (totalWeight === 0) return 'Unknown';

    // hasil decision index metode sugeno
    let result = weightedSum / totalWeight;

    // klasifikasi hasil berdasar decision index sblmnya 
    if (result < 1.5) return 'Sangat Asam';
    else if (result < 2.5) return 'Asam';
    else if (result < 3.5) return 'Normal';
    else if (result < 4.5) return 'Basa';
    else return 'Sangat Basa';
}

let phUp, phDown;

// index pH_UP & pH_DOWN, ubah sesuai kebutuhan perangkat
const index = {
    "Sangat Banyak": 100,
    "Banyak": 75,
    "Normal": 50,
    "Sedikit": 25,
    "Kosong": 0
}
// ambil 2 input dari user, setvalue dan pH
// di real case scenario variabel setValue dan pH bisa diisi dengan angka
// misal:
// let setValue = 7
// let pH = 4
// atau jika didapat dari fungsi lain, maka bisa dengan
// let setValue = getSetValue()
// let pH = getPH()
// 2 baris dibawah cuma buat demonstrasi
rl.question("insert setValue> ", setValue => {
    rl.question(`insert pH> `, pH => {
        // ambil presentvalue dan setvalue dengan fuzzifikasi pH dari input
        // presentValue dan setValue disini dapat bernilai: 
        // 'Sangat Asam', 'Asam', 'Normal', 'Basa' atau 'Sangat Basa'
        // berbeda dengan nilai setvalue dan presentvalue yang berupa angka pH
        let presentValue = classifyAcidity(pH); 
        let setVal = classifyAcidity(setValue);
        console.log("Set value: " + setVal)
        console.log("Present Value: " + presentValue)

        // rules untuk phUp & phDown, detailnya bisa diliat di readme.md
        switch (setVal) {
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
                        phUp = "Banyak"
                        phDown = "Kosong"
                        break;
                    case "Asam":
                        phUp = "Normal"
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
        // hasil dari rules di atas, variabel result berisi properti phUp & phDown
        // dengan isi value yaitu 'Sangat Banyak', 'Banyak', 'Normal', 'Sedikit' atau 'Kosong'
        // dan index yang berisi index phUp & phDown sblmnya, pada baris 93
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

        // di node-red variabel result bakal diteruskan di msg.payload 
        // dan bisa diakses di node selanjutnya 
        console.log(result)
    });
})
