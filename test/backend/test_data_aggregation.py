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

# -----------------------------
# Tests for dataAggregation.py
# -----------------------------
def test_driver_aggregation_returns_dataframe(sample_df):
    result = driver_aggregation(sample_df)
    assert isinstance(result, pd.DataFrame)


def test_driver_aggregation_has_expected_columns(sample_df):
    result = driver_aggregation(sample_df)
    expected_columns = {
        "driver_name",
        "total_races",
        "total_points",
        "wins",
        "podiums",
        "avg_finish_position",
        "best_grid_position"
    }
    assert expected_columns.issubset(result.columns)


def test_driver_aggregation_correct_points(sample_df):
    result = driver_aggregation(sample_df)
    hamilton_points = result.loc[result["driver_name"] == "Lewis Hamilton", "total_points"].iloc[0]
    assert hamilton_points == 43


def test_driver_aggregation_correct_wins(sample_df):
    result = driver_aggregation(sample_df)
    verstappen_wins = result.loc[result["driver_name"] == "Max Verstappen", "wins"].iloc[0]
    assert verstappen_wins == 1


def test_driver_aggregation_average_finish(sample_df):
    result = driver_aggregation(sample_df)
    hamilton_avg = result.loc[result["driver_name"] == "Lewis Hamilton", "avg_finish_position"].iloc[0]
    assert hamilton_avg == 1.5


def test_driver_aggregation_empty_dataframe():
    empty_df = pd.DataFrame(columns=[
        "driver_name", "race_name", "points", "win", "podium", "position", "grid"
    ])
    result = driver_aggregation(empty_df)
    assert isinstance(result, pd.DataFrame)
    assert result.empty