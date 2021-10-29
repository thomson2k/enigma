import { FC, useState, useEffect } from "react";
import { IState as Props } from "../App";
import styles from "./ListCategory.module.css";
import Card from "./Card";
import axios from "axios";
import addIcon from "../images/add.svg";

interface IProps {
  setData: React.Dispatch<React.SetStateAction<Props["data"]>>;
  data: Props["data"];
  ctx: Props["ctx"];
}
interface SelectProtected {
  readonly wrapperElement: HTMLDivElement;
  readonly inputElement: HTMLInputElement;
}

const ListCategory: FC<IProps> = ({ data, ctx }) => {
  const [currentCategory, setcurrentCategory] = useState("");
  const [addNewToggle, setAddNewToggle] = useState(false);
  const [baseImage, setBaseImage] = useState(null);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState({});
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();


  useEffect(() => {
    axios.get("http://localhost:8000/api/questions").then((res:any) => {
      setCategory(res.data)
    })

  }, []);
  // React.ChangeEvent<HTMLInputElement> | React.FormEventHandler<HTMLOptionElement>
  const handleChange = (e:any) => {

    setQuestions({ ...questions, [e.target.name]: e.target.value })
  }
  const clickHandler = () => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      const update = event.target as HTMLElement;
      setcurrentCategory(update.id);
    };
  };
  const clearHandler = () => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      setcurrentCategory("");
    };
  };
  const convertBase64 = (file:any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = (() => {
        resolve(fileReader.result)
      })

      fileReader.onerror = ((error) => {
        reject(error);
      })
    })
  }
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0]

      const base64 = await convertBase64(file)
      setQuestions({ ...questions, "img": base64 })
  }

  const handleSubmit = (e:any):void => {
    e.preventDefault();

    setAddNewToggle(!addNewToggle)
    axios.post('http://localhost:8000/api/create/question',
    JSON.stringify(questions),{headers:{"Content-Type" : "application/json"},withCredentials: true})
      .then((res) => {
        //console.log(res);
      })
      .catch((err) => {
        //console.log(err);

        setError(true)
      });
  }
  const renderList = (): JSX.Element[] => {
    return data.map((data, index) => {
      return (
          <div key={index} className={styles.category_card} id={data.category} onClick={clickHandler()}>
            <span id={data.category} >Questions: {data.questions.length}</span>
            <img src={data.img} id={data.category} />
            <p id={data.category} >{data.category}</p>
          </div>
      );
    });
  };
  const passSpecificCategory = data.filter(
    (obj) => obj.category === currentCategory
  );

  return (
    <>
    <div>
      {!currentCategory ? (
        <>
          <h1>Categories</h1>
          <div className={styles.category_container}>
            {ctx ? ctx.isAdmin ?<div className={styles.category_card} onClick={() => {setAddNewToggle(!addNewToggle)}}>Add new question <img src={addIcon} alt="add"/></div> : null : null }
            {renderList()}
          </div>
        </>
      ) : (
        <>
          <span id={styles.back} onClick={clearHandler()}>
            Back
          </span>
          <Card passSpecificCategory={passSpecificCategory} />
        </>
      )}
    </div>
    {addNewToggle ?
    <>
    <div className={styles.blur} onClick={() => {setAddNewToggle(!addNewToggle)}}></div>
    <form className={styles.form} onSubmit={handleSubmit}>
      <span onClick={() => {setAddNewToggle(!addNewToggle)}}>X</span>
      <label htmlFor="category">Category</label>
      <select onChange={e => handleChange(e)} name="selectcategory" id="selectcategory">
      <option id="select category" onChange={handleChange}>Select category:</option>
        {
          category.map((item : any) => {
            return (
              <option key={item.category} value={item.category}>{item.category}</option>
            )
          })
        }
      </select>
      <input
      type="text"
      onChange={handleChange}
      name="category"
      />
      <label htmlFor="questionName">Question Name</label>
      <input
      type="text"
      onChange={handleChange}
      name="questionName"
      />
      <label htmlFor="questionName">A</label>
      <input
      type="text"
      onChange={handleChange}
      name="A"

      />
      <label htmlFor="B">B</label>
      <input
      type="text"
      onChange={handleChange}
      name="B"

      />
      <label htmlFor="C">C</label>
      <input
      type="text"
      onChange={handleChange}
      name="C"

      />
      <label htmlFor="D">D</label>
      <input
      type="text"
      onChange={handleChange}
      name="D"
      />
      <label htmlFor="correctAnswer">correctAnswer</label>
      <input
      type="text"
      onChange={handleChange}
      name="correctAnswer"
      />
      <input className="input-file" type="file" name="img" id="upload-photo" onChange={uploadImage} />
      <input type="submit" value="Dodaj pytanie"/>
    </form>
    </> : null
    }
    </>
  );
};

export default ListCategory;
