interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (exerciseHours: Array<number>, targetHours: number) => {
    
    const trainingDays = exerciseHours.reduce((prev, curr) => {
        if (curr > 0) {
            return prev + 1
        }
        return prev
    }, 0)

    const totalTrainingHours = exerciseHours.reduce((prev, curr) => {
        if (curr > 0) {
            return prev + curr
        }
        return prev
    }, 0)
    const avgTrainingHours = totalTrainingHours > 0 ? (totalTrainingHours / 7) : 0

    const targetReached = avgTrainingHours >= targetHours

    let rating : number
    let ratingDescription : string

    switch (true) {
        case avgTrainingHours < (targetHours / 2):
            rating = 1
            ratingDescription = 'bad. you need to step up your game.'
            break;
        case avgTrainingHours >= (targetHours / 2) && avgTrainingHours < targetHours:
            rating = 2
            ratingDescription = 'not too bad but could be better'
            break;
        case avgTrainingHours >= targetHours:
            rating = 3
            ratingDescription = 'perfect! keep up the good work'
            break;
        default:
            rating = 0
            ratingDescription = 'unable to rate performance'
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
    }

    return result
}

const exampleHours = [3, 0, 2, 4.5, 0, 3, 1]
console.log(calculateExercises(exampleHours, 2))