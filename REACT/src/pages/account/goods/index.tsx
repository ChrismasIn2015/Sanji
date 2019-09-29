import {
  Button,
  Card,
  InputNumber,
  Form,
  Table,
  Row,
  Input,
  Divider,
  Icon,
  Modal,
  Upload,
  Badge,
} from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import { Dispatch } from 'redux';
import { StateType } from './model';
import { listStateType } from './data.d'
import BraftEditor from 'braft-editor' // 富文本使用步骤1：引入编辑器组件
import 'braft-editor/dist/index.css' // 富文本使用步骤1：引入编辑器样式


/* ****************************数据准备开始**************************** */

interface listTypeProps { // 定义继承下来的数据Component的 数据结构
  goodsList: StateType; // Component 中含有goodsList: { list:[] }
  dispatch: Dispatch<any>;
  loading: boolean;
}

  // p003-2 表格的标题
type IStatusMapType = 'error' | 'success';
const statusMap = ['error', 'success'];
const status = ['已下架', '上架中'];
const columns = [
  { title: '编号', dataIndex: 'goodsId' },
  {
    title: '商品名称', dataIndex: 'goodsName',
    render: text => ( <span><a>{text}</a></span> ), // 可以单击的一列
  },
  { title: '进货单价', dataIndex: 'purchasePrice' },
  { title: '出货单价', dataIndex: 'offerPrice' },
  { title: '数量', dataIndex: 'goodsCount' },
  { title: '规格', dataIndex: 'goodsNorms' },
  { title: '状态', dataIndex: 'status',
    filters: [
      // {
      //   text: status[0],
      //   value: 0,
      // },
      // {
      //   text: status[1],
      //   value: 1,
      // },
    ],
    render(val: IStatusMapType) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    },
  },
  { title: '创建时间', dataIndex: 'createdAt' },
  { title: '最新上架时间', dataIndex: 'updatedAt' },
  {
    title: '操作',
    dataIndex: 'actions',  // 功能按钮的一列
    render: () => (
      <span>
        <a>下架</a><Divider type="vertical" /><a>编辑</a><Divider type="vertical" /><a>删除</a>
      </span>
    ),
  },
];

@connect( // 作用未知
  ({
    goodsList,
    loading,
  }: {
    goodsList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    goodsList,
    loading: loading.models.reports,
  }),
)

/* ****************************数据准备结束**************************** */

class GoodsList extends Component<listTypeProps> {

  state = { 
    visible: false, // 控制新建按钮的弹窗
    loadding: this.props,
    editorState: BraftEditor.createEditorState(null), // 富文本使用步骤2：封装富文本插件的数据/格式
  };

  componentDidMount() { // p003-2 React生命周期 用于获取表格的内容 dataSource
    const { dispatch } = this.props; // Component 中含有 dsipatch 方法
    dispatch(
      { type: 'goodsList/fetchReports', } // 通过dispatch
    );
  }

  render() {
    const { goodsList, loading } = this.props; // Component 中含有goodsList: { list:[] }
    const { list } = goodsList;

    // 1.如果 status 为1 则为上架中/ 否则则为已下架
    // list.forEach(element => {
    //   Number(element.status) === 1 ? element.status = '<Badge color="#87d068" text="#87d068" />上架中' : '<Badge color="#f50" text="#f50" />上架中'
    // });

    const formElement = { // p003-1-2 用于 新建商品 时的弹窗的布局
      formItemLayout: {
        labelCol: { xs: { span: 24 }, sm: { span: 8 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
      },
    };

    const { getFieldDecorator } = this.props.form; // 用于产生表单校验

    return (
      // p002 编写React架构
      <PageHeaderWrapper>
        <Card>
          {/* p003-1 上方新建/搜索框 */}
          <Row type="flex" justify="space-between" className={styles.marginB}>
            {/* p003-1-1:新建一条商品记录 */}
            <Form layout="inline">
              <Form.Item>
                <Button type="primary" onClick={this.showModal}>
                  <Icon type="plus" />
                  新建
                </Button>
              </Form.Item>
            </Form>
            {/* p003-1-2:新建一条商品记录弹窗: 校验规则还没写好 */}
            <Modal visible={this.state.visible} title="创建新商品" onCancel={this.modalCancel}>
              <Form {...formElement.formItemLayout}>
                <Form.Item label="商品名称：">
                  {getFieldDecorator('goodsName', {
                    rules: [
                      { required: true, message: '请输入商品名称！' },
                      { whitespace: true, message: '不允许空格！' },
                      { min: 1, max: 32, message: '最大长度32个字符！' },
                    ],
                  })(<Input placeholder="比如：娃哈哈果粒奶优" />)}
                </Form.Item>
                <Form.Item label="规格：">
                  {getFieldDecorator('goodsNorms', {
                    rules: [
                      { required: true, message: '请输入规格！' },
                      { whitespace: true, message: '不允许空格！' },
                      { min: 1, max: 8, message: '最大长度8个字符！' },
                    ],
                  })(<Input placeholder="比如：箱/瓶/100ml" />)}{' '}
                </Form.Item>
                <Form.Item label="进货单价：">
                  {' '}
                  {getFieldDecorator('purchasePrice', {
                    rules: [
                      { required: true, message: '请输入进货单价！' },
                      { whitespace: true, message: '不允许空格！' },
                      { pattern: new RegExp('^-?[0-9]+(.[0-9]+)?$', 'g'), message: '请输入数字！' },
                      { min: 1, max: 7, message: '最大长度9999！' },
                    ],
                  })(<Input placeholder="支持小数点后2位" suffix="元" />)}
                </Form.Item>
                <Form.Item label="出货单价：">
                  {' '}
                  {getFieldDecorator('offerPrice', {
                    rules: [
                      { required: true, message: '请输入进货单价！' },
                      { whitespace: true, message: '不允许空格！' },
                      { pattern: new RegExp('^-?[0-9]+(.[0-9]+)?$', 'g'), message: '请输入数字！' },
                      { min: 1, max: 7, message: '最大长度9999！' },
                    ],
                  })(<Input placeholder="支持小数点后2位" suffix="元" />)}
                </Form.Item>
                <Form.Item label="库存：">
                  {getFieldDecorator('goodsCount', {
                    rules: [
                      { required: true, message: '请输入库存！' },
                      { pattern: new RegExp('^-?[0-9]+(.[0-9]+)?$', 'g'), message: '请输入数字！' },
                    ],
                  })(<InputNumber placeholder="库存" />)}
                </Form.Item>
                <Form.Item label="商品排序：">
                  {getFieldDecorator('goodsOrder', {
                    rules: [
                      { required: true, message: '数字1为最前！' },
                      { pattern: new RegExp('^-?[0-9]+(.[0-9]+)?$', 'g'), message: '请输入数字！' },
                    ],
                  })(<InputNumber />)}
                </Form.Item>
                <Form.Item label="Upload" extra="支持扩展名.jpg .png">
                  {getFieldDecorator('upload', {
                    valuePropName: 'fileList',
                    getValueFromEvent: e => {
                      console.log('Upload event:', e);
                      if (Array.isArray(e)) {
                        return e;
                      }
                      return e && e.fileList;
                    },
                  })(
                    <Upload name="logo" action="/upload.do" listType="picture">
                      <Button>
                        <Icon type="upload" /> 上传文件
                      </Button>
                    </Upload>,
                  )}
                </Form.Item>
                <Form.Item label="商品描述：">
                  <Input placeholder="输入商品描述" />
                </Form.Item>
                <Form.Item label='更多详情：'>
                  <div className="my-component">
                    <BraftEditor // 富文本使用步骤3：引入这个div
                        value={this.state.editorState} // 数据
                        controls={['media']} // 可以添加的格式
                        // onChange={this.handleEditorChange}
                        // onSave={this.submitContent}
                    />
                  </div>
                </Form.Item>
              </Form>
            </Modal>
            {/* p003-1-3:搜索框 */}
            <Form layout="inline">
              <Form.Item>
                <Input placeholder="输入商品名称搜索" />
              </Form.Item>
              <Form.Item>
                <Button type="primary">查询</Button>
              </Form.Item>
              <Form.Item>
                <Button>重置</Button>
              </Form.Item>
            </Form>
          </Row>
          {/* p003-2 下方商品表格 */}
          <Table
            dataSource={list} // 数据源
            columns={columns} // 表头
            loading={loading} // 加载动画
          />
        </Card>
      </PageHeaderWrapper>
    );
  }

  /* -------------------------------处理list---------------------------------------- */
  // filterLists (list) => {
  //   
  //   return temp
  // }
  /* -------------------------------弹窗---------------------------------------- */
  /* -------------------------------弹窗---------------------------------------- */
  /* -------------------------------弹窗---------------------------------------- */
  /* -------------------------------弹窗---------------------------------------- */
  /* -------------------------------弹窗---------------------------------------- */

  showModal = () => { // p003-1-2 新建商品 开启弹窗
    this.setState({ visible: true }); // setState是自带的 修改class.state的方法
  };

  modalCancel = () => { // p003-1-2 用于 新建商品 时的弹窗控制
    this.setState({ visible: false }); // setState是自带的 修改class.state的方法
  };
}
// p001 开始搭建页面 // 使用 Form.create 处理后的表单具有自动收集数据并校验的功能
export default Form.create()(GoodsList);
