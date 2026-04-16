# Code for cleaned data

import pandas as pd

# Load the data
df = pd.read_csv("Office_of_Police_Accountability_Complaints_20260415.csv")

print(df.head())
print(df.columns)

# Received Date
date_column = "Received Date"

# Convert the date column so python understands it
df[date_column] = pd.to_datetime(df[date_column], errors="coerce")

# Drop the missing dates
df = df.dropna(subset=[date_column])

# Extract year
df["year"] = df[date_column].dt.year

# Fix
df = df[df["year"] >= 2010]

# Count per year
summary = df.groupby("year").size().reset_index(name="Count")

# Sort values
summary = summary.sort_values("year")

# Save cleaned file
summary.to_csv("cleaned_opa_complaints.csv", index=False)

print(summary)
