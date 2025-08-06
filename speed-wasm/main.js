
const submitButton = document.getElementById("submit");
let myWebWorker = new Worker('webWorker.js', { type: "module" });
const graph = new graphology.Graph({type: 'directed'});
const sigmaInstance = new Sigma(graph, document.getElementById("container"));
updateGraph(3); //Defeaul graph will have n=3
const loadingDisplay = document.getElementById("loading");
const resultDisplayer = document.getElementById("result");







loadingDisplay.style.display = "none"; //Hide the loading display by default

submitButton.addEventListener("click", function(){


    if(myWebWorker){
        myWebWorker.terminate();
    }

    myWebWorker = new Worker('webWorker.js', { type: "module" });

    const input = document.getElementById("inputN");

    resultDisplayer.innerHTML = "Result: ";
  

    if (input.value > 30 || input.value < 2 || !Number.isInteger(Number(input.value))){
        alert("Please choose a number between 2 and 30 inclusive, it should be a whole number");
        return;
    }


    //Re draw the graph
    updateGraph(input.value);

    //Get info for rust program, which will be first send to a web worker
    const infoReady = getInfoReady(graph);

    //Now, lets send the input value to the web worker
    myWebWorker.postMessage(infoReady);

    loadingDisplay.style.display = "flex";

    

    //Receiving the message
    myWebWorker.onmessage = function(event) {
         loadingDisplay.style.display = "none";
         resultDisplayer.innerHTML = `Result: ${event.data}`;
        

    };


})

function getInfoReady(graph) //gets the info ready for the rust program 🦀 🦀 🦀
{
    const neighborhood = [];
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

    return {nodes: (BigInt(1) << BigInt(graph.order)) - BigInt(1), neighborhood: neighborhood, order: graph.order};
}








function updateGraph (n){
    graph.clear();
 

       // add the vertices
    for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                 graph.addNode(`(${j}, ${i})`, { x: j, y: i, size: 10, color: "red", label: `(${j}, ${i})` });

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






 

       
        

       
       

       
       
       


    


     



 