

const submitButton = document.getElementById("submit");
let myWebWorker;
const graph = new graphology.Graph({type: 'directed'});
const sigmaInstance = new Sigma(graph, document.getElementById("container"));
updateGraph(3); //Defeaul graph will have n=3



submitButton.addEventListener("click", function(){

    if(myWebWorker){
        myWebWorker.terminate();
    }

    myWebWorker = new Worker('webWorker.js');

    const input = document.getElementById("inputN");


    //Re draw the graph
   updateGraph(input.value);

    //Now, lets send the input value to the web worker
    myWebWorker.postMessage(input.value);

})









function updateGraph (n){
    graph.clear();
 

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
    sigmaInstance.refresh(); 

    
}






 

       
        

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


       
       
       


    


     



 