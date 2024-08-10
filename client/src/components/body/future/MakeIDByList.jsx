import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import QRCode from "react-qr-code";
import logoAz from '../../../units/img/logo_az.png';

import flagEng from '../../../units/img/flag_eng.png';
import flagJap from '../../../units/img/flag_jap.png';

import * as surveyAPI from '../../../api/survey';
import { coverIDToFullName } from '../../../units/support/branch';
import './future.css';

function MakeIDByList() {
    let history = useHistory();
    const { idBranch } = useParams();
    const [surveyHome, setSurveyHome] = useState(false);
    const [surveyRoten, setSurveyRoten] = useState(false);
    const [branchID, setBranchID] = useState("");
    const [league, setLeague] = useState("Japan");

    const [page, setPage] = useState("A6"); 
    const [room1, setRoom1] = useState("");
    const [room2, setRoom2] = useState("");
    const [room3, setRoom3] = useState("");
    const [room4, setRoom4] = useState("");
    const [result, setResult] = useState({
        room1: "",
        room2: "",
        room3: "",
        room4: "",
        home:"",
        roten:""
    });

   // console.log("rusukt2", result)
    const CONTENT_QR_CODE = {
        Japan: {
            title:"東屋QRアンケート",
            row1:"よりよいサービスのため",
            row2:"アンケートにご協力ください。",
            row3:"QRコードを読み取るとアンケートが",
            row4:"表示されます。(1分ほど）",
            row5:"こちらの結果はマネジメントに直接届きます。",
            row6:"",
            room:"お部屋番号: "
        },
        // English: {
        //     title:"AZUMAYA QR SURVEY",
        //     row1:"For our better service",
        //     row2:"We hope you answer our quick survey. ",
        //     row3:"(Around 1 minute)",
        //     row4:"Please scan QR code,and you can answer our survey.",
        //     row5:"Your comments will be delivered to the management board.",
        //     row6:"Thank you for your cooperation.",
        //     row7:"",
        //     room:"Room Number: "
        // }
        English: {
            title:"AZUMAYA QR SURVEY",
            row1:"For our better service",
            row2:"We hope you answer our quick survey. ",
            row3:"(Around 1 minute)",
            row4:"Your comments will be delivered to ",
            row5:"the management board.",
            row6:"Thank you for your cooperation.",
            room:"Room Number: "
        }

        // English: {
        //     title:"AZUMAYA QR SURVEY",
        //     row1:"For our better service",
        //     row2:"We hope you answer our quick survey. ",
        //     row3:"Please scan QR code,and answer our survey.",
        //     row4:"(Around 1 minute)",
        //     row5:"Your comments will be delivered to ",
        //     row6:"the management board.",
        //     row7:"",
        //     room:"Room Number: "
        // }
    }
    
    useEffect(()=> {
        if(idBranch) {
            const deCode = async () => {
                console.log("idBranch: ",idBranch)
                const result = await surveyAPI.deCodeTokenRoom(idBranch, "token").then(response => {
                   // console.log("response", response.data.data)
                    const dataResult = response.data.data;
                   // console.log("vo hereee")
                    setBranchID(dataResult.branchID);
                    makeMultiQrCode(dataResult.branchID, "Japan")
                });
                
              //  makeIdByCallApi("home",result.data.data.branchID );
             //   makeMultiQrCode(result.data.data.branchID, "Japan")
                // makeIdByCallApi(room1, Number(branchID), "Japan")
                // makeIdByCallApi(room2, Number(branchID), "Japan")
                // makeIdByCallApi(room3, Number(branchID), "Japan")
                // makeIdByCallApi(room4, Number(branchID), "Japan")
            }
            deCode();
        } else history.push("/survey/error");
    },[idBranch]);

    function makeMultiQrCode(branchID, league) {
        const updateMultiCode = async () => {
        //    const newResult = { ...result };
           const resultCallAPI = await surveyAPI.makeTokenMultiRoom(branchID, {
                room1,
                room2,
                room3,
                room4
            }, "roomScan", league, "token");
            //console.log(" resultCallAPI", resultCallAPI)
           setResult(resultCallAPI.data);
        }

        updateMultiCode();
    }

    // function makeIdByCallApi(room, branchID, leagueSetup) {
    //     let resultCallAPI;
    //     let resultCallAPI2;
    //     const newResult = { ...result };
    //     const load = async () => {
    //         if(room !== "home") {
    //             resultCallAPI = await surveyAPI.makeTokenRoomType(branchID, room, "roomScan",leagueSetup ? leagueSetup :league, "token");
    //         } else {
    //             resultCallAPI = await surveyAPI.makeTokenRoomType(branchID, "home" , "", leagueSetup ? leagueSetup :league, "token");
    //             resultCallAPI2 = await surveyAPI.makeTokenRoomType(branchID, "", "roomScan", leagueSetup ? leagueSetup :league, "token");
    //         }
        
    //         newResult[room] = resultCallAPI.data.qr_token;
    //         if(room === "home") newResult["roten"] = resultCallAPI2.data.qr_token;
    //         setResult(newResult);
    //     }
    //     load();
    // }

    const stylePageWithValue = {
        "A4": {
            textAlign:'center',
            border:'1px solid black', 
            padding :'0px', 
            margin:'5px', 
            width: '1000px', 
            height:'1400px'
        },
        "A5": {
            textAlign:'center',
            border:'1px solid black', 
            padding :'24px', 
            margin:'5px', 
            width: '720px', 
            maxWidth: '720px',
            minWidth: '720px',
            height: '960px',
        },
        "A6": {
            textAlign:'center',
            border:'1px solid black', 
            padding :'0px', 
            margin:'5px', 
            width: '50%', 
            height:'685px'
        },
    }

    const styleBigTitleWithValue = {
        "A4": {
            marginTop: '96px', 
            marginBottom: '68px', 
            fontSize:'5.5rem', 
            fontWeight:'600' 
        },
        "A5": {
            marginTop: '18px', 
            marginBottom: '18px', 
            fontSize:'3.5rem', 
            fontWeight:'600' 
        },
        "A6": { 
            marginTop: '12px', 
            marginBottom: '12px', 
            fontSize:'2rem', 
            fontWeight:'600' 
        }
    }

    const styleTitleWithValue = {
        "A4": {
            width:'90%', 
            margin: "0 auto", 
            fontSize:'2.5rem'
        },
        "A5": {
            width:'90%', 
            margin: "0 auto", 
            fontSize:'1.65rem'
        },
        "A6": {
            width:'90%', 
            margin: "0 auto", 
            fontSize:'1.25rem',
        },
    }

    const styleTitle2WithValue = {
        "A4": {
            width:'95%', 
            margin: "0 auto", 
            fontSize:'2.5rem'
        },
        "A5": {
            width:'95%', 
            margin: "0 auto", 
            fontSize:'1.65rem'
        },
        "A6": {
            width:'95%', 
            margin: "0 auto", 
            fontSize:'1.25rem',
        },
    }

    const imgWithValue = {
        "A4": 400,
        "A5": 256,
        "A6": 180,
    }

    const styleRoomWithValue = {
        "A4": {
            fontSize:'5rem',
            // fontWeight: '600',
            marginBottom :' 24px'
        },
        "A5": {
            fontSize:'2.4rem',
            // fontWeight: '600',
            marginBottom :'12px'
        },
        "A6": {
            fontSize:'1.4rem',
            // fontWeight: '600',
            marginBottom :'12px'
        },
    }

    const styleBranchNameWithValue = {
        "A4": {
            color: '#482979',
            fontSize :"2.5rem"
        },
        "A5": {
            color: '#482979'
        },
        "A6": {
            color: '#482979'
        },
    }

    function renderQrCode(room, roomRender) {
        console.log("room",room)
        console.log("result[room]", result[room])
        function checkRoten() {
            switch(room) {
                case "home" :return "https://azumayasurvey.com/survey/home/"+result[room];
                case "roten" : return "https://azumayasurvey.com/roten/make_new/"+result[room];
                default : return "https://azumayasurvey.com/survey/make_new/"+result[room];
            } 
        }

        return (<div style={stylePageWithValue[page]}>
        <br/>
        <div style={styleBigTitleWithValue[page]}>
            {room === "roten" ? "QR露天風呂アンケート" : CONTENT_QR_CODE[league].title}</div>
        <div style={{...styleTitleWithValue[page]}}>
            {room === "roten" ? CONTENT_QR_CODE["Japan"].row1 : CONTENT_QR_CODE[league].row1}
            </div>
        <div style={{...styleTitleWithValue[page]}}>
             {room === "roten" ? "アンケートにご協力ください。": CONTENT_QR_CODE[league].row2}
            </div>
        <div style={styleTitle2WithValue[page]}>
            {room === "roten" ? "QRコードを読み取ると露天風呂アンケートが" : CONTENT_QR_CODE[league].row3}
            </div>
        <div style={styleTitle2WithValue[page]}>
            {room === "roten" ? "表示されます。(1分ほど）": CONTENT_QR_CODE[league].row4}
            </div>
        <div style={{...styleTitleWithValue[page]}}>
            {room === "roten" ? "こちらの結果はマネジメントチーム" : CONTENT_QR_CODE[league].row5}
            </div>   
        <div style={{...styleTitleWithValue[page]}}>
            {room === "roten" ? "に直接届きます。" : CONTENT_QR_CODE[league].row6}
        </div>   
        <div
            style={{
                paddingTop: page ==="A4" ? "48px" : page ==="A6" ? "12px" : "36px",
                margin: "12px auto 12px auto",
                maxWidth: imgWithValue[page],
                width: "100%"
            }}
        >
            <QRCode
                level="L"
                size={imgWithValue[page]}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={checkRoten()}
                viewBox={`0 0 256 256`}
                    />
        </div>
        {(page !== "A6" && room === "" )? <br/> :""}
        {room ==="roten" ? "" : 
            <div style={styleRoomWithValue[page]}>
                {roomRender === "" ? "" : CONTENT_QR_CODE[league].room + roomRender}
            </div>} 
        <img src={logoAz} width={imgWithValue[page]} alt="logo_az"/>
        <h5 style={styleBranchNameWithValue[page]}>AZUMAYA {coverIDToFullName(Number(branchID)).toUpperCase()}</h5>
    </div>)
    }

    if(surveyHome) {
        return (<> 
            <h3 style={{textAlign: 'center', marginTop: '54px'}}>This QR code scan by RC Tablet</h3>
            <div
                style={{
                    paddingTop: "36px",
                    margin: "12px auto 12px auto",
                    maxWidth: imgWithValue["A5"],
                    width: "100%"
                }}>
                <QRCode
                    level="L"
                    size={imgWithValue[page]}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={"https://azumayasurvey.com/survey/home/" + result["home"] }
                    viewBox={`0 0 256 256`}
                    />
            <button className="btn btn-danger mt-2"
                onClick={()=>setSurveyHome(false)}
            >Back</button>
        </div>
        </>)
    }

    if(surveyRoten) {
        return (<div className="d-flex"> 
            { renderQrCode("roten","roten")}
            <div className="no-print mt-5" style={{width:'150px'}}>

                <button className={page !=="A6" ? "btn" :"btn btn-warning ml-2"}
                    onClick={()=> setPage("A6")}
                >A6</button>

                <button className={page !== "A5" ? "btn" :"btn btn-warning ml-2"}
                    onClick={()=> setPage("A5")}
                >A5</button>

                <button className={page !=="A4" ? "btn" :"btn btn-warning ml-2"}
                    onClick={()=> setPage("A4")}
                >A4</button>
                
                <button className="btn btn-danger mt-2 "
                    style={{width:'150px'}}
                    onClick={()=>setSurveyRoten(false)}
                >Back</button>
                <button className="btn btn-primary mt-2"
                   style={{width:'150px'}}
                    onClick={()=> window.print()}
                >Print QR Roten</button>
            </div>
        </div>)
    }

    return (<>
       {idBranch && <div className={page ==="A5" ? "rotate d-flex" : "d-flex"}> 
            <div className="w100"
            style={{ width:'1000px', minWidth:'1000px', maxWidth:'1000px' }}>
                <div className="d-flex">
                    { renderQrCode("room1", room1)}
                    {  ( page === "A6") && renderQrCode("room2", room2)}
                </div>

                <div className={page === "A6" ? "d-flex" : "op-hidden"}>
                    { page === "A6" && renderQrCode("room3", room3)}
                    { page === "A6" && renderQrCode("room4", room4)}
                </div>
            </div>

            <div style={{textAlign:'center'}} className="no-print mt-5">
                <div>
                    <label style={{width: '115px', textAlign:'left', background:'aqua'}}>Branch Name:</label>
                    <div>AZUMAYA {coverIDToFullName(Number(branchID)).toUpperCase()}</div>
                    <div>---</div>
                </div>

                <div style={{textAlign:'center'}} className="mb-2 d-flex justify-content-center">
                    <div>Langue: </div>
                    <div>
                        <img src={flagJap} 
                            alt="jap" 
                            style={{ width: "35px" }}
                            className={league === "Japan" ? "" : "img-gray_scale"}
                            onClick = {() => {
                                makeMultiQrCode(branchID, "Japan")
                                setLeague("Japan");
                                // makeIdByCallApi(room1, Number(branchID), "Japan")
                            }}
                            />

                        <img src={flagEng} 
                            alt="eng"
                            style={{ width: "35px" }}
                            className={league !== "Japan" ? "" : "mr-2 img-gray_scale" }
                            onClick = {() => {
                                makeMultiQrCode(branchID, "English")
                                setLeague("English");

                                // makeIdByCallApi(room1, Number(branchID), "English")
                            }}
                            />
                    </div>
                </div>

                <div>
                    <label className="make-room_label-room" >Room 1: </label>
                    <input value = {room1}
                        style={{ width: '100px'}}
                        onChange = {e => setRoom1(e.target.value)}
                        onBlur={() => makeMultiQrCode(branchID, league)}
                        //onBlur={() => makeIdByCallApi(room1, Number(branchID))}
                    />
                </div>

                <div>
                    <label className="make-room_label-room" >Room 2: </label>
                    <input value = {room2}
                        style={{ width: '100px'}}
                        disabled={page!=="A6"}
                        onChange = {e => setRoom2(e.target.value)}
                        onBlur={() => makeMultiQrCode(branchID, league)}
                   //     onBlur={() => makeIdByCallApi(room2, Number(branchID))}
                    />
                </div>

                <div>
                    <label className="make-room_label-room" >Room 3: </label>
                    <input value = {room3}
                        style={{ width: '100px'}}
                        disabled={page!=="A6"}
                        onChange = {e => setRoom3(e.target.value)}
                        onBlur={() => makeMultiQrCode(branchID, league)}
                       // onBlur={() => makeIdByCallApi(room3, Number(branchID))}
                    />
                </div>

                <div>
                    <label className="make-room_label-room" >Room 4: </label>
                    <input value = {room4}
                        style={{ width: '100px'}}
                        disabled={page!=="A6"}
                        onChange = {e => setRoom4(e.target.value)}
                        onBlur={() => makeMultiQrCode(branchID, league)}
                       // onBlur={() => makeIdByCallApi(room4, Number(branchID))}
                    />
                </div>

                <button className={page !=="A6" ? "btn" :"btn btn-warning ml-2"}
                    onClick={()=> setPage("A6")}
                >A6</button>

                <button className={page !== "A5" ? "btn" :"btn btn-warning ml-2"}
                    onClick={()=> setPage("A5")}
                >A5</button>

                <button className={page !=="A4" ? "btn" :"btn btn-warning ml-2"}
                    onClick={()=> setPage("A4")}
                >A4</button>

                <div style={{textAlign:'start'}} className="ml-3 mt-2">
                    <button className="btn btn-primary mt-2"
                        onClick={()=> window.print()}
                    >Print QR Survey</button>

                    <button className="btn btn-success mt-2"
                        onClick={()=> setSurveyHome(!surveyHome)}
                    >Survey setup Tablet</button>

                    <button className="btn btn-warning mt-2"
                        onClick={()=> setSurveyRoten(!surveyRoten)}
                    >Survey QR Roten</button>
                </div>

            </div>

            <div>
                <div>Tips:</div>
            </div>
        </div>}  

    </>)
}

export default MakeIDByList;
