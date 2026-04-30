library(tidyverse)
crime <- read_csv("Seattle_Crime_Data.csv")

colnames(crime)

library(lubridate)

# Make the Data
crime_by_year <- crime %>%
  # Rename crime_count
  rename(`Crime Count` = crime_count)
  mutate(
    report_datetime = lubridate::ymd_hms(`Report DateTime`, quiet = TRUE),
    year = lubridate::year(report_datetime)
  ) %>%
  count(year, name = "crime_count")

# Remove Incomplete Years
crime_by_year <- crime_by_year %>%
  filter(year >= 2008)

# For FLourish
write_csv(crime_by_year, "crime_by_year.csv")

# Run to ensure it worked
crime_by_year