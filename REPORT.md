# Reports

## Either

|      | Ops/s | Margin |
|------|-------|--------|
| Baseline | 953,599,179 | ±0.71% |
| Class implementation | 208,540,114 | ±1.12% |
| Function implementation | 55,839,454 | ±0.79% |
| Object implementation | 788,178,235 | ±0.93% |

## New Objects creation

|      | Ops/s | Margin |
|------|-------|--------|
| Plain object | 46,426,953 | ±1.47% |
| Object without prototype | 9,152,021 | ±1.14% |
| Map | 3,672,329 | ±1.2% |

## Currying

|      | Ops/s | Margin |
|------|-------|--------|
| Baseline (no currying) | 952,353,727 | ±0.7% |
| Higher-order function | 944,876,061 | ±0.94% |
| R.curry | 18,990,382 | ±1.85% |

## Array mapping

|      | Ops/s | Margin |
|------|-------|--------|
| Array#map | 30,717,919 | ±1.26% |
| R.addIndex(R.map) | 1,259,126 | ±1.07% |
| for loop | 26,193,771 | ±1.16% |

## Array mapping

|      | Ops/s | Margin |
|------|-------|--------|
| Array#map | 31,335,341 | ±0.88% |
| R.map | 9,508,410 | ±1.95% |
| for loop | 24,417,095 | ±1.87% |

## String concat

|      | Ops/s | Margin |
|------|-------|--------|
| Baseline | 940,580,523 | ±0.85% |
| for loop | 17,362,686 | ±2.34% |
| for...of loop | 15,056,775 | ±2.35% |
| Array#join | 7,666,345 | ±1.26% |