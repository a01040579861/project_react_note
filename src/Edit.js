import React from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCardFB } from "./redux/modules/myboard";

function Edit(props) {
  const card_list = useSelector((state) => state.myboard.list);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const card_index = params.idx;
  console.log(card_list[card_index]);

  const word = React.useRef(null);
  const desc = React.useRef(null);
  const exam = React.useRef(null);

  const editWord = () => {
    let input_data = {
      word: word.current.value,
      desc: desc.current.value,
      exam: exam.current.value,
    };
    dispatch(updateCardFB(card_list[card_index].id, input_data));
    history.push("/");
  };

  return (
    <Back>
      <Head>
        <h4>Word Editing</h4>
      </Head>
      <Content>
        <div>
          <Label>단어</Label>
          <Text ref={word}>{card_list[card_index].word}</Text>
        </div>
        <div>
          <Label>설명</Label>
          <Text ref={desc}>{card_list[card_index].desc}</Text>
        </div>
        <div>
          <Label>예시</Label>
          <Text ref={exam}>{card_list[card_index].exam}</Text>
        </div>
        <Add_btn onClick={editWord}>수정</Add_btn>
      </Content>
    </Back>
  );
}

const Back = styled.div`
  background: #304FFE;
  width: 400px;
  margin: auto;
  height: 100vh;
  border-radius: 10px;
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
const Text = styled.textarea`
  width: 300px;
  resize: none;
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
    transition: 0.3s;
  }
  cursor: pointer;
`;

export default Edit;
