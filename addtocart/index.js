
import{initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import{getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: 'https://kenzysandbox-default-rtdb.firebaseio.com/'
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListinDB= ref(database,"shoppingList")
const inputfieldel= document.getElementById("input-field");
const addbuttonel= document.getElementById("add-button");
const shoppingListel = document.getElementById("shopping-list");

//link input to button,push input to database//
addbuttonel.addEventListener("click", function() {
    let inputvalue= inputfieldel.value

    push(shoppingListinDB, inputvalue)
    clearout();
})

//fetching items from database and output uptodate list//
onValue(shoppingListinDB, function(snapshot){
    if (snapshot.exists()) {
        let itemArray = Object.entries(snapshot.val())
        clearshoppinglistel()
    
        for (let i = 0; i < itemArray.length; i++){
           let currentItem = itemArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
    
            outputitems(currentItem)
    
        }
    }else {
        shoppingListel.innerHTML = "no items found"
    }
    
})


//clear out input field//
function clearout(){
    inputfieldel.value = ""
}

//clear output to avoid duplicate output//
function clearshoppinglistel(){
    shoppingListel.innerHTML = "";
}

// output items into shopping list//
function outputitems(item){
    let itemID = item[0]
    let itemvalue = item[1]
    let newEl = document.createElement("li")
  
    newEl.textContent = itemvalue
    shoppingListel.append(newEl)

   //delete items from list//
   newEl.addEventListener("click",function(){
    let exactlocation = ref(database,`shoppingList/${itemID}`)
    remove(exactlocation)
   })

 
}



