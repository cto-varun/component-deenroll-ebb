import React from 'react';
import { Button, Space, Typography } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const { Text } = Typography;

export default function CTNLookup({ referenceId, programType }) {
    return (
        <>
            <Space className="lookup-description-container padding-container">
                <Space direction="vertical">
                    <Text>
                        Customer is enrolled in the {programType.toUpperCase()}{' '}
                        Program.
                    </Text>
                    <Space>
                        <Text>Reference ID :</Text>
                        <Paragraph style={{ marginBottom: 0 }} copyable>
                            <Text type="success" style={{ fontWeight: 'bold' }}>
                                {referenceId}{' '}
                            </Text>
                        </Paragraph>
                    </Space>
                </Space>
                {/* <Space>
                    <Button type="primary">Create Case</Button>
                </Space> */}
            </Space>
        </>
    );
}
