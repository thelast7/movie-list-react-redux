import React, { Component, Fragment } from 'react'
import { Row, Col, Card, Table, Divider, Image } from 'antd'
import { connect } from 'react-redux'
import { getListMovies, getDetailMovie } from '../redux/action'
import { EyeFilled } from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal'

class MoviePage extends Component {
  state = {
    pagination: {
      pageSizeOptions: [ 20 ],
      current: 1,
      pageSize: 20,
      total: 0
    },
    modal: false
  }

  componentDidMount() {
    this.fetchedDataFromServer()
  }

  fetchedDataFromServer = async (params) => {
    let newParams = {
      page: this.state.pagination.current,
      ...params
    }
    await this.props.getListMovies(newParams)
    const newPagination = { ...this.state.pagination }
    newPagination['total'] = this.props.listMovie.total_results
    newPagination['current'] = newParams.page
    this.setState({
      pagination: newPagination
    })
  }

  handleTableChange = params => {
    this.fetchedDataFromServer({
      page: params.current
    }, params)
  }

  getDataById = async (id) => {
    this.setState({ modal: true })
    await this.props.getDetailMovie(id)
  }

  render() {
    const { Meta } = Card

    const { listMovie, movieDetail } = this.props

    const columns = [
      {
        title: 'Title',
        dataIndex: 'title'
      },
      {
        title: 'Release Date',
        dataIndex: 'release_date'
      },
      {
        title: 'Original Title',
        dataIndex: 'original_title'
      },
      {
        title: 'Rating',
        dataIndex: 'vote_average'
      },
      {
        title: 'Popularity',
        dataIndex: 'popularity'
      },
      {
        fixed: 'right',
        dataIndex: 'id',
        render: id => {
          return (
            <EyeFilled
              onClick={() => this.getDataById(id)}              
            />
          )
        },
      }
    ]

    return (
      <Fragment>
        <Modal
          title={<h1>Detail Movie</h1>}
          width="80%"
          footer={null}
          visible={this.state.modal}
          onCancel={() => this.setState({ modal: false })}
        >
          <Row gutter={16}>
            <Col span={10}>
              <Card
                hoverable
                style={{ width: '100%', height: 'auto' }}
                cover={<img alt={movieDetail.title} src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`} />}
              >
                <Meta title={movieDetail.title} description={movieDetail.homepage} />
              </Card>
            </Col>
            <Col span={14}>
              <Card
                title={movieDetail.title}
                bordered={false}
              >
                <Row gutter={16} style={{ display: 'flex' }}>
                  <Col span={20}>
                    {movieDetail && movieDetail.genres && movieDetail.genres.map(val => {
                      return (
                        <Card.Grid
                          key={val.id}
                          style={{ width: '25%', textAlign: 'center' }}
                        >
                          {val.name}
                        </Card.Grid>
                      )
                    })}
                  </Col>
                </Row>

                <Divider />

                <Row gutter={16}>
                  <Col span={24}>
                    {movieDetail.overview}
                  </Col>
                </Row>

                <Divider />

                <Row gutter={16}>
                  <Image
                    width={200}
                    src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
                  />
                </Row>
              </Card>
            </Col>
          </Row>
        </Modal>
        <Row style={{ marginTop: '20px' }}>
          <Col span={2} />
          <Col span={20}>
            <Table
              rowKey="id"
              className="table-master"
              scroll={{ x: 'max-content' }}
              bordered={false}
              columns={columns}
              dataSource={listMovie.results || []}
              pagination={this.state.pagination}
              onChange={e => this.handleTableChange(e)}
            />
          </Col>
          <Col span={2} />
        </Row>
      </Fragment>
    )
  }
}

const reduxState = state => ({
  listMovie: state.listMovie,
  movieDetail: state.movieDetail
})

const reduxDispatch = dispatch => ({
  getListMovies: data => dispatch(getListMovies(data)),
  getDetailMovie: id => dispatch(getDetailMovie(id))
})

export default connect(reduxState, reduxDispatch)(MoviePage)