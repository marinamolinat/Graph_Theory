
import init, { findDominationNumber } from "./pkg/speed_wasm.js";








self.addEventListener("message", (event) => {
    console.log("Recvieved data ", event.data);
    


   
    //send to rust program
    init().then(() => {
       const domNumber = findDominationNumber(event.data.nodes, event.data.order, event.data.neighborhood);

       console.log("Domination number found: ", domNumber);
 
    });

   postMessage("heyyyyyy, i have to fix this");

   

});


