def filter_data(df, season=None, drivers=None, constructors=None):

    """
    Filters the F1 final dataset based on season, driver, and constructor selections.

    Parameters:
        df (DataFrame): Input dataset
        season (int): Selected season year
        drivers (list): Selected drivers
        constructors (list): Selected constructors

    Returns:
        DataFrame: Filtered dataset
    """

    filtered_df = df.copy()

    if season is not None:
        filtered_df = filtered_df[filtered_df["year"] == season]

    if drivers:
        filtered_df = filtered_df[filtered_df["driver_name"].isin(drivers)]

    if constructors:
        filtered_df = filtered_df[filtered_df["constructor_name"].isin(constructors)]

    return filtered_df