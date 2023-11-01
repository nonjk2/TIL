- [Sort 정렬](#sort-정렬)
  - [버블 정렬 (Bubble Sort)](#버블-정렬-bubble-sort)
  - [삽입 정렬 (Insertion Sort)](#삽입-정렬-insertion-sort)
  - [선택 정렬 (Selection Sort)](#선택-정렬-selection-sort)
  - [병합 정렬 (Merge Sort)](#병합-정렬-merge-sort)
  - [퀵 정렬 (Quick Sort)](#퀵-정렬-quick-sort)
  - [힙 정렬 (Heap Sort)](#힙-정렬-heap-sort)
  - [기수 정렬 (Radix Sort)](#기수-정렬-radix-sort)
  - [카운팅 정렬 (Counting Sort)](#카운팅-정렬-counting-sort)
  - [버킷 정렬 (Bucket Sort)](#버킷-정렬-bucket-sort)
  - [자바스크립트의 배열 정렬 메서드](#자바스크립트의-배열-정렬-메서드)

# Sort 정렬

- 정렬은 데이터를 특정 순서로 재배열하는 프로세스를 의미한다.
- 데이터 정렬은 컴퓨터 과학과 프로그래밍에서 중요한 주제 중 하나이고, 데이터를 정렬하면 검색, 필터링 및 데이터 처리 작업이 훨씬 빨라진다.
- 다양한 정렬 알고리즘이 존재하고, 어떤 알고리즘을 선택하느냐는 데이터 그기 , 형태 및 정렬 기준에 따라 다르다.

## 버블 정렬 (Bubble Sort)

- 인접한 두 요소를 비교하며 정렬하는 간단한 알고리즘.
- 비교 및 교환 연산을 반복하여 정렬.
- 시간 복잡도: O(n^2) - 데이터 양이 많으면 효율이 좋지 않음.

```js
function bubbleSort(arr) {
  let len = arr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return arr;
}

const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = bubbleSort(unsortedArray);
console.log(sortedArray);
```

## 삽입 정렬 (Insertion Sort)

- 리스트를 정렬된 부분과 정렬되지 않은 부분으로 나누어 정렬.
- 각 요소를 적절한 위치에 삽입.
- 시간 복잡도: O(n^2) - 데이터 양이 많으면 효율이 좋지 않음.

```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = insertionSort(unsortedArray);
console.log(sortedArray);
```

## 선택 정렬 (Selection Sort)

- 최소값을 찾아 맨 앞에 위치시키며 정렬.
- 시간 복잡도: O(n^2) - 데이터 양이 많으면 효율이 좋지 않음.

```js
function selectionSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}

const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = selectionSort(unsortedArray);
console.log(sortedArray);
```

## 병합 정렬 (Merge Sort)

- 분할 정복 기법 사용.
- 리스트를 반으로 나누고 각 부분을 병합.
- 시간 복잡도: O(n log n) - 일반적으로 효율적.

```js
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr; // 배열의 크기가 1 이하면 이미 정렬된 것으로 간주
  }

  // 배열을 중간 지점을 기준으로 나눈다.
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // 나눈 배열을 재귀적으로 병합 정렬한다.
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // left와 right 배열을 비교하면서 작은 값을 result에 넣는다.
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // 남은 요소들을 result에 추가한다.
  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = mergeSort(unsortedArray);
console.log(sortedArray);
```

## 퀵 정렬 (Quick Sort)

- 분할 정복 기법 사용.
- 피벗(Pivot)을 선택하고 피벗을 기준으로 작은 값과 큰 값으로 분할.
- 시간 복잡도: 평균적으로 O(n log n) - 빠른 정렬 알고리즘 중 하나.

```js
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = quickSort(unsortedArray);
console.log(sortedArray);
```

## 힙 정렬 (Heap Sort)

- 힙 자료구조를 사용하여 정렬.
- 시간 복잡도: O(n log n) - 일반적으로 효율적.

```js
function heapify(arr, length, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < length && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < length && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, length, largest);
  }
}

function heapSort(arr) {
  const length = arr.length;

  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    heapify(arr, length, i);
  }

  for (let i = length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }

  return arr;
}

const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = heapSort(unsortedArray);
console.log(sortedArray);
```

## 기수 정렬 (Radix Sort)

- 비교 대신 비교 대상의 특정 자릿수를 사용하여 정렬.
- 시간 복잡도: O(kn) - k는 숫자의 자릿수.

```js
function getMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

function countingSort(arr, exp) {
  const output = new Array(arr.length);
  const count = new Array(10).fill(0);

  for (let i = 0; i < arr.length; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i] / exp) % 10]--;
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
}

function radixSort(arr) {
  const max = getMax(arr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSort(arr, exp);
  }
  return arr;
}

const unsortedArray = [170, 45, 75, 90, 802, 24, 2, 66];
const sortedArray = radixSort(unsortedArray);
console.log(sortedArray);
```

## 카운팅 정렬 (Counting Sort)

- 정수 값에만 적용 가능하며, 각 값의 출현 빈도를 카운트하여 정렬.
- 시간 복잡도: O(n + k) - k는 값의 범위.

```js
function countingSort(arr) {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }

  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
  return arr;
}

const unsortedArray = [4, 2, 2, 8, 3, 3, 1];
const sortedArray = countingSort(unsortedArray);
console.log(sortedArray);
```

## 버킷 정렬 (Bucket Sort)

- 값의 분포에 따라 버킷을 만들어 각 버킷에서 정렬 후 병합.
- 시간 복잡도: 일반적으로 O(n + k) - k는 버킷 수.

```js
function bucketSort(arr, bucketSize) {
  if (arr.length === 0) {
    return arr;
  }

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = new Array(bucketCount);

  for (let i = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }

  for (let i = 0; i < arr.length; i++) {
    const index = Math.floor((arr[i] - min) / bucketSize);
    buckets[index].push(arr[i]);
  }

  const sortedArray = [];
  for (let i = 0; i < bucketCount; i++) {
    if (buckets[i] !== undefined) {
      insertionSort(buckets[i]); // 여기서는 각 버킷에 삽입 정렬을 사용
      sortedArray.push(...buckets[i]);
    }
  }

  return sortedArray;
}

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}

const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = bucketSort(unsortedArray, 5);
console.log(sortedArray);
```

## 자바스크립트의 배열 정렬 메서드

    - JavaScript에서는 배열 객체의 `sort()` 메서드를 사용하여 배열을 정렬할 수 있다. `sort()` 메서드는 기본적으로 문자열로 변환한 값에 대해 정렬을 수행하며, 사용자 지정 정렬 순서를 지정할 수 있다.
