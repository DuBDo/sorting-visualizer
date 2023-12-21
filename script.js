const n=30;
const array=[];

generateArray();

//getting references to the buttons
const bubbleBtn = document.getElementById("bubbleBtn");
const selectionBtn = document.getElementById("selectionBtn");
const insertionBtn = document.getElementById("insertionBtn");
const quickBtn = document.getElementById("quickBtn");
const mergBtn = document.getElementById("mergBtn");

//adding click event listeners to the buttons
bubbleBtn.addEventListener("click", () => handleButtonClick(1));
selectionBtn.addEventListener("click", () => handleButtonClick(2));
insertionBtn.addEventListener("click", () => handleButtonClick(3));
quickBtn.addEventListener("click", () => handleButtonClick(4));
mergBtn.addEventListener("click", () => handleButtonClick(5));

function generateArray(){
    for(let i=0; i<n; i++){
        array[i]=Math.random();
    }
    showBars(array);
}


function showBars(array){
    const container = document.getElementById('container');
    container.innerHTML = " ";

    for(let i=0; i<array.length; i++){
        const bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");
        container.appendChild(bar);
    }
}
//function to handle button clicks using switch case
function handleButtonClick(buttonNumber){
    switch(buttonNumber){
        case 1:
            bubbleBtn.style.backgroundColor= "Purple";
            bubbleSort(array);
            break;
        case 2:
            selectionBtn.style.backgroundColor= "Purple";
            selectionSort(array);
            break;
        case 3:
            insertionBtn.style.backgroundColor= "Purple";
            insertionSort(array);
            break;
        case 4:
            quickBtn.style.backgroundColor= "Purple";
            quickSort(0, array.length -1);
            break;
        case 5:
            mergeBtn.style.backgroundColor= "Purple";
            mergeSort(array);
            break;
    }
}

// Bubble sort algorithm
async function bubbleSort(array){
    for (let i = 0; i < n - 1; i++){
        for (let j = 0; j < n - i - 1; j++){
            // Highlight the bars being compared
            document.querySelectorAll('.bar')[j].style.backgroundColor = 'red';
            document.querySelectorAll('.bar')[j + 1].style.backgroundColor = 'red';

            // Delay for visualization
            await new Promise(resolve => setTimeout(resolve, 50));

            if (array[j] > array[j + 1]){
                // Swap if the current element is greater than the next one
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                // Update the visual representation
                showBars(array);
            }
            // Reset the color after comparison
            document.querySelectorAll('.bar')[j].style.backgroundColor = 'black';
            document.querySelectorAll('.bar')[j + 1].style.backgroundColor = 'black';
        }
    }
    //remove the background-Color of the button after fishing the sorting
    bubbleBtn.style.backgroundColor = "white";
}


//Selection Sort
async function selectionSort(array)
{
    var min_idx;
 
    // One by one move boundary of unsorted subarray
    for(let i=0; i<array.length-1; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;

        //Highlighting the current element being compared
        //document.querySelectorAll(".bar")[i].style.backgroundColor = "red";
        //document.querySelectorAll(".bar")[min_idx].style.backgroundColor = "red";
        for(let j=i+1; j<array.length; j++){

            //Highlighting the element being considered for swapping
            document.querySelectorAll(".bar")[j].style.backgroundColor = "red";
            document.querySelectorAll(".bar")[min_idx].style.backgroundColor = "red";

            await new Promise(resolve => setTimeout(resolve, 50));

            if(array[j] < array[min_idx]){
                min_idx = j;
            }  

            //reset the background color after swapping
            //document.querySelectorAll(".bar")[i].style.backgroundColor = "black";
            //document.querySelectorAll(".bar")[min_idx].style.backgroundColor = "black"; 
        } 
        // Swap the found minimum element with the first element
        [array[i], array[min_idx]] = [array[min_idx], array[i]];

        showBars(array);
    }
    //remove the background-Color of the button after fishing the sorting
    selectionBtn.style.backgroundColor = "white";
}

//insertion sort
async function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j;

        for(j=i-1; j>=0 && array[j]>key; j--){
            array[j + 1] = array[j];
            // Red for comparison
            document.querySelectorAll(".bar")[j+1].style.backgroundColor = "red"; 

            await new Promise(resolve => setTimeout(resolve, 100));
  
            // Blue for sorted elements
            document.querySelectorAll(".bar")[j+1].style.backgroundColor = "blue"; 
        }
        array[j + 1] = key;
        // Green for the currently selected element
        document.querySelectorAll(".bar")[j+1].style.backgroundColor = "green";
        showBars(array);
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    //remove the background-Color of the button after fishing the sorting
    insertionBtn.style.backgroundColor = "white";
}
  
//quick sort
async function quickSort(array) {
    await quickSortHelper(0, array.length - 1);
    showBars(array);
}

async function quickSortHelper(low, high) {
    if (low < high) {
        let pivotIndex = await partition(low, high);
        await Promise.all([
            quickSortHelper(low, pivotIndex - 1),
            quickSortHelper(pivotIndex + 1, high)
        ]);
    }
}

async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        // Visualize comparison (blue color)
        document.querySelectorAll(".bar")[j].style.backgroundColor = "blue"; 
        showBars(array);
        await new Promise(resolve => setTimeout(resolve, 50));

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
        }

        // Reset color after comparison
        document.querySelectorAll(".bar")[j].style.backgroundColor = "black"; 
        showBars(array);
    }

    [array[i+1], array[high]]= [array[high], array[i+1]];
    return i + 1;
}

//merge sort
