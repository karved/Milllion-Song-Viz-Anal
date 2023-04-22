import React from 'react'
import{useEffect} from 'react';
import nodesFilePath from './data/nodes.csv';
import edgesFilePath from './data/edges.csv';
import LinearProgress from '@mui/material/LinearProgress';
import * as d3module from 'd3'
import d3tip from 'd3-tip'
const d3 = {
  ...d3module,
  tip: d3tip
}

const Graph = (props) => {

    const [loading, setLoading] = React.useState(true);
    const [graphDataMap, setGraphDataMap] = React.useState({});
    const [graphData, setGraphData] = React.useState([]);

    useEffect(() => {
    
    setLoading(true);
    d3.select("#my_dataviz").selectAll("*").remove()
  
    // SVG Dimensions
    var width = 900;
    var height = 650;
    var margins = { left: 50, right: 50, top: 50, bottom: 50 };
    var networkGraphWidth = width - margins.left - margins.right;
    var networkGraphHeight = height - margins.top - margins.bottom;
    var radiusScale = d3.scaleLinear().range([5, 25]);
    const colors = { 'SELECTED': '#E0538F', 'DEFAULT': '#2E64A2', 'EXPANDED': '#95D134', 'TOP': '#F4BA4E'};
    var nodes, edges, allNodesMap, artistEdges;
    var path, node;
    var graph, recommendationsDiv, recommendationsToDisplay;
    var recommendations = [];
    var expandedArtists = [];
    var force;

    let tip = d3.tip().attr('class', 'd3-tip').attr("id", "tooltip")
                .style('background',"rgba(0, 0, 0, 0.8)")
                .style('color','white')
                .style('padding',"12px")
                .style('font-size','14px');

    Promise.all([
        d3.dsv(",", edgesFilePath, function (edge) {
            return {
                source: edge.source_artist_id,
                target: edge.target_artist_id,
                priority: parseInt(edge.priority)
            };
        }),
        d3.dsv(",", nodesFilePath, (node) => {
            return {
                artist_id: node.artist_id,
                artist_name: node.artist_name,
                avg_duration: parseFloat(node.avg_duration),
                avg_familiarity: parseFloat(node.avg_familiarity),
                avg_hotness: parseFloat(node.avg_hotttnesss),
                total_tracks: parseInt(node.total_tracks)
            };
        })
    ]).then(allData => {
        edges = allData[0]; // all edges data from csv file
        nodes = allData[1]; // all node data from the csv file

        let minTracks = nodes[0]['total_tracks'];
        let maxTracks = nodes[0]['total_tracks'];
        allNodesMap = nodes.reduce((obj, item, idx) => {
            item['index'] = idx;
            item.children = null;
            obj[item['artist_id']] = item;
            minTracks = Math.min(minTracks, item['total_tracks']);
            maxTracks = Math.max(maxTracks, item['total_tracks']);
            return obj;
        }, {}); // map for quick lookup of nodes by id
    
        radiusScale.domain([minTracks, maxTracks]);

        var svg = d3.select("#my_dataviz").append("svg")
                    .attr("width", width)
                    .attr("height", height);


        graph = svg.append("g")
                    .attr("width", width - margins.left - margins.right)
                    .attr("height", height - margins.top - margins.bottom)
                    .attr("transform", "translate( " + margins.left + ", "+ margins.top + ")");

        recommendationsDiv = d3.select("body")
                    .append("div")
                    .attr("id", "recommendations-div");

        fetchGraphData(props.sA);
        getRecommendations();
        displayRecommendations();


        // // tooltip for nodes
        tip.html(function(d,e) { 
            return getTooltipStats(e);
        });
        graph.call(tip);


    }).catch(error => {
        console.log(error)
    });


        
    /**
     * Build a map of all current nodes in the network
     * The id of the nodes are the keys in the map
     * The node objects are the values
     * @param currentMap existing map to add the nodes to
     */
    function buildGraphDataMap(currentMap) {
        let temp = []
        let gdata = currentMap
        currentMap.forEach(node => {
            temp[node['artist_id']] = node;
        });

        setGraphDataMap(temp)
        drawGraph(temp,gdata)

    }


    /**
     * Function to get nodes and edges in the form required for force simulation
     * @param {*} selectedArtist node that was selected
     */
    function fetchGraphData(selectedArtist) {
        selectedArtist.children = []
        let temp =[selectedArtist];
        setGraphData(temp)
        artistEdges = getArtistNetwork(selectedArtist['artist_id'], props.sV);
        artistEdges.forEach(edge => {
            var target = allNodesMap[edge['target']];
            temp.push(target);
            selectedArtist.children.push(target);
            recommendations.push(target);
        });
        setGraphData(temp)
        buildGraphDataMap(temp)

    }

    /**
     * Function to get the data to show in the tooltip
     * @param {*} hoveredNode node which is currently hovered
     * @returns 
     */
    function getTooltipStats(hoveredNode) {
        return "Artist Name:  <b>"+ hoveredNode['artist_name'] +
            "</b><br> Average Duration:  <b>" + parseFloat(hoveredNode['avg_duration']).toFixed(2) +
            "</b><br> Average Hotness:  <b>" + parseFloat(hoveredNode['avg_hotness']).toFixed(2) +
            "</b><br> Average Familiarity:  <b>" + parseFloat(hoveredNode['avg_familiarity']).toFixed(2) +
            "</b><br> Total Tracks:  <b>" + hoveredNode['total_tracks'];
    }

    /**
     * To get the similar artist network from list of edges
     * @param artist_id: id of the artist to find the network for
     * @param count: number of similar artists to return sorted by priority
     */
    function getArtistNetwork(artist_id, count = 20) {
        let filtered = edges.filter(edge => edge['source'] === artist_id);

        //create a deep copy of the edges because forceSimulation modifies these edges
        let neighbors = JSON.parse(JSON.stringify(filtered))
        .sort((edge1, edge2) => edge1['priority'] - edge2['priority'])
        .slice(0, count);
        return neighbors;
    }

    /**
     * Handle the tick event for force simulation
     */
    function tick() {
        path.attr("d", function (d) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            var test = "M" +
                d.source.x + "," +
                d.source.y + "A" +
                dr + "," + dr + " 0 0,1 " +
                d.target.x + "," +
                d.target.y;
            return test;
        });

        node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    }


    /**
     * Clear the network by removing all children elements
     * @param graph group node under SVG
     */
    function clearGraph() {
        setLoading(true);
        d3.select("#my_dataviz").selectAll("*").remove()

        var svg = d3.select("#my_dataviz").append("svg")
                    .attr("width", width)
                    .attr("height", height);


        graph = svg.append("g")
                    .attr("width", width - margins.left - margins.right)
                    .attr("height", height - margins.top - margins.bottom)
                    .attr("transform", "translate( " + margins.left + ", "+ margins.top + ")");

        recommendationsDiv = d3.select("body")
                    .append("div")
                    .attr("id", "recommendations-div");
    }

    /**
     * Function to plot the nodes, add force simulation, path, etc
     */
    function drawGraph(currentMap,gdata) {

        if (force != null)
            force.stop();

            force = d3.forceSimulation()
            .nodes(Object.values(currentMap))
            .force("link", d3.forceLink(artistEdges).id(d => {
                return d['artist_id']
            }).distance(150).strength(0.1))
            .force('center', d3.forceCenter(networkGraphWidth / 2, networkGraphHeight / 2))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .force("charge", d3.forceManyBody().strength(-700))
            .alphaTarget(0.3)
            .on("tick", tick);

        path = graph.append("g")
            .selectAll("path")
            .data(artistEdges)
            .enter()
            .append("path")

        node = graph.selectAll(".node")
            .data(force.nodes())
            .enter().append("g")
            .attr("class", "node")
            .on("dblclick", function (d,e) { return update(d,e, gdata)})
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        node.append("circle")
            .attr("id", function (d) {
                return d.id;
            })
            .attr("r", function (d) {
                return radiusScale(d['total_tracks']);
            })
            .attr("fill", (d) => {
               
                let topArtists = getRecommendations().map(a => a[0]);
                if (d['artist_id'] === props.sA['artist_id']) return colors.SELECTED;
                else if (d['children'] != null) return colors.EXPANDED;
                else if (topArtists.includes(d['artist_name'])) return colors.TOP;
                return colors.DEFAULT;
            })


        node.append("text")
            .attr("stroke", "black")
            .attr("font-size", "12px")
            .attr("x", 20)
            .attr("y", -5)
            .text(function (d) {
                return (d.artist_name);
            });

        force.alpha(0.1).restart()
        setLoading(false)

    }

    function getRecommendations()
    {
        const topRecommendations = {};
        for (const artist of recommendations) {
            if(artist !== props.sA && expandedArtists.indexOf(artist) === -1){
                let artistName = artist["artist_name"];
                topRecommendations[artistName] = topRecommendations[artistName] ? topRecommendations[artistName] + 1 : 1;
            }
        }

        // Sort to get top 5 recommendations
        var items = Object.keys(topRecommendations).map(function(key) {
            return [key, topRecommendations[key]];
        });
        items.sort(function(first, second) {
            return second[1] - first[1];
        });

        recommendationsToDisplay = items.slice(0, 5);

        var recommendationsDiv = d3.select("#recommendations-div")
        recommendationsDiv.selectAll("*").remove();
        recommendationsDiv.append("h3")
                        .text("Top 5 Artist Recommendations");
        recommendationsDiv.append("table")
                        .selectAll("tr")
                        .data(recommendationsToDisplay)
                        .enter()
                        .append("tr")
                        .append("td")
                        .text(function(d){ return d[0]; });
                        
        return (recommendationsToDisplay)
    }

    /**
     * Function to display recommendations based on
     * selected and expanded nodes.
     */
    function displayRecommendations(){

        // TO DO: improve the display of 'recommendationsToDisplay' in UI
        // console.log("out")
    }


    /**
     * Function to handle double click event of a node
     * @param d node that was clicked
     */
    function update(d,e,gdata) {
        
        tip.hide()

        if (e.children != null) {
            
            var idx = expandedArtists.indexOf(e);
            if (idx !== -1) {
                expandedArtists.splice(idx, 1);
            }
            e.children.forEach(child => {
                var index = recommendations.indexOf(child);
                if (index !== -1) {
                    recommendations.splice(index, 1);
                }
            });
            let childrenToDelete = e.children.map(child => child['artist_id']);
            artistEdges = artistEdges.filter(edge => {
                return !(edge['source']['artist_id'] === e['artist_id'] && childrenToDelete.includes(edge['target']['artist_id']))
            });
            var edgeTargets = artistEdges.map(edge => edge['target']['artist_id']);
            gdata = gdata.filter(node => {
                let key = node['artist_id'];
                return edgeTargets.includes(key) || key === props.sA['artist_id']
            })
           
            
            e.children = null;
            clearGraph();
            buildGraphDataMap(gdata)
 
        }
        else {
            // get data of similar artists
            console.log(e,gdata)
            expandedArtists.push(e);
            let newArtistEdges = getArtistNetwork(e['artist_id'], props.sV);
            e.children = [];

            newArtistEdges.forEach(edge => {
                var target = allNodesMap[edge['target']];
                if (gdata.filter(node => node['artist_id'] === target['artist_id']).length === 0) {
                    gdata.push(target)
                }
                e.children.push(target);
                recommendations.push(target);
            });
            
            artistEdges = artistEdges.concat(newArtistEdges);

            clearGraph();
            buildGraphDataMap(gdata)
    
        }
    }

        }, [props])

    
  return (
    <div>
        
            <div id = "my_dataviz" />
            <br></br><br></br>
            {loading && <LinearProgress color="inherit" />}

    </div>
  )
}

export default React.memo(Graph)

