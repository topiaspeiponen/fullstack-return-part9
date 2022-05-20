interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
interface exerciseArgValues {
    target: number,
    exerciseHours : Array<number>
}

const calculateExercises = (exerciseHours: Array<number>, targetHours: number) => {

    const trainingDays = exerciseHours.reduce((prev, curr) => {
        if (curr > 0) {
            return prev + 1;
        }
        return prev;
    }, 0);

    const totalTrainingHours = exerciseHours.reduce((prev, curr) => {
        if (curr > 0) {
            return prev + curr;
        }
        return prev;
    }, 0);
    const avgTrainingHours = totalTrainingHours > 0 ? (totalTrainingHours / exerciseHours.length) : 0;

    const targetReached = avgTrainingHours >= targetHours;

    let rating : number;
    let ratingDescription : string;

    switch (true) {
        case avgTrainingHours < (targetHours / 2):
            rating = 1;
            ratingDescription = 'bad. you need to step up your game.';
            break;
        case avgTrainingHours >= (targetHours / 2) && avgTrainingHours < targetHours:
            rating = 2;
            ratingDescription = 'not too bad but could be better';
            break;
        case avgTrainingHours >= targetHours:
            rating = 3;
            ratingDescription = 'perfect! keep up the good work';
            break;
        default:
            rating = 0;
            ratingDescription = 'unable to rate performance';
            break;
    }

    const result : Result = {
        periodLength: exerciseHours.length,
        trainingDays: trainingDays,
        success: targetReached,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetHours,
        average: avgTrainingHours
    };

    return result;
};

const parseExerciseArguments = (args : Array<string>) : exerciseArgValues => {
    if (args.length < 4) throw new Error('Not enough args');

    let targetHours = 0;
    const exerciseHours : Array<number> = [];

    for (let i=2; i < args.length; i++) {

        if (i === 2 && !isNaN(Number(args[i]))) {
            targetHours = Number(args[i]);
        } else if (!isNaN(Number(args[i]))) {
            exerciseHours.push(Number(args[i]));
        } else {
            throw new Error('Provided args were not numbers');
        }
    }
    
    const argValues : exerciseArgValues = {
        target: targetHours,
        exerciseHours: exerciseHours
    };
    return argValues;
};

try {
    const { target, exerciseHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(exerciseHours, target));
} catch(error: unknown) {
    console.error(error);
}