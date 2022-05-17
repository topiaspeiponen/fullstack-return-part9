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

console.log(calculateBmi(180, 74))