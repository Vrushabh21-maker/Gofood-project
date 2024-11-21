import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json()
 /*    console.log("response is" + JSON.stringify(response)); */
    // console.log(response[1][0].CategoryName)
    
    console.log("response[1] is" +JSON.stringify(response[1]));
    setFoodCat(response[1])
    setFoodItems(response[0])
  }

  useEffect(() => {
    loadFoodItems()
  }, [])

  return (
    <div >
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="/images/istockphoto-520410807-612x612.jpg" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="/images/istockphoto-520410807-612x612.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="/images/pizza.jpeg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
      {console.log("foodCat:", foodCat)} {/* Log foodCat */}
  {console.log("foodItems:", foodItems)} {/* Log foodItems */}
  {console.log("search:", search)} {/* Log search term */}
        {/* Render categories */}
        {foodCat.length > 0
          ? foodCat.map((data) => (
              <div key={data.id} className="row mb-3">
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr
                  id="hr-success"
                  style={{
                    height: "4px",
                    backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                  }}
                />
                {/* Render filtered items */}
                {foodItems.length > 0
  ? foodItems
      .filter((items) => {
        const categoryMatch = items.CategoryName === data.CategoryName;
        const nameMatch = items.name.toLowerCase().includes(search.toLowerCase());

        // Log each item being filtered and the condition results
        console.log("Filtering item:", items);
        console.log("Item Category Name:", items.CategoryName);
        console.log("Rendered Category Name:", data.CategoryName);
        console.log("Category Match:", categoryMatch);
        console.log("Item Name:", items.name);
        console.log("Search Query:", search);
        console.log("Name Match:", nameMatch);

        return categoryMatch && nameMatch;
      })
      .map((filterItems) => {
        // Log each filtered item and its properties
        console.log("Filtered Item:", filterItems);
        console.log("Filtered Item Name:", filterItems.name);
        console.log("Filtered Item Options:", filterItems.options);
        console.log("Filtered Item Image:", filterItems.img);

        return (
          <div key={filterItems.id} className="col-12 col-md-6 col-lg-3">
            <Card
              foodName={filterItems.name}
              item={filterItems}
              options={filterItems.options[0]}
              ImgSrc={filterItems.img}
            />
          </div>
        );
      })
  : <div>No such data</div>}

              </div>
            ))
          : ""}
      </div>
      <Footer />
    </div>
  );
}








 
