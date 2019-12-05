class Node 
{ 
    constructor(data) 
    { 
        this.left = null
        this.data = data
        this.right = null
    } 
}

class BinaryTree 
{ 
    constructor() 
    { 
        this.root = new Node(null)
        this.size = 0
    } 

    clear()
    {
        this.root = new Node(null)
        this.size = 0 
    }

    sizeOf()
    {
        return this.size
    }

    isEmpty()
    {
        return this.size == 0
    }

    getRoot()
    {
        if(this.isEmpty())
            console.log('No root for you')
        else 
            return this.root.data
    }

    insert(data)
    {
        if(this.isEmpty())
            this.root.data = data
        else 
        {
            var newNode = new Node(data)
            var currNode = this.root

            function insertNode(currNode, newNode)
            {
                if(newNode.data < currNode.data)
                {
                    if(currNode.left == null)
                        currNode.left = newNode
                    else
                        insertNode(currNode.left, newNode)
                } else 
                  {
                      if(currNode.right == null)
                          currNode.right = newNode
                      else
                          insertNode(currNode.right, newNode)
                  }
            }

            insertNode(currNode, newNode)
        }

        this.size++
    }

    remove(data)
    {
        function minV(node)
        {
            var currNode = node

            while(currNode.left != null) 
                currNode = currNode.left

            return currNode.data 
        }

        function removeHelper(root, data)
        {
            //Base Case: If the tree is empty
            if(root == null)  
                return root

            if(data < root.data) 
                root.left = removeHelper(root.left, data)
            else if(data > root.data) 
                root.right = removeHelper(root.right, data)
  
            //if data is same as root's data, then this is the node to be deleted 
            else
            { 
                //execute some code whether the node has only one child or no child 
                if(root.left == null) 
                    return root.right
                else if(root.right == null) 
                    return root.left
  
                // node with two children: Get the inorder successor (smallest in the right subtree) 
                root.data = minV(root.right)
  
                // Delete the inorder successor 
                root.right = removeHelper(root.right, root.data)
            } 
  
            return root
        }

        if(this.isEmpty())
            console.log('STOP TAKING FROM THE VOID!')
        else
            this.root = removeHelper(this.root, data)
    }

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
                  
    findMin()
    {
        var currNode = this.root

        while(currNode.left != null) 
            currNode = currNode.left

        return currNode.data 
    }
    
    findMax()
    {
        var currNode = this.root

        while(currNode.right != null) 
            currNode = currNode.right

        return currNode.data 
    }

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
        console.log('prePrint tree = ' + tree + '\n')
    }

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
        console.log('inPrint tree = ' + tree + '\n')
    }

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
        console.log('postPrint tree = ' + tree + '\n')
    }

    print2D()
    {
        function print2DHelper(node, space, count)  
        {  
            if(node == null)
                return

            var tree = ''
            space += count 

            print2DHelper(node.right, space, count)
            
            console.log('')
            
            for(var i = count; i < space; i++)  
                tree += ' '
            
            tree += node.data +  '\n'
            console.log(tree)
            
            print2DHelper(node.left, space, count)
        }  

        print2DHelper(this.root, 0, 10)
    }

    printLevel()
    {
        function numLength(number) 
        {
            return number.toString().length
        }

        function toExp(number)
        {
            var nL = numLength(number)

            if(nL < 6)
                return number
            else 
                return number.toExponential(2)
        }

        function printLevelHelper(nodes, count, flag)
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
                    levelNodes += ' '
            } 
            
            console.log(levelNodes)

            printLevelHelper(nextNodes, count, flag)
        }

        var nodes = [[this.root, 0]]

        if(this.isEmpty())
            console.log('Nothing to print dawg!')
        else
            printLevelHelper(nodes, 1, true)
        console.log('')
    }
}

module.exports = {
    BinaryTree
}