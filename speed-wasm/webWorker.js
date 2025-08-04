importScripts('https://unpkg.com/graphology@0.24.1/dist/graphology.umd.min.js');
import init, { indDominationNumber } from "./pkg/speed_wasm.js";
let minNum = Infinity;  




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


function isSetDominatingBit(nodes, neighbors, order) {
    let visited = 0n;
    

    for (let i = 0; i < order; i++) {
            
        //Check if the i-th node is in the set, if it is, mark it as and its neighbours as visited
        const check = 1n << BigInt(i);
        if (nodes & check) {

            visited |= check;
            visited |= neighbors[i];

        }
     
        

    }
 
    
    if (visited === (BigInt(1) << BigInt(order)) - BigInt(1)) {
        return true; // plss work :8
    }
    return false; //not dominating



}


function findDominationNumber(graph){
    const neighborhood = [];
    //First, we convert the graph nodes into a bitmap, for efficency :
    
  
 
    const nodes = graph.nodes()
    const indexOfNode = new Map(nodes.map((node, i) => [node, i]));

    //iterate through nodes to create the neighbourhood array 
    for(node of nodes){
      
        //create a bitmask for the neighbors
        let neighbors = 0n;
        graph.forEachOutboundNeighbor(node, (neighbor) => {
            const i = indexOfNode.get(neighbor); // now O(1) instead of O(n)


            neighbors |= 1n << BigInt(i);
  


        });

        
        neighborhood.push(neighbors);
    }

    

  
   
  //iterate through the graph order, remove a single node at a time
  for (let i = 0; i < graph.order; i++) {
    console.log(i);
    let bitNodes =  (BigInt(1) << BigInt(graph.order)) - BigInt(1);

    //remove the i-th node 
    bitNodes &= ~(1n << BigInt(i));
   
     
    //check if the remaining nodes are dominating
    if(isSetDominatingBit(bitNodes, neighborhood, graph.order)) {
        
        search(bitNodes, neighborhood, graph.order);

        
    }
    
  

  }


}


function popcountFast(mask) {
  let count = 0;
  while (mask) {
    mask &= (mask - 1n); // removes the lowest-set bit
    count++;
  }
  return count;
}





        
function search(nodes, neighborhood, order) {

    for (let i = 0; i < order; i++) {
        let nody = nodes;
        
        //remove the i-th node

        //check if the i-th node is in the set
        const check = 1n << BigInt(i);
        if (nodes & check) {
            //remove the node from the set
            nody &= ~(1n << BigInt(i));

            if (isSetDominatingBit(nody, neighborhood, order)) {
           

                if (popcountFast(nody) < minNum) {
                    minNum = popcountFast(nody);
                    console.log("New minimum found: ", minNum);
                }

                //recursion babyyy
                search(nody, neighborhood, order);
            }


        }

        

    }
           


}
