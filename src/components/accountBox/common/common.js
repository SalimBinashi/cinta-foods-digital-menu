import styled from "styled-components";

export const CommonBoxContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20%;
    background-color: #512938
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MutedLink = styled.a`
  font-size: 11px;
  color: rgb(2,0,36);
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 11px;
  color: rgb(2,0,36);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: none;
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;
  transition: all 200ms ease-in-out;

  &::placeholder {
    color: rgb(255,255,255);
  }

  &:not(:last-of-type) {
    border-bottom: none;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(2,0,36);
  }
`;

export const SubmitButton = styled.button`
  width: 40%;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(68,5,34,1) 100%, rgba(1,55,93,1) 100%); 

  &:hover {
    filter: brightness(1.03);
  }
`;
