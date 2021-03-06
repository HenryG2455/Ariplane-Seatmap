import React, { Component } from 'react';
import styled from 'styled-components';
import SeatMap from './seatmap';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actionCreator from '../store/actions/index';

function getCarrierIcon(code) {
  return `https://wf-deploy-assets.whereto.com/airlines/${code}.png`;
}
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Wrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Loading = styled.div`
  display: flex;
`;
const Div = styled.div`
  width: 1100px;
  height: 900px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 9px;
`;
const Div1 = styled.div`
  flex: 1;
  background-color: #ffffff;
  margin: 10px;
  border-radius: 9px;
`;

const Div2 = styled.div`
  flex: 8;
  background-color: #ffffff;
  margin: 5px;
  display: flex;
  border-radius: 9px;
  flex-direction: column;
`;
const SegmentsW = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;
const Segment = styled.div`
  height: ${props => (props.selected ? '96px' : '72px')};
  bottom: 0%;
  width: 260px;
  margin-top: 3px;
  margin-left: 3px;
  margin-right: 3px;
  background-color: ${props => (props.selected ? '#3498db' : '#1775E1')};
  color: white;
  &:hover {
    background-color: #3498db;
  }
`;
const SegmentW = styled.div`
  display: flex;
  margin: 3px;
  color: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Div3 = styled.div`
  flex: 7;
  background-color: #ffffff;
  border: 1px solid;
  border-color: #95a5a6;
  display: flex;
  flex-direction: column;
`;
const Div4 = styled.div`
  flex: 5;
  background-color: #e5e7e9;
  margin: 25px;
  display: flex;
  flex-direction: column;
  border-radius: 9px;
  position: relative;
`;
const NextSegment = styled.button`
  font-size: 140%;
  background-color: #3498db;
  border: none;
  color: white;
  padding: 15px 25px;
  text-align: center;
  font-size: 16px;
  position: absolute;
  opacity: 0.7;
  top: 16%;
  left: 80%;
  &:hover {
    opacity: 1;
  }
`;
const TextNum = styled.span`
  font-size: 130%;
`;
const Div5 = styled.div`
  flex: 1;
  background-color: #ffffff;
  margin: 15px;
  border-radius: 9px;
  box-shadow: rgba(0, 0, 0, 0.12) 0 0 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Div5W = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Div5Right = styled.div`
  flex: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Div5Center = styled.div`
  flex: 3;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Div6 = styled.div`
  flex: 1;
  background-color: #e5e7e9;
  margin: 5px;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
`;
const LegendW = styled.div`
  display: flex;
  flex-direction: row;
  flex: 7;
  margin: 1px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const LegendWBot = styled.div`
  display: flex;
  flex-direction: row;
  flex: 3;
  margin: 5px;
  align-items: center;
`;
const PlaneInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 4px;
  margin-right: 2px;
`;
const Legend = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 5px;
  align-items: center;
  justify-content: center;
`;
const Div7 = styled.div`
  flex: 3;
  background-color: #e5e7e9;
  margin: 5px;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
`;
const Div8 = styled.div`
  flex: 2;
  margin: 5px;
  border-radius: 9px;
  display: flex;
  flex-direction: row;
`;

const FirstClassW = styled.div`
  flex: 3;
  border-radius: 9px;
  align-items: center;
  justify-content: center;
`;
const BracketW = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;
const BtextW = styled.div`
  width: 37px;
`;
const BtextWcenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BracketText = styled.span`
  font-size: 100%;
`;
const BracketF = styled.div`
  height: 40px;
  border-left: 2px solid grey;
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-radius: 9px;
  margin-left: 30px;
`;
const Img = styled.img`
  max-height: 50px;
  max-width: 50px;
`;
const SeatDiv = styled.div`
  height: 25px;
  width: 25px;
  margin: 2px;
  display: flex;
`;
const SeatOpen = styled.div`
  flex: 1;
  background-color: #5dade2;
  border-radius: 4px;
`;
const SeatPreferred = styled.div`
  flex: 1;
  background-color: #58d68d;
  border-radius: 4px;
`;
const SeatPremPref = styled.div`
  flex: 1;
  background-color: #58d68d;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SeatSelect = styled.div`
  flex: 1;
  background-color: #f1c40f;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SeatSelInner = styled.div`
  background-color: #ffffff;
  height: 17px;
  width: 17px;
`;
const SeatTaken = styled.div`
  flex: 1;
  background-color: #717d7e;
  border-radius: 4px;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SeatUnaImg = styled.img`
  height: 17px;
  width: 17px;
  opacity: 0.5;
`;
const SeatPPImg = styled.img`
  height: 17px;
  width: 17px;
`;
const IconImg = styled.img`
  height: 30px;
  width: 30px;
  margin: 10px;
`;
const mapStateToProps = state => {
  return {
    selected: state.selected,
    seatMapNum: state.seatMapNum,
    flightInfo: state.flightInfo,
    loaded: state.loaded
  };
};
const mapDispachToProps = dispatch => {
  return {
    getFlightInfo: () => dispatch(actionCreator.requestFlightInfo()),
    selectSeat: pram => dispatch(actionCreator.selectSeat(pram)),
    changeFlight: pram => dispatch(actionCreator.changeFlight(pram))
  };
};
class SeatList extends Component {
  constructor(props) {
    super(props);
    this.nextFlight = this.nextFlight.bind(this);
  }
  componentDidMount() {
    this.props.getFlightInfo();
  }

  componentWillUnmount() {}

  nextFlight = () => {
    const length = this.props.flightInfo.segments.length - 1;
    if (this.props.seatMapNum < length) {
      const num = this.props.seatMapNum + 1;
      this.props.changeFlight(num);
    } else {
      this.props.changeFlight(0);
    }
  };

  render() {
    const flightInfo = this.props.flightInfo.segments;
    const flightDetails = this.props.flightInfo.seatmaps;
    const noSmoking =
      'https://img.icons8.com/ultraviolet/40/000000/no-smoking.png';
    const wifi =
      'https://img.icons8.com/ultraviolet/40/000000/high-connection.png';
    console.log(this.props.flightInfo);
    return (
      <Wrapper>
        {this.props.loaded ? (
          <Div>
            <Div1>
              <h1>Please choose your seats for your flights:</h1>
            </Div1>
            <Div2>
              <SegmentsW>
                {flightInfo.map((flights, index) => (
                  <Segment
                    key={index}
                    selected={index === this.props.seatMapNum}
                    onClick={() => this.props.changeFlight(index)}
                  >
                    <SegmentW>
                      <TextNum>
                        {flights.departure.airport}
                        <img
                          src="https://img.icons8.com/ios/24/000000/long-arrow-right.png"
                          style={{ height: '15px', width: '20px' }}
                          alt="==>"
                        />
                        {flights.arrival.airport}
                      </TextNum>
                      <TextNum>
                        {moment(flights.departure.datetime).format(
                          'MMMM Do YYYY, h:mm a'
                        )}
                      </TextNum>
                      <TextNum>Flight No: {flights.flightNumber}</TextNum>
                    </SegmentW>
                  </Segment>
                ))}
              </SegmentsW>
              <Div3>
                <Div4>
                  <NextSegment onClick={this.nextFlight}>
                    Next Segment -->
                  </NextSegment>
                  <Div6>
                    <LegendW>
                      <Img
                        src={getCarrierIcon(
                          flightDetails[this.props.seatMapNum].seatmap.carrier
                            .code
                        )}
                      />
                      <PlaneInfo>
                        <TextNum>
                          {
                            flightDetails[this.props.seatMapNum].seatmap.carrier
                              .name
                          }
                        </TextNum>
                        <TextNum>
                          {
                            flightDetails[this.props.seatMapNum].seatmap
                              .aircraftType
                          }
                        </TextNum>
                      </PlaneInfo>
                      <Legend>
                        <SeatDiv>
                          <SeatOpen></SeatOpen>
                        </SeatDiv>
                        <span>Available</span>
                      </Legend>
                      <Legend>
                        <SeatDiv>
                          <SeatPreferred></SeatPreferred>
                        </SeatDiv>
                        <span>Preferred</span>
                      </Legend>
                      <Legend>
                        <SeatDiv>
                          <SeatPremPref>
                            <SeatPPImg src="https://img.icons8.com/ios-filled/50/000000/star.png" />
                          </SeatPremPref>
                        </SeatDiv>
                        <span>Premium Preferred</span>
                      </Legend>
                      <Legend>
                        <SeatDiv>
                          <SeatTaken>
                            <SeatUnaImg src="https://img.icons8.com/ios-filled/50/000000/x.png" />
                          </SeatTaken>
                        </SeatDiv>
                        <span>Unavailable</span>
                      </Legend>
                      <Legend>
                        <SeatDiv>
                          <SeatSelect>
                            <SeatSelInner />
                          </SeatSelect>
                        </SeatDiv>
                        <span>Selected</span>
                      </Legend>
                      <Legend>
                        <SeatDiv>
                          <img
                            src="https://img.icons8.com/wired/64/000000/toilet.png"
                            style={{ height: '25px', width: '25px' }}
                            alt="Toilet"
                          />
                        </SeatDiv>
                        <span>Lavatory</span>
                      </Legend>
                    </LegendW>
                    <LegendWBot>
                      <span style={{ color: 'blue', fontSize: '115%' }}>
                        Please choose a seat for this segment.
                      </span>
                    </LegendWBot>
                  </Div6>
                  <Div7>
                    <BracketW>
                      {flightDetails[
                        this.props.seatMapNum
                      ].seatmap.sections.map(sections => (
                        <Wrapper2>
                          <BtextW>
                            <BtextWcenter>
                              <BracketText>{sections.label}</BracketText>
                            </BtextWcenter>
                          </BtextW>
                          <BracketF
                            style={{ width: sections.rows.length * 37 }}
                          />
                        </Wrapper2>
                      ))}
                    </BracketW>
                    <Div8>
                      <FirstClassW>
                        <SeatMap />
                      </FirstClassW>
                    </Div8>
                  </Div7>
                </Div4>
                <Div5>
                  <Div5W>
                    <Div5Right>
                      <img
                        src={getCarrierIcon(
                          flightDetails[this.props.seatMapNum].seatmap.carrier
                            .code
                        )}
                        style={{ width: '35%' }}
                        alt="Carrier"
                      />
                    </Div5Right>
                    {flightDetails[
                      this.props.seatMapNum
                    ].seatmap.details.inFlightServices.map(
                      (services, index) => (
                        <Div5Center key={index}>
                          {(services.name && services.name === 'Wi-Fi' && (
                            <IconImg src={wifi} />
                          )) ||
                            (services.name &&
                              services.name === 'Non-Smoking' && (
                                <IconImg src={noSmoking} />
                              ))}
                          <TextNum>{services.name}</TextNum>
                        </Div5Center>
                      )
                    )}
                  </Div5W>
                </Div5>
              </Div3>
            </Div2>
          </Div>
        ) : (
          <Wrapper>
            <Loading />
          </Wrapper>
        )}
      </Wrapper>
    );
  }
}

export default connect(mapStateToProps, mapDispachToProps)(SeatList);
