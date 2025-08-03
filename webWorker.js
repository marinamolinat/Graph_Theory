importScripts('https://unpkg.com/graphology@0.24.1/dist/graphology.umd.min.js');

let minNum = Infinity;  
function builtGraph(n)
{
    const graph = new graphology.Graph({type: 'directed'});
       // add the vertices
    for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                 graph.addNode(`(${j}, ${i})`, { x: j, y: i, size: 10, color: "red"});

            }
          
        }
    
    const movement = [
        [-1, 1], //diagonally  left
        [1, 1], // diagonally right
            
    ];      
    
    
    //Connect each vertoces to corresponding edge
    graph.forEachNode((node, attributes) => {
            

            
            for (let [dx, dy] of movement) {
                let newX = attributes.x + dx;
                let newY = attributes.y + dy;

                
                let toId = `(${newX}, ${newY})`;

                if (graph.hasNode(toId)) {
                graph.addDirectedEdge(node, toId, {type: 'arrow', size: 4});
               
                } 
            }

        });
    return graph;
}

self.addEventListener("message", (event) => {
    console.log("Starting to work with data: ", event.data);
    minNum = Infinity; 


   //rebuilt the graph from the input, lazy to do it a more efficient way
   const graph = builtGraph(event.data);


   //calculate the domination number
   
   findDominationNumber(graph);
   console.log("minNum:", minNum);

   postMessage(minNum);

   

});






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


function findDominationNumber(graph){
    //First, we convert the graph nodes into a bitmap, for efficency :)

  const totalBits = BigInt(graph.order);
  
  const bitNodes =  (BigInt(1) << totalBits) - BigInt(1);
 
  
   
  //iterate through the graph order, remove a single node at a time
  for (let i = 0; i < graph.order; i++) {

    //convert the i-th bit to 
    console.log("i:", i);

  }
    const nodes = graph.nodes();
            
    for (let node of nodes){
                const nodesCopy = structuredClone(nodes);

                  //find the value to remove
                const index = nodesCopy.indexOf(node);
                nodesCopy.splice(index, 1);


                const isDominating = isSetDominating(graph, nodesCopy);


                if (isDominating){
                    

                    search(graph, nodesCopy);


                }


   }



}




        
function search(graph, nodes) {
           


            

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
               
                    }
                    //recursion babyyy
                    search(graph, nodesCopy);


                }
               
                


            }

}
