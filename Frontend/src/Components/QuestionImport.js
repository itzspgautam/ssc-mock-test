import React, { useState } from "react";
import * as xlsx from "xlsx";
export const QuestionImport = ({ setQuestion, setQuestionError }) => {
  const readUploadFile = async (e) => {
    e.preventDefault();

    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        let ques = [];
        let error = [];
        await json.forEach((q, i) => {
          console.log(q);
          let qNo = i + 1;
          if (q.Qenglish === undefined || q.Qhindi === undefined) {
            error.push("Question is empty in question no:" + qNo);
          }

          if (q.Aenglish === undefined || q.Ahindi === undefined) {
            error.push("Option A is empty in question no:" + qNo);
          }

          if (q.Benglish === undefined || q.Bhindi === undefined) {
            error.push("Option B is empty in question no:" + qNo);
          }
          if (q.Cenglish === undefined || q.Chindi === undefined) {
            error.push("Option C is empty in question no:" + qNo);
          }
          if (q.Denglish === undefined || q.Dhindi === undefined) {
            error.push("Option D is empty in question no:" + qNo);
          }

          if (!q.correct) {
            error.push("Correct Option is empty in question no:" + i);
          }

          ques.push({
            title: {
              english: q.Qenglish,
              hindi: q.Qhindi,
            },
            subject: {
              english: q.Senglish,
              hindi: q.Shindi,
            },
            correctOption: q.correct,
            options: [
              {
                option: "A",
                english: q.Aenglish,
                hindi: q.Ahindi,
              },
              {
                option: "B",
                english: q.Benglish,
                hindi: q.Bhindi,
              },
              {
                option: "C",
                english: q.Cenglish,
                hindi: q.Chindi,
              },
              {
                option: "D",
                english: q.Denglish,
                hindi: q.Dhindi,
              },
            ],
          });
        });
        setQuestion(ques);
        setQuestionError(error);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
      e.target.value = "";
    }
  };

  return (
    <form>
      <input
        type="file"
        name="upload"
        id="upload"
        onChange={(e) => readUploadFile(e)}
      />
    </form>
  );
};
