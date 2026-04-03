def driver_aggregation(filtered_df):
    """
    Aggregates driver performance metrics for comparison.

    Parameters:
        filtered_df (DataFrame): Filtered dataset after applying season/driver filters

    Returns:
        DataFrame: Aggregated statistics per driver
    """

    summary = (
        filtered_df.groupby("driver_name")
        .agg(
            total_races=("race_name", "count"),
            total_points=("points", "sum"),
            wins=("win", "sum"),
            podiums=("podium", "sum"),
            avg_finish_position=("position", "mean"),
            best_grid_position=("grid", "min"),
        )
        .reset_index()
    )

    if not summary.empty:
        summary["avg_finish_position"] = summary["avg_finish_position"].round(2)

    return summary