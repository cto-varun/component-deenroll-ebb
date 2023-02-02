import './styles.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MessageBus } from '@ivoyant/component-message-bus';
import { Divider, Button, Form, Select, Input } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import CTNLookup from './CTNLookup';
import DetailView from './DetailView';
import Heading from './Heading';

import './styles.css';

function DeEnroll({ properties, data, datasources }) {
    const { ebbBenefit, ebbData } = data?.data;
    const history = useHistory();
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [confirmation, setConfirmation] = useState(false);

    const {
        workflow,
        datasource,
        successStates,
        errorStates,
        responseMapping,
    } = properties;

    const handleChange = (value, name) => [
        setValues({ ...values, [name]: value }),
    ];

    const onFinish = () => {
        setLoading(true);
        const requestBody = {
            identifier: ebbData?.identifier,
            associations: [
                {
                    type: 'BroadbandBenefit',
                    id: ebbBenefit?.id,
                    repId: values?.radId,
                    reason: values?.reason,
                    transactionType: 'deEnroll'.concat(values?.reason),
                },
            ],
        };
        const submitEvent = 'SUBMIT';
        MessageBus.send('WF.'.concat(workflow).concat('.INIT'), {
            header: {
                registrationId: workflow,
                workflow: workflow,
                eventType: 'INIT',
            },
        });
        MessageBus.subscribe(
            workflow,
            'WF.'.concat(workflow).concat('.STATE.CHANGE'),
            handleResponse('test')
        );
        MessageBus.send(
            'WF.'.concat(workflow).concat('.').concat(submitEvent),
            {
                header: {
                    registrationId: workflow,
                    workflow: workflow,
                    eventType: submitEvent,
                },
                body: {
                    datasource: datasources[datasource],
                    request: {
                        body: requestBody,
                    },
                    responseMapping,
                },
            }
        );
    };

    const handleResponse = (value) => (
        subscriptionId,
        topic,
        eventData,
        closure
    ) => {
        const state = eventData.value;
        const isSuccess = successStates.includes(state);
        const isFailure = errorStates.includes(state);
        if (isSuccess || isFailure) {
            if (isSuccess) {
                setConfirmation(true);
                setTimeout(() => {
                    history.push('/dashboards/manage-account');
                }, 2000);
            }
            setLoading(false);
            MessageBus.unsubscribe(subscriptionId);
        }
    };

    const [programType, setProgramType] = useState('');
    const cohorts =
        ebbData?.cohorts?.length > 0 &&
        ebbData?.cohorts.map((e) => e.toUpperCase());

    useEffect(() => {
        if (cohorts.length > 0 && cohorts.includes('ACP')) {
            setProgramType('acp');
        } else if (cohorts.length > 0 && cohorts.includes('EBB')) {
            setProgramType('ebb');
        }
    }, [cohorts]);

    return (
        <div style={{ padding: '1rem' }}>
            <Heading
                level={4}
                title="ACP Program De-Enrollment"
                contentClassName="padding-container"
            />
            <CTNLookup
                referenceId={ebbBenefit?.id}
                programType={programType}
                // ctnlookupFormParams={ctnlookupFormParapms}
                // parentProps={parentProps}
            />
            <Divider
                dashed
                style={{
                    borderColor: '#333',
                }}
            />
            <DetailView
                firstName={ebbData?.firstName}
                lastName={ebbData?.lastName}
                phoneNumber={ebbBenefit?.id}
                last4ssn={ebbData?.last4ssn}
                tribalId={ebbData?.tribalId}
                nladSubscriberId={ebbBenefit?.nladSubscriberId}
            />
            <div className="de-enrollment-form-container">
                <Form
                    layout="vertical"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="reason"
                        label="Reason"
                        placeholder="Select a Reason"
                        className="de-enroll-field"
                        rules={[
                            { required: true, message: 'Reason is Required' },
                        ]}
                    >
                        <Select
                            options={[
                                { value: 'Deceased' },
                                { value: 'Leaving' },
                            ]}
                            placeholder="Select a reason"
                            onChange={(value) => handleChange(value, 'reason')}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Rad Id"
                        name="radId"
                        className="de-enroll-field"
                        placeholder="Ex: H2324344"
                        rules={[
                            {
                                required: true,
                                message: 'Rad Id is Required',
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) =>
                                handleChange(e.target.value, 'radId')
                            }
                            placeholder="Ex: H2324344"
                        />
                    </Form.Item>
                    <Divider />
                    {!confirmation && values?.radId ? (
                        <>
                            <Form.Item wrapperCol={{ span: 16 }}>
                                <div>Do you want to De-Enroll from ACP?</div>
                                <div>
                                    De-Enrolling this CTN from the ACP program
                                    will make you ineligible for ACP benefits.
                                </div>
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 16 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    DE-ENROLL
                                </Button>
                            </Form.Item>
                        </>
                    ) : confirmation ? (
                        <div className="success-message">
                            <CheckCircleOutlined
                                twoToneColor="#52c41a"
                                className="success-icon"
                            />
                            CTN {ebbBenefit?.id} has been successfully
                            De-Enrolled
                        </div>
                    ) : (
                        <></>
                    )}
                </Form>
            </div>
        </div>
    );
}

export default DeEnroll;
