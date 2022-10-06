import { categoryProdctsList } from '../../helpers/interfaces'
import Card from 'react-bootstrap/Card';
const CategoryList = (props: categoryProdctsList) => {
    const {title,price,description,images} = props
    return (
        <>
            <Card style={{ width: '18rem' }} className='card-container'>
                <Card.Title>{title}</Card.Title>
                <Card.Img variant="top" src={images[0]} style={{ width: '18rem' }} />
                <Card.Body>
                    <Card.Text>{description} </Card.Text>
                    <Card.Text>{price}$</Card.Text>
                </Card.Body>

            </Card>
        </>
    )
}
export default CategoryList;