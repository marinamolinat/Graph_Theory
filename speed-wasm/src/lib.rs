use wasm_bindgen::prelude::*;

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



#[wasm_bindgen]
pub fn findDominationNumber(bitNodes: u64, order: u32, neighborhood: &[u64]) -> bool{
    return isSetDominating(bitNodes, order, neighborhood);
    
}


