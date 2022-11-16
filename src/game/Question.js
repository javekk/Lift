class Question {
    constructor(text, choices) {
        this.text = text;
        this.choices = choices;
    }
}

class Answer {
    constructor(text, isCorrect) {
        this.text = text;
        this.isCorrect = isCorrect;
    }
}

module.exports = {
    Question,
    Answer,
};