use wasm_bindgen::prelude::*;
static mut MIN_NUM: u32 = u32::MAX;


pub fn isSetDominating(bitNodes: u64, order: u32, neighborhood: &[u64])-> bool {
    let mut visited: u64 = 0;

    

    for  i in 0..order {
    
            
        //Check if the i-th node is in the set, if it is, mark it as and its neighbours as visited
        let check = (1u64) << (i as u64);
        if (bitNodes & check != 0) {
            visited |= check;
            visited |= neighborhood[i as usize];



        }

    } 
    if (visited == (1u64 << (order as u64)) - 1u64) {
        return true;
    }
   false
 
    
}

pub fn search(bitNodes: u64, neighborhood: &[u64], order: u32) {
    for i in 0..order {

        let mut nodes = bitNodes;

        //check if the ith node is in the set
        let check = 1u64 << (i as u64);
        if (nodes & check != 0)
        {
           //remove the node 
          nodes &= !check;
          if (isSetDominating(nodes, order, neighborhood)) {

            let popcorny = popcount_fast(nodes);
            if(popcorny < unsafe { MIN_NUM }) {
                unsafe {
                    MIN_NUM = popcorny;
                }
                
            }
            //recursion babyyyy
            search(nodes, neighborhood, order);

        }
       
        }
    }
}

pub fn popcount_fast(mut mask: u64) -> u32 {
    let mut count = 0;
    while mask != 0 {
        mask &= mask - 1;
        count += 1;
    }
    count
}






#[wasm_bindgen]
pub fn findDominationNumber(bitNodes: u64, order: u32, neighborhood: &[u64]) -> u32{
    
    //iterate through the graph order, remove a single node at a time
    for i in 0..order {

        // 
        let mut nodes = bitNodes;

        //remove the i-th node
        let check = (1u64) << (i as u64);
        nodes &= !check;

        if isSetDominating(nodes, order, neighborhood) {
            search(nodes, neighborhood, order);

            
        }


       
    }
    return unsafe { MIN_NUM };
    
}



