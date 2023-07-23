class node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class tree {
  constructor(array) {
    //fancy way of sorting the array and getting rid of duplicates and create nodes out of each value

    this.root = this.buildTree(
      [...new Set(array.sort())].map((x) => new node(x))
    );
  }
  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let root = arr[mid];
    root.left = this.buildTree(arr, start, (end = mid - 1));
    root.right = this.buildTree(arr, (start = mid + 1), end);
    return root;
  }
}

let test = new tree([1, 5, 690, 12, 1, 2, 5, 69, 48, 23]);
