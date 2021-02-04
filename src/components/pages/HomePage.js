import React, {Component} from 'react';
import { Row, Col, Divider, InputNumber, Typography, Checkbox, Button, message } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons'

const { Title } = Typography;


class HomePage extends Component {
    constructor() {
        super();

        this.state = {
            fields: [
                {
                    id: 1,
                    value: 0,
                    used: true
                },
                {
                    id: 2,
                    value: 0,
                    used: true
                },
                {
                    id: 3,
                    value: 0,
                    used: true
                }
            ],
            result: 0
        }

        this.handleFieldPropertyChange = this.handleFieldPropertyChange.bind(this)
        this._renderField = this._renderField.bind(this)
        this.calculate = this.calculate.bind(this)
    }

    handleFieldPropertyChange(property, value, fieldId) {
        let fields = this.state.fields

        const fieldIndex = this.state.fields.findIndex(item => item.id === fieldId)

        fields[fieldIndex] = {
            ...fields[fieldIndex],
            [property]: value
        }

        this.setState({
            fields
        })
    }

    _renderField(fieldId) {
        const field = this.state.fields.find(item => item.id === fieldId)
        return (
            <Row gutter={[15, 0]} style={{
                marginTop: 15
            }} key={fieldId}>
                <Col span={16}>
                    <InputNumber defaultValue={0} value={field.value} disabled={field.used === false} decimal={false} style={{
                        width: '100%'
                    }} onChange={value => {
                        this.handleFieldPropertyChange('value', value, fieldId)
                    }} />
                </Col>
                <Col span={8} style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Checkbox checked={field.used} onChange={e => {
                        this.handleFieldPropertyChange('used', e.target.checked, fieldId)
                    }}>Use this field</Checkbox>
                </Col>
            </Row>
        )
    }

    calculate(type) {
        const countUsedFields = this.state.fields.filter(item => item.used === true)

        if (countUsedFields.length < 2) {
            message.error("There must be 2 field's to use")
        } else {
            let result = 0
            const fields = this.state.fields

            fields.forEach((item, index) => {
                if (item.used) {
                    switch (type) {
                        case 'tambah':
                            result += item.value
                            break;

                        case 'kurang':
                            result -= item.value
                            break;

                        case 'kali':
                            result = index ? result * item.value : item.value
                            break;

                        case 'bagi':
                            result = index ? result / item.value : item.value
                            break;
                    }
                }
            })

            this.setState({
                result
            })
        }
    }

    render() {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    width: '35vw',
                    padding: 15,
                    borderRadius: 5
                }}>
                    <Row>
                        <Col span={24}>
                            <Title level={3} className="text-center">Calculator by Ichsan Aditya</Title>
                        </Col>
                    </Row>
                    {this.state.fields.map(item => this._renderField(item.id))}
                    <Row gutter={[15, 0]} style={{
                        marginTop: 15
                    }}>
                        <Col span={6}>
                            <Button icon={<PlusOutlined />} style={{
                                width: '100%'
                            }} onClick={() => {
                                this.calculate('tambah')
                            }} />
                        </Col>
                        <Col span={6}>
                            <Button icon={<MinusOutlined />} style={{
                                width: '100%'
                            }} onClick={() => {
                                this.calculate('kurang')
                            }} />
                        </Col>
                        <Col span={6}>
                            <Button icon={<CloseOutlined />} style={{
                                width: '100%'
                            }} onClick={() => {
                                this.calculate('kali')
                            }} />
                        </Col>
                        <Col span={6}>
                            <Button style={{
                                width: '100%',
                                fontWeight: 'bold'
                            }} onClick={() => {
                                this.calculate('bagi')
                            }} >/</Button>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24}>
                            <Title level={4} className="text-center">Result</Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Title level={4} className="text-center">{this.state.result}</Title>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default HomePage;
