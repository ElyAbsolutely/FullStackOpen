interface Results {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

const exerciser = (exercises: number[], target: number) => {
    const calculateExercises = (a: number[], b: number) => {
        const results: Results = {
            periodLength: a.length,
            trainingDays: 5, // ???
            success: false,
            rating: 0,
            ratingDescription: "null",
            target: b,
            average: a.reduce((c, d) => c + d, 0) / a.length
        };

        const m1 = results.target;
        const m2 = results.average;

        if (m1 <= m2) {
            results.success = true;
            results.rating = 3;
            results.ratingDescription = "Good";
        } else if ((m1 / 5) * 4 <= m2) {
            results.rating = 2;
            results.ratingDescription = "Mediocre";
        }
        else if ((m1 / 5) * 2 <= m2) {
            results.rating = 1;
            results.ratingDescription = "Bad";
        } else {
            results.rating = 0;
            results.ratingDescription = "Awful";
        }

        return results;
    };

    // Stuff

    interface theGreatRetardation {
        value1: number[];
        value2: number;
    }

    const no = (): theGreatRetardation => {
        return {
            value1: exercises,
            value2: target
        };
    };

    try {
        const { value1, value2 } = no();
        return calculateExercises(value1, value2);
    } catch (error: unknown) {
        let errorMessage = "Something bad happened.";
        if (error instanceof Error)
            errorMessage += " Error: " + error.message;
        return { error: errorMessage };
    }
};

export default exerciser;