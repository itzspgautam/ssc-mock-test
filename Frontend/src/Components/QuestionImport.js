import React from "react";
import * as xlsx from "xlsx";
export const QuestionImport = ({ setQuestion }) => {
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
        await json.forEach((q) => {
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
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <form>
      <input type="file" name="upload" id="upload" onChange={readUploadFile} />
    </form>
  );
};
