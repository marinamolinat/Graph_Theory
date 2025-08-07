

# Domination Number calc

An online domination number and minimun dominating set calculator. 


<a href="https://marinamolinat.github.io/Graph_Theory/"> 🚨Live here</a>



## How it works

- Input a vertex and edge set in the correct format
  - V= {1, 2, 3, 4} // you can name the vertex however you want :)
  - E = {(1, 2), (3, 4) }
- Click on submit graph
- AND BOOM, at the end of the page the domination number will be displayed, and the minimun dominating set will be displayed on the graph by colouring its vertex green


<div align="center">
  <a href="https://shipwrecked.hackclub.com/?t=ghrm" target="_blank">
    <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/739361f1d440b17fc9e2f74e49fc185d86cbec14_badge.png" 
         alt="This project is part of Shipwrecked, the world's first hackathon on an island!" 
         style="width: 35%;">
  </a>
</div>


---

## How it was made
Graphology and sigma.js were used for the visual part. For the domination algorith, I used rust with web assesmbly. The domiantion algorithm works by first evaluating the set of all vertex (which will clearly be a domianting set), then iterate through all the vertext, eliminating one, and checking if that set is dominating, and if it is, continue calling recursively the function.

## WARNING! CURRENT BUGS
1. An empty edge set will not register
2. Having only a sinle edge will make the program not work :/ (but like bruh, I don't think u need a calc to find the domination number in that case)



<img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/da1792b91361698db8d85e9b8358b4baa01dd273_screenshot_2025-08-06_at_10.08.33___pm.png">


