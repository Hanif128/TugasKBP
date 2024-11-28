// Mengganti warna background div(container)
const kotak1 = document.getElementById("container1")
const kotak2 = document.getElementById("container2")
kotak1.style.backgroundColor = "violet"
kotak2.style.backgroundColor = "violet"


// Ambil semua elemen dengan class "list"
const listItems = document.querySelectorAll(".list");

// Loop untuk memodifikasi setiap elemen dalam class "list"
listItems.forEach((item, index) => {
    // Ubah teks elemen
    item.innerHTML = `List Baru ${index + 1}`;

    // Mengubah size, style font, warna background
    item.style.backgroundColor = "pink"; // Warna background
    item.style.fontSize = "16px"; // Ukuran font
    item.style.fontFamily = "Crimson Text"; // Gaya font
});
