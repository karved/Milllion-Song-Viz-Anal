# Milllion-Song-Viz-Analysis  

## User Guide  

### DESCRIPTION  
### INSTALLATION  
### EXECUTION

## Steps for Data & Visual Analytics  

### Data Collection  
  
Mention the input & output files used to perform a task, packages used and challenges, if any.  


### Data Cleaning & Pre-processing  
...  
....  

### Data Analysis  

**network_algs.ipynb** : It requires `edges.csv` and `nodes.csv` from an earlier step. It tests 3 community detection algorithms and constructs `nodes_with_clusters.csv` using cluster assignments to optimize modularity. It can be run in Google Colab or locally, e.g. via VSCode.

**lyric_analysis.ipynb** : It requires `lyrics.csv` and `songs.csv` from the data. It finds tf-idf of the lyrics and does sentiment analysis of the lyrics words, finding aggregate cumulative sentiment metrics. It constructs the files `tfidf.csv`, `sentiment_over_time.csv`, and `combined_count_tfidf_sentiment.csv`, among others, to contain this information. It can be run in Google Colab or locally, e.g. via VSCode. 

**Word_frequency_data.py** : It requires `lyrics.csv` and `songs.csv` from the data. It joins the dataset of lyrics and songs based on the *track_id* field and creates a new dataset which will have the following fields - *track_id*, *artist_id*, *song_id*, *title*, *artist_name*, *word*, *count*,*year*. It can be run using Google Colab or locally. 


### Data Visualization  
#### Network Visualization  

It was made using **D3.js**. A searchbox is present with over *40k* artists. The graph related data is being read from `nodes.csv` and `edges.csv`.  
A slider lets the user control how many similar artists they want to see. Once the user selects an artist, they can see a network graph with the selected artist in the center.  
The node size depends on the number of tracks by that artist. Users can hover over any node to view more information like *average_familiarity*, *average_hotness*.   
Double clicking on any node expands/collapses the network of that node, to interactively expand or collapse the entire visualization. At any point, all the visible nodes are compared by their frequency of occurrences to get the top 7 recommended artists.  

#### PowerBI Visualization. 

You will have either install Power BI desktop/ use the online version https://app.powerbi.com/. 
Once you have the tool would will import the data into the power bi tool.  
For the **Scrolling Bar-Chart** - select the bar-chart visualization and select the Word for Y-axis and Count of words for X-axis.  

For the **Word Cloud**:
1) You will first have to add a new visualization form the Power BI market. 
2) Once you the visualization installed select the Word for Y-axis and Count of words for X-axis. 
3) For Both the Visualization we have the Artist name and the Song name as the filters which are basic slicers from the Power BI tool set. 

4) The Next step is to save the report. 
   
   4.1) If you are developing this in power BI desktop you will have to save the file locally and then publish the report to you app.powerbi.com workspace. 
   
   4.2) If you are developing this in the online version which is app.powerbi.com you can skil step 4.1
5) To make the report accessable to public user you will then publish the report to web.
6) You will be able to access the PowerBI report through a PowerBI embedded link which you can add into a iFrame to insert it into html page.


 
## Web Interface  
...
...  

## Web Hosting (Optional)  
... 
... 

