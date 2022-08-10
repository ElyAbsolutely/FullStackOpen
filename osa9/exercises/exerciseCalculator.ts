const calculateExercises = (a: number[], b: number) => {
    interface Results {
        periodLength: number,
        trainingDays: number,
        success: boolean,
        rating: number,
        ratingDescription: string,
        target: number,
        average: number,
    }

    let results: Results = {
        periodLength: a.length,
        trainingDays: 5, // ???
        success: false,
        rating: 0,
        ratingDescription: "null",
        target: b,
        average: a.reduce((c, d) => c + d, 0) / a.length
    }

    const m1 = parseFloat(b.toFixed(0))
    const m2 = parseFloat(results.average.toFixed(10))

    if (m1 <= m2) {
        results.success = true
        results.rating = 3
        results.ratingDescription = "Good"
    } else if ((m1 / 5) * 4 <= m2) {
        results.rating = 2
        results.ratingDescription = "Mediocre"
    }
    else if ((m1 / 5) * 2 <= m2) {
        results.rating = 1
        results.ratingDescription = "Bad"
    } else {
        results.rating = 0
        results.ratingDescription = "Awful"
    }

    return results
}

// Stuff

interface theGreatRetardation {
    exercises: number[];
    target: number;
}

const no = (args: Array<string>): theGreatRetardation => {
    if (args.length < 4) throw new Error("Not enough arguments")

    const array = []
    for (let x = 3; x < args.length; x++)
        if (!isNaN(Number(args[x])))
            array.push(Number(args[x]))
        else
            throw new Error("Provided values were not numbers!")

    if (!isNaN(Number(args[2])))
        return {
            exercises: array,
            target: Number(args[2])
        }
    else
        throw new Error("Provided values were not numbers!")
}

try {
    const { exercises, target } = no(process.argv)
    console.log(calculateExercises(exercises, target))
} catch (error: unknown) {
    let errorMessage = "Something bad happened."
    if (error instanceof Error)
        errorMessage += " Error: " + error.message
    console.log(errorMessage)
}