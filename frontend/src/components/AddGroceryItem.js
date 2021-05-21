// importing essential libraries

import { useState } from "react";
import axios from "axios";


export function AddGroceryItem({ baseUrl, fetchGroceryItems }) {
    const [groceryInputText, updateGroceryInputText] = useState("")

    //  handling adding of grocery item
    async function handleAddingItems() {
        const createTask = await axios.post(`${baseUrl}/grocery/add`, {        // fetch add api using axios
            "groceryItem": groceryInputText,
            "isPurchased": false
        });

        console.log(createTask);
        updateGroceryInputText("");
        fetchGroceryItems();

    }

    // render input operation
    return (
        <wrapper>
            <div >
                <div className="input-group mb-3">
                    <input type="text"
                        className="form-control "
                        placeholder="Add shopping items"
                        aria-label="Grocery Items"
                        required
                        value={groceryInputText}
                        onChange={(e) => updateGroceryInputText(e.target.value)}
                    />
                    <button className="input-group-text btn btn-primary"
                        id="basic-addon2"
                        onClick={() => handleAddingItems()}
                    >
                        Add Item
                    </button>
                </div>
            </div>
        </wrapper>
    )
}