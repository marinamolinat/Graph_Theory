
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
