
const submitButton = document.getElementById("submit");
let myWebWorker = new Worker('webWorker.js');
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

    myWebWorker = new Worker('webWorker.js');

    const input = document.getElementById("inputN");

    resultDisplayer.innerHTML = "Result: ";
  

    if (input.value > 30 || input.value < 2 || !Number.isInteger(Number(input.value))){
        alert("Please choose a number between 2 and 30 inclusive, it should be a whole number");
        return;
    }


    //Re draw the graph
   updateGraph(input.value);

    //Now, lets send the input value to the web worker
    myWebWorker.postMessage(input.value);

    loadingDisplay.style.display = "flex";

    

    //Receiving the message
    myWebWorker.onmessage = function(event) {
         loadingDisplay.style.display = "none";
         resultDisplayer.innerHTML = `Result: ${event.data}`;
        

    };


})









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






 

       
        

       
       

       
       
       


    


     



 