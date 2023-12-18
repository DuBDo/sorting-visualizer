const n=30;
const array=[];

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

generateArray();

function generateArray(){
    for(let i=0; i<n; i++){
        array[i]=Math.random();
    }
    showBars(array);
}

function showBars(array){
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
            bubbleSort(array);
            break;
        case 2:
            selectionSort(array);
            break;
        case 3:
            insertionSort(array);
        case 4:
            quickSort(0, array.length -1);
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

            await new Promise(resolve => setTimeout(resolve, 10));
  
            // Blue for sorted elements
            document.querySelectorAll(".bar")[j+1].style.backgroundColor = "blue"; 
        }
        array[j + 1] = key;
        // Green for the currently selected element
        document.querySelectorAll(".bar")[j+1].style.backgroundColor = "green";
        showBars(array);
        await new Promise(resolve => setTimeout(resolve, 10));
    }
}
  
//quick sort
async function swap(i, j){
    [array[i], array[j]] = [array[j], array[i]];
    showBars(array);
    await sleep(500);
    
  }
  
  async function partition(low, high) {
    const pivot = array[low];//making the first element pivot
    let i = low + 1;
    document.querySelector(".bar")[low].style.backgroundColor = "yellow";

    for (let j = low+1; j <= high; j++) {
      if (array[j] < pivot) {
        i++;
        //red for comparison
        document.querySelectorAll(".bar")[j].style.backgroundColor = "yellow";

        document.querySelectorAll(".bar")[i].style.backgroundColor = "red";
        document.querySelectorAll(".bar")[j].style.backgroundColor = "red";


        await swap(i, j);
        document.querySelectorAll(".bar")[i].style.backgroundColor = "blue";
        document.querySelectorAll(".bar")[j].style.backgroundColor = "blue";

        i+=1;
      }
    }
    //swap and change color to green for the pivot
    

    document.querySelectorAll(".bar")[low].style.backgroundColor = "red";
    document.querySelectorAll(".bar")[i-1].style.backgroundColor = "red";
    await swap(i-1, start);

    for(let t=low; t<=i; t++){
        document.querySelectorAll(".bar")[t].style.backgroundColor = "green";
    }

    return i - 1;
  }

  async function quickSort(low, high) {
    if (low < high) {
      const pivotIndex = await partition(low, high);
      await Promise.all([
        quickSort(low, pivotIndex - 1),
        quickSort(pivotIndex + 1, high)
      ]);
    }
  }

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

//mergsort

