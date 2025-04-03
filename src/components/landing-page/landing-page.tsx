import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import './landing-page.css';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([
    { id: 1, name: 'Personal Information', status: 'pending' },
    { id: 2, name: 'Confidentiality Agreement', status: 'completed' },
    { id: 3, name: 'W-4 Withholding', status: 'completed' },
    { id: 4, name: 'Digital Signature Consent', status: 'completed' },
    { id: 5, name: 'Background Check Authorization', status: 'completed' },
    { id: 6, name: 'I-9 Employment Eligibility', status: 'completed' },
    { id: 7, name: 'Drivers License', status: 'completed' },
    { id: 8, name: 'Auto Insurance', status: 'completed' },
    { id: 9, name: 'Borrowed Vacation Consent', status: 'completed' },
    { id: 10, name: 'Offer Letter', status: 'pending' },
    { id: 11, name: 'Social Security Card', status: 'pending' },
    { id: 12, name: 'Job Description', status: 'pending' },
    { id: 13, name: 'Direct Deposit', status: 'pending' },
  ]);
  const getCurrentDate = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleCardClick = (id: number) => {
    localStorage.setItem('idTask',id.toString());

    if(id==1){
      navigate('/personal-information');
    }
    else if(id==3){
      navigate('/w4-withholding');
    }
    else if(id==4){
      navigate('/digital-signature');
    }
    else if(id==2||id==5||id==9){
      navigate('/confirm');
      if(id==2) localStorage.setItem('tittleTemp','Confidentiality Agrement');
      if(id==5) localStorage.setItem('tittleTemp','Background Check');
      if(id==9) localStorage.setItem('tittleTemp','Borrowed Vacation Consent');
    }

  };
  useEffect(() => {
  }, []);


  return (
    <div className='module'>
      <Row className="d-flex flex-column align-items-center">
      <Row className="mt-2 d-flex flex-column align-items-center">
        <Col xs={12} className="d-flex justify-content-between align-items-center flex-column">
          <h1 className="mb-4 title">New Hire Checklist</h1>
          <h4 className="mb-2">Please Complete all items by:</h4>
          <h4 className="mb-2 red-text">February 15, 2025</h4>
        </Col>
      </Row>
      </Row>
      <Row className="g-4 divList">
        {activities.map((activity) => (
          <Col xs={12} md={4} key={activity.id} className='divItem' >
            <Card
              className={`activity-card ${activity.status}`}
              style={{
                backgroundColor:
                  activity.status === 'completed' ? 'white' : 'white',
                  color: activity.status === 'completed' ? '#000000' : '#000000',
              }}
              onClick={() => handleCardClick(activity.id)} 
            >
              <Card.Body>
               <div className="status-icon-container">
                    {activity.status === 'completed' ? (
                      <FaCheckCircle className="status-icon-ok" />
                    ) : (
                      <FaCheckCircle className="status-icon-warning" />
                    )}
                  </div>
                <div className="activity-header">
                  <h5>{activity.name}</h5>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    </div>

  );
};

export default LandingPage;
