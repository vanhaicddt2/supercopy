

const initialState = {
    isLoading : true,
    day: "",
    time : "",
    league: "Japan",
    table: "Online",
    roomNumber: "",
    branchID: "",
    from: "",
    question1: 0,
    question2: 0,
    question3: 0,
    question4: 0,
    question5: [
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
    ],
    question6: [],
    question7: 0,
    question8: "",
}

const surveyReducer = (state = initialState, action) => {
}

export default surveyReducer;
