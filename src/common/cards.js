import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
const IMG_URL = "../asset/images/product_images/"
export const CardExampleCard = () => (
  <Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
)

export const ProductCard = (props) => (
  <Card>
    <Image src={`${IMG_URL}/${props.item.thumbnail}`}  wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.item.name}</Card.Header>
      <Card.Meta> ${props.item.price}</Card.Meta>

    </Card.Content>
    <Card.Content>
        <div className='ui one buttons'>
          <Link to={`/product/${props.item.product_id}`}><Button basic color='green'>
            +
          </Button>
          </Link>
        </div>
    </Card.Content>
  </Card>
)
export const CardExampleImageCard = () => (
  <Card>
    <Image src='../asset/images/product_images/a-partridge-in-a-pear-tree-2.gif'  wrapped ui={false} />
    <Card.Content>
      <Card.Header>Daniel</Card.Header>
      <Card.Meta> $45.32</Card.Meta>

    </Card.Content>
    <Card.Content>
        <div className='ui one buttons'>
          <Button basic color='green'>
            View more
          </Button>

        </div>
    </Card.Content>
  </Card>
)

