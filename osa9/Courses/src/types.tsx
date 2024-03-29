export interface MyProps {
    courseParts: {
        name: string;
        exerciseCount: number;
    }[]
}

// new types
interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseDescription extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends CourseDescription {
    type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescription {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescription {
    type: "special";
    requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

export interface ArrayThing {
    courseParts: CoursePart[];
}

export interface OtherThing {
    part: CoursePart;
}