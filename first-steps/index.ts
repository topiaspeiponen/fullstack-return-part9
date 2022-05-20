import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (!req.query.height || !req.query.weight ) {
        res.status(400).send('bad request');
    }

    if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
        console.log(Number(req.query.height), Number(req.query.weight));
        const bmiResult = calculateBmi(Number(req.query.height), Number(req.query.weight));
        res.json({
            weight: req.query.weight,
            height: req.query.height,
            bmi: bmiResult});
    } else {
        res.status(400).send('malformed parameters');
    }
});

app.post('/exercises', (req, res) => {
    if (!req.body) {
        res.status(400).send('parameters missing');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const daily_exercises = req.body.daily_exercises;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target = req.body.target;

    if (!daily_exercises || !Array.isArray(daily_exercises)) {
        res.status(400).send('malformed parameters');
    }
    if (!target || isNaN(Number(target))) {
        res.status(400).send('malformed parameters');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server runnign on port ${PORT}`);
});