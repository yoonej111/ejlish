import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from 'styled-components';
import { theme } from "../../styles/theme";
import { useState, useEffect } from "react";
import axios from "axios";

export default function questionForm() {
    const [AddQuestion, setAddQuestion] = useState<string>("");
    const [AddAnswer, setAddAnswer] = useState<string>("");

    const submitQA = async (e: any) => {
      e.preventDefault();
      console.log(AddAnswer, AddQuestion);
      if (AddAnswer.length !== 0 && AddQuestion.length !== 0) {
          const data = { question: AddQuestion, answer: AddAnswer };
          const res = await axios.post(
              process.env.NEXT_PUBLIC_SERVER+'/addQuestion',
              data
          );
          if (res.status === 200) alert("등록완료");
          setAddAnswer("");
          setAddQuestion("");
      } else {
          alert("문제 정답 둘 다 입력해주세요.");
      }
  };

  const onChangeAnswer = (e: any) => {
      setAddAnswer(e.target.value);
  };

  const onChangeQuestion = (e: any) => {
      setAddQuestion(e.target.value);
  };
 

    return (
        <Question>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label
                        style={{
                            marginBottom: `${theme.space_7}`,
                            fontSize: `${theme.fs_10}`,
                            fontWeight: `${theme.fw_500}`,
                            color: `${theme.very_dark_blue_line}`,
                        }}
                    >
                        Question (한국어) & Answer (영어)
                    </Form.Label>
                    <Form.Control
                        type="text"
                        value={AddQuestion}
                        placeholder="Question"
                        onChange={onChangeQuestion}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        type="text"
                        value={AddAnswer}
                        placeholder="Answer"
                        onChange={onChangeAnswer}
                    />
                </Form.Group>
                <Button variant="primary" onClick={submitQA} type="submit">
                    Submit
                </Button>
            </Form>
        </Question>
    );
}

const Question = styled.section`
    padding-top: 10%;
    text-align: center;
    padding-left: 25%;
    padding-right: 25%;
`;
