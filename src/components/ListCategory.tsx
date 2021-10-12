import { FC, useState } from "react";
import { IState as Props } from "../App";
import styles from "./ListCategory.module.css";
import Card from "./Card";

interface IProps {
  setData: React.Dispatch<React.SetStateAction<Props["data"]>>;
  data: Props["data"];
}

const ListCategory: FC<IProps> = ({ data }) => {
  const [currentCategory, setcurrentCategory] = useState("");

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

  const renderList = (): JSX.Element[] => {
    return data.map((data, index) => {
      return (
          <div key={index} className={styles.category_card} id={data.category} onClick={clickHandler()}>
            <span id={data.category} >Questions: {data.numberOfQuestions}</span>
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
    <div>
      {!currentCategory ? (
        <>
          <h1>Categories</h1>
          <div className={styles.category_container}>{renderList()}</div>
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
  );
};

export default ListCategory;
