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
      [...new Set(array.sort((a, b) => a - b))].map((x) => new node(x))
    );
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
  delete(data, comparisonNode = this.root) {
    if (comparisonNode === null) {
      return comparisonNode;
    }
    //value is less than go left
    if (data < comparisonNode.data) {
      comparisonNode = this.delete(data, comparisonNode.left);
    }
    //value is more then go right
    else if (data > comparisonNode.data) {
      comparisonNode = this.delete(data, comparisonNode.right);
    }
    //value matches , then delete node and update tree
    else if (data == comparisonNode.data) {
      //case1: node has 1 child or no children in no children case it will just return null
      if (!comparisonNode.left) {
        return comparisonNode.right;
      } else if (!comparisonNode.right) {
        return comparisonNode.left;
      }
      //case2: node has 2 children
      else {
        const minData = function findNextSmallestNumber(comparisonNode) {
          let min = comparisonNode.data;
          let newRoot = comparisonNode;

          while (newRoot.left !== null) {
            min = root.left.data;
            newRoot = root.left;
          }
          return min;
        };
        comparisonNode.data = minData(comparisonNode.right);
        comparisonNode.right = this.delete(
          comparisonNode.data,
          comparisonNode.right
        );
      }
      return comparisonNode;
    }
  }
  find(data, comparisonNode = this.root) {
    if (!comparisonNode) return null;
    if (data == comparisonNode.data) return comparisonNode;
    else if (data < comparisonNode.data) {
      return this.find(data, comparisonNode.left);
    } else if (data > comparisonNode.data) {
      return this.find(data, comparisonNode.right);
    }
  }
  levelOrder() {
    if (this.root === null) return;
    let result = [];
    let queue = [];
    queue.push(this.root);

    while (queue.length) {
      let level = [];
      let qlen = queue.length;

      console.log(queue.length);
      for (let i = 0; i < qlen; i++) {
        let node = queue.shift();
        level.push(node.data);
        if (node.left != null) queue.push(node.left);
        if (node.right != null) queue.push(node.right);
      }
      result.push(level);
    }
    return result;
  }

  inorder(root = this.root, result = []) {
    if (root) {
      this.inorder(root.left, result);
      result.push(root.data);
      this.inorder(root.right, result);
    }
    return result;
  }
  preorder(root = this.root, result = []) {
    if (root) {
      result.push(root.data);
      this.preorder(root.left, result);
      this.preorder(root.right, result);
    }
    return result;
  }
  postorder(root = this.root, result = []) {
    if (root) {
      this.postorder(root.left, result);
      this.postorder(root.right, result);
      result.push(root.data);
    }
    return result;
  }
  height(data) {
    let node = this.find(data);
    if (!node) return -1;

    let leftHeight = this.height(node.left ? node.left.data : null);
    let rightHeight = this.height(node.right ? node.right.data : null);
    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
  }
  depth(data) {
    let depth = 0;
    let root = this.root;
    while (root) {
      if (data < root.data) {
        depth++;
        root = root.left;
      } else if (data > root.data) {
        depth++;
        root = root.right;
      } else if (root.data == data) return depth;
    }
    return null;
  }
  balanceHeight(currNode = this.root) {
    if (currNode == null) return -1;
    let leftHeight = this.balanceHeight(currNode.left);
    if (leftHeight == -2) return -2;
    let rightHeight = this.balanceHeight(currNode.right);
    if (rightHeight == -2) return -2;

    if (Math.abs(leftHeight - rightHeight) > 1) return -2;
    return Math.max(leftHeight, rightHeight) + 1;
  }
  isBalanced() {
    if (this.balanceHeight() == -2) return false;
    else return true;
  }
  rebalance() {
    let arr = this.postorder();
    this.root = this.buildTree(
      [...new Set(arr.sort((a, b) => a - b))].map((x) => new node(x))
    );
  }
}
let test = new tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
