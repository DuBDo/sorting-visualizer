const n=30;
const array=[];

const delay = 10;

generateArray();

//getting references to the buttons
const generateArr = document.getElementById("generateArray");
const bubbleBtn = document.getElementById("bubbleBtn");
const selectionBtn = document.getElementById("selectionBtn");
const insertionBtn = document.getElementById("insertionBtn");
const quickBtn = document.getElementById("quickBtn");
const mergeBtn = document.getElementById("mergeBtn");

//adding click event listeners to the buttons
generateArr.addEventListener("click", () => generateArray());
bubbleBtn.addEventListener("click", () => handleButtonClick(1));
selectionBtn.addEventListener("click", () => handleButtonClick(2));
insertionBtn.addEventListener("click", () => handleButtonClick(3));
quickBtn.addEventListener("click", () => handleButtonClick(4));
mergeBtn.addEventListener("click", () => handleButtonClick(5));

function generateArray(){
    for(let i=0; i<n; i++){
        array[i]=Math.random();
    }
    showBars();
}


function showBars(){
    const container = document.getElementById('container');
    container.innerHTML = " ";

    for(let i=0; i<array.length; i++){
        const bar=document.createElement("div");
        bar.style.height=Math.ceil(array[i]*100)+"%";
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
            quick_sort();
            break;
        case 5:
            mergeBtn.style.backgroundColor= "Purple";
            merge_sort();
            break;
    }
}

//Promise 
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble sort algorithm
async function bubbleSort(array){
    for (let i = 0; i < n - 1; i++){
        for (let j = 0; j < n - i - 1; j++){
            // Highlight the bars being compared
            document.querySelectorAll('.bar')[j].style.backgroundColor = 'red';
            document.querySelectorAll('.bar')[j + 1].style.backgroundColor = 'red';

            // Delay for visualization
            await sleep(delay);
            if (array[j] > array[j + 1]){
                // Swap if the current element is greater than the next one
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                // Update the visual representation
                showBars();
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

        for(let j=i+1; j<array.length; j++){

            //Highlighting the element being considered for swapping
            document.querySelectorAll(".bar")[j].style.backgroundColor = "red";
            document.querySelectorAll(".bar")[min_idx].style.backgroundColor = "red";

            await sleep(delay);

            if(array[j] < array[min_idx]){
                min_idx = j;
            }  

        } 
        // Swap the found minimum element with the first element
        [array[i], array[min_idx]] = [array[min_idx], array[i]];

        showBars();
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

            await sleep(delay);
  
            // Blue for sorted elements
            document.querySelectorAll(".bar")[j+1].style.backgroundColor = "blue"; 
        }
        array[j + 1] = key;
        // Green for the currently selected element
        document.querySelectorAll(".bar")[j+1].style.backgroundColor = "green";
        showBars();
        await sleep(delay);
    }
    //remove the background-Color of the button after fishing the sorting
    insertionBtn.style.backgroundColor = "white";
}
  

//quick sort

async function partition(bars, left, right) {
    let i = left - 1;
    bars[right].style.background = "red";
    for (let j = left; j <= right - 1; j++) {
        bars[j].style.background = "yellow";
        await sleep(delay);
        if (parseInt(bars[j].style.height) < parseInt(bars[right].style.height)) {
            i++;
            
            [bars[i].style.height, bars[j].style.height]=[bars[j].style.height, bars[i].style.height];
            
            bars[i].style.height = "orange";
            if (i != j) {
                bars[j].style.background = "orange";
            }
            await sleep(delay);
        }
        else {
            bars[j].style.height = "blue";
        }
    }
    i++;
    await sleep(delay);

    [bars[i].style.height, bars[right].style.height]=[bars[right].style.height, bars[i].style.height];
    
    bars[right].style.background = "blue";
    bars[i].style.background = "lightgreen";
    await sleep(delay);
    for (let k = 0; k < bars.length; k++) {
        if (bars[k].style.background != "lightgreen") {
            bars[k].style.background = "green";
        }
    }
    return i;
}
async function quickSort(bars, left, right) {
    if (left < right) {
        let pivot_index = await partition(bars, left, right);
        await quickSort(bars, left, pivot_index - 1);
        await quickSort(bars, pivot_index + 1, right);
    }
    else {
        if (left >= 0 && right >= 0 && left < bars.length && right < bars.length) {
            bars[right].style.background = "lightgreen";
            bars[left].style.background = "lightgreen";
        }
    }
}
async function quick_sort(){
    let bars = document.querySelectorAll(".bar");
    let left = 0;
    let right = bars.length - 1;
    await quickSort(bars, left, right);
    for (let k = bars.length - 1; k >= 0; k--) {
		bars[k].style.background = "black";
		await sleep(delay);
	}
    //Removing purple color of the button after the completion of quick sort
    quickBtn.style.backgroundColor = "white";
};

//merge sort
async function merge(arr, low, mid, high){

	const s1 = mid - low + 1;
	const s2 = high - mid;

	let left = [];
	let right = [];

	for (let i = 0; i < s1; i++) {
		arr[low + i].style.background = "red";
		left[i] = arr[low + i].style.height;
		await sleep(delay);
	}

	for (let i = 0; i < s2; i++) {
		arr[mid + 1 + i].style.background = "red";
		right[i] = arr[mid + 1 + i].style.height;
		await sleep(delay);
	}

	let i = 0, j = 0, k = low;

	while (i < s1 && j < s2) {
		if (parseInt(left[i]) <= parseInt(right[j])) {
			arr[k].style.background = "green";
			arr[k].style.height = left[i];
			i++;
			k++;
		}

		else {
			arr[k].style.background = "green";
			arr[k].style.height = right[j];
			j++;
			k++;
		}
		await sleep(delay);
	}

	while (i < s1) {
		arr[k].style.background = "green";
		arr[k].style.height = left[i];
		i++;
		k++;
		await sleep(delay);
	}

	while (j < s2) {
		arr[k].style.background = "green";
		arr[k].style.height = right[j];
		j++;
		k++;
		await sleep(delay);
	}
}

async function mergeSort(arr, l, r) {
	if (l >= r) {
		return;
	}
	const m = l + Math.floor((r - l) / 2);
	await mergeSort(arr, l, m);
	await mergeSort(arr, m + 1, r);
	await merge(arr, l, m, r);
}

async function merge_sort() {
	let arr = document.querySelectorAll('.bar');
	await mergeSort(arr, 0, parseInt(arr.length) - 1);
	for (let k = arr.length - 1; k >= 0; k--) {
		arr[k].style.background = "black";
		await sleep(delay);
	}
    //removing the purple color of the button
    mergeBtn.style.backgroundColor = "white";
}
