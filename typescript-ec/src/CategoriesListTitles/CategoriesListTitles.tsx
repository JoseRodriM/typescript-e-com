// import { categoryTypes } from '../helpers/interfaces';
export interface categoryTypes {
    id: number,
    name: string,
    image: string,
    getCategory: Function
}
const CategoriesListTitles = (props: categoryTypes) => {
    const {name, id, getCategory} = props
    return (
        <>
            <button onClick={() => getCategory(id)}>{name}</button>
        </>
    )
}
export default CategoriesListTitles;