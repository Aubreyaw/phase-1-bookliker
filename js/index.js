document.addEventListener("DOMContentLoaded", function() {
    const bookUrl = "http://localhost:3000/books";
    
    const bookListUl = document.getElementById("list");
    const showPanel = document.getElementById("show-panel");
    
    function fetchBooks() {
        fetch(bookUrl)
        .then(response => response.json())
        .then(data => {
            displayBooks(data);
        })
        .catch(error => console.error("fetch book list failed:", error));
    }

    function displayBooks(books) {
        books.forEach(book => {
            const bookListLi = document.createElement("li");
            bookListLi.textContent = book.title;
            bookListUl.style.listStyleType = 'none';
            bookListUl.appendChild(bookListLi);

            bookListLi.addEventListener("click", function() {
                showBookDetails(book);
            });
        });
    }

    function showBookDetails(book) {
        showPanel.innerHTML = ""; 

        const bookImage = document.createElement("img");
        bookImage.src = book.img_url;
        showPanel.appendChild(bookImage);

        const bookTitle = document.createElement("h4");
        bookTitle.textContent = book.title;
        showPanel.appendChild(bookTitle);

        const bookSubtitle = document.createElement("h4");
        bookSubtitle.textContent = book.subtitle;
        showPanel.appendChild(bookSubtitle);

        const bookAuthor = document.createElement("h4");
        bookAuthor.textContent = book.author;
        showPanel.appendChild(bookAuthor);

        const bookDescription = document.createElement("p");
        bookDescription.textContent = book.description;
        showPanel.appendChild(bookDescription);

        const usersUl = document.createElement("ul");
        showPanel.appendChild(usersUl);

        book.users.forEach(user => {
            const usersList = document.createElement("li");
            usersList.textContent = user.username;
            usersUl.appendChild(usersList);
        })
        
        const likeButton = document.createElement("button");
        likeButton.textContent = "like"
        showPanel.appendChild(likeButton);
       

        likeButton.addEventListener("click", () => {
            const usersUl = showPanel.querySelector("ul");
            const currentUser = { id: 1, username: "pouros" };
        
            if (likeButton.textContent === "like") {
                
                likeButton.textContent = "unlike";
                
                
                const userExists = book.users.some(user => user.id === currentUser.id);
        
               
                if (!userExists) {
                    book.users.push(currentUser);
                    
                    
                    const newUserLi = document.createElement("li");
                    newUserLi.textContent = currentUser.username;
                    usersUl.appendChild(newUserLi);
                }
            } else {
                
                likeButton.textContent = "like";
        
                
                book.users = book.users.filter(user => user.id !== currentUser.id);
        
                
                const userLi = Array.from(usersUl.children).find(li => li.textContent === currentUser.username);
                if (userLi) {
                    usersUl.removeChild(userLi);
                }
            }
        });


    }

   
    fetchBooks();
});