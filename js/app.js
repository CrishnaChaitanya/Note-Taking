console.log('Why are apartment called apartments when they are all together');
showNotes();  //we are calling this method at the stating only because, we want to show the prev notes as soon as the user opens the website.


//If user adds note To the localstorage
let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',function(e){

  let addTxt = document.getElementById('addTxt');
  let addTitle = document.getElementById('addTitle');
  let notes = localStorage.getItem('notes');
  if(notes== null){
    notesObj=[];    //If there is nothing in the localstorage then create a empty array.
  }
  else{
    notesObj = JSON.parse(notes); //If there are some elements in the loalStorage then add them into the array named notesObj.
    //JSON.parse helps us to parse over the localStorage and place them into the array 'notesObj'

  }
  let myObj = {
    title:addTitle.value,
    text:addTxt.value
  }
  notesObj.push(myObj);  //we have created a div element with id as 'notes' and after we check the above conditions i.e if there is anything the localStorage, if there is anything we add that to the notesObj and after comming out of the conditions we just push the text we wrote in the addTxt to the noted div.
  localStorage.setItem('notes',JSON.stringify(notesObj)); //Here are updating the localStorage after we added the addTxt value to the notes ,we are updating that to the localStorage,and here we are using JSON.stringify to convert the text into the string.
  addTxt.value='';  //Here we are clearing the addTxt space 
  addTitle.value='';
  // console.log(notesObj); 
  showNotes()

})

function showNotes() {
  let notes = localStorage.getItem('notes');
   //And we will do the exact same thing which we did above i.e we will check if there are any notes in the localStorage or not
   if (notes == null){
     notesObj=[];
   }
   else{
     notesObj = JSON.parse(notes);
   }
   let html='';
   notesObj.forEach(function(element,index){
     //Here below we are using backticks,and the element is the content which we write in the box!
     html+=`
     <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
     <div class="card-body">
         <h5 class="card-title">${ element.title}</h5>
         <p class="card-text"> ${element.text}</p>   
         <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
     </div>
 </div>`;
   })
   let notesElm=document.getElementById('notes');
   if (notesObj.length != 0){  //if the notes is conataing some content i.e it's length is not zero then u insert the html which also contains the content the user wrote i.e the element
    notesElm.innerHTML =html;
   }
   else{
     notesElm.innerHTML=`Bruh! There is nothing to show here. Pls use the "add note" to add notes and display it here😃`;
   }
  
}


//now we are going to write a function that enable the delete button!
function deleteNote(index){
  console.log('This func will delte the notes when u click on delete note');
  let notes = localStorage.getItem('notes');
  if ( notes == null){
    notesObj = [];
  }
  else{
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index,1); //Important function 'splice()'
  localStorage.setItem('notes',JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input',function(){

  console.log('Input event fired');
  let inputVal = search.value.toLowerCase();  //just taking the content what the user has typed in the search box.
  let noteCards = document.getElementsByClassName('noteCard'); //We are taking the saved cards,so that we show only those cards whose text matches the users search text.
  Array.from(noteCards).forEach(function(element){
    let cardTxt = element.getElementsByTagName('p')[0].innerText;
    if (cardTxt.includes(inputVal)){
      element.style.display = 'block';
    }
    else{
      element.style.display = 'none';
    }
  })

})

