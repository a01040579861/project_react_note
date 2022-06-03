import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCardFB } from "./redux/modules/myboard";

function Word(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const input_word = React.useRef(null);//단어
  const input_desc = React.useRef(null);//설명
  const input_exam = React.useRef(null);//예시

  const addWord = () => {
    //새롭게 입력된 인풋 데이터의 현재값 가지고 온다.
    let input_data = {
      word: input_word.current.value,
      desc: input_desc.current.value,
      exam: input_exam.current.value,
    };
    //등록버튼 누르면 페이지 전환되고 데이터 저장
    dispatch(createCardFB(input_data));
    window.setTimeout(() => {
      history.push("/");
    }, 500);
  };

  return (
    <Back>
      <Head>
        <h4>Word registration</h4>
      </Head>
      <Content>
        <div>
          <Label>단어</Label>
          <Text placeholder="단어를 입력" ref={input_word}></Text>
        </div>
        <div>
          <Label>설명</Label>
          <Text
            placeholder="단어에 대한 설명" ref={input_desc}></Text>
        </div>
        <div>
          <Label>예시</Label>
          <Text
            placeholder="단어를 사용한 예시" ref={input_exam}></Text>
        </div>
        <Add_btn onClick={addWord}>등록</Add_btn>
      </Content>
    </Back>
  );
}

const Back = styled.div`
  background: #304FFE;
  width: 400px;
  margin: auto;
  height: 100vh;
  display: table;
`;
const Head = styled.div`
  background: #304FFE;
  display: block;
  h4 {
    color: #fff;
  }
`;
const Content = styled.div`
  display: block;
  background: #fff;
  height: 85vh;
  padding: 10px;
  box-sizing: border-box;
`;
const Label = styled.label`
  display: block;
  text-align: left;
  margin: 50px 0 0 40px;
  font-weight: bold;
`;
const Text = styled.input`
  width: 300px;
  margin-top: 5px;
`;
const Add_btn = styled.div`
  background: #304FFE;
  color: #fff;
  width: 300px;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  border-radius: 20px;
  display: block;
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    color: black;
    background: #BBDEFB;
    transition: 0.2s;
  }
  cursor: pointer;
`;
export default Word;
