import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCardFB, loadCardFB } from "./redux/modules/myboard";

function Board(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const my_list = useSelector((state) => state.myboard.list);

  React.useEffect(() => {
    dispatch(loadCardFB());
  }, []);

  return (
    <Back>
      <Head>
        <h3>Dictionary📓</h3>
      </Head>
      <Content>
        {my_list.map((l, idx) => {
          return (
            <Section key={idx}>
              <div>
                <Section_top>
                  <Span>단어</Span>
                  <Edit_box>
                    <Edit_btn
                      onClick={() => {
                        history.push("/edit/" + idx);
                      }}
                    >
                      ✏️
                    </Edit_btn>
                    <Del_btn
                      onClick={() => {
                        dispatch(deleteCardFB(my_list[idx].id));
                      }}
                    >
                      🗑️
                    </Del_btn>
                  </Edit_box>
                </Section_top>
                <p>{l.word}</p>
              </div>
              <div>
                <Span>설명</Span>
                <p>{l.desc}</p>
              </div>
              <div>
                <Span>예시</Span>
                <Example>{l.exam}</Example>
              </div>

            </Section>
          );
        })}
        <Add_btn_box>
          <Add_btn
            onClick={() => {
              history.push("/word");
            }}
          >
            ✏️
          </Add_btn>
        </Add_btn_box>
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
  h3 {
    text-align: center;
    color: #fff;
    margin-left: 15px;
  }
`;
const Content = styled.div`
  display: block;
  background: #fff;
  height: 85vh;
  padding-top: 5px;
  overflow-x: hidden;
  font-size: 14px;
`;
const Section = styled.div`
  display: block;
  background: #BBDEFB;
  border-radius: 50px;
  box-sizing: border-box;
  width: 350px;
  margin: 10px 20px;
  padding: 30px;
  text-align: left;
  position: relative;

  &:hover {
    box-shadow: 0px 0px 10px 3px #90CAF9;
    transition: 0.3s;
  }
  overflow: hidden;
`;
const Section_top = styled.div`
  justify-content: space-between;
`;
const Span = styled.span`
  font-weight: bold;
`;
const Edit_box = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  top: 30px;
  left: 290px;
`;
const Edit_btn = styled.div`
  border: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
`;
const Del_btn = styled.div`
  border: none;
  cursor: pointer;
  margin-left: 5px;
`;
const Example = styled.p`
  color: blue;
  font-weight: bold;
`;
const Add_btn_box = styled.div`
  display: block;
  position: fixed;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
`;
const Add_btn = styled.button`
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 20px;
  background: #fff;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background: #1A237E;
    transition: 0.3s;
  }
`;

export default Board;
