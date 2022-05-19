interface bmiArgValues {
    value1: number,
    value2: number
}

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

const parseBmiArguments = (arguments : Array<String>) : bmiArgValues => {
    if (arguments.length < 4) throw new Error('Not enough arguments')
    if (arguments.length > 4) throw new Error('Too many arguments')

    if (!isNaN(Number(arguments[2])) && !isNaN(Number(arguments[3]))) {
        return {
            value1: Number(arguments[2]),
            value2: Number(arguments[3])
        }
    } else {
        throw new Error('Provided arguments were not numbers')
    }

}

try {
    const { value1, value2 } = parseBmiArguments(process.argv)
    console.log(value1, value2)
    console.log(calculateBmi(value1, value2))
} catch(error: unknown) {
    console.error(error)
}