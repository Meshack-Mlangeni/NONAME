import { Activity } from "./activity";
import { Answer } from "./answers";

export interface PollActivity {
    id: number;
    activityId: number;
    activity: Activity;
    userEmail: string;
    chosenAnswerCorrect: boolean;
    selectedAnswer: string;
    selectedAnswerId: number;
    possibleAnswer: Answer;
}