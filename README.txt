Big Data Song Visualization & Analysis

Team 016 - Mihir Gandhi, Julia Grigni, Shivanee Jaiswal, Dhruv Karve, Jaya Pandey

GitHub Link : https://github.com/karved/Milllion-Song-Viz-Analysis

## User Guide

### Description

This website is built using [React.js](https://react.dev/). It has 3
sections of interactions:

1. **Artists Network** - A force directed graph layout showing
relationship between related artists and provides a Top 7
recommendation.

2.  **Lyrics Analysis** - Displays trends of words as a barchart and
    word cloud for a combination of artists and song titles.

3.  **Sentiment Analysis** - Stacked barchart for showing trends of
    sentiment scores over the years for a selection of artists.

Each of these webpages are independant of each other using different
.csv files taken from the same dataset. Description of the dataset
collection, analysis, visualization, installations, executions & demo
setup can be found in further sections below.

Live Demo - **https://million-song-viz.web.app/**

### Installation

1.  You need to install **Node.js** on your system to run a demo -
    https://nodejs.org/en

2.     cd /CODE/msd/

3.     npm install 

4.  If previous step does not install external libraries/dependencies
    just run `npm install` followed by the package name, for example -
    `echarts-for-react`, `@mui/material @emotion/react @emotion/styled`,
    `d3`, `d3-tip`, `react-router-dom`, `react-virtualized`

### Setup

1.  You need to load the files `edges.csv` & `nodes.csv` in the location

        msd/src/components/network/data/

2.  Load the file `sentiment_over_time.csv` in the location

        msd/src/components/sentiment/data/

3.  The steps to obtain these files can be found in the below analysis
    steps.

### Execution

1.     cd /CODE/msd/

2.     npm start

3.  App will be running on the port `localhost:3000`

4.  Voila!

## Steps for Data & Visual Analytics

### Data Collection

#### Million Song Dataset (MSD)

The MSD dataset consists of almost all the information available through
The Echo Nest API for one million popular tracks. This encompasses both
metadata and audio analysis features. Some of the metadata features
include song title, album, artist information, duration, and release
year. In particular, artist information includes artist name, artist
familiarity, artist hotness, and a list of 100 similar artists. The
audio features include bars start, beat start, energy, key, loudness,
sections start, tempo, and time signature.

We downloaded the MSD dataset as SQLite database files from [MSD
website](http://millionsongdataset.com/pages/getting-dataset/):

1. **track_metadata.db**: Contains metadata of each track (1,000,000 rows)

2. **artists.db**: Contains information about artists, mapped to the
tracks by artist_id (44,745 rows) 3. **artist_similarity.db**: Contains
artist similarity information as assymetric similarity relationships
using source_artist_id and target_artist_id (2,201,916 rows)

#### MusixMatch (MXM)

The MXM dataset provides lyrics for 237,662 MSD tracks. The lyrics come
in bag-of-words format: each track is described as the word-counts for a
dictionary of the top 5,000 words across the set. This dataset is also
available as a SQLite database file at the [MusixMatch
Website](http://millionsongdataset.com/musixmatch/).

### Data Cleaning & Pre-processing

**[extract_nodes_and_edges.ipynb](./CODE/notebooks/extract_nodes_and_edges.ipynb)** -

Extracts artist information from artists.db, removes duplicate artists,
combines aggregate data for artists from track_metadata.db such as
total_tracks. Stores all of the artist data into nodes.csv. - Extracts
artist similarity information from artist_similarity.db, removes
duplicate artists. Stores artist similarity data into edges.csv.

**[combine_lyrics_data_with_MSD.ipynb](./CODE/notebooks/combine_lyrics_data_with_MSD.ipynb)** -

Extracts the subset of songs for which lyrics data is available, stores
this data into songs.csv. - Extracts lyrics data as word-count pairs
mapped to each track_id into lyrics.csv.

### Data Analysis

**network_algs.ipynb** : It requires `edges.csv` and `nodes.csv` from an
earlier step. It tests 3 community detection algorithms and constructs
`nodes_with_clusters.csv` using cluster assignments to optimize
modularity. It can be run in Google Colab or locally, e.g. via VSCode.

**lyric_analysis.ipynb** : It requires `lyrics.csv` and `songs.csv` from
the data. It finds tf-idf of the lyrics and does sentiment analysis of
the lyrics words, finding aggregate cumulative sentiment metrics. It
constructs the files `tfidf.csv`, `sentiment_over_time.csv`, and
`combined_count_tfidf_sentiment.csv`, among others, to contain this
information. It can be run in Google Colab or locally, e.g. via VSCode.

**Word_frequency_data.py** : It requires `lyrics.csv` and `songs.csv`
from the data. It joins the dataset of lyrics and songs based on the
*track_id* field and creates a new dataset which will have the following
fields - *track_id*, *artist_id*, *song_id*, *title*, *artist_name*,
*word*, *count*,*year*. It can be run using Google Colab or locally.

### Data Visualization

#### Network Visualization

It was made using **D3.js**. A searchbox is present with over *40k*
artists, build using `react-virtualized`.

The graph related data is being read from `nodes.csv` and `edges.csv`.
A slider lets the user control how many similar artists they want to
see. Once the user selects an artist, they can see a network graph with
the selected artist in the center.

The node size depends on the number of tracks by that artist. Users can
hover over any node to view more information like *average_familiarity*,
*average_hotness*.

Double clicking on any node expands/collapses the network of that node,
to interactively expand or collapse the entire visualization. At any
point, all the visible nodes are compared by their frequency of
occurrences to get the top 7 recommended artists.

#### PowerBI Visualization.

You will have either install Power BI desktop/ use the online version
https://app.powerbi.com/. Once you have the tool would will import the
data into the power bi tool.

For the **Scrolling Bar-Chart** - select the bar-chart visualization and
select the Word for Y-axis and Count of words for X-axis.

For the **Word Cloud**: 

1) You will first have to add a new
visualization form the Power BI market. 

2) Once you the visualization
installed select the Word for Y-axis and Count of words for X-axis. 

3) For Both the Visualization we have the Artist name and the Song name as
the filters which are basic slicers from the Power BI tool set.

4)  The Next step is to save the report.

    4.1) If you are developing this in power BI desktop you will have to
    save the file locally and then publish the report to you
    app.powerbi.com workspace.

    4.2) If you are developing this in the online version which is
    app.powerbi.com you can skil step 4.1

5)  To make the report accessable to public user you will then publish
    the report to web.

6)  You will be able to access the PowerBI report through a PowerBI
    embedded link which you can add into a iFrame to insert it into html
    page.

#### Sentiment Visualization

`sentiment_over_time.csv` time has been loaded into a drop-down and the
a stacked bar chart made using [ECharts](https://echarts.apache.org/en/index.html).

Changing an artist selection, dynamically displays a chart over time for
positive, negative & neutral sentiments. The chart can be filtered by
category, zoomed in & reset as well.

## Web Hosting (Optional)

The website is hosted on **Firebase** console.

1.     cd /CODE/msd/

2.     npm run build

3.  You need to deploy this `build` folder.

4.  Checkout the documentation -
    https://firebase.google.com/docs/hosting
