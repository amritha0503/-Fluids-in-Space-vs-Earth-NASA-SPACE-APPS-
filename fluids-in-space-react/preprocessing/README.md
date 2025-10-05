# NASA Dataset Preprocessing

This folder contains Python scripts to preprocess NASA Physical Sciences Informatics (PSI) datasets for use in the Fluids in Space React application.

## Requirements

```bash
pip install pandas numpy
```

## Usage

### Generate Sample Data (for testing)

```bash
python preprocess_nasa_data.py --generate-samples --output-dir ../src/data
```

### Process Real NASA Data

1. **Colloid Data**:
```bash
python preprocess_nasa_data.py \
  --input raw_colloid_data.csv \
  --output ../src/data/colloid_processed.json \
  --type colloid
```

2. **Marangoni Convection Data**:
```bash
python preprocess_nasa_data.py \
  --input raw_marangoni_data.csv \
  --output ../src/data/marangoni_processed.json \
  --type marangoni
```

3. **Capillary Flow Data**:
```bash
python preprocess_nasa_data.py \
  --input raw_capillary_data.csv \
  --output ../src/data/capillary_processed.json \
  --type capillary
```

## Expected Data Formats

### Colloid Dataset (CSV)
```
time,particle_id,x,y,z,temperature
0.0,1,10.5,20.3,15.2,25.0
0.1,1,10.6,20.4,15.3,25.0
...
```

### Marangoni Dataset (CSV)
```
time,temperature,surface_tension,flow_velocity
0.0,20.0,72.8,0.0
0.1,21.5,72.5,0.5
...
```

### Capillary Dataset (CSV)
```
time,height,contact_angle,gravity_level
0.0,0.0,45.0,1.0
0.1,2.5,45.0,1.0
...
```

## Output Format

The script outputs JSON files with the following structure:

```json
{
  "dataset_type": "colloid",
  "total_points": 200,
  "data": [
    {
      "time": 0.0,
      "avg_x": 50.0,
      "avg_y": 50.0,
      "temperature": 25.0
    },
    ...
  ]
}
```

## Downloading NASA PSI Data

1. Visit [NASA PSI Portal](https://psi.nasa.gov/)
2. Search for relevant experiments:
   - "Colloid" for colloidal suspension experiments
   - "Marangoni" for convection studies
   - "Capillary" for capillary flow experiments
3. Download dataset as CSV
4. Run preprocessing script with appropriate type

## Notes

- The script automatically samples large datasets to reduce file size
- Data is normalized for visualization purposes
- Missing values are automatically handled
- Output JSON files can be directly imported in React
