
console.log("Hello, world!");
 const graph = new graphology.Graph({type: 'directed'});

        // make the size of a board
        let n = 3;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                 graph.addNode(`(${j}, ${i})`, { x: j, y: i, size: 10, color: "red", label: `(${j}, ${i})` });

            }
          
        }

        const movement = [
            [-1, 1], //diagonally  left
            [1, 1], // diagonally right
            
        ];

        graph.forEachNode((node, attributes) => {
            

            // Example: use attributes.x and attributes.y for movement
            for (let [dx, dy] of movement) {
                let newX = attributes.x + dx;
                let newY = attributes.y + dy;

                // Build ID of potential destination node
                let toId = `(${newX}, ${newY})`;

                if (graph.hasNode(toId)) {
                graph.addDirectedEdge(node, toId, {type: 'arrow', size: 4});
               
                } 
            }

        });

        //Superbad, brute force algorith to find domination number, please help, this will probably be shit
        
        //rn it just displays the size of A dominating set, not the domination number

        
        function isSetDominating(graph, nodes) {
            const visited = new Set();
            for (const node of nodes) {
                //mark node as visited, if it hasnt been already marked

                if (!visited.has(node)){
                    visited.add(node);
                }


            
            
                graph.forEachOutboundNeighbor(node, (neighbor) => {
                        if (!visited.has(neighbor)) {
                            visited.add(neighbor);
                        }
                
                    });


            }
            return visited.size === graph.order;
        }


        function noName(graph, nodes){
            for (let node of nodes){
                const nodesCopy = structuredClone(nodes);

                  //find the value to remove
                const index = nodesCopy.indexOf(node);
                nodesCopy.splice(index, 1);


                const isDominating = isSetDominating(graph, nodesCopy);


                if (isDominating){
                    

                    findDominationNumber(graph, nodesCopy);


                }


            }


        }

        let minNum = Infinity;  
        function findDominationNumber(graph, nodes) {
           


            

            for (let node of nodes) {

                //create a copy of the node set
                const nodesCopy = structuredClone(nodes);

                //find the value to remove
                const index = nodesCopy.indexOf(node);
                nodesCopy.splice(index, 1);
            

                //Check that the array of nodes is dominative
                const isDominating = isSetDominating(graph, nodesCopy);
       
         

                if (isDominating){
                   

                    if (nodesCopy.length < minNum) {
                        minNum = nodesCopy.length;
                        console.log("new min", minNum);
                    }
                    //recursion babyyy
                    findDominationNumber(graph, nodesCopy);


                }
               
                


            }

        }


       console.log("checking some stuff", noName(graph, graph.nodes()));
       
       


    


      // Instantiate sigma.js and render the graph
      const sigmaInstance = new Sigma(graph, document.getElementById("container"));


 