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

What the backend does:

- Loads `data/raw/processed/f1_Final_Data.csv` using `pandas`.
- Prints "Data loaded successfully." and shows the DataFrame head and dtypes.

Notes:

- `requirements.txt` pins `pandas==2.3.3`. To reproduce the environment exactly, create a virtualenv and install using the pinned file.
- The code expects the CSV file at `data/raw/processed/f1_Final_Data.csv` relative to the repository root.
