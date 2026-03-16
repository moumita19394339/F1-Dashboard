from dataLoader import load_data

print("Running src/app.py")
df = load_data()

if df is None:
	print("load_data() returned None — dataset failed to load or an error occurred.")
else:
	print("DataFrame preview:")
	print(df.head())
	print("DataFrame dtypes:")
	print(df.dtypes)