import { styled } from "styled-components";
import splitAgeMinMax from "@utills/splitAgeMinMax";

/*
 * return 한 역할 / 상세정보에 대한 UI
 * Ex) 학생역할 : { 성별 : 여자, ...} , { 성별 : 남자, ...}
 */
const RoleDetailItem = (
  idx: number,
  roleName: string,
  costumeList: string[],
  sex: boolean,
  roleAge: string | null,
  season: string,
) => {
  const roleString = (roleAge: string | null) => {
    if (!roleAge) {
      return "나이 무관";
    }
    const { minAge, maxAge } = splitAgeMinMax(roleAge);
    return `${minAge}세 ~ ${maxAge}세`;
  };

  return (
    <RoleItem key={idx}>
      <h1 id="role-name">
        {idx + 1}&#41;{roleName}
      </h1>

      <div className="content">
        <DetailItem>
          <ol className="details">
            <li className="item">
              <div id="notice-num">1</div>
              <p>성별 : {sex ? "여자" : "남자"}</p>
            </li>

            <li className="item">
              <div id="notice-num">2</div>
              <p>나이 : {roleString(roleAge)}</p>
            </li>

            <li className="item">
              <div id="notice-num">3</div>
              <p>계절 : {season}</p>
            </li>

            <li className="item">
              <div id="notice-num">4</div>
              <p>
                의상:
                {costumeList.length > 0 &&
                  costumeList.map((elem, idx) => {
                    if (costumeList.length === idx + 1) {
                      return <span key={idx}>&nbsp;{elem}</span>;
                    }
                    return <span key={idx}> {elem},</span>;
                  })}
              </p>
            </li>
          </ol>
        </DetailItem>
      </div>
    </RoleItem>
  );
};

export default RoleDetailItem;

const RoleItem = styled.div`
  padding: 30px;
  margin: 0 auto;
  width: 100%;
  #role-name {
    font-size: 19px;
    font-weight: 700;
    line-height: 115.789%;
    margin-bottom: 30px;
  }

  .content {
    height: fit-content;

    > * {
      margin-bottom: 20px;
    }
  }

  border-bottom: solid 2px white;
`;

const DetailItem = styled.div`
  min-height: 142px;
  position: relative;

  border: 2px solid transparent;
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-image: linear-gradient(#000000, #000000),
    linear-gradient(#545454, #bababa);

  border-radius: 18px;

  font-size: 14px;
  font-style: normal;
  font-weight: 900;
  line-height: 142.857%;
  letter-spacing: 0.14px;

  .details {
    list-style: none;
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
  }

  .item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    & #notice-num {
      width: 25px;
      height: fit-content;

      /* 정중앙 */
      display: flex;
      justify-content: center;
      align-self: center;

      border: solid 2px white;
      border-radius: 50%;

      margin-right: 0.5em;
    }
  }
`;
