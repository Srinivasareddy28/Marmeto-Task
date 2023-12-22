// script.js

document.addEventListener('DOMContentLoaded', async () => {
    const apiEndpoint = 'https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093';
    const productContainer = document.getElementById('product-container');
    const searchInput = document.getElementById('search');
  
    const switchLayout = (layout) => {
      productContainer.classList.remove('grid-view', 'list-view');
      productContainer.classList.add(layout + '-view');
    };
  
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        return data.products;
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    };
  
    // Display products on the page
    const displayProducts = (products) => {
      productContainer.innerHTML = '';
  
      products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
  
        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.title;
  
        const productDetails = document.createElement('div');
        productDetails.classList.add('product-details');
  
        const productTitle = document.createElement('div');
        productTitle.classList.add('product-title');
        productTitle.textContent = product.title;
  
        const productBadge = document.createElement('div');
        productBadge.classList.add('product-badge');
        productBadge.textContent = product.badge;
  
        const productVendor = document.createElement('div');
        productVendor.classList.add('product-vendor');
        productVendor.textContent = 'Vendor: ' + product.vendor;
  
        const productPrice = document.createElement('div');
        productPrice.classList.add('product-price');
        productPrice.textContent = 'Price: $' + product.price;
  
        const productComparePrice = document.createElement('div');
        productComparePrice.classList.add('product-compare-price');
        productComparePrice.textContent = 'Compare at: $' + product.comparePrice;
  
        const productDiscount = document.createElement('div');
        productDiscount.classList.add('product-discount');
        const discountPercentage = Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100);
        productDiscount.textContent = 'Discount: ' + discountPercentage + '%';
  
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.classList.add('add-to-cart-button');
  
        productDetails.appendChild(productTitle);
        productDetails.appendChild(productBadge);
        productDetails.appendChild(productVendor);
        productDetails.appendChild(productPrice);
        productDetails.appendChild(productComparePrice);
        productDetails.appendChild(productDiscount);
  
        productCard.appendChild(productImage);
        productCard.appendChild(productDetails);
        productCard.appendChild(addToCartButton);
  
        productContainer.appendChild(productCard);
      });
    };
  
    const showProducts = async (category) => {
      const products = await fetchData();
      const filteredProducts = products.filter((product) => product.category.toLowerCase() === category);
      displayProducts(filteredProducts);
    };
  
    // Handle search input
    searchInput.addEventListener('input', async (event) => {
      const searchTerm = event.target.value.toLowerCase();
      const products = await fetchData();
  
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
  
      displayProducts(filteredProducts);
    });
  
    // Initial data fetch and display
    const initialProducts = await fetchData();
    displayProducts(initialProducts);
  });
  