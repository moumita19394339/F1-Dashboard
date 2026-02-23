from pathlib import Path
import pandas as pd

__all__ = ["load_data"]

def load_data():
    csv_path = Path(__file__).resolve().parent.parent / "data" / "raw" / "processed" / "f1_Final_Data.csv"
    try:
        df = pd.read_csv(csv_path)
        df["date"] = pd.to_datetime(df["date"])
        print("Data loaded successfully.")
        print("Shape:", df.shape)
        return df
    except Exception as e:
        print("Error loading dataset:", e)
        return None