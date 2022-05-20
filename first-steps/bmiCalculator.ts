/*interface bmiArgValues {
    value1: number,
    value2: number
}*/

const calculateBmi = (height : number, weight: number) => {
    const heightInMeters = height / 100
    const bmi = weight / (heightInMeters * heightInMeters)

    switch (true) {
        case bmi > 0 && bmi < 18.5:
            return 'Underweight'
        case bmi >= 18.5 && bmi < 25:
            return 'Normal (healthy weight)'
        case bmi >= 25 && bmi < 30:
            return 'Overweight'
        case bmi >= 30:
            return 'Obese'
        default:
            return 'Could not calculate bmi'
    }
}

/*const parseBmiArguments = (args : Array<String>) : bmiArgValues => {
    if (args.length < 4) throw new Error('Not enough args')
    if (args.length > 4) throw new Error('Too many args')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided args were not numbers')
    }

}

try {
    const { value1, value2 } = parseBmiArguments(process.argv)
    console.log(value1, value2)
    console.log(calculateBmi(value1, value2))
} catch(error: unknown) {
    console.error(error)
}*/

export default calculateBmi