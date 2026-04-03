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


def test_filter_by_season(sample_df):
    filtered = filter_data(sample_df, season=2021)
    assert all(filtered["year"] == 2021)
    assert len(filtered) == 3


def test_filter_by_driver(sample_df):
    filtered = filter_data(sample_df, drivers=["Lewis Hamilton"])
    assert all(filtered["driver_name"] == "Lewis Hamilton")
    assert len(filtered) == 2


def test_filter_by_constructor(sample_df):
    filtered = filter_data(sample_df, constructors=["Red Bull"])
    assert all(filtered["constructor_name"] == "Red Bull")
    assert len(filtered) == 2


def test_filter_by_season_and_driver(sample_df):
    filtered = filter_data(sample_df, season=2021, drivers=["Lewis Hamilton"])
    assert all(filtered["year"] == 2021)
    assert all(filtered["driver_name"] == "Lewis Hamilton")
    assert len(filtered) == 2


def test_filter_no_conditions_returns_all(sample_df):
    filtered = filter_data(sample_df)
    assert len(filtered) == len(sample_df)


def test_filter_invalid_driver_returns_empty(sample_df):
    filtered = filter_data(sample_df, drivers=["Charles Leclerc"])
    assert filtered.empty