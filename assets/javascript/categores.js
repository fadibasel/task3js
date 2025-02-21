const getCategoriesProducts = async()=>{
    //category1 = test
    const urlParams =new URLSearchParams(window.location.search);
    const categoryName= urlParams.get('category1');
    const {data} =await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
    return data;
}
const displayProducts =async()=>{
    const products = await getCategoriesProducts();
    const result =products.map((product)=>{
        return `<div class="products1">
        <h2>${product.title}</h2>
        <img class="img1" src= "${product.image}">
        <p>${product.price} $</p>
        </div>

        
        `

    }).join(' ');
    console.log(products);
    document.querySelector(".products .row").innerHTML=result;


}
displayProducts();
