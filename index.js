import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push,onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-ef9f9-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList") //this is necssary so we can specfify where exactly we are writing to. the ref function specifies the exact location of our database

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")




addButtonEl.addEventListener("click", function() {

    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)
    clearInputField()
    
})

 onValue (shoppingListInDB, function(snapshot){
    // create an array to actually easily access all the database data.
    // the point of the onValue is to show all the items in the array, whether manually put in there or not. 
    // the onValue() function is a function that shows all the data in the database. it fetches the data
    
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val()) 

        shoppingList.innerHTML = ""
    
        for (let i=0; i < itemsArray.length; i++){
            let item = itemsArray[i]
            addNewItems(item)
         }
    } else{
        shoppingList.textContent = "No items here yet"
    }
   

 })

function clearInputField(){
    inputFieldEl.value = ""
}

// function addNewItems(value){
//     // shoppingList.innerHTML += `<li>${value}</li>`
//     let itemID = value[0]
//     let itemValue = value[1]
//     let newEl = document.createElement("li")
//     newEl.textContent = `${value}`

//     newEl.addEventListener("dblclick", function(){
//         console.log(itemValue + " " + itemID)
//     })
//     shoppingList.append(newEl)
// }

function addNewItems(value){
    let itemID = value[0]
    let itemValue = value[1]

    let newEl = document.createElement("li")
    newEl.textContent = `${itemValue}`

    newEl.addEventListener("click", function(){
        let exactIdLocation = ref(database, `shoppingList/${itemID}` )
        remove(exactIdLocation)
        console.log("should have removed with ID: " + itemID)
    })

    shoppingList.append(newEl)
}
