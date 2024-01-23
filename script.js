let waitTime;
let randomArray=[];


//getting references to the buttons
const generateArr = document.getElementById("generateArray");
const bubbleBtn = document.getElementById("bubbleBtn");
const selectionBtn = document.getElementById("selectionBtn");
const insertionBtn = document.getElementById("insertionBtn");
const quickBtn = document.getElementById("quickBtn");
const mergeBtn = document.getElementById("mergeBtn");

var inp_asize = document.getElementById("size_input");
var inp_aspeed=document.getElementById("speed_input");


//adding click event listeners to the buttons
generateArr.addEventListener("click", generateArray);
bubbleBtn.addEventListener("click", bubbleSort);
selectionBtn.addEventListener("click", selectionSort);
insertionBtn.addEventListener("click", insertionSort);
quickBtn.addEventListener("click", quick_sort);
mergeBtn.addEventListener("click", merge_sort);


//speed maintenance
waitTime = 250;

inp_aspeed.addEventListener("input", () => {

    waitTime = 250 / (parseInt(inp_aspeed.value));
})
//Promise 
function animate(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}

//array size maintenance
inp_asize.addEventListener("input",generateArray);

generateArray();

function generateArray() {
    randomArray.length = 0;
    const container = document.querySelector("#container");
    let arraySize = inp_asize.value;
    container.innerHTML = '';
    for (let i = 0; i < arraySize; i++) {
        randomArray.push(getRandomInt(15, 605));
    }
    for (let i = 0; i < arraySize; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${randomArray[i] / 1.5}px`;
        bar.classList.add('bar');
        bar.classList.add('bar-item');
        bar.classList.add(`barNo${i}`);
        container.appendChild(bar);
    }
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1) + min);
}

//Disabling function
function disableInputs(){
    inp_aspeed.disabled = true;
    inp_asize.disabled = true;
    generateArr.disabled = true;
    bubbleBtn.disabled = true;
    selectionBtn.disabled = true;
    insertionBtn.disabled = true;
    quickBtn.disabled = true;
    mergeBtn.disabled = true;
}

//Enabling
function enableInputs(){
    inp_aspeed.disabled = false;
    inp_asize.disabled = false;
    generateArr.disabled = false;        
    bubbleBtn.disabled = false;
    selectionBtn.disabled = false;        
    insertionBtn.disabled = false;
    quickBtn.disabled = false;
    mergeBtn.disabled = false;
}
function swap(a, b) {
    let temp = a.style.height;
    a.style.height = b.style.height;
    b.style.height = temp;
}

// Bubble sort algorithm
async function bubbleSort() {
    bubbleBtn.style.backgroundColor= "rgb(92, 74, 175)";
    console.log("Bubble Sort running");
    disableInputs();

    const arr = document.querySelectorAll(".bar");
    for (let i = 0; i < arr.length - 1; i++) {

        for (let j = 0; j < arr.length - i - 1; j++) {
            if (parseInt(arr[j].style.height) > parseInt(arr[j + 1].style.height)) {
                arr[j].style.background = '#f9259d';
                arr[j + 1].style.background = '#f9259d';
                swap(arr[j], arr[j + 1]);
                await animate(2 * waitTime);
                arr[j].style.background = '#25f9eb';
                arr[j + 1].style.background = '#25f9eb';
                await animate(waitTime);


            }
            else {
                arr[j].style.background = '#25f9eb';
                arr[j + 1].style.background = '#25f9eb';
                await animate(waitTime);
            }
            for (let k = j; k >= 0; k--)
                arr[k].style.background = '#f98125';
        }
    }

    for (let k = arr.length - 1; k >= 0; k--) {
        arr[k].style.background = '#f98125';
        await animate(100 / randomArray.length);
    }

    bubbleBtn.style.backgroundColor= "rgba(116, 128, 236, 0.781)";
    enableInputs();
}

//Selection Sort
async function selectionSort() {
    selectionBtn.style.backgroundColor= "rgb(92, 74, 175)";
    console.log("Selection Sort running");
    disableInputs();
    const arr = document.querySelectorAll(".bar");
    for (let i = 0; i < arr.length - 1; i++) {
        arr[i].style.background = '#f9259d';
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            arr[j].style.background = '#f9259d';
            if (parseInt(arr[j].style.height) < parseInt(arr[min].style.height)) {
                min = j;
                arr[min].style.background = '#9df925';
                await animate(waitTime);
            }
            else {
                console.log(j);
                arr[j].style.background = '#f9259d';
                await animate(waitTime);
            }

            for (let k = min + 1; k < arr.length; k++)
                arr[k].style.background = '#f98125';

            for (let l = i + 1; l < min; l++)
                arr[l].style.background = '#f98125';
        }

        swap(arr[i], arr[min]);
        arr[i].style.background = '#25f9eb';
    }

    for (let k = arr.length - 1; k >= 0; k--) {
        arr[k].style.background = '#f98125';
        await animate(100 / randomArray.length);
    }

    bubbleBtn.style.backgroundColor= "rgba(116, 128, 236, 0.781)";
    enableInputs();
}

//insertion sort
async function insertionSort() {
    insertionBtn.style.backgroundColor= "rgb(92, 74, 175)";
    console.log("Insertion Sort running");
    disableInputs();
    const arr = document.querySelectorAll(".bar");
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i].style.height;
        let j = i - 1;
        arr[i].style.background = '#9df925';
        await animate(waitTime);
        while (j >= 0 && (parseInt(arr[j].style.height) > parseInt(key))) {
            arr[j + 1].style.height = arr[j].style.height;
            arr[j].style.background = '#f9259d';
            j--;

            await animate(waitTime);

            for (let k = i; k >= 0; k--) {
                arr[k].style.background = '#25f9eb';
            }
        }
        arr[j + 1].style.height = key;
    }

    for (let k = arr.length - 1; k >= 0; k--) {
        arr[k].style.background = '#f98125';
        await animate(100 / randomArray.length);
    }

    insertionBtn.style.backgroundColor= "rgba(116, 128, 236, 0.781)";
    enableInputs();
}
  

//quick sort

async function partition(arr, l, r) {
    console.log("In partition function");
    let pivot = r;
    let i = l - 1;
    arr[pivot].style.background = '#f9259d';

    for (let j = l; j <= r - 1; j++) {
        arr[j].style.background = '#9df925';
        await animate(waitTime);
        if (parseInt(arr[j].style.height) < parseInt(arr[pivot].style.height)) {
            i++;
            arr[i].style.background = '#f92533';
            arr[j].style.background = '#f92533';
            await animate(waitTime);
            swap(arr[i], arr[j]);
            arr[i].style.background = '#259df9';
            arr[j].style.background = '#259df9';
            await animate(waitTime);
        }
    }
    swap(arr[++i], arr[r]);


    await animate(waitTime);

    for (let k = 0; k <= pivot; k++)
        arr[k].style.background = '#25f9eb';

    for (let k = pivot + 1; k < arr.length; k++)
        arr[k].style.background = '#25f9eb';


    return i;
}

async function quickSort(arr, l, r) {
    if (l < r) {
        let pivot_index = await partition(arr, l, r);
        await quickSort(arr, l, pivot_index - 1);
        await quickSort(arr, pivot_index + 1, r);
    }
}

async function quick_sort() {
    quickBtn.style.backgroundColor= "rgb(92, 74, 175)";
    console.log("Quick sort running");
    disableInputs();
    let arr = document.querySelectorAll('.bar');
    for (let k = arr.length - 1; k >= 0; k--) {
        arr[k].style.background = '#25f9eb';
    }
    await quickSort(arr, 0, parseInt(arr.length) - 1);
    for (let k = arr.length - 1; k >= 0; k--) {
        arr[k].style.background = '#f98125';
        await animate(100 / arr.length);
    }

    quickBtn.style.backgroundColor= "rgba(116, 128, 236, 0.781)";
    enableInputs();
}
//merge sort
async function merge(arr, low, mid, high) {
	console.log('Inside merge function');
	const s1 = mid - low + 1;
	const s2 = high - mid;

	let left = [];
	let right = [];

	for (let i = 0; i < s1; i++) {
		arr[low + i].style.background = '#f9259d';
		left[i] = arr[low + i].style.height;
		await animate(waitTime);
	}

	for (let i = 0; i < s2; i++) {
		arr[mid + 1 + i].style.background = '#f9259d';
		right[i] = arr[mid + 1 + i].style.height;
		await animate(waitTime);
	}

	let i = 0, j = 0, k = low;

	while (i < s1 && j < s2) {
		if (parseInt(left[i]) <= parseInt(right[j])) {
			arr[k].style.background = '#25f9eb';
			arr[k].style.height = left[i];
			i++;
			k++;
		}

		else {
			arr[k].style.background = '#25f9eb';
			arr[k].style.height = right[j];
			j++;
			k++;
		}
		await animate(waitTime);
	}

	while (i < s1) {
		arr[k].style.background = '#25f9eb';
		arr[k].style.height = left[i];
		i++;
		k++;
		await animate(waitTime);
	}

	while (j < s2) {
		arr[k].style.background = '#25f9eb';
		arr[k].style.height = right[j];
		j++;
		k++;
		await animate(waitTime);
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
    mergeBtn.style.backgroundColor= "rgb(92, 74, 175)";
	console.log("Merge Sort running");
	disableInputs();
	let arr = document.querySelectorAll('.bar');
	await mergeSort(arr, 0, parseInt(arr.length) - 1);
	for (let k = arr.length - 1; k >= 0; k--) {
		arr[k].style.background = '#f98125';
		await animate(100 / randomArray.length);
	}

    mergeBtn.style.backgroundColor= "rgba(116, 128, 236, 0.781)";
	enableInputs();
}
