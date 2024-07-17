Fuzzifikasi
Input
1. Set Value : pH yang diinginkan oleh user
	Sangat Basa
	Basa
	Normal
	Asam
	Sangat Asam
2. Present Value : Nilai pH yang terbaca pada Sensor
	Sangat Basa
	Basa
	Normal
	Asam
	Sangat Asam

Output
1. pH_UP
	Sangat_Banyak,	Index = 100
	Banyak,		Index = 75
	Normal,		Index = 50
	Sedikit,	Index = 25
	Kosong,		Index = 0
2. pH_DOWN
	Sangat_Banyak,	Index = 100
	Banyak,		Index = 75
	Normal,		Index = 50
	Sedikit,	Index = 25
	Kosong,		Index = 0

Rules
if Set Value Sangat Asam and Present Value Sangat Asam then (pH_UP is Kosong) (pH_DOWN is Kosong)
if Set Value Sangat Asam and Present Value Asam then (pH_UP is Kosong) (pH_DOWN is Sedikit)
if Set Value Sangat Asam and Present Value Normal then (pH_UP is Kosong) (pH_DOWN is Normal)
if Set Value Sangat Asam and Present Value Basa then (pH_UP is Kosong) (pH_DOWN is Banyak)
if Set Value Sangat Asam and Present Value Sangat Basa then (pH_UP is Kosong) (pH_DOWN is Sangat Banyak)

if Set Value Asam and Present Value Sangat Asam then (pH_UP is Sedikit) (pH_DOWN is Kosong)
if Set Value Asam and Present Value Asam then (pH_UP is Kosong) (pH_DOWN is Kosong)
if Set Value Asam and Present Value Normal then (pH_UP is Kosong) (pH_DOWN is Sedikit)
if Set Value Asam and Present Value Basa then (pH_UP is Kosong) (pH_DOWN is Normal)
if Set Value Asam and Present Value Sangat Basa then (pH_UP is Kosong) (pH_DOWN is Banyak)

if Set Value Normal and Present Value Sangat Asam then (pH_UP is Banyak) (pH_DOWN is Kosong)
if Set Value Normal and Present Value Asam then (pH_UP is Sedikit) (pH_DOWN is Kosong)
if Set Value Normal and Present Value Normal then (pH_UP is Kosong) (pH_DOWN is Kosong)
if Set Value Normal and Present Value Basa then (pH_UP is Kosong) (pH_DOWN is Sedikit)
if Set Value Normal and Present Value Sangat Basa then (pH_UP is Kosong) (pH_DOWN is Banyak)

if Set Value Basa and Present Value Sangat Asam then (pH_UP is Sangat Banyak) (pH_DOWN is Kosong)
if Set Value Basa and Present Value Asam then (pH_UP is Banyak) (pH_DOWN is Kosong)
if Set Value Basa and Present Value Normal then (pH_UP is Sedikit) (pH_DOWN is Kosong)
if Set Value Basa and Present Value Basa then (pH_UP is Kosong) (pH_DOWN is Kosong)
if Set Value Basa and Present Value Sangat Basa then (pH_UP is Kosong) (pH_DOWN is Sedikit)

if Set Value Sangat Basa and Present Value Sangat Asam then (pH_UP is Sangat Banyak) (pH_DOWN is Kosong)
if Set Value Sangat Basa and Present Value Asam then (pH_UP is Banyak) (pH_DOWN is Kosong)
if Set Value Sangat Basa and Present Value Normal then (pH_UP is Sedikit) (pH_DOWN is Kosong)
if Set Value Sangat Basa and Present Value Basa then (pH_UP is Sedikit) (pH_DOWN is Kosong)
if Set Value Sangat Basa and Present Value Sangat Basa then (pH_UP is Kosong) (pH_DOWN is Kosong)
