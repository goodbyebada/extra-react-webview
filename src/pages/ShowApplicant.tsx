import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Modal from "@components/Modal";
import backIcon from "@assets/backIcon.png";
import forwardIcon from "@assets/forwardIcon.png";
import checkIcon from "@assets/checkIcon.png";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ApplicantWrapper = styled.div`
  background: #302e34;
  border-radius: 30px;
  padding-top: 20px;
  padding-right: 15px;
  padding-bottom: 20px;
  padding-left: 15px;
  margin-top: 20px;
  margin-right: 10px;
  margin-left: 10px;
`;

const Applicant = styled.div<{ isSelected: boolean }>`
    background: ${props => (props.isSelected ? '#F5C001' : '#575757')};
    width: 100%;
    height: 50px;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    padding-right: 10px;
    font-size: 16px;
    justify-content: space-between;
`

const CustomButton = styled.button`
  width: 49%;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  background: #302e34;
  color: white;
`;

const ShowApplicant = () => {   
    const navigate = useNavigate();
    const {title} = useParams();

    const goBackDetailPage = () => {
        navigate(`/detail/${title}`);
    }

    // 무슨 역할인지 표시하기 위함
    const [roleName, setRoleName] = useState(localStorage.getItem('roleName') || '');
    // 지원자들
    const [applicants, setApplicants] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        const savedRoleName = localStorage.getItem('roleName');
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error("NO access token found");
            return;
        }

        // 무슨 역할인지 표시하기 위함
        if (savedRoleName) setRoleName(savedRoleName);

        const fetchApplicants = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_SERVER_URL}api/v1/application-request/company/roles/26/members`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );


                function parseJwt (token : string) {
                    var base64Url = token.split('.')[1];
                    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                
                    return JSON.parse(jsonPayload);
                }
                // 유효한 토큰인지 확인
                const decodedToken = parseJwt(token);
                if (decodedToken.exp * 1000 < Date.now()){
                    console.error("token is expired");
                } else {
                    console.log("valid token");
                }


                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }

                const data = await response.json();
                setApplicants(data);

            } catch (error) {
                console.error("Failed to fetch applicants:", error);
            }
        };

        fetchApplicants();
    }, []);



    // 지원현황에서 각각의 지원자에 대한 상세 프로필을 보여주기 위한 모달
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    // 지원자들 전체 (id로 지원자들을 구분)
    const [selectedApplicants, setSelectedApplicants] = useState<number[]>([]);
    // 상세 프로필을 위한 single applicant
    const [selectedSingleApplicant, setSelectedSingleApplicant] = useState< {id: number; name: string} | null>(null);


    // // 선택된 지원자의 상세 프로필(이름)을 보여주기 위한 함수
    // const showApplicantDetail = (applicant: string) => {
    //     setSelectedSingleApplicant(applicant);
    //     setIsDetailModalVisible(true);
    // };

    const closeApplicantDetail = () => {
        setIsDetailModalVisible(false);
    };

    // 지원현황에서 지원자들을 선택할 때
    const toggleApplicantSelection = (id: number) => {
        setSelectedApplicants((prev) =>
        prev.includes(id)
            ? prev.filter((id_) => id_ !== id)
            : [...prev, id],
        );
    };

    // 전체 선택 기능 구현
    const selectAllApplicants = () => {
        if (selectedApplicants.length === applicants.length) {
        setSelectedApplicants([]);
        } else {
        setSelectedApplicants(applicants.map((applicant) => applicant.id));
        }
    };

    // 승인 버튼 구현
    const handleApprove = () => {
        if (selectedApplicants.length === 0) {
        alert("지원자를 선택해주세요.");
        } else {
        const approvedNames = applicants
            .filter((applicant) => selectedApplicants.includes(applicant.id))
            .map((applicant) => applicant)
            .join(", ");
        alert(`${approvedNames} 승인 완료!`);
        setSelectedApplicants([]);
        }
    };
    // 미승인 버튼 구현
    const handleReject = () => {
        setApplicants((prev) =>
        prev.filter((applicant) => !selectedApplicants.includes(applicant.id)),
        );
        setSelectedApplicants([]);
    };

  return (
    <>
        <div style={{paddingTop: '50px',
            margin: '0 15px 0 12px'
        }}>
            <Row style={{paddingBottom: '10px', borderBottom: '1px solid white'}}>
                <img 
                    src={backIcon} 
                    alt="back" 
                    onClick={goBackDetailPage} 
                />
                <p style={{
                    fontSize: '25px', 
                    fontWeight: '900',
                    }}
                >
                    지원현황
                </p>
                <p style={{
                    background: '#F5C001', 
                    borderRadius: '15px', 
                    width: '50px', 
                    fontSize: '15px', 
                    fontWeight: 'bold', 
                    textAlign: 'center'
                    }}
                >
                    마감
                </p>
            </Row>
        
            
            <ApplicantWrapper>
                <p style={{
                    fontSize: '20px', 
                    fontWeight: 'bold', 
                    marginLeft: '8px', 
                    marginBottom: '10px'
                    }}
                >
                    {roleName}
                </p>

                <div style={{marginBottom: '10px', fontSize: '10px'}}>
                    <Row>
                        <div style={{display: 'flex', gap: '12px', marginLeft: '8px', marginBottom: '5px'}}>
                            <p style={{borderBottom: '1px solid white'}}>시간순</p>
                            <p style={{borderBottom: '1px solid white'}}>온도순</p>
                            <p style={{borderBottom: '1px solid white'}}>경력순</p>
                        </div>
                        <p 
                            style={{
                                borderBottom: '1px solid white', 
                                marginRight: '10px',
                            }} 
                            onClick={selectAllApplicants}
                        >
                            전체선택
                        </p>
                    </Row>
                </div>

                <Column>
                    {applicants.map(applicant => (
                        <Applicant
                            key={applicant.id}
                            isSelected={selectedApplicants.includes(applicant.id)}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-start'
                            }}>
                                <img 
                                    src={checkIcon} 
                                    alt="selected"  
                                    onClick={() => toggleApplicantSelection(applicant.id)}
                                    style={{width: '15%', height: '15%', paddingRight: '10px'}}
                                />
                                {applicant.name}
                            </div>
                            <img 
                                src={forwardIcon} 
                                alt="forward" 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    //showApplicantDetail(applicant);
                                }}/>
                        </Applicant>
                    ))}
                </Column>
                
                <Row>
                    <CustomButton onClick={handleApprove}>승인</CustomButton>
                    <CustomButton onClick={handleReject}>미승인</CustomButton>
                </Row>
            </ApplicantWrapper>

            <Modal isVisible={isDetailModalVisible} onClose={closeApplicantDetail}>
                <div 
                    style={{
                        display: 'flex', 
                        justifyContent: 'flex-start', 
                        alignItems: 'center', 
                        gap: '15px',
                        marginBottom: '15px',
                    }}
                >
                    <img 
                        src={backIcon} 
                        alt="back" 
                        onClick={closeApplicantDetail} 
                        style={{width: '20px'}}
                    />
                    <p style={{fontSize: '24px', fontWeight: '900'}}>상세 프로필</p>
                </div>
                
                <div style={{
                    marginBottom: '15px',
                    }}
                >
                    {selectedSingleApplicant && 
                        <p 
                        style={{
                            fontSize: '18px', 
                            fontWeight: '600',
                            }}
                        >
                            이름 : {selectedSingleApplicant.name}
                        </p>
                    }
                </div>

                <Row style={{marginTop: '30px', marginBottom: '-40px'}}>
                    <CustomButton onClick={handleApprove}>승인</CustomButton>
                    <CustomButton onClick={handleReject}>미승인</CustomButton>
                </Row>
            </Modal>
        </div>
    </>
  );
};

export default ShowApplicant;
