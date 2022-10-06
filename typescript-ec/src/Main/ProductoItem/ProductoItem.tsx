import Card from 'react-bootstrap/Card';
import { productsType } from '../../helpers/interfaces';

const Productos = (props: productsType) => {
    const { category, description, images, price, title } = props
    return (
        <>
            <Card style={{ width: '18rem' }} className='card-container'>
                <Card.Title>{title}</Card.Title>
                <Card.Img variant="top" src={images[0]} style={{ width: '18rem' }} />
                <Card.Body>
                    <Card.Text>{description} </Card.Text>
                    <Card.Text>{category[1]}</Card.Text>
                    <Card.Text>{price}$</Card.Text>
                </Card.Body>

            </Card>
        </>
    )
}
export default Productos;

