# F1-Dashboard
An interactive, student-focused dashboard designed to explore and analyse historical Formula 1 racing data using structured datasets and visual analytics.

**Backend (src)**

- `src/app.py`: simple entrypoint that imports `load_data()` and prints the DataFrame head and dtypes.
- `src/dataLoader.py`: contains `load_data()` which reads `data/raw/processed/f1_Final_Data.csv` and returns a pandas DataFrame.

Getting started:

1. Create and activate a virtual environment (recommended):

```bash
cd /path/to/F1-Dashboard
python3 -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the backend:

```bash
python src/app.py
```

Or use the convenience targets added to the repo:

```bash
make run    # creates venv (if missing), installs deps, and runs src/app.py
./run.sh    # same as above, executable script

**Backend (src)**

The backend is responsible for loading, filtering, and aggregating Formula 1 race data to support the dashboard visualisations.

- `src/app.py`  
  Entry point used for testing backend functionality. It loads the dataset and verifies that the backend pipeline works correctly.

- `src/dataLoader.py`  
  Contains `load_data()` which reads `data/raw/processed/f1_Final_Data.csv` and returns a pandas DataFrame.

- `src/dataFilter.py`  
  Implements dynamic filtering logic based on user selections in the dashboard (season, driver, and constructor).

- `src/dataAggregation.py`  
  Performs backend aggregation to compute driver performance statistics such as total races, wins, podiums, points, and average finishing position for comparison visualisations.

## Backend Data Processing Pipeline

The backend follows a simple modular pipeline to prepare data for the dashboard:

Dataset → Filtering → Aggregation → Dashboard Visualisations

1. **Data Loading**  
   The dataset is loaded from `data/raw/processed/f1_Final_Data.csv` using pandas.

2. **Data Filtering**  
   The dataset can be dynamically filtered based on:
   - Season
   - Driver
   - Constructor

3. **Data Aggregation**  
   Aggregated statistics are calculated per driver to enable comparative analysis in the dashboard.

Metrics currently calculated include:
- Total races
- Total points
- Wins
- Podium finishes
- Average finishing position
- Best grid position


What the backend does:
- Loads the processed Formula 1 dataset using `pandas`.
- Provides filtering functionality based on season, driver, and constructor selections.
- Computes aggregated driver statistics used for comparison visualisations in the dashboard.
- Supplies processed data to the frontend dashboard for interactive exploration.

## Backend Project Structure

F1-Dashboard
│
├── data
│   └── raw/processed/f1_Final_Data.csv
│
├── src
│   ├── app.py
│   ├── dataLoader.py
│   ├── dataFilter.py
│   └── dataAggregation.py
│
├── requirements.txt
├── Makefile
└── README.md

Notes:

- `requirements.txt` pins `pandas==2.3.3`. To reproduce the environment exactly, create a virtualenv and install using the pinned file.
- The code expects the CSV file at `data/raw/processed/f1_Final_Data.csv` relative to the repository root.
