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

const categories = [2,3,4,6,8,9,10,11,12,13,14,15,17,18]

// async function retrieveCategories() {
//     const res = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/categories?count=100`);
//     console.log(res);
// }

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds() {
    let categoryIds = _.sampleSize(categories, 5);
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
    const res = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/category?id=${catId}`);
    // console.log(res);
    let cluesArr = []
    res.data.clues.forEach(element => {
        cluesArr.push(element)
    });
    let categoryObj = new Object();
    categoryObj.title = res.data.title
    categoryObj.clues = cluesArr
    console.log(categoryObj)
    return categoryObj;
    // let question = cluesArr[i].question
    // let answer = cluesArr[i].answer
    // console.log(cluesArr);
}
// This is just a function I made to try to get the data in a usable form I'm not sure if it has any legitimate utility
// I've been running it like this: getData(getCategoryIds())
function getData(arr) {
    let categoriesArr = [];
    arr.forEach(async(element) => {
        categoriesArr.push(await getCategory(element))
    });
    return categoriesArr;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  

}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
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
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO