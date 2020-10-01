import React, { Component, Fragment } from 'react'
import {
  Row,
  Col,
  Card,
  Table,
  Divider
} from 'antd'
import { connect } from 'react-redux'
import { getListGenre } from '../redux/action'

class HomePage extends Component {
  componentDidMount() {
    this.props.getListGenre()
  }

  render() {
    const { listGenre } = this.props

    let i = 1
    let newGenre = listGenre && listGenre.map(val => {
      val.no = i++
      return val
    })

    const columns = [
      {
        title: 'No',
        dataIndex: 'no'
      },
      {
        title: 'Genre',
        dataIndex: 'name'
      }
    ]

    return (
      <Fragment>
        <Row style={{ marginTop: '20px' }}>
          <Col span={2} />
          <Col span={6}>
            <Row>
              <Card title="List Genres">
                <Table
                  rowKey="id"
                  className="table-master"
                  bordered={false}
                  columns={columns}
                  dataSource={newGenre || []}
                  pagination={false}
                />
              </Card>
            </Row>
          </Col>
          <Col span={12}>
            <Card title="List Genres">
              {listGenre && listGenre.map(val => {
                return (
                  <Card.Grid
                    key={val.id}
                    style={{ width: '25%', textAlign: 'center' }}
                  >
                    {val.name}
                  </Card.Grid>
                )
              })}
            </Card>
          </Col>
          <Col span={2} />
        </Row>

        <Divider />
      </Fragment>
    )
  }
}

const reduxState = state => ({
  listGenre: state.listGenre
})

const reduxDispatch = dispatch => ({
  getListGenre: () => dispatch(getListGenre()),
})

export default connect(reduxState, reduxDispatch)(HomePage)