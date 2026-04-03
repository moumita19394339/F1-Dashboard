import pandas as pd
import pytest

from src.dataLoader import load_data
from src.dataFilter import filter_data
from src.dataAggregation import driver_aggregation


# Sample mock data for testing
@pytest.fixture
def sample_df():
    return pd.DataFrame({
        "year": [2021, 2021, 2021, 2022],
        "date": pd.to_datetime(["2021-03-28", "2021-04-18", "2021-05-02", "2022-03-20"]),
        "race_name": ["Bahrain GP", "Imola GP", "Portugal GP", "Bahrain GP"],
        "driver_name": ["Lewis Hamilton", "Max Verstappen", "Lewis Hamilton", "Max Verstappen"],
        "driver_nationality": ["British", "Dutch", "British", "Dutch"],
        "constructor_name": ["Mercedes", "Red Bull", "Mercedes", "Red Bull"],
        "constructor_nationality": ["German", "Austrian", "German", "Austrian"],
        "grid": [2, 1, 1, 1],
        "position": [1, 2, 2, 1],
        "positionText": ["1", "2", "2", "1"],
        "points": [25, 18, 18, 25],
        "finished": [1, 1, 1, 1],
        "podium": [1, 1, 1, 1],
        "win": [1, 0, 0, 1]
    })


def test_load_data_returns_dataframe():
    df = load_data()
    assert isinstance(df, pd.DataFrame)


def test_load_data_not_empty():
    df = load_data()
    assert not df.empty


def test_load_data_has_required_columns():
    df = load_data()
    expected_columns = {
        "year", "date", "race_name", "driver_name", "constructor_name",
        "grid", "position", "points", "podium", "win"
    }
    assert expected_columns.issubset(df.columns)


def test_load_data_date_is_datetime():
    df = load_data()
    assert pd.api.types.is_datetime64_any_dtype(df["date"])
