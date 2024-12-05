// Ambil elemen input field, tombol, dan ul
const inputField = document.getElementById("itemInput");
const addButton = document.getElementById("addItemButton");
const itemList = document.getElementById("itemList");

// Tambahkan event listener untuk tombol
addButton.addEventListener("click", function () {
    // Ambil teks dari input field
    const itemText = inputField.value;

    // Periksa apakah input tidak kosong
    if (itemText.trim() !== "") {
        // Buat elemen li baru
        const listItem = document.createElement("li");
        listItem.textContent = itemText;

        // Tambahkan li ke dalam ul
        itemList.appendChild(listItem);

        // Kosongkan input field setelah menambah item
        inputField.value = "";
        inputField.focus();
    } else {
        alert("Please enter an item!");
    }
});
