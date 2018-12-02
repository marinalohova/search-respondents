# search-respondents

Matching Respondents With Projects by Location

## Getting Started

The code to import from CSV and search matching respondents can be found in features/respondents.
I used `harvestine` npm module to calculate the distance between points. Usually I prefer to use the existing module, rather than write from scratch, unless performance or other factors are in play.
However, if you would like me to add the function to calculate the distance and a set of tests, I can!

### Prerequisites

Install node Version >=8.1.4
```
nvm use 8.1.4
```

Install dependencies
```
npm i
```

### Installing

To run the script to find the matching respondents based on the provided files run:

```
npm start
```

## Running the tests

The tests can be found in test folder. To run the tests

```
npm test
```
