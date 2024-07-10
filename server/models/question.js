const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const question_list = new mongoose.Schema({
    content_id: {
        type: Number,
        unique: true,
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    correct_count: {
        type: Number,
        required: false,
    },
    wrong_count: {
        type: Number,
        required: false,
    },
});

question_list.plugin(autoIncrement.plugin, {
    model: "question",
    field: "content_id",
    startAt: 1, //시작
    increment: 1, // 증가
});

// 문제 전체 조회

question_list.statics.getAllQuestion = async function () {
    return await this.find({});
};

question_list.statics.getQuestionByContentId = async function (content_id) {
    return await this.find({ content_id: content_id });
};

question_list.methods.saveQuestion = async function () {
    return await this.save();
};

question_list.statics.updateCorrectQuestion = async function(content_id, correct_count){
    return await this.findOneAndUpdate({content_id: content_id}, {correct_count: correct_count} );

}

question_list.statics.updateWrongQuestion = async function(content_id, wrong_count){
    return await this.findOneAndUpdate({content_id: content_id}, {wrong_count: wrong_count} );

}

module.exports = mongoose.model("question", question_list);
