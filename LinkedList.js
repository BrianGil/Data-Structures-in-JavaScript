/*Class which creates a node with 2 fields:
 *The data field 
 *The link to the next node
 */
class SinglyNode
{  
    constructor(data) 
    { 
        this.data = data
        this.next = null
    }
}

/*Class which creates a node with 3 fields:
 *The data field 
 *The link to the previous node
 *The link to the next node
 */
class DoublyNode
{  
    constructor(data) 
    { 
        this.prev = null
        this.data = data
        this.next = null
    }
}

//Parent class which creates a linked list
class LinkedList
{
    constructor() 
    { 
        this.size = 0
    }

    //Method which returns the size of the linked list
    sizeOf()
    {
        return this.size
    }

    //Method which checks if the linked list is empty
    isEmpty()
    {
        return this.size == 0
    }
}

//Subclass which creates a linked list consisting of singly nodes
class SinglyLinkedList extends LinkedList
{
    constructor()
    {
        super()
        this.head = new SinglyNode(null)
        this.tail = new SinglyNode(null)
    }

    //Method to delete every node from the linked list
    clear()
    {
        if(this.isEmpty())
            console.log('Singly linked list is already empty')
        else
        {
            if(this.isCircular())
            {  
                this.head = new SinglyNode(null)
                this.tail = new SinglyNode(null)
                this.head.next = this.tail
                this.tail.next = this.head
            } else
              {
                  this.head = new SinglyNode(null)
                  this.tail = new SinglyNode(null)
              }

            this.size = 0
            console.log('Singly linked list is now empty')
        }
    }

    /*Method that checks if the linked list is circular (tail node is part of the list and 
     *points back to the head node)
     */
    isCircular()
    {
        return this.tail.next == this.head
    }

    //Method to make the linked list circular
    circularize()
    {
        if(this.isCircular())
            console.log('Singly linked list is already circular')
        else
        {
            if(this.isEmpty() || this.size == 1)
            {        
                this.head.next = this.tail
                this.tail.next = this.head
            } else 
              {
                  var curr = this.head

                  while(curr.next.next != null)
                      curr = curr.next
                 
                  this.tail.data = curr.next.data
                  this.tail.next = this.head
                  curr.next = this.tail
              }
        
            console.log('Singly linked list is now circular')
        }
    }
 
    //Method that takes a circular linked list and makes it non-circular
    decircularize()
    {
        if(!this.isCircular())
            throw 'Singly linked list is already non-circular'
        else 
        {
            if(this.isEmpty() || this.size == 1)
                this.head.next = null
            else 
            {
                var curr = this.head
                
                while(curr.next != this.tail)
                    curr = curr.next

                var lastNode = new SinglyNode(this.tail.data)
                curr.next = lastNode
                this.tail = new SinglyNode(null)
            }

            console.log('Singly linked list is no longer circular')
        }
    }

    //Method to rotate the nodes in the linked list to the right k times
    rotate(k)
    {
        if(!this.isCircular())
            console.log('Cannot rotate non-circular singly linked list')
        else if(this.isEmpty())
            console.log('Cannot rotate empty singly linked list')
        else if(this.size == 1)
            console.log('Cannot rotate singly linked list of size 1')
        else if(typeof k != 'number')
            console.log('Cannot rotate due to non-numerical parameter')
        else 
        {    
            k = Math.round(k)
            
            for(var i = 0; i < k; i++)
            {
                this.addAt(this.tail.data, 0)
                this.remove()
            }   
        }
    }

    //Method to add an element at the end of the linked list
    add(element)
    {   
        var curr = this.head

        if(!this.isCircular())
        {
            if(this.isEmpty())
                this.head.data = element
            else
            {
                while(curr.next != null)
                    curr = curr.next

                var newNode = new SinglyNode(element)
                curr.next = newNode
            }
        } else 
          {
              if(this.isEmpty())
                  this.head.data = element
              else if(this.size == 1)
                  this.tail.data = element
              else 
              {
                  while(curr.next != this.tail)
                      curr = curr.next

                  var newNode = new SinglyNode(this.tail.data)
                  newNode.next = this.tail
                  curr.next = newNode
                  this.tail.data = element    
              }
          }
        
        this.size++
    }

    //Method to add an element at a specific index of the linked list
    addAt(element, index)
    {
        if(typeof index != 'number')
            console.log('Index \'' + index + '\' is not a number')
        else if(index < 0 || index > this.size)
            console.log('Index \'' + index + '\' out of bounds')
        else
        {            
            if(this.isEmpty())
            {
                this.head.data = element
                this.size++
            }
            else if(this.size == 1)
            {
                if(!this.isCircular())
                {
                    var newNode = new SinglyNode(element)

                    if(index == 0)
                    {
                        newNode.next = this.head
                        this.head = newNode
                    } else
                          this.head.next = newNode
                } else
                  {
                      if(index == 0)
                      {
                          this.tail.data = this.head.data
                          this.head.data = element
                      } else
                            this.tail.data = element
                  }

                this.size++
            } else
              {
                  if(index == 0)
                  {
                      if(!this.isCircular())
                      {
                          var newNode = new SinglyNode(element)
                          newNode.next = this.head
                          this.head = newNode
                      } else 
                        {
                            var newNode = new SinglyNode(this.head.data)
                            newNode.next = this.head.next
                            this.head.next = newNode
                            this.head.data = element
                        }

                      this.size++
                  } else if(index > 0 && index < this.size)
                    {
                        var newNode = new SinglyNode(element)
                        var count = 0
                        var curr = this.head
                        var prev

                        while(count < index) 
                        { 
                            count++
                            prev = curr
                            curr = curr.next
                        } 
      
                        newNode.next = curr
                        prev.next = newNode
                        this.size++
                    } else 
                          this.add(element)
              }
        }
    }

    //Method to delete an element at the end of the linked list
    remove()
    {
        if(this.isEmpty())
            console.log('Cannot remove from an empty singly linked list')
        else
        {
            var curr = this.head

            if(!this.isCircular())
            {
                if(this.size == 1)
                    this.head.data = null
                else
                {
                    while(curr.next.next != null)
                        curr = curr.next

                    curr.next = null
                }
            } else 
              {
                  if(this.size == 1)
                      this.head.data = null
                  else if(this.size == 2)
                      this.tail.data = null
                  else 
                  {
                      while(curr.next.next != this.tail)
                          curr = curr.next
                    
                      this.tail.data = curr.next.data
                      curr.next = this.tail
                  }
              }
            
            this.size--
        }
    }

    //Method to delete an element at a specific index of the linked list
    removeAt(index)
    {
        if(typeof index != 'number')
            console.log('Index \'' + index + '\' is not a number')
        else if(index < 0 || index >= this.size)
            console.log('Index \'' + index + '\' out of bounds')
        else
        {   
            if(this.isEmpty())
                console.log('Cannot remove from an empty singly linked list')
            else if(this.size == 1)
                this.remove()
            else if(this.size == 2)
            {
                if(!this.isCircular())
                {
                    if(index == 0)
                    {
                        this.head.data = this.head.next.data
                        this.head.next = null
                    } else 
                          this.head.next = null
                } else 
                  {
                      if(index == 0)
                      {
                          this.head.data = this.tail.data
                          this.tail.data = null
                      } else 
                            this.tail.data = null
                  }

                this.size--
            } else 
              {
                  if(index == 0)
                  {
                      this.head.data = this.head.next.data
                      this.head.next = this.head.next.next
                      this.size--
                  } else if(index > 0 && index < this.size - 1)
                    {
                        var count = 0
                        var curr = this.head
                        var prev

                        while(count < index)
                        {
                            count++
                            prev = curr
                            curr = curr.next
                        }

                        prev.next = curr.next
                        this.size--
                    } else 
                          this.remove()
              } 
        } 
    }

    //Method to display the elements of the linked list
    print()
    {
        if(this.isEmpty())
            console.log('Cannot print an empty singly linked list')
        else
        {
            var curr = this.head
            var count = 0
            var list = ''

            while(count != this.size)
            {
                list += '[' + curr.data + ']->'
                curr = curr.next
                count++
            }

            if(this.isCircular())
                list += '[H]'
            
            console.log(list)
        } 
    }
}

//Subclass which creates a linked list consisting of doubly nodes
class DoublyLinkedList extends LinkedList
{
    constructor()
    {
        super()
        this.head = new DoublyNode(null)
        this.tail = new DoublyNode(null)
        this.head.next = this.tail
        this.tail.prev = this.head
    }

    clear()
    {
        if(this.isEmpty())
            console.log('Doubly linked list is already empty')
        else
        {
            if(this.isCircular())
            {  
                this.head = new DoublyNode(null)
                this.tail = new DoublyNode(null)
                this.head.prev = this.tail
                this.head.next = this.tail
                this.tail.prev = this.head
                this.tail.next = this.head
            } else
              {
                  this.head = new DoublyNode(null)
                  this.tail = new DoublyNode(null)
                  this.head.next = this.tail
                  this.tail.prev = this.head
              }

            this.size = 0
            console.log('Doubly linked list is now empty')
        }
    }

    isCircular()
    {
        return this.tail.next == this.head && this.head.prev == this.tail
    }

    circularize()
    {
        if(this.isCircular())
            console.log('Doubly linked list is already circular')
        else
        {   
            this.head.prev = this.tail
            this.tail.next = this.head
        
            console.log('Doubly linked list is now circular')
        }
    }
 
    decircularize()
    {
        if(!this.isCircular())
            console.log('Doubly Linked List is already non-circular')
        else 
        {
            this.head.prev = null
            this.tail.next = null

            console.log('Doubly Linked List is no longer circular')
        }
    }

    //Method to rotate the nodes in the linked list to the right k times
    rotateRight(k)
    {
        if(!this.isCircular())
            console.log('Cannot rotate non-circular doubly linked list')
        else if(this.isEmpty())
            console.log('Cannot rotate empty doubly linked list')
        else if(this.size == 1)
            console.log('Cannot rotate doubly linked list of size 1')
        else if(typeof k != 'number')
            console.log('Cannot rotate due to non-numerical parameter')
        else 
        {
            k = Math.round(k)
            
            for(var i = 0; i < k; i++)
            {
                this.addAt(this.tail.data, 0)
                this.remove()
            }   
        }
    }

    //Method to rotate the nodes in the linked list to the left k times
    rotateLeft(k)
    {
        if(!this.isCircular())
            console.log('Cannot rotate non-circular doubly linked list')
        else if(this.isEmpty())
            console.log('Cannot rotate empty doubly linked list')
        else if(this.size == 1)
            console.log('Cannot rotate doubly linked list of size 1')
        else if(typeof k != 'number')
            console.log('Cannot rotate due to non-numerical parameter')
        else 
        {
            k = Math.round(k)
            
            for(var i = 0; i < k; i++)
            {
                this.add(this.head.data)
                this.removeAt(0)
            }   
        }
    }

    add(element)
    {   
        if(this.isEmpty())
            this.head.data = element
        else if(this.size == 1)
            this.tail.data = element
        else 
        {
            var newNode = new DoublyNode(this.tail.data)
            newNode.prev = this.tail.prev
            newNode.next = this.tail
            this.tail.prev.next = newNode
            this.tail.prev = newNode
            this.tail.data = element
        } 

        this.size++
    }

    addAt(element, index)
    {
        if(typeof index != 'number')
            console.log('Index \'' + index + '\' is not a number')
        else if(index < 0 || index > this.size)
            console.log('Index \'' + index + '\' out of bounds')
        else
        {            
            if(this.isEmpty())
                this.add(element)
            else if(this.size == 1)
            {
                if(index == 0)
                {
                    this.tail.data = this.head.data
                    this.head.data = element
                    this.size++
                } else 
                      this.add(element)
            } else
              {
                  if(index == 0)
                  {
                      var newNode = new DoublyNode(this.head.data)
                      newNode.prev = this.head
                      newNode.next = this.head.next
                      this.head.next.prev = newNode
                      this.head.next = newNode
                      this.head.data = element
                      this.size++
                  } else if(index > 0 && index < this.size)
                    {
                        var newNode = new DoublyNode(element)
                        var count = 0
                        var curr = this.head
                        var prev

                        while(count < index) 
                        { 
                            count++
                            prev = curr
                            curr = curr.next
                        } 
  
                        newNode.prev = prev
                        newNode.next = curr
                        prev.next = newNode 
                        curr.prev = newNode
                        this.size++
                    } else 
                          this.add(element)
              }
        }
    }

    remove()
    {
        if(this.isEmpty())
            console.log('Cannot remove from an empty double linked list')
        else if(this.size == 1)
            this.head.data = null
        else if(this.size == 2)
            this.tail.data = null
        else
        {
            var tailP = this.tail.prev
            this.tail.data = tailP.data
            this.tail.prev = tailP.prev
            tailP.prev.next = this.tail
            tailP.prev = null
            tailP.next = null
        }

        this.size--
    }

    removeAt(index)
    {
        if(typeof index != 'number')
            console.log('Index \'' + index + '\' is not a number')
        if(index < 0 || index >= this.size)
            console.log('Index \'' + index + '\' out of bounds')
        else
        {   
            if(this.isEmpty())
                console.log('Cannot remove from an empty double linked list')
            else if(this.size == 1)
                this.remove()
            else if(this.size == 2)
            {
                if(index == 0)
                {
                    this.head.data = this.tail.data
                    this.tail.data = null
                } else
                      this.tail.data = null

                this.size--
            } else 
              {
                  if(index == 0)
                  {
                      var headN = this.head.next
                      this.head.data = headN.data
                      this.head.next = headN.next
                      headN.next.prev = this.head
                      headN.prev = null
                      headN.next = null
                      this.size--
                  } else if(index > 0 && index < this.size - 1)
                    {
                        var count = 0
                        var curr = this.head
                        var prevCurr

                        while(count < index)
                        {
                            count++
                            prevCurr = curr
                            curr = curr.next
                        }

                        var rNode = curr
                        prevCurr.next = curr.next
                        curr.next.prev = prevCurr
                        rNode.prev = null
                        rNode.next = null
                        this.size--
                    } else 
                          this.remove()
              } 
        } 
    }

    //Method to display the elements of the linked list using next-link traversal
    printNext()
    {
        if(this.isEmpty())
            console.log('Cannot print from an empty doubly linked list')
        else
        {
            var curr = this.head
            var count = 0
            var list = ''

            if(this.isCircular())
                list += '[T]'

            while(count != this.size)
            {
                list += '<-[' + curr.data + ']->'
                curr = curr.next
                count++
            }

            if(this.isCircular())
                list += '[H]'
            
            console.log(list)
        } 
    }

    //Method to display the elements of the linked list using previous-link traversal
    printPrev()
    {
        if(this.isEmpty())
            console.log('Cannot print from an empty doubly linked list')
        else
        {
            var curr = this.tail
            var count = 0
            var list = ''

            if(this.isCircular())
                list += '[H]'

            if(this.size == 1)
            {
                curr = curr.prev
                list += '<-[' + curr.data + ']->'
            } else 
              {
                  while(count != this.size)
                  {
                      list += '<-[' + curr.data + ']->'
                      curr = curr.prev
                      count++
                  }
              }

            if(this.isCircular())
                list += '[T]'
            
            console.log(list)
        } 
    }
}

module.exports = {
    LinkedList, SinglyLinkedList, DoublyLinkedList
}