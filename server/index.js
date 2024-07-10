const express = require("express"); //express를 설치했기 때문에 가져올 수 있다.
var bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const question = require("./models/question");
const user = require("./models/user")

const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoConnect = require("./models");
mongoConnect();

app.get("/", (req, res) => {
    res.send("Hello! HI");
});

app.get("/question", async (req, res) => {
    const questionCount = await question.getAllQuestion();
    const random_index = Math.floor(Math.random() * (questionCount.length)) + 47;
    console.log("random_index",random_index);
    let getRandomQuestion = await question.getQuestionByContentId(
        random_index
    );    
    console.log("getRandomQuestion", getRandomQuestion);
    data = {
        content_id: getRandomQuestion[0].content_id,
        question: getRandomQuestion[0].question,
        answer: getRandomQuestion[0].answer,
        questionCount: questionCount.length
    };

    return res.status(200).send({
        data: data,
        message: "Question selected!",
    });
});

app.post("/answer", async (req, res) => {
    console.log("hihi", req.body);
    const getRandomQuestion = await question.getQuestionByContentId(
        req.body.index
    );
    let data = "";
    if (getRandomQuestion[0].answer === req.body.userAnswer) {
        console.log("test", req.body.index, getRandomQuestion[0].correct_count);
        if (getRandomQuestion[0].correct_count > 0) {
            const correcttt = await question.updateCorrectQuestion(req.body.index, getRandomQuestion[0].correct_count+1);
        }
        else {
            const correcttt = await question.updateCorrectQuestion(req.body.index, 1);
        }
        data = "ok";
    } else {
        data = "no";
        console.log("test", req.body.index, getRandomQuestion[0].wrong_count);
        if (getRandomQuestion[0].wrong_count > 0) {
            const wronggg = await question.updateWrongQuestion(req.body.index, getRandomQuestion[0].wrong_count+1); 
        }
        else {
            const wronggg = await question.updateWrongQuestion(req.body.index, 1);
        }
    }
    return res.status(200).send({
        data: data,
        message: "HI!!!",
    });
});

app.post("/wrongCount", async (req, res) => {
    
    console.log(req.body, "REQ BODY")
    
    const getRandomQuestion = await question.getQuestionByContentId(
        req.body.index
    );
    console.log(getRandomQuestion, "HHHH")
    if (getRandomQuestion[0].wrong_count > 0) {
        const wronggg = await question.updateWrongQuestion(req.body.index, getRandomQuestion[0].wrong_count+1); 
    }
    else {
        const wronggg = await question.updateWrongQuestion(req.body.index, 1);
    }

    return res.status(200).send({
        message: "OK!!",
    });
})



app.post("/addQuestion", async (req, res) => {
    console.log("hihi", req.body);

    const data = { question: req.body.question, answer: req.body.answer, correct_count: 0, wrong_count: 0 };

    const addQuestion = await new question(data).saveQuestion();
    console.log(addQuestion);

    return res.status(200).send({
        message: "ok",
    });
});

app.get("/bestscore", async (req, res) => {
    let getUserInfo = await user.getBestScore();    
    console.log("GETUSERINFO", getUserInfo)

    return res.status(200).send({
        data: getUserInfo,
        message: "User selected!",
    });
});

app.post("/updatebestscore", async (req, res) => {
    console.log("req.body", req.body.best_score)
    let getUserInfo = await user.updaateBestScore(req.body.best_score);    


    return res.status(200).send({
        message: "scoreUpdate!",
    });
});

app.listen(5001);
