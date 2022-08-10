const bmi = (incomingHeight: number, incomingWeight: number) => {
    const calculateBmi = (height: number, weight: number) => {
        const a: number = height;
        const b: number = weight;

        const math: number = ((b / (a * a)) * 10000);
        const bmi: number = parseFloat(math.toFixed(1));

        if (bmi < 18.5)
            return "Underweight: " + bmi;
        else if (bmi <= 25.0)
            return "Normal weight: " + bmi;
        else if (bmi <= 27.0)
            return "Slightly overweight: " + bmi;
        else if (bmi <= 30.0)
            return "Overweight: " + bmi;
        else
            return "Very overweight: " + bmi;
    };

    interface argValues {
        value1: number; // Height
        value2: number; // Weight
    }

    const yes = (): argValues => {
        const height: number = incomingHeight;
        const weight: number = incomingWeight;

        return {
            value1: height,
            value2: weight
        };
    };

    try {
        const { value1, value2 } = yes();
        const bmi = calculateBmi(value1, value2);
        return {
            height: value1,
            weight: value2,
            bmi
        };
    } catch (error: unknown) {
        let errorMessage = "Something bad happened.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        return { error: errorMessage };
    }
};

export default bmi;