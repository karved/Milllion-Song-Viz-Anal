import pandas as pd

# Read the CSV files
lyrics = pd.read_csv('data/lyrics.csv')
songs = pd.read_csv('data/songs.csv')

# Perform inner join on 'track_id' column
merged_data = pd.merge(lyrics, songs, on='track_id',how='inner')

# Create new dataset with desired columns
new_data = merged_data[['track_id', 'artist_id', 'song_id', 'title', 'artist_name', 'word', 'count','year']]

# Clean the data
new_data.dropna(inplace=True) # drop rows with missing values
new_data = new_data[new_data['count'] > 0] # keep rows where 'count' is greater than 0

# Write new dataset to CSV file
new_data.to_csv('wordfrequency.csv', index=False)

# Print confirmation message

print("New dataset written to 'new_dataset.csv'")

#19,045,192





print(new_data.count())