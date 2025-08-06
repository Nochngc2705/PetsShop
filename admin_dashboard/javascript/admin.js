let products = JSON.parse(localStorage.getItem('products')) || [];

document.getElementById('productForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const editIndex = document.getElementById('editIndex').value;
  const name = document.getElementById('productName').value;
  const price = parseInt(document.getElementById('productPrice').value);
  const originalPrice = parseInt(document.getElementById('productOriginalPrice').value);
  const imageInput = document.getElementById('productImage');
  const file = imageInput.files[0];

  if (!file) {
    alert("Vui lòng chọn hình ảnh!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const imageBase64 = event.target.result;

    const newProduct = { name, price, originalPrice, image: imageBase64 };

    if (editIndex === '') {
      products.push(newProduct);
    } else {
      products[editIndex] = newProduct;
    }

    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
    document.getElementById('productForm').reset();
    document.getElementById('editIndex').value = '';
  };

  reader.readAsDataURL(file); // Chuyển file thành Base64
});

function renderProducts() {
  const list = document.getElementById('productList');
  list.innerHTML = '';
  products.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${product.image}" width="60" height="60"></td>
      <td>${product.name}</td>
      <td>${product.price.toLocaleString()}₫</td>
      <td>${product.originalPrice.toLocaleString()}₫</td>
      <td>
        <button onclick="editProduct(${index})"><i class="fas fa-edit"></i></button>
        <button onclick="deleteProduct(${index})"><i class="fas fa-trash-alt"></i></button>
      </td>
    `;
    list.appendChild(row);
  });

  document.getElementById('totalProducts').innerText = products.length;
}

function editProduct(index) {
  const product = products[index];
  document.getElementById('editIndex').value = index;
  document.getElementById('productName').value = product.name;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productOriginalPrice').value = product.originalPrice;

  alert("Không thể nạp lại hình ảnh đã lưu.\nVui lòng chọn lại hình ảnh mới nếu cần sửa.");
}

function deleteProduct(index) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
  }
}

window.onload = () => {
  renderProducts();
};
