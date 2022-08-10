const calculateBmi = (a: number, b: number) => {
    let math = ((b / (a * a)) * 10000)
    let bmi = parseFloat(math.toFixed(1))

    if (bmi < 18.5)
        return "Underweight: " + bmi
    else if (bmi <= 25.0)
        return "Normal weight: " + bmi
    else if (bmi <= 27.0)
        return "Slightly overweight: " + bmi
    else if (bmi <= 30.0)
        return "Overweight: " + bmi
    else
        return "Very overweight: " + bmi
}

interface argValues {
    value1: number; // Height
    value2: number; // Weight
}

const yes = (args: Array<string>): argValues => {
    if (args.length < 4) throw new Error("Not enough arguments")
    if (args.length > 4) throw new Error("Too many arguments")

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])))
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    else
        throw new Error("Provided values were not numbers!")
}

try {
    const { value1, value2 } = yes(process.argv)
    console.log(calculateBmi(value1, value2))
} catch (error: unknown) {
    let errorMessage = "Something bad happened."
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message
    }
    console.log(errorMessage)
}