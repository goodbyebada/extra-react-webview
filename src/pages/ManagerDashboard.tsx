import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "../components/Modal";
import HomeRecruitBox from "../components/AdminRecruitBox";

const Column = styled.div`
    display: flex;
    justify-content: center;
`

const Announcement = styled.div`
    background-color: #302E34;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 380px;
    height: 100px;
    margin: 20px 0;
    cursor: pointer;
`

const PlusButton = styled.button`
    font-size: 30px;
    border-radius: 5px;
    padding: 0 8px 0;
`

const CreateNewButton = styled.button`
    background: #858585;
    color: #FFF;
    border: none;
    border-radius: 10px;
    width: 284px;
    padding: 5px 0 5px;
    font-size: 20px;
    font-weight: bold;
`


function ManagerDashboard() {
    const navigate = useNavigate();

    const goToDetail = () => {
        navigate('/detail');
    }
    const goToAdd = () => {
        navigate('/add-notice');
    }
    
    const [isMOdalOPen, setIsModalOpen] = useState(false);
    const handleAdd = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    
    return (
        <>
            <div style={{
                marginLeft: '30px',
                marginRight: '30px'
                }}
            >
                <div style={{display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: '50px'
                            }}>
                    <p style={{
                        fontWeight: '900', 
                        fontSize: '32px'}}
                    >
                        우리 회사 공고
                    </p>
                    <PlusButton onClick={handleAdd}>+</PlusButton>
                </div>
                <div style={{display: 'flex',
                            alignItems: 'end',
                            justifyContent: 'flex-end',
                            marginBottom: '15px',
                            fontSize: '12px'}}>
                    <p style={{margin: '0 15px'}}>전체</p>
                    <p style={{margin: '0 0'}}>내게만 보기</p>
                </div>
            </div>
            <Column>
                <HomeRecruitBox></HomeRecruitBox>
            </Column>

            <Modal isVisible={isMOdalOPen} onClose={closeModal}>
                <p style={{fontSize: '20px', fontWeight: 'bold'}}>이전 양식</p>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CreateNewButton onClick={goToAdd}>새로 만들기</CreateNewButton>
                </div>
            </Modal>
        </>
    )
}

export default ManagerDashboard;