import { Title } from "../components/common/Title";
import { BackgroundCover } from "../components/common/BackgroundCover";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useState, useEffect, useRef } from "react";
import { MaxCapacityDropDown } from "../components/common/MaxCapacityDropDown";
import { OfficeOptions } from "../components/booking/OfficeOptions";
import { BlindBooking } from "./BlindBooking";
import { SelectDateDropDown } from "../components/agent/SelectDateDropDown";
import { useQuery } from "react-query";
import { fetchBookingData } from "../fetch/get/agent";
import { GiPositionMarker } from "react-icons/gi";
import { DrawMap } from "../Business/Booking/BookingPrintMap";
import { SlickSlider } from "./BookingSlider";
import { BookingFigure } from "./BookingFigure";
import { OfficeName } from "../components/booking/Officename";
import { Link } from "react-router-dom";
import { useMyContext } from "../contexts/MyContext";
import styled from "@emotion/styled";
import "react-day-picker/dist/style.css";
import { BookingImageEmpty } from "./BookingEmptyImg";

declare global {
  interface Window {
    kakao: any;
  }
}

export type BookingDataType = {
  address: string;
  name: string;
  id: number;
  option: {
    haveHeater?: boolean;
  };
  price: number;
};

export type corrdinateType = {
  La: number;
  Ma: number;
};

const defaultValue = {
  address: "",
  name: "",
  id: 0,
  option: {},
  price: 0,
};

const setting = {
  dots: true,
  infinite: true,
  speed: 500,
  pauseOnHover: true,
  autoplay: true,
};
//데이터 연결전 임시 타입입니다
type img = {
  img: string;
};

export const Booking = () => {
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [selectMonth, setMonth] = useState<boolean>(false);
  const [selectMaxPeople, setMaxPeople] = useState<boolean>(false);
  const [reservationComplete, setReservationComplete] = useState<boolean>(false);
  const [BookingData, setBookingData] = useState<BookingDataType>(defaultValue);
  const [officePosition, setOfficePosition] = useState<corrdinateType>();
  const [loadViewToolTipState, setToolTipState] = useState<boolean>(false);
  const PrintDayDom = useRef<HTMLParagraphElement>(null);
  const { data } = useQuery(["BookingPageData"], fetchBookingData);
  //데이터를 연결하면서 실제 이미지 데이터로 연결 해야함
  const imageData: img[] = [];
  const context = useMyContext();

  useEffect(() => {
    if (data) {
      setBookingData(data.Booking);
    }
  }, [data]);

  useEffect(() => {
    DrawMap(BookingData, setOfficePosition);
  }, [BookingData]);

  useEffect(() => {
    const target = PrintDayDom.current as HTMLParagraphElement;
    if (selectedDay !== undefined) {
      target.innerText = format(selectedDay, "yyyy-MM-dd");
    }
  }, [selectedDay]);

  return (
    <>
      <div className="mx-auto py-8 sm:w-11/12 lg:w-11/12 xl:w-5/6">
        <div className="mb-8">
          <Title>예약하기</Title>
        </div>
        <div className="flex mb-8 sm:flex-col xl:flex-row">
          <ImgAreaWidht>
            <SlickSlider setting={setting}>
              {imageData.length >= 1 ? (
                imageData.map(() => {
                  return <BookingFigure img="" />;
                })
              ) : (
                <BookingImageEmpty />
              )}
            </SlickSlider>
            {/* 데이터 받아오면 넣어야함 */}
            <div className="w-full flex flex-col  lg:w-8/12 lg:mx-auto xl:px-0 xl:w-full">
              <div className="mb-8 sm:mb-3">
                {/* 데이터 받아오면 주소에 넣어야함 */}
                <OfficeName name={BookingData.name} address={BookingData.address}></OfficeName>
              </div>
              <div className="flex w-full gap-x-2">
                <button className="btn btn-outline btn-primary block p-0 grow shrink basis-1/2">
                  <Link to={"/"} className="whitespace-nowrap w-full h-full flex justify-center items-center">
                    다른 오피스 둘러보기
                  </Link>
                </button>
                <button
                  className="btn btn-outline btn-primary block p-0 grow shrink basis-1/2"
                  onClick={() => {
                    context.setIsChatListOpen(true);
                  }}
                >
                  문의하기
                </button>
              </div>
            </div>
          </ImgAreaWidht>
          <CaledarAndOPtionWidth>
            {/* flex와 div로 영역을 나누기 위해 div를 많이 쓰더라도 사용했습니다 */}

            <div className="relative sm:mt-8 xl:mt-0">
              <BackgroundCover margin="mt-0">
                <div className="flex sm:mb-12 sm:flex-col lg:flex-row">
                  <BackgroundCoverLeftAreaRightContour>
                    <BackgroundCoverLeftAreaTopContour className="text-center text-primary sm:w-full">
                      <span ref={PrintDayDom} className="text-base">
                        시작 날짜를 알려주세요
                      </span>
                    </BackgroundCoverLeftAreaTopContour>
                    <InheritanceDayPickr mode="single" selected={selectedDay} onSelect={setSelectedDay} />
                  </BackgroundCoverLeftAreaRightContour>
                  <div className="sm:w-full">
                    <div className="flex flex-col justify-center sm:w-full">
                      <div className="ml-4 text-base">
                        <p>몇 개월 사용할지 알려주세요</p>
                        <p className="mb-4">1년 이상 장기 예약은 문의가 필요합니다</p>
                      </div>
                      <div className="mb-4">
                        <SelectDateDropDown width="w-full" setChangeState={setMonth} />
                      </div>
                      <div className="mb-4">
                        <p className="ml-4 mb-1 text-base">사용할 인원을 선택해주세요</p>
                        <MaxCapacityDropDown width="w-full" setMaxPeople={setMaxPeople} />
                      </div>
                      {/* 월 정기 결제 버튼  */}
                      <div className="flex ml-4">
                        <div className="form-control">
                          <label className="label cursor-pointer">
                            <input type="checkbox" className="checkbox checkbox-primary" />
                            <span className="label-text ml-4 text-base">월 정기 결제</span>
                          </label>
                        </div>
                      </div>
                      <div className="text-base sm:ml-5 lg:ml-12">
                        <p className="text-primary">다음 월 정기 결제일은 0000입니다</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 컴포넌트 제작 완료대로 추가 */}
                <button
                  className="btn btn-primary w-full relative"
                  onClick={() => {
                    setReservationComplete(true);
                  }}
                >
                  예약하기
                  {selectedDay && selectMonth && selectMaxPeople ? (
                    <TotalPriceAreaPosition className="rounded-full bg-secondary whitespace-nowrap">
                      <span>총 결제 금액은 {BookingData.price}원입니다</span>
                    </TotalPriceAreaPosition>
                  ) : null}
                </button>
                {reservationComplete && (
                  <div className="w-full h-full absolute top-0 left-0  z-50">
                    <BlindBooking />
                  </div>
                )}
              </BackgroundCover>
            </div>
          </CaledarAndOPtionWidth>
        </div>
        <div id="map" style={{ width: "100%", height: "500px" }} className="mx-auto mb-8 relative">
          {officePosition !== undefined && (
            <button
              className="w-12 h-12 absolute top-5 left-2.5 icon z-50 bg-white"
              onMouseOver={() => {
                setToolTipState(true);
              }}
              onMouseLeave={() => {
                setToolTipState(false);
              }}
            >
              <a
                href={`https://map.kakao.com/link/roadview/${officePosition.Ma},${officePosition.La}`}
                target="_blank"
                className="w-full h-full  flex items-center justify-center bg-primary rounded-xl"
              >
                <GiPositionMarker style={{ width: "40px", height: "40px", fill: "white" }} />
              </a>
              {loadViewToolTipState && <p className="whitespace-nowrap p-1">로드뷰</p>}
            </button>
          )}
        </div>

        {/* width : w-full or 숫자입력으로 width값 조절 */}
        <div>
          {BookingData.address !== "" && (
            <OfficeOptions width="w-full" needReviewCount={true} OptionData={BookingData.option} />
          )}
        </div>
      </div>
    </>
  );
};

const ImgAreaWidht = styled.div`
  @media (min-width: 360px) {
    width: 100%;
  }

  @media (min-width: 1280px) {
    margin-right: 2rem;
    width: 40%;
  }
`;

const CaledarAndOPtionWidth = styled.div`
  @media (min-width: 360px) {
    width: 100%;
  }
  @media (min-width: 1280px) {
    width: 60%;
  }
`;

//캘린더 커스텀을 위한 styled
const InheritanceDayPickr = styled(DayPicker)`
  & .rdp-caption {
    position: relative;
    justify-content: center;
  }

  & .rdp-months {
    justify-content: center;
  }

  & .rdp-nav {
    position: absolute;
    top: -5px;
    left: 0;

    & > button {
      position: absolute;
      top: 0;
      left: 0;
    }

    & > button:nth-of-type(2) {
      position: absolute;
      top: 0;
      left: 240px;
    }
  }
`;
// 가상 요소를 사용하기 위해 따로 제작
const BackgroundCoverLeftAreaRightContour = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  flex-direction: column;

  @media (min-width: 360px) {
    width: 100%;
  }
`;

// 가상 요소를 사용하기 위해 따로 제작
//기존에 있던 accent색상을 적용하면 거의 보이지 않아서 다른 색상을 좀 생각해봐야할 것으로 보임
const BackgroundCoverLeftAreaTopContour = styled.p`
  position: relative;
  text-align: center;
  &::after {
    content: "";
    position: absolute;
    top: 120%;
    left: 0%;
    width: 97%;
    height: 1px;
    border-radius: 12px;
    background-color: var(--primary);
  }
`;

const TotalPriceAreaPosition = styled.div`
  position: absolute;
  top: -60%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px;
  color: black;

  &::before {
    content: "";
    position: absolute;
    bottom: -50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0px;
    height: 0px;
    border-top: 10px solid var(--secondary);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }

  @media (min-width: 360px) {
    &::before {
      bottom: -51%;
    }

    top: -51%;
  }

  @media (min-width: 480px) {
    &::before {
      bottom: -50%;
    }
  }
`;
