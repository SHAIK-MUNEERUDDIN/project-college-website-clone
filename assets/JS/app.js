let hallticketInput = document.getElementById("hallticket-input");
hallticketInput.value = "";
let hallticketNumber;
const resultContainer = document.getElementById("results-container");
let submitBtn = document.getElementById("submitbtn");

hallticketInput.addEventListener("input", function () {
    hallticketNumber = hallticketInput.value.toUpperCase();
});


submitBtn.addEventListener("click", () => {
    event.preventDefault(); //prevents form submission

    const year = document.querySelector("select[name='year']").value;
    const branch = document.querySelector("select[name='branch']").value;
    const section = document.querySelector("select[name='Section']").value;

    if (!year || !branch || !section) {
        alert("Please select Branch, Year and Section");
        return; // Stop execution if fields are not selected
    }

    if (!hallticketNumber) {
        alert("Please enter Hallticket Number");
        return;
    }

    fetch('../assets/JS/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const result = data["3rd-year-cse"]["mid-2"][hallticketNumber];
            if (!result) {
                resultContainer.innerHTML = `<h2 class="warning">No results found. Please enter a valid hall ticket number.<h2>`
                return;
            }

            // Extract the marks of each subject
            const mlMarks = Number(result["ML"]);
            const cdMarks = Number(result["CD"]);
            const daaMarks = Number(result["DAA"]);
            const stmMarks = Number(result["STM"]);
            const fiotMarks = Number(result["FIOT"]);

            // Calculate the total marks
            const totalMarks = mlMarks + cdMarks + daaMarks + stmMarks + fiotMarks;



            resultContainer.innerHTML = `        <div id="results-box">
<table class="info-table">
    <thead>
        <tr>
            <th>HALLTICKET :</th>
            <th>${hallticketNumber}</th>
            <th>NAME :</th>
            <th>${result.NAME}</th>
        </tr>
    </thead>
</table>


<table class="res-table">
    <thead>
        <tr>
            <th>SUBJECT CODE</th>
            <th>SUBJECT NAME</th>
            <th>MAX-MARKS</th>
            <th>MARKS SCORED</th>
        </tr>
    </thead>
    <tbody>
        <tr class="col-1">
            <td>CS601PC</td>
            <td>MACHINE LEARNING</td>
            <td>20</td>
            <td>${result.ML}</td>
        </tr>
        <tr class="col-2">
            <td>CS602PC</td>
            <td>COMPILER DESIGN</td>
            <td>20</td>
            <td>${result.CD}</td>
        </tr>
        <tr class="col-1">
            <td>CS603PC</td>
            <td>DESIGN AND ANALYSIS OF ALGORITHMS</td>
            <td>20</td>
            <td>${result.DAA}</td>
        </tr>
        <tr class="col-2">
            <td>CS615PE</td>
            <td>SOFTWARE TESTING METHODOLOGIES</td>
            <td>20</td>
            <td>${result.STM}</td>
        </tr>
        <tr class="col-1">
            <td>CS724PE</td>
            <td>FUNDAMENTALS OF IOT</td>
            <td>20</td>
            <td>${result.FIOT}</td>
        </tr>
        <tr class="col-2">
            <td>TOTAL</td>
            <td></td>
            <td>100</td>
            <td>${totalMarks}</td>
        </tr>
    </tbody>
</table>
</div>`
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
})