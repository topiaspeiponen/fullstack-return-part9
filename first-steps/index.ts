import express from 'express';
import bmiCalculator from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (!req.query.height || !req.query.weight ) {
        res.status(400).send('bad request');
    }

    if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
        console.log(Number(req.query.height), Number(req.query.weight));
        const bmiResult = bmiCalculator(Number(req.query.height), Number(req.query.weight));
        res.json({
            weight: req.query.weight,
            height: req.query.height,
            bmi: bmiResult});
    } else {
        res.status(400).send('malformed parameters');
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server runnign on port ${PORT}`);
});