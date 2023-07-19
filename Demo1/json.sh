#!/bin/bash

# Define the directory path
directory="demos"

# Get the file names in the directory
files=$(ls "$directory")

# Convert the file names to a JSON array
json="["
first_file=true
while IFS= read -r file; do
  if [ "$first_file" = false ]; then
    json+=", "
  else
    first_file=false
  fi
  json+="\"$file\""
done <<< "$files"
json+="]"

# Write the JSON array to images.json
echo "$json" > artwork.json
