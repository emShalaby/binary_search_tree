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
    console.log([...new Set(array.sort())].map((x) => new node(x)));
  }
  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;
    const mid = parseInt((start + end) / 2);
    const root = arr[mid];
    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);
    return root;
  }

  insert(value, comparisonNode = this.root) {
    let someNode = new node(value);
    if (someNode.data > comparisonNode.data) {
      if (!comparisonNode.right) {
        comparisonNode.right = someNode;
        return;
      }
      this.insert(someNode.data, comparisonNode.right);
    }
    if (someNode.data < comparisonNode.data) {
      if (!comparisonNode.left) {
        comparisonNode.left = someNode;
        return;
      }
      this.insert(someNode.data, comparisonNode.left);
    }
  }
}

let test = new tree([1, 4, 3, 2]);
