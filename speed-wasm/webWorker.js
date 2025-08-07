
import init, { findDominationNumber } from "./pkg/speed_wasm.js";








self.addEventListener("message", (event) => {
    console.log("Recvieved data ", event.data);
    


   
    //send to rust program
    init().then(() => {
       const results = findDominationNumber(event.data.nodes, event.data.order, event.data.neighborhood);

     
        postMessage({
            domination_number: results.domination_number,
            dominating_set: results.dominating_set
        });
        

    });

 

   

});


