import { Card, List, Modal } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';

import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from './model';
import { ReportType } from './data.d'
import styles from './style.less';

interface ReportListProps {
  reportList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface ReportListState {
  visible: boolean;
  done: boolean;
  current?: ReportType;
}

@connect(
  ({
    reportList,
    loading,
  }: {
    reportList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    reportList,
    loading: loading.models.reports,
  }),
)
class ReportList extends Component<ReportListProps, ReportListState> {
  state: ReportListState = { visible: false, done: false, current: undefined };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'reportList/fetchReports',
      payload: {
        limit: 50,
        skip: 0,
      },
    });
  }

  showEditModal = (item: ReportType) => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  parseException = (exception: any) => {
    const Exception = JSON.parse(JSON.stringify(exception))
    let res
    const exceptionName = Exception.name
    if (exceptionName && exceptionName.indexOf('jpush.receiveMessage') > -1) {
      res = Exception.name + Exception.arguments.message.substring(0, 100)
    } else {
      res = Exception.name
    }
    return res
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { reportList: { list }, loading } = this.props;

    const { visible, done, current = {} } = this.state;

    const getModalContent = () => JSON.stringify(this.state.current)

    const modalFooter = { okText: '确定', onOk: this.handleCancel, onCancel: this.handleCancel };

    const ListContent = ({
      data: { phone, createdAt, version },
    }: {
      data: ReportType;
    }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>手机号码</span>
          <p>{phone}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>记录时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>prod: {version.prod}</span>
          <p>dev: {version.dev}</p>
        </div>
        <div>
        </div>
      </div>
    );

    return (
      <>
      <PageHeaderWrapper>
          <div className={styles.standardList}>
            <Card
              bordered={false}
              title="基本列表"
              style={{ marginTop: 24 }}
              bodyStyle={{ padding: '0 32px 40px 32px' }}
            >
              <List
                size="large"
                rowKey="_id"
                loading={loading}
                dataSource={list}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <a
                        key="edit"
                        onClick={e => {
                          e.preventDefault();
                          this.showEditModal(item);
                        }}
                      >
                        查看
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      title={item.module}
                      description={this.parseException(item.exception)}
                    />
                    <ListContent data={item} />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </PageHeaderWrapper>
        <Modal
          title="详情"
          className={styles.standardListForm}
          width={640}
          bodyStyle={{ padding: '28px 20px' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </>
    );
  }
}

export default ReportList;
