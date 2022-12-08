import { useEffect, useState } from "react";
import "./App.css";
import Foodcomponents from "./components/Foodcomponents";
import MenuData from "./data/MenuData";
function App() {
   const [foodData, setFoodData] = useState(MenuData);

   const [dataInPage, setDataInPage] = useState([]);
   const [page, setPage] = useState(0);
   // ข้อมูลทั้งหมด 10 รายการ
   // จำนวนข้อมูลแต่ละหน้า
   // จำนวนเลขหน้า = จำนวนข้อมูลทั้งหมด / จำนวนข้อมูลแต่ละหน้า
   // 14 รายการ 14/7 = 2
   // 1 = [1-7] , 2 = [8-14]

   const pagination = () => {
      const foodPerPage = 3; // แสดงรายการอาหาร 7 รายการต่อ 1 หน้า
      const pages = Math.ceil(MenuData.length / foodPerPage);

      const newFood = Array.from({ length: pages }, (data, index) => {
         const start = index * foodPerPage; //[0],[7]
         return MenuData.slice(start, start + foodPerPage);
      });
      return newFood;
   };

   const handlepage = (index) => {
      setPage(index);
   };

   useEffect(() => {
      const paginate = pagination();
      setDataInPage(paginate);
      setFoodData(paginate[page]);
   }, [page]);

   return (
      <div className="App">
         <h1>FoodCard | Pagination</h1>
         <div className="container">
            {foodData.map((data, index) => {
               return <Foodcomponents key={index} {...data} />;
            })}
         </div>
         <div className="pagination-container">
            {dataInPage.map((data, index) => {
               return (
                  <button
                     key={index}
                     onClick={() => handlepage(index)}
                     className={`page-btn ${index === page ? "active-btn" : null}`}
                  >
                     {index + 1}
                  </button>
               );
            })}
         </div>
      </div>
   );
}

export default App;
