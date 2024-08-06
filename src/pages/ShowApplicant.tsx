import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "../component/Modal";
import backIcon from "../asset/backIcon.png";
import forwardIcon from "../asset/forwardIcon.png";

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Applicant = styled.div<{ isSelected: boolean }>`
    background: ${props => (props.isSelected ? '#F5C001' : '#575757')};
    height: 60px;
    width: 80%;
    border-radius: 10px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    padding-right: 10px;
    font-size: 18px;
    justify-content: space-between;
`

const CustomButton = styled.button`
    width: 49%;
    height: 50px;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: bold;
    background: #302E34;
    color: white;
`

const ShowApplicant = () => {
    const navigate = useNavigate();

    const goBackDetailPage = () => {
        navigate('/detail');
    }

    // 지원현황에서 각각의 지원자에 대한 상세 프로필을 보여주기 위한 모달
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    // 지원자들 전체
    const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
    // 상세 프로필을 위한 single applicant
    const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
    // 지원자들
    const [applicants, setApplicants] = useState(['Applicant 1', 'Applicant 2', 'Applicant 3']);


    // 선택된 지원자의 상세 프로필(이름)을 보여주기 위한 함수
    const showApplicantDetail = (applicant: string) => {
        setSelectedApplicant(applicant);
        setIsDetailModalVisible(true);
    }
    const closeApplicantDetail = () => {
        setIsDetailModalVisible(false);
    }

    // 지원현황에서 지원자들을 선택할 때 
    const toggleApplicantSelection = (applicant: string) => {
        setSelectedApplicants(prev =>
            prev.includes(applicant) ? prev.filter(a => a !== applicant) : [...prev, applicant]
        );
    };

    // 전체 선택 기능 구현
    const selectAllApplicants = () => {
        if (selectedApplicants.length === applicants.length){
            setSelectedApplicants([]);
        }
        else {
            setSelectedApplicants(applicants);
        }
    }

    // 승인 버튼 구현
    const handleApprove = () => {
        if (selectedApplicants.length === 0){
            alert('지원자를 선택해주세요.');
        }
        else{
            const approvedNames = selectedApplicants.map(applicant => applicant).join(', ');
            alert(`${approvedNames} 승인 완료!`);
            setSelectedApplicants([]);
        }
    };
    // 미승인 버튼 구현
    const handleReject = () => {
        setApplicants(prev => prev.filter(applicant => !selectedApplicants.includes(applicant)));
        setSelectedApplicants([]);
    };

return(
    <>
    <div style={{paddingTop: '50px',
        margin: '0 15px 0 12px'
    }}>
        <Row>
            <img 
                src={backIcon} 
                alt="back" 
                onClick={goBackDetailPage} 
                style={{}}
            />
            <p style={{fontSize: '25px', fontWeight: 'bold'}}>지원현황</p>
            <p style={{background: '#F5C001', borderRadius: '15px', width: '55px', fontSize: '18px', fontWeight: 'bold', textAlign: 'center'}}>마감</p>
        </Row>
    
        
        {/* 데이터 연결!!!!!!!!!!! */}

        <p style={{fontSize: '13px', fontWeight: 'bold', marginLeft: '8px'}}>
            1. 학생 역할</p>
        <Row>
            <div style={{display: 'flex', gap: '12px', marginLeft: '8px'}}>
                <p style={{borderBottom: '1px solid white'}}>시간순</p>
                <p style={{borderBottom: '1px solid white'}}>온도순</p>
                <p style={{borderBottom: '1px solid white'}}>경력순</p>
            </div>
            <p 
                style={{
                    borderBottom: '1px solid white', 
                    marginRight: '10px'
                }} 
                onClick={selectAllApplicants}
            >
                전체선택
            </p>
        </Row>
        <Column>
            {applicants.map(applicant => (
                <Applicant
                    key={applicant}
                    isSelected={selectedApplicants.includes(applicant)}
                    onClick={() => toggleApplicantSelection(applicant)}
                >
                    {applicant}
                    <img 
                        src={forwardIcon} 
                        alt="forward" 
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            showApplicantDetail(applicant);
                        }}/>
                </Applicant>
            ))}
        </Column>
        <Row>
            <CustomButton onClick={handleApprove}>승인</CustomButton>
            <CustomButton onClick={handleReject}>미승인</CustomButton>
        </Row>

        <Modal isVisible={isDetailModalVisible} onClose={closeApplicantDetail}>
            <div 
                style={{
                    display: 'flex', 
                    justifyContent: 'flex-start', 
                    alignItems: 'center', 
                    gap: '15px'
                }}
            >
                <img 
                    src={backIcon} 
                    alt="back" 
                    onClick={closeApplicantDetail} 
                    style={{width: '20px'}}
                />
                <p style={{fontSize: '15px', fontWeight: 'bold'}}>상세 프로필</p>
            </div>
            
            {selectedApplicant && <p style={{fontWeight: 'bold'}}>{selectedApplicant}</p>}

            <Row>
                <CustomButton onClick={handleApprove}>승인</CustomButton>
                <CustomButton onClick={handleReject}>미승인</CustomButton>
            </Row>
        </Modal>
        </div>
    </>
)

};

export default ShowApplicant;