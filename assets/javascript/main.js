const getCategories = async ()=>{
    try{
        const {data} = await  axios.get("https://fakestoreapi.com/products/categories");
    return data;


    }
    catch(error){
        return [];
    }
    

}
const displayCategories= async ()=>{
    try{
        const categories =await getCategories();
    const result =categories.map((category1)=>
        `<li class="category1">
        <a href ="./categores.html?category1=${category1}">${category1}</a> 
        </li>
                
        `
    ).join(' ');
    document.querySelector(".navbar .nav-links").innerHTML=result;
    console.log(categories);

    }catch(error){
        document.querySelector(".categories .row").innerHTML="<p>please try again....</p>";

    }
    finally{
        document.querySelector(".loading").classList.add("d-none");

    }
    

}
displayCategories();

const getProduct = async () => {
    try {
        const { data } = await axios.get(`https://fakestoreapi.com/products`);
        return data;
    } catch (error) {
        return [];
    }
};

const displayProduct = async (page = 1) => {
    try {
        document.querySelector(".loading").classList.remove("d-none");
        const allProducts = await getProduct();
        const limit = 4;
        const numberOfPages = Math.ceil(allProducts.length / limit);
        const start = (page - 1) * limit;
        const end = start + limit;
        const products = allProducts.slice(start, end);
        const result = products.map((product) =>
            `<div class="category1">
                <h2>${product.title}</h2>
                <img src="${product.image}" width="400px" class="product-img" alt="Product Image">
                <p class="price">${product.price} $</p>
            </div>`
        ).join('');

        document.querySelector(".categories1 .row1").innerHTML = result;
        let paginationItem= ` `;
        if(page > 1){
            paginationItem = `<li><button onclick=displayProduct(${parseInt(page-1)})>&lt;</button></li>`;
        }else{
            paginationItem = `<li><button class="btnDis">&lt;</button></li>`;
        }
        for (let i = 1; i <= numberOfPages; i++) {
            paginationItem += `<li><button class="${i === page ? 'active' : ''}" onclick=displayProduct(${i})>${i}</button></li>`;
        }
        if(page < numberOfPages){
            paginationItem+=`<li><button onclick=displayProduct(${parseInt(page+1)})>&gt;</button></li>`;
        }else{
            paginationItem += `<li><button class="btnDis">&gt;</button></li>`;
        }
        document.querySelector(".pagination").innerHTML = paginationItem;

    } catch (error) {
        document.querySelector(".categories1 .row1").innerHTML = "<p>please try agin ...</p>";
    } finally {
        document.querySelector(".loading").classList.add("d-none");
    }

    customModal();
};


displayProduct();

//modal
function customModal(){
    const modal= document.querySelector(".my-modal");
    const closeBtn= document.querySelector(".close-btn");
    const leftBtn= document.querySelector(".left-btn");
    const rightBtn= document.querySelector(".right-btn");
    const images= Array.from(document.querySelectorAll(".product-img"));//بترجع كل العناصر الي مخاخذن هذا الكلاس
    //console.log(modal);
    //console.log(images);
    let currentIndex =0;
    images.forEach(function(img){
        
          img.addEventListener('click', (e)=>{
                modal.classList.remove("d-none");
                modal.querySelector("img").setAttribute("src" ,e.target.src);
                
                const currentImg= e.target;
                currentIndex=images.indexOf(currentImg);
                console.log(currentIndex);

          });
          
        });
    closeBtn.addEventListener('click',(e)=>{
        modal.classList.add("d-none");
      });
    rightBtn.addEventListener('click',(e)=>{
        currentIndex++;
        if(currentIndex >= images.length){
            currentIndex =0;
        }
        const src=images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);
        //console.log(currentIndex);
      });
      leftBtn.addEventListener('click',(e)=>{
        currentIndex--;
        if(currentIndex <0){
            currentIndex =images.length -1;
        }
        const src=images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);
        //console.log(currentIndex);
      });

      //keboard event
      document.addEventListener("keydown",(e)=>{
        console.log(e);
        if(e.code =="ArrowRight"){
            currentIndex++;
            if(currentIndex >= images.length){
            currentIndex =0;
            }
            const src=images[currentIndex].getAttribute("src");
            modal.querySelector("img").setAttribute("src",src);
            //console.log(currentIndex);
        }else if(e.code =="ArrowLeft"){
            currentIndex--;
            if(currentIndex <0){
                currentIndex =images.length -1;
            }
            const src=images[currentIndex].getAttribute("src");
            modal.querySelector("img").setAttribute("src",src);
            //console.log(currentIndex);
        }else if(e.code =="Escape"){
            modal.classList.add("d-none");
        }
      });
    }
