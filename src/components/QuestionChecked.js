import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import '../css/question.css';

const CheckBoxInput = styled.input`
    // position: absolute;
    width: 0px;
    height: 0px;
    padding: 0;
    margin:25px 5px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    &:checked +label {
    background-color: #8E37D7;
    color: white;
    }
`;
const CheckboxLabel = styled.label`
    // padding: 0.5rem 1rem;
    padding: 10px 40px;
    height: 2.25rem;
    // height:60rem;
    cursor: pointer;
    border-radius: 2rem;
    background-color: #f2f4f6;
    // font-size: 0.75rem;
    font-size:18px;
    color: #383838;
    word-break: keep-all;

`;


const QuestionButton = ({ data, checkedItems, checkedItemHandler })=> {
    const [isChecked, setIsChecked] = useState(null)
    const onCheck = ({ target }) => {
        checkedItemHandler(target.value, target.checked)
        setIsChecked(target.checked)
    }
    useEffect(() => {
        if (checkedItems.includes(data)) {
            setIsChecked(true)
        } else {
            setIsChecked(false)
        }
    }, [checkedItems])
    return (
        <>
            <label key={data}>
                <CheckBoxInput type='checkbox'
                    name={data}
                    id={data}
                    checked={isChecked}
                    value={data}
                    onChange={e => onCheck(e)}
                    />
                <CheckboxLabel htmlFor={data}>{data}</CheckboxLabel>
            </label>
        </>
    );
};
export default QuestionButton;