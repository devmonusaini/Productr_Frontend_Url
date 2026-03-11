import product01 from "../assets/image621.png";
import product02 from "../assets/image622.png";
import product03 from "../assets/image623.png";


const cardData = [
    {
        id: 1,
        name: "CakeZone Walnut Brownie",
        image: [
            product01,
            product02,
            product02,
            product02,
            product03
        ],
        ProductType: "Food",
        QuantityStock : 100,
        MRP : "$29.99",
        price: "$19.99",
        BrandName : "Brand A",
        exchangeEligibility : "Yes",
       

    },
    {
        id: 2,
        name: "Product 2",
        image: [
            product01,
            product02,
            product03   
        ],
        ProductType: "Clothing",
        QuantityStock : 50,
        MRP : "$49.99",
        price: "$39.99",
        BrandName : "Brand B",
        exchangeEligibility : "No", 

    },
    {
        id: 3,
        name: "Product 3",
        image: [    
            product01,
            product02,
            product03
        ],
        ProductType: "Electronics", 
        QuantityStock : 20,
        MRP : "$199.99",
        price: "$149.99",
        BrandName : "Brand C",
        exchangeEligibility : "Yes",

    },
    {
        id: 2,
        name: "Product 2",
        image: [
            product01,
            product02,
            product03   
        ],
        ProductType: "Clothing",
        QuantityStock : 50,
        MRP : "$49.99",
        price: "$39.99",
        BrandName : "Brand B",
        exchangeEligibility : "No", 

    },
    {
        id: 3,
        name: "Product 3",
        image: [    
            product01,
            product02,
            product03
        ],
        ProductType: "Electronics", 
        QuantityStock : 20,
        MRP : "$199.99",
        price: "$149.99",
        BrandName : "Brand C",
        exchangeEligibility : "Yes",

    }
]

export default cardData;