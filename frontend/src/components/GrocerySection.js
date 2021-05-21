//importing essential libraries , hooks & files

import { useEffect, useState } from "react";
import { AddGroceryItem } from "./AddGroceryItem";
import axios from "axios";
import classNameModule from "classnames";

//instance of Localhost Url
const API_BASE_URL = "http://localhost:8080"


// function for Grocery Section 
// Fetching the api from database and updating it using UseState .   
export function GrocerySection() {
    const [groceryItems, updateGroceryItems] = useState([]);
    async function fetchGroceryItems() {
        const groceryData = await axios.get(`${API_BASE_URL}/grocery/getAll`)  // fetch api using axios
        console.log(groceryData.data.result);
        const dataFromApi = groceryData.data.result;
        updateGroceryItems(dataFromApi)
    }

    // UseEffect hook to fetch Updated Grocery Items
    useEffect(() => {
        fetchGroceryItems();
    }, []);

    // Handling the OnClick method of renderPurchaseButton function
    async function handlePurchaseUpdate(item) {
        const updateData = await axios.put(`${API_BASE_URL}/grocery/updatePurchaseStatus`, {    // fetch api using axios
            _id: item._id,
            isPurchased: true
        });
        console.log(updateData);
        fetchGroceryItems();
    }

    //  handling onclik method of renderDeleteButton
    async function handleDeleteOperation(item) {
        const deleteResponse = await axios.delete(`${API_BASE_URL}/grocery/deleteGroceryItem`, {    // fetch api using axios
            data: {
                _id: item._id,
            },
        });
        console.log(deleteResponse);
        fetchGroceryItems();
    }

    // render the update of purchased item
    function renderPurchasebutton(item) {
        if (item.isPurchased === false) {
            return (<button className="btn btn-outline-secondary me-4"
                onClick={() => handlePurchaseUpdate(item)}>
                purchased
            </button>)
        } else {
            return <span></span>
        }
    }

    // render Delete item 
    function renderDeleteButton(item) {
        return (
            <div>
                <button className="btn btn-light me-1 " onClick={() => handleDeleteOperation(item)}>X</button>
            </div>
        )
    }


    //  render grocery items 
    function renderGroceryItems() {
        return groceryItems.map((item) => {
            return (
                <div className={classNameModule("grocery-item d-flex", {
                    purchased: item.isPurchased === true,
                })}
                    key={item.groceryItem}
                >
                    <div >
                        {item.groceryItem}
                    </div>
                    <div className="grocery-actions d-flex">
                        {renderPurchasebutton(item)}
                        {renderDeleteButton(item)}
                    </div>
                </div>
            )
        })
    }

    // Getting the Current Month of the Year
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });;


    return (
        <div className="d-flex flex-column justify-content-center align-item-center ">
            <h2 className="heading">{`Plan for the month of ${month}`}</h2>
            <div className="container">
                <AddGroceryItem
                    baseUrl={API_BASE_URL}
                    fetchGroceryItems={fetchGroceryItems}
                />
                {renderGroceryItems()}

            </div>
        </div>
    )
}