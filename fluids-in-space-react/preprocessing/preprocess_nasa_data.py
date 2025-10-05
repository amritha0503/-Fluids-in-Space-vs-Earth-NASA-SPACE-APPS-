"""
NASA PSI Dataset Preprocessing Script
Converts raw NASA Physical Sciences Informatics datasets to JSON format
for use in the Fluids in Space React application.
"""

import pandas as pd
import numpy as np
import json
import argparse
from pathlib import Path


def preprocess_colloid_data(input_file, output_file, sample_rate=10):
    """
    Preprocess colloid particle tracking data.
    
    Parameters:
    -----------
    input_file : str
        Path to raw CSV file with columns: time, particle_id, x, y, z, temperature
    output_file : str
        Path to output JSON file
    sample_rate : int
        Keep every Nth data point to reduce size
    """
    print(f"Processing colloid data from {input_file}...")
    
    # Read CSV data
    df = pd.read_csv(input_file)
    
    # Sample data to reduce size
    df = df.iloc[::sample_rate, :]
    
    # Normalize positions to 0-100 range for visualization
    df['x_norm'] = (df['x'] - df['x'].min()) / (df['x'].max() - df['x'].min()) * 100
    df['y_norm'] = (df['y'] - df['y'].min()) / (df['y'].max() - df['y'].min()) * 100
    
    # Group by time and calculate statistics
    result = []
    for time in df['time'].unique():
        time_data = df[df['time'] == time]
        result.append({
            'time': float(time),
            'num_particles': len(time_data),
            'avg_x': float(time_data['x_norm'].mean()),
            'avg_y': float(time_data['y_norm'].mean()),
            'std_x': float(time_data['x_norm'].std()),
            'std_y': float(time_data['y_norm'].std()),
            'temperature': float(time_data['temperature'].mean()),
        })
    
    # Save to JSON
    with open(output_file, 'w') as f:
        json.dump({
            'dataset_type': 'colloid',
            'total_points': len(result),
            'data': result
        }, f, indent=2)
    
    print(f"✓ Saved {len(result)} time points to {output_file}")


def preprocess_marangoni_data(input_file, output_file):
    """
    Preprocess Marangoni convection experiment data.
    
    Expected columns: time, temperature, surface_tension, flow_velocity
    """
    print(f"Processing Marangoni data from {input_file}...")
    
    df = pd.read_csv(input_file)
    
    # Clean and normalize data
    df = df.dropna()
    
    result = []
    for _, row in df.iterrows():
        result.append({
            'time': float(row['time']),
            'temperature': float(row['temperature']),
            'surface_tension': float(row['surface_tension']),
            'flow_velocity': float(row['flow_velocity']) if 'flow_velocity' in row else 0,
        })
    
    # Save to JSON
    with open(output_file, 'w') as f:
        json.dump({
            'dataset_type': 'marangoni',
            'total_points': len(result),
            'data': result
        }, f, indent=2)
    
    print(f"✓ Saved {len(result)} data points to {output_file}")


def preprocess_capillary_data(input_file, output_file):
    """
    Preprocess capillary flow experiment data.
    
    Expected columns: time, height, contact_angle, gravity_level
    """
    print(f"Processing capillary data from {input_file}...")
    
    df = pd.read_csv(input_file)
    df = df.dropna()
    
    result = []
    for _, row in df.iterrows():
        result.append({
            'time': float(row['time']),
            'height': float(row['height']),
            'contact_angle': float(row['contact_angle']) if 'contact_angle' in row else None,
            'gravity_level': float(row['gravity_level']) if 'gravity_level' in row else 1.0,
        })
    
    with open(output_file, 'w') as f:
        json.dump({
            'dataset_type': 'capillary',
            'total_points': len(result),
            'data': result
        }, f, indent=2)
    
    print(f"✓ Saved {len(result)} data points to {output_file}")


def generate_sample_data(output_dir):
    """
    Generate sample datasets for testing when real NASA data isn't available.
    """
    print("Generating sample datasets...")
    
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    
    # Sample colloid data
    colloid_data = []
    for t in np.linspace(0, 100, 200):
        colloid_data.append({
            'time': float(t),
            'avg_x': float(50 + 20 * np.sin(t * 0.1)),
            'avg_y': float(50 + 20 * np.cos(t * 0.1)),
            'temperature': float(20 + np.random.normal(0, 0.5)),
        })
    
    with open(f"{output_dir}/sample_colloid.json", 'w') as f:
        json.dump({'dataset_type': 'colloid', 'data': colloid_data}, f, indent=2)
    
    # Sample Marangoni data
    marangoni_data = []
    for temp in np.linspace(20, 80, 100):
        surface_tension = 72 - (temp - 20) * 0.15 + np.random.normal(0, 0.5)
        marangoni_data.append({
            'temperature': float(temp),
            'surface_tension': float(surface_tension),
            'flow_velocity': float(np.abs(np.sin(temp * 0.1)) * 5),
        })
    
    with open(f"{output_dir}/sample_marangoni.json", 'w') as f:
        json.dump({'dataset_type': 'marangoni', 'data': marangoni_data}, f, indent=2)
    
    print(f"✓ Sample datasets saved to {output_dir}/")


def main():
    parser = argparse.ArgumentParser(
        description='Preprocess NASA PSI datasets for Fluids in Space app'
    )
    parser.add_argument('--input', type=str, help='Input CSV file path')
    parser.add_argument('--output', type=str, help='Output JSON file path')
    parser.add_argument('--type', type=str, choices=['colloid', 'marangoni', 'capillary'],
                       help='Dataset type')
    parser.add_argument('--generate-samples', action='store_true',
                       help='Generate sample datasets')
    parser.add_argument('--output-dir', type=str, default='../src/data',
                       help='Output directory for sample data')
    
    args = parser.parse_args()
    
    if args.generate_samples:
        generate_sample_data(args.output_dir)
        return
    
    if not args.input or not args.output or not args.type:
        parser.error("--input, --output, and --type are required when not generating samples")
    
    # Process based on dataset type
    if args.type == 'colloid':
        preprocess_colloid_data(args.input, args.output)
    elif args.type == 'marangoni':
        preprocess_marangoni_data(args.input, args.output)
    elif args.type == 'capillary':
        preprocess_capillary_data(args.input, args.output)
    
    print("\n✓ Preprocessing complete!")
    print(f"  You can now import this data in your React app:")
    print(f"  import data from './data/{Path(args.output).name}';")


if __name__ == '__main__':
    main()
