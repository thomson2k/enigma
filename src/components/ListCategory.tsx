import { FC, useState } from "react";
import { IState as Props } from "../App";
import styles from "./ListCategory.module.css";
import Card from "./Card";

interface IProps {
    setData: React.Dispatch<React.SetStateAction<Props["data"]>>
    data: Props["data"]
}

const ListCategory: FC<IProps> = ({ data }) => {
    const [currentCategory, setcurrentCategory] = useState("")

    const clickHandler = () => {
        return (event: React.MouseEvent) => {
            event.preventDefault();
            const update = event.target as HTMLElement;
            setcurrentCategory(update.innerText)
        }
    }
    const clearHandler = () => {
        return (event: React.MouseEvent) => {
            event.preventDefault();
            setcurrentCategory("")
        }
    }
    const renderList = (): JSX.Element[] => {
        return data.map((data, index) => {
            return (
                <div key={index} className={styles.category_card} >
                    <span>Questions: {data.numberOfQuestions}</span>
                    <img src={data.img} />
                    <p onClick={clickHandler()}>{data.category}</p>
                </div>
            )
        })
    }
    const passSpecificCategory = data.filter(obj => obj.category === currentCategory);
    return (
        <div>
            {!currentCategory ?
                <>
                    <h1>Categories</h1>
                    <div className={styles.category_container}>{renderList()}</div>
                </> :
                <>
                    <h1 onClick={clearHandler()}>Back</h1>
                    <Card passSpecificCategory={passSpecificCategory}/>
                </>
            }
        </div>

    )
}



export default ListCategory;