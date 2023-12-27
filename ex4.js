(function()
{
    let cardData = [
        {
            name:'1',
            img:'./Images/image1.jpg'
        },
        {
            name:'1',
            img:'./Images/image1.jpg'
        },
        {
            name:'2',
            img:'./Images/image2.jpg'
        },
        {
            name:'2',
            img:'./Images/image2.jpg'
        },
        {
            name:'3',
            img:'./Images/image3.jpg'
        },
        {
            name:'3',
            img:'./Images/image3.jpg'
        },
        {
            name:'4',
            img:'./Images/image4.jpg'
        },
        {
            name:'4',
            img:'./Images/image4.jpg'
        },
        {
            name:'5',
            img:'./Images/image5.jpg'
        },
        {
            name:'5',
            img:'./Images/image5.jpg'
        },
        {
            name:'6',
            img:'./Images/image6.jpg'
        },
        {
            name:'6',
            img:'./Images/image6.jpg'
        },
        {
            name:'7',
            img:'./Images/image7.jpg'
        },
        {
            name:'7',
            img:'./Images/image7.jpg'
        },
        {
            name:'8',
            img:'./Images/image8.jpg'
        },
        {
            name:'8',
            img:'./Images/image8.jpg'
        },
        {
            name:'9',
            img:'./Images/image9.jpg'
        },
        {
            name:'9',
            img:'./Images/image9.jpg'
        },
        {
            name:'10',
            img:'./Images/image10.jpg'
        },
        {
            name:'10',
            img:'./Images/image10.jpg'
        }
    ];

    // all the global variables
    let cards = []
    let cardsClicked = []
    let cardsId = []
    let cardsWon = []
    let card_clicks = 0
    let card_score = []
    let main = document.getElementById("registerForm")
    let settings = document.getElementById("setting-form")
    let errRow = document.getElementById("rowErrorMessage")
    let errCol = document.getElementById("colErrorMessage")
    let back_button = document.getElementById("backBtn")
    let game = document.getElementById("card_board")
    let modal = document.getElementById("myModal")
    let delay = 0.5
    let flag = false



    // all the listeners

    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("play_btn").addEventListener("click", (event) => {
            event.preventDefault()
            if(checkName() === true && settingsValid()=== true)
                memoryGame(game)
            else {
                game.innerHTML=""
            }
        });
        document.getElementById("stn_btn").addEventListener("click", (event) => {
            let x = document.getElementById("setting-form");
            if (x.className === "visible") {
                x.className = "invisible";
            } else {
                x.className = "visible";
            }
        });
        document.getElementById("backBtn").addEventListener("click", (event) => {
            main.className = "visible"
            game.innerHTML = ""
            back_button.className = "invisible"
        });
        document.getElementById("colSelect").addEventListener("change", (event) => {
            let colField = document.getElementById("colSelect").value
            let rowField = document.getElementById("rowSelect").value
            let sum = parseInt(colField) * parseInt(rowField)
            if((sum)%2 === 0){
                errRow.innerHTML = ""
                errCol.innerHTML = ""
            } else{
                errCol.innerHTML = "the col * row must be even"
                errRow.innerHTML = ""
            }
        });
        document.getElementById("rowSelect").addEventListener("change", (event) => {
            let colField = document.getElementById("colSelect").value
            let rowField = document.getElementById("rowSelect").value
            let sum = parseInt(colField)*parseInt(rowField)
            if((sum)%2 === 0){
                errRow.innerHTML = ""
                errCol.innerHTML = ""
            } else{
                errRow.innerHTML = "the col * row must be even"
                errCol.innerHTML = ""
            }
        });
    });

    /** this function check the validation for the name field
     * @returns {boolean} true if the form is valid, false otherwise
     */
    function checkName(){
        let name = document.getElementById("nameField").value.trim()
        let err = document.getElementById("errorMessage")
        if(name === ""){
            err.innerHTML = "please fill name field"
            return false
        }
        if (hasWhiteSpace(name)){
            err.innerHTML = "name must bo only one word"
            return false
        }
        else
            err.innerHTML = ""
            return true
    }

    /** function that checks if string have spaces
     * @param s an string
     * @returns {boolean} true if the the string has spaces , false otherwise
     */
    function hasWhiteSpace(s) {
        return /\s/g.test(s);
    }

    /** function that checks if settings fields are valid
     * @returns {boolean} true if valid , false otherwise
     */
    function settingsValid(){
        let colField = document.getElementById("colSelect").value
        let rowField = document.getElementById("rowSelect").value
        let sum = parseInt(colField)*parseInt(rowField)
        if((sum)%2 === 0){
            return true
        }
        else{
            return false
        }
    }

    /** function that build the board of the memory game
     * @param value contains the place we will create the game in the html
     */
    function memoryGame(value){
        let board = ""
        let index = 0
        cards = []
        main.classList.add("d-none")
        settings.classList.add("d-none")
        let colField =Math.floor(12/(document.getElementById("colSelect").value))
        let colNum = document.getElementById("colSelect").value
        let rowField = document.getElementById("rowSelect").value
         delay = document.getElementById("delaySelect").value
        let sum = parseInt(colNum)*parseInt(rowField)
        for(let i=0; i<sum ;i++){
            cards.push(cardData[i])
        }
        cards.sort(()=> 0.5 - Math.random())
        for(let row = 0 ; row<parseInt(rowField)  ;row++){
            board = document.createElement('div')
            board.setAttribute('class' , "row")
            for(let image=0 ; image<parseInt(colNum) ; image++){
                const grid = document.createElement('div')
                const card = document.createElement('img')
                card.setAttribute('src', 'Images/back.jpg')
                //card.setAttribute("width","300")
                //card.setAttribute("width","300")
                card.setAttribute('data-id', `${index}`)
                card.setAttribute('class' , "img-thumbnail")
                grid.setAttribute('class', `col-${colField}`)
                card.addEventListener('click', flipCard)
                index++
                board.appendChild(grid)
                grid.appendChild(card)
            }
            value.appendChild(board)
        }

        back_button.className = "btn btn-secondary"
    }

    /** function that take the cards hwo clicked and show the image of each
     * card clicked and call function to check if there a match
     */
    function flipCard() {
        let cardId = this.getAttribute('data-id')
        cardsClicked.push(cards[cardId].name)
        cardsId.push(cardId)
        if(flag === false){
            this.setAttribute('src', cards[cardId].img)
            this.setAttribute("width" ,"300")
            this.setAttribute("height" ,"300")
        }
        if (cardsClicked.length ===2) {
            flag = true
            setTimeout(checkForMatch, delay*1000)
        }

    }

    /** function that check the cards hwo clicked if their match
     */
    function checkForMatch() {
        const cards = document.querySelectorAll('img')
        const card1 = cardsId[0]
        const card2 = cardsId[1]
        if(card1 === card2) {
            cards[card1].setAttribute('src', 'Images/back.jpg')
            cards[card2].setAttribute('src', 'Images/back.jpg')
        }
        else if (cardsClicked[0] === cardsClicked[1]) {
            cards[card1].removeEventListener('click', flipCard)
            cards[card2].removeEventListener('click', flipCard)
            cardsWon.push(cardsClicked)
        } else {
            cards[card1].setAttribute('src', 'Images/back.jpg')
            cards[card2].setAttribute('src', 'Images/back.jpg')
            card_clicks ++
        }
        cardsClicked = []
        cardsId = []
        flag = false
        if(cardsWon.length === cards.length/2){
            let final_score = checkScore(card_clicks)
            modal.innerHTML = displayTable(final_score)
            game.innerHTML =  displayTable(final_score)


        }
    }


    function checkScore(score){
        let num = cards.length
        let finalScore = ((10*num)-score)
        return finalScore
    }
    function displayTable(score) {
        let Html=""
        let index
        let name = document.getElementById("nameField").value.trim()
        let obj = {name_field:name,
                   score: score}
        let i = 1;
        card_score.push(obj)
        let ranking = card_score.sort((a,b)=> a.score < b.score ? 1:-1)
        for(let t of ranking){
            Html+=`<tr><td>${i}</td><td>${t.name_field}</td> <td>${t.score}</td></tr>`
            index = ranking.indexOf(t)
            i++
            if(i === 4){
                break
            }
        }
        if(index > 3){
            index = "you are not in the ranking try again"
        }
        back_button.className = "btn btn-secondary"
        cardsWon = []
        return `<h3>Game Over <p>your rank is: ${index}</p><table class="table table-dark"><tr><th>rank</th><th>name</th><th>score</th></tr>${Html}</table></h3>`
    }

})();
