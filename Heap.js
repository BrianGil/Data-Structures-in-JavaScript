/*Class which creates a node with 2 fields:
 *The data field 
 *The link to the left node
 *The link to the right node
 */
class Node 
{ 
    constructor(data) 
    { 
        this.left = null
        this.data = data
        this.right = null
    } 
}

//Parent class which creates a heap through 2 data structures: an array and a linked list (tree structure)
class Heap
{ 
    constructor() 
    { 
        this.root = new Node(null)
        this.heap = []
    } 

    //Method to delete every element from the heap
    clear()
    {
        this.root = new Node(null)
        this.heap = []
        console.log('Heap is now empty')
    }

    //Method to return the root of the heap
    getRoot()
    {
        if(this.isEmpty())
            console.log('Cannot obtain root from an empty heap')
        else
            return this.root.data
    }

    //Method that returns the size of the heap
    sizeOf()
    {
        return this.heap.length
    }

    //Method that checks if the heap is empty
    isEmpty()
    {
        return this.heap.length == 0
    }

    //Method that returns the maximum tree level of the heap
    maxLevel()
    {
        function maxLevel(node)
        {
            if(node == null)
                return 0 

            return Math.max(maxLevel(node.left), maxLevel(node.right)) + 1
        }

        return maxLevel(this.root)
    }

    //Method that displays the elements of the heap tree structure in pre-order traversal
    prePrint()
    {
        var tree = ''

        function preorder(node)
        {
            if(node != null) 
            {  
                tree += node.data + '->'
                preorder(node.left)
                preorder(node.right)
            }
        }

        preorder(this.root)
        console.log(tree)
    }

    //Method that displays the elements of the heap tree structure in in-order traversal
    inPrint()
    {
        var tree = ''

        function inorder(node)
        {
            if(node != null) 
            {  
                inorder(node.left)
                tree += node.data + '->'
                inorder(node.right)
            }
        }

        inorder(this.root)
        console.log(tree)
    }

    //Method that displays the elements of the heap tree structure in post-order traversal
    postPrint()
    {
        var tree = ''

        function postorder(node)
        {
            if(node != null) 
            {  
                postorder(node.left)
                postorder(node.right)
                tree += node.data + '->'
            }
        }

        postorder(this.root)
        console.log(tree)
    }

    //Method that displays the elements of the heap tree structure as an actual tree
    print()
    {
        function toExp(number)
        {
            var nL = number.toString()

            if(nL.length < 6)
                return number
            else 
                return number.toExponential(2)
        }

        function printHelper(nodes, count, flag)
        {
            if(nodes.length == 0)
                return

            var levelNodes = ''
            var nextNodes = []

            for(var i = 0; i < nodes.length; i++) 
            {
                var num = toExp(nodes[i][0].data)

                if(flag)
                {
                     levelNodes += '[' + count + ': ' + num + ']'
                     flag = false
                } else 
                      levelNodes += '[' + count + ': ' + num + ' | ' + nodes[i][2] + ' of ' + nodes[i][1] + ']'

                if(nodes[i][0].left != null && nodes[i][0].right != null)
                { 
                    nextNodes.push([nodes[i][0].left, count, 'L'])
                    nextNodes.push([nodes[i][0].right, count, 'R'])
                } else if(nodes[i][0].left != null)
                      nextNodes.push([nodes[i][0].left, count, 'L'])
                  else if(nodes[i][0].right != null)
                      nextNodes.push([nodes[i][0].right, count, 'R'])
                
                count++

                if(i != nodes.length - 1)
                    levelNodes += '  '
            } 
            
            console.log(levelNodes)

            printHelper(nextNodes, count, flag)
        }

        var nodes = [[this.root, 0]]

        if(this.isEmpty())
            console.log('Cannot print an empty heap')
        else
            printHelper(nodes, 0, true)

        console.log('')
    }
}

//Subclass which creates a heap where every child node is less than or equal to its parent node
class MaxHeap extends Heap
{
    constructor()
    {
        super()
    }

    //Method to add an element at the end of the heap
    insert(data)
    {
        this.insertAt(data, this.sizeOf())
    }

    //Method to add an element at a specific index of the heap
    insertAt(data, index)
    {
        if(typeof index != 'number')
            console.log('Index \'' + index + '\' is not a number')
        if(index < 0 || index > this.sizeOf())
            console.log('Index \'' + index + '\' out of bounds')
        else 
        {
            this.heap.splice(index, 0, data)

            for(var i = index; i > 0; i--)
            {
                if(this.heap[i] > this.heap[i - 1])
                {
                    this.heap[i] = this.heap[i - 1]
                    this.heap[i - 1] = data
                } else 
                  {
                      break
                  }
            }

            function insertHelper(nodes, newNode)
            {
                var nextNodes = []

                for(var i = 0; i < nodes.length; i++)
                {
                    if(nodes[i].left == null)
                    {
                        nodes[i].left = newNode
                        return 
                    } else if(nodes[i].right == null)
                      {
                          nodes[i].right = newNode
                          return
                      } else 
                        {
                            nextNodes.push(nodes[i].left)
                            nextNodes.push(nodes[i].right)
                        }
                }

                insertHelper(nextNodes, newNode)
            }

            this.root = new Node(this.heap[0])
            var nodes = [this.root]

            for(var i = 1; i < this.sizeOf(); i++)
            {
                var newNode = new Node(this.heap[i])
                insertHelper(nodes, newNode)
            }
        }    
    }

    //Method to delete an element at the end of the heap
    remove()
    {
        if(this.isEmpty())
            console.log('Cannot remove from an empty heap')
        else
            this.removeAt(this.sizeOf() - 1)
    }

    //Method to delete an element at a specific index of the heap
    removeAt(index)
    {
        if(typeof index != 'number')
            console.log('Index \'' + index + '\' is not a number')
        if(index < 0 || index >= this.sizeOf())
            console.log('Index \'' + index + '\' out of bounds')
        else
        {
            this.heap.splice(index, 1)

            function insertHelper(nodes, newNode)
            {
                var nextNodes = []

                for(var i = 0; i < nodes.length; i++)
                {
                    if(nodes[i].left == null)
                    {
                        nodes[i].left = newNode
                        return 
                    } else if(nodes[i].right == null)
                      {
                          nodes[i].right = newNode
                          return
                      } else 
                        {
                            nextNodes.push(nodes[i].left)
                            nextNodes.push(nodes[i].right)
                        }
                }

                insertHelper(nextNodes, newNode)
            }

            this.root = new Node(this.heap[0])
            var nodes = [this.root]

            for(var i = 1; i < this.sizeOf(); i++)
            {
                var newNode = new Node(this.heap[i])
                insertHelper(nodes, newNode)
            }
        }
    }
}

//Subclass which creates a heap where every child node is greater than or equal to its parent node
class MinHeap extends Heap
{
    constructor()
    {
        super()
    }

    insert(data)
    {
        this.insertAt(data, this.sizeOf())
    }

    insertAt(data, index)
    {
        if(typeof index != 'number')
            console.log('Index \'' + index + '\' is not a number')
        else if(index < 0 || index > this.sizeOf())
            console.log('Index \'' + index + '\' out of bounds')
        else 
        {
            this.heap.splice(index, 0, data)

            for(var i = index; i > 0; i--)
            {
                if(this.heap[i] < this.heap[i - 1])
                {
                    this.heap[i] = this.heap[i - 1]
                    this.heap[i - 1] = data
                } else 
                  {
                      break
                  }
            }

            function insertHelper(nodes, newNode)
            {
                var nextNodes = []

                for(var i = 0; i < nodes.length; i++)
                {
                    if(nodes[i].left == null)
                    {
                        nodes[i].left = newNode
                        return 
                    } else if(nodes[i].right == null)
                      {
                          nodes[i].right = newNode
                          return
                      } else 
                        {
                            nextNodes.push(nodes[i].left)
                            nextNodes.push(nodes[i].right)
                        }
                }

                insertHelper(nextNodes, newNode)
            }

            this.root = new Node(this.heap[0])
            var nodes = [this.root]

            for(var i = 1; i < this.sizeOf(); i++)
            {
                var newNode = new Node(this.heap[i])
                insertHelper(nodes, newNode)
            }
        }    
    }

    remove()
    {
        if(this.isEmpty())
            console.log('Cannot remove from an empty heap')
        else
            this.removeAt(this.sizeOf() - 1)
    }

    removeAt(index)
    {
        if(typeof index != 'number')
            console.log('Index \'' + index + '\' is not a number')
        else if(index < 0 || index >= this.sizeOf())
            console.log('Index \'' + index + '\' is out of bounds')
        else
        {
            this.heap.splice(index, 1)

            function insertHelper(nodes, newNode)
            {
                var nextNodes = []

                for(var i = 0; i < nodes.length; i++)
                {
                    if(nodes[i].left == null)
                    {
                        nodes[i].left = newNode
                        return 
                    } else if(nodes[i].right == null)
                      {
                          nodes[i].right = newNode
                          return
                      } else 
                        {
                            nextNodes.push(nodes[i].left)
                            nextNodes.push(nodes[i].right)
                        }
                }

                insertHelper(nextNodes, newNode)
            }

            this.root = new Node(this.heap[0])
            var nodes = [this.root]

            for(var i = 1; i < this.sizeOf(); i++)
            {
                var newNode = new Node(this.heap[i])
                insertHelper(nodes, newNode)
            }
        }
    }
}

module.exports = {
    Heap, MaxHeap, MinHeap
}