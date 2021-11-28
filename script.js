console.log("This is js file for good wave library..")

showBooks();


//storing books in localstorage
function showBooks() {
    let getBooks = localStorage.getItem('books');
    let bookObj;

    if(getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }

    let addBook = "";
    bookObj.forEach(function(item,index) {
        addBook += `<tr class="table-success"">
                        <td>${item.name}</td>
                        <td>${item.author}</td>
                        <td>${item.category}</td>
                        <td><button id = "${index}" onclick = "delBook(this.id)" class = "btn btn-primary"> Delete Book </button></td>
                    </tr>`
    });

    let tableBody = document.querySelector('#tableBody');
    if(bookObj.length == 0) {
        tableBody.innerHTML = "";
    }else {
        tableBody.innerHTML = addBook;
    }
}



//Delting books form table
function delBook(index) {
    let getBooks = localStorage.getItem('books');
    let bookObj;

    if(getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }

    let bookName = bookObj[index].name;
    bookObj.splice(index,1);

    localStorage.setItem('books', JSON.stringify(bookObj));
    let message = document.querySelector('#message');
    let textBold = 'Sucessfully Deleted!!';

    message.innerHTML =`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>${textBold}:</strong>${bookName} has been successfully removed form library..
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                            <span aria-hidden = "true">x</span>
                            </button>
                        </div>`

    setTimeout(() => {
        message.innerHTML = "";
    }, 5000);

    showBooks();
}


//constructor
function Book(name, author, category) {
    this.name = name;
    this.author = author;
    this.category = category;
}


//display constructor 
function Display() {

}


//Adding methods to display prototype
//for adding details to created templetae 
Display.prototype.add = function (book) {
    console.log("Added...");

    // tableBody = document.querySelector('#tableBody');
    // let createdTemplate = `<tr class = "table-success">
    //                             <td>${book.name}</td>
    //                             <td>${book.author}</td>
    //                             <td>${book.category}</td>
    //                        </tr>`;
    // tableBody.innerHTML += createdTemplate;


    let getBooks = localStorage.getItem('books');
    let bookObj;

    if(getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }

    bookObj.push(book);
    localStorage.setItem('books', JSON.stringify(bookObj));
    showBooks();
}




//for clearing the data once data is entered
Display.prototype.clear = function () {

    let form_Library = document.querySelector('#form_Library');
    form_Library.reset();
}


//implementing validate() for validation

Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    } else {
        return true;
    }
}


//Implementing show() for showing error/success
Display.prototype.show = function (category,showMessage) {
    let message = document.querySelector('#message');
    message.innerHTML = `<div class="alert alert-${category} alert-dismissible fade show" role="alert">
                            <strong></strong>${showMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
    setTimeout(function() {
        message.innerHTML = ''
    }, 5000);
}





//Adding submit event listener to the form_Library

let form_Library = document.querySelector('#form_Library');
form_Library.addEventListener('submit', form_LibrarySubmit);

function form_LibrarySubmit(e) {
    e.preventDefault();


    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let comics = document.getElementById('comics');
    let programming = document.getElementById('programming');
    let gaming = document.getElementById('gaming');
    let category;


    if (comics.checked) {
        category = comics.value;
    } else if (programming.checked) {
        category = programming.value;
    } else if (gaming.checked) {
        category = gaming.value;
    }

    let book = new Book(name, author, category);
    console.log(book);

    //for displaying book
    let display = new Display();

    //validating form so that user cannot left any of the field empty

    if (display.validate(book)) {
        display.add(book); //if validation successfull than show add method else error
        display.clear();
        display.show('success', "Yipee!! Your Book has Been Sucessfully Added..");

    } else {
        display.show('Error', "OOps!! Please Filled Out All The Fields..");
    }



}