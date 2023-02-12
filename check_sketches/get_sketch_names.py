from pathlib import Path
from argparse import ArgumentParser
import pandas as pd

parser = ArgumentParser()
parser.add_argument('--sketch_dir', type=str, default='sketches/', help='directory of sketches with trailing sketch')
parser.add_argument('--result_file', type=str, default='categorized_sketches.csv')
parser.add_argument('--filter', action='store_true')

args = parser.parse_args()

sketch_dir = Path(args.sketch_dir)
sketch_names = list(sketch_dir.glob("*.png"))
sketch_names = [ str(name) for name in sketch_names ]

if args.filter:
    categorized_sketches = list(pd.read_csv(args.result_file)['sketch'])
    for i in range(len(sketch_names) - 1, -1, -1):
        if sketch_names[i].split(args.sketch_dir)[1] in categorized_sketches:
            sketch_names.remove(sketch_names[i])



with open('sketch_names.txt', 'w') as f:
    f.write(str(sketch_names))