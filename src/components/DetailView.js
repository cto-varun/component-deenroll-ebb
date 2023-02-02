import React from 'react';

export default function DetailView({
    firstName,
    lastName,
    last4ssn,
    phoneNumber,
    middleName,
    tribalId,
    nladSubscriberId,
}) {
    const renderValue = (value, label) => {
        return value ? (
            <div className="detail-view-container">
                <div className="detail-view-heading">{label}</div>
                <div className="detail-view-data">: {value}</div>
            </div>
        ) : (
            <></>
        );
    };
    return (
        <div className="padding-container">
            <div className="detail-view-main">
                {renderValue(firstName, 'First Name')}
                {renderValue(phoneNumber, 'Phone Number')}
            </div>
            <div className="detail-view-main">
                {renderValue(lastName, 'Last Name')}
                {renderValue(nladSubscriberId, 'Subscriber Id')}
            </div>
            <div className="detail-view-main">
                {renderValue(middleName, 'Middle Name')}
            </div>
        </div>
    );
}
