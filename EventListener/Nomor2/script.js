const tombol = document.getElementById('tombol')
const pesan = document.getElementById('pesan')

tombol.addEventListener('mouseover', function () {
    pesan.textContent = "Mouse is over the button!";
});

tombol.addEventListener('mouseout', function () {
    pesan.textContent = "";
});
