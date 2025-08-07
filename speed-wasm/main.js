
const submitButton = document.getElementById("submit");
let myWebWorker = new Worker('webWorker.js', { type: "module" });
const graph = new graphology.Graph({type: 'directed'});
const sigmaInstance = new Sigma(graph, document.getElementById("container"));
updateGraph(3); //Defeaul graph will have n=3
 const undirectedGraph = new graphology.Graph({type: 'undirected'});
 const sigmaInstancePersonal = new Sigma(undirectedGraph, document.getElementById("container"));
 undirectedGraph.clear();
const loadingDisplay = document.getElementById("loading");
const resultDisplayer = document.getElementById("result");
const personalGraphSubmit = document.getElementById("personalGraphSubmit");



personalGraphSubmit.addEventListener("click", function(){
    let vertex = document.getElementById("vertexSetInput").value;
    let edge = document.getElementById("edgeSetInput").value;
    
    // Process the vertex input
    vertex = vertex.replace(/[{}]/g, "").trim();
    vertex = vertex.split(",").map(el => el.trim());



    // math
    let pairs = edge.match(/\(([^)]+)\)/g);

// Convert each pair to an array of numbers
    edge = pairs.map(pair => {
    return pair
  .replace(/[()]/g, '')    // Remove parentheses
  .split(',')              // Split into elements
  .map(n => n.trim());  
});

    drawPersonalGraph(vertex, edge);

    //send info to web worker

    if(myWebWorker){
        myWebWorker.terminate();
    }

    myWebWorker = new Worker('webWorker.js', { type: "module" });

    const info = getInfoReady(undirectedGraph);
    myWebWorker.postMessage(info);
     myWebWorker.onmessage = function(event) {
        console.log("Received data from web worker: ", event.data);
        

    };

    


});


function drawPersonalGraph(vertex, edge) {
     graph.clear();
   undirectedGraph.clear();
   
    for(let i = 0; i < vertex.length; i++) {
        undirectedGraph.addNode(vertex[i], { size: 6, color: "red", label: vertex[i], x: Math.random() *100, y: Math.random() *100});
    }

    for(let i = 0; i < edge.length; i++) {
        undirectedGraph.addEdge(edge[i][0], edge[i][1], {size: 2});
    }
 sigmaInstancePersonal.refresh();
    //use plugin to layout the graph

    


   
   
}



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
                 graph.addNode(`(${j}, ${i})`, { x: j, y: i, size: 6, color: "red", label: `(${j}, ${i})` });

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
                graph.addDirectedEdge(node, toId, {type: 'arrow', size: 3});
               
                } 
            }

        });
    sigmaInstance.refresh(); 

    
}






 

       
        

       
       

       
       
       


    


     



 