// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

async function retrieveCategories() {

    const res = await axios.get(

        `https://rithm-jeopardy.herokuapp.com/api/categories?count=100`

    );

    return res.data.map(({ id }) => id); //[2,3,4,5,6...]

}


const categories = [2, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18]

// async function retrieveCategories() {
//     const res = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/categories?count=100`);
//     console.log(res);
// }

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds() {
    let categoryIds = _.sampleSize(categories, 6);
    return _.uniq(categoryIds);
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
async function getCategory(catId) {

    const res = await axios.get(

        `https://rithm-jeopardy.herokuapp.com/api/category?id=${catId}`

    );

    return {

        title: res.data.title,

        clues: res.data.clues.map(({ question, answer }) => ({

            question,

            answer,

            showing: null,

        })),

    };

}

function addClueToTable(table, tableBody, data, clueIndex) {
    const row = document.createElement('tr');
    data.forEach((category, index) => {
        const datacell = document.createElement('td');
        datacell.dataset.showing = `${category.clues[clueIndex].showing}`;
        datacell.innerText = `${category.clues[clueIndex].question}`;
        datacell.addEventListener('click', function (e) {
            handleClick(e);
        });
        row.append(datacell);
        tableBody.append(row);
    });
    table.append(tableBody);

}


/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    const table = document.querySelector('#jeopardy');
    let data = await setupAndStart()
    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');

    const firstRow = document.createElement('tr');
    data.forEach((category, index) => {
        firstRow.innerHTML += `<td>${category.title}</td>`
        tableHead.append(firstRow);
    });
    table.append(tableHead);
    for (let i = 0; i < 5; i++) {
        addClueToTable(table, tableBody, data, i)
    }

}



/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore clicks
 * */

function handleClick(e) {
    if (e.target.dataset.showing === 'null') {
        e.target.dataset.showing = 'question';
    }
    else if (e.target.dataset.showing === 'question') {
        e.target.dataset.showing = 'answer';
    }
    else {
        removeEventListener('click', function () {
        });
    }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {

    const categories = await retrieveCategories();

    const selectedCategories = getCategoryIds(categories);

    //async

    const promises = selectedCategories.map((catId) => getCategory(catId));

    const responses = await Promise.all(promises);

    console.log(responses);

    return responses;

}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO