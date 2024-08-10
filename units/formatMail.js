const formatMail = {
    SentPickUpDropOffRentCarOnDay: (data, dataGuest, dayFindCar, branchID, type) => {
        const { rentCarList , pickUpList, dropOffList} = data;

        const isEmpty = rentCarList.length === 0 && pickUpList.length === 0 && dropOffList.length === 0;
        let contentMail = `
        <div>Dear Chief,</div>
        <br/>`
        type==="new" ? contentMail = contentMail + `<p style="margin:0">System report Pick Up / Drop Off / Rent Car on ${dayFindCar}:</p>`
         : contentMail = contentMail + `<p style="margin:0;color: #9900ff">System RECHECK Pick Up / Drop Off / Rent Car on ${dayFindCar}:</p>`

        isEmpty ? contentMail = contentMail + `<p style="margin:0;color: #9900ff">Today, have not car information</p>`
        : contentMail = contentMail +`<p style="margin:0">Please check the table below:</p>
        <br/>
        <table id="customers" style="font-family: Arial, Helvetica, sans-serif;border-collapse: collapse;width: 50%;  border: 1px solid #333;text-align: center;">
        <th style="border:1px solid #333;background: yellow;">Room</th>
        <th style="border:1px solid #333;background: yellow;">Guest Name</th>
        <th style="border:1px solid #333;background: yellow;">Type</th>
        <th style="border:1px solid #333;background: yellow;">Information</th>
        <th style="border:1px solid #333;background: yellow;">Link</th>
        ${renderTablePickUpDropOffRentCar(data, dataGuest, branchID)}
        </table>`

        contentMail = contentMail + `
        <br/>
        <p style="margin:0">Thank you.</p>`
        return contentMail + signature;
    },
    SentCapacityReport: (capacity, guest) => {
        const { week1, week2, week3, week4, week5, month } = capacity;
        const contentMail = `   
        <div>Dear A.M,</div>
        <br/>
        <p style="margin:0">This mail report capacity.</p>
        <p style="margin:0">Please check this table</p>
        <br/>
        <table id="customers" style="font-family: Arial, Helvetica, sans-serif;border-collapse: collapse;width: 50%;  border: 1px solid #333;text-align: center;">
            <tr style="border: 1px solid #333;">
            <th style="border: 1px solid #333;" rowspan="2">Week</th>
            <th style="border: 1px solid #333;" colspan="2">Hai Ba Trung 1</th>
            </tr>
            <tr style="border: 1px solid #333;">

            <th style="border: 1px solid #333;">Capacity</th>
            <th style="border: 1px solid #333;">Customer</th>
            </tr>
            <tr  style="border: 1px solid #333;">
            <td style="border: 1px solid #333;">Week 1 (01 Aug-02 Aug)</td>
            <td style="border: 1px solid #333;">50%</td>
            <td style="border: 1px solid #333;">60</td>
            </tr>
            <tr  style="border: 1px solid #333;">
            <td style="border: 1px solid #333;">Week 2 (01 Aug-02 Aug)</td>
            <td style="border: 1px solid #333;">50%</td>
            <td style="border: 1px solid #333;">60</td>
            </tr>
            <tr  style="border: 1px solid #333;">
            <td style="border: 1px solid #333;">Week 3 (01 Aug-02 Aug)</td>
            <td style="border: 1px solid #333;">50%</td>
            <td style="border: 1px solid #333;">60</td>
            </tr>
            <tr  style="border: 1px solid #333;">
            <td style="border: 1px solid #333;">Week 4 (01 Aug-02 Aug)</td>
            <td style="border: 1px solid #333;">50%</td>
            <td style="border: 1px solid #333;">60</td>
            </tr>
            <tr  style="border: 1px solid #333;">
            <td style="border: 1px solid #333;">Month</td>
            <td style="border: 1px solid #333;">50%</td>
            <td style="border: 1px solid #333;">60</td>
            </tr>
        </table>
        <p style="margin:0">You can check it on this link.</p>
        <p style="margin:0">* Please Login before open this link *</p>
        <br/>
        <p style="margin:0">Thank you.</p>
        `
        return contentMail + signature;
    },
    SentReservationBooking: (data, branchID) => {
        const {
            language,
            saveCityValue,
            saveBranchValue,
            startDate,
            endDate,
            startTime,
            endTime,
            selectedRoom,
            roomAmount,
            guestAmount,
            guestInformation,
            // familyName
            // givenName,
            // gender,

            // secondFamilyName,
            // secondGivenName,
            SecondSelectedDay,
            SecondSelectedMonth,
            SecondSelectedYear,
            // secondGender,
            // bookerName,
            // booker,
            // email,
            // phone,
            // roomType,
            // contract,
            // company,
            // discount,
            // vat,
           
            pickupTime,
            pickupNumber,
            dropOffTime,
            dropOffNumber,
            earlyIn,
            lateOut,
            specialRequest
        } = data;

        const { familyName,
            givenName,
            gender,
            secondFamilyName,
            secondGivenName,
            secondGender,
            secondDay,
            secondMonth,
            secondYear,
            bookerName,
            booker,
            email,
            phone,
            roomType,
            year,
            month,
            day,
            contract,
            company,
            discount,
            payMethod,
            vat } = guestInformation.guest1
        
        // check guest on list  roomAmount =  1 => 5

        //console.log("data", data)
        const mainGuestName = gender+familyName.toUpperCase()+" "+givenName.toUpperCase();
        const secondGuestName = secondGender+secondFamilyName.toUpperCase()+" "+secondGivenName.toUpperCase();

        function checkLanguage() {
            if (language === "vie") return "VIETNAMESE";
            else if (language === "ja") return "JAPANESE";
            else return "ENGLISH";
        }

        let contentMail = `
        <ul>
        <li><strong>Place:</strong> ${saveCityValue.toUpperCase()}</li>
        <li><strong>Hotel's Name:</strong> ${saveBranchValue.toUpperCase()}</li>
        <li><strong>Kind of room:</strong> ${selectedRoom.toUpperCase()}</li>
        <li><strong>Language:</strong> <span style="color: #482979;">${checkLanguage()}</span></li>
        <br/>
        <li><strong>====================Date Information====================</strong></li>
        <li><strong>Check-in Date:</strong> ${startDate}</li>
        <li><strong>Check-in Time:</strong> ${startTime }</li>
        <li><strong>Check-out Date:</strong> ${endDate}</li>
        <li><strong>Check-out Time:</strong> ${endTime}</li>
        <li><strong>Total room: ${roomAmount}</li>
        <li><strong>Number of guest per room:</strong> ${guestAmount}</li>
        <li><strong>====================Date End==================</strong></li>
        <br/>`

        function checkBirthDay(year, month, day) {
            if (day === "Day" || month === "Month" || year === "Year") {
                return "";
            } else return year + "-" + month + "-" + day;
        }

        function roomInformation1(guestInformation, index) {
            const { 
                familyName,
                givenName,
                gender,
                day,
                month,
                year,
                secondFamilyName,
                secondGivenName,
                secondGender,
                secondDay,
                secondMonth,
                secondYear,
                roomType,
                contract,
                company,
                discount,
                vat,
                payMethod,
            } = guestInformation;

            const mainGuestName = gender + familyName.toUpperCase() + " " + givenName.toUpperCase();
            const secondGuestName = secondGender + secondFamilyName.toUpperCase() + " " + secondGivenName.toUpperCase();
            const birthDayGuest = checkBirthDay(year, month, day);
            const birthDaySecondGuest = checkBirthDay(secondYear, secondMonth, secondDay);
            const isNoteGuestSecond = secondGuestName === secondGender + " "

           let result = `<table>
                <tr>
                    <th style="border:1px solid">No.</th>
                    <th style="border:1px solid;min-width: 200px;">Guest Name</th>
                    <th style="border:1px solid;width: 80px;">Birth day</th>
                    <th style="border:1px solid">Room type</th>
                </tr>
                `
                
            !isNoteGuestSecond ? result = result + `
                <tr>
                    <td rowspan="3" style="border:1px solid">Room ${index}</td>
                    <td style="border:1px solid;padding-left: 5px;padding-right: 5px">${mainGuestName}</td>
                    <td style="border:1px solid;padding-left: 5px;padding-right: 5px">${birthDayGuest}</td>
                    <td rowspan="2" style="border:1px solid;padding-left: 5px;padding-right: 5px">${roomType}</td>
                </tr>
                <tr>
                    <td style="border:1px solid;padding-left: 5px;padding-right: 5px">${secondGuestName}</td>
                    <td style="border:1px solid;padding-left: 5px;padding-right: 5px">${birthDaySecondGuest}</td>
                </tr>
               ` : result = result +  `<tr>
                    <td rowspan="2" style="border:1px solid">Room ${index}</td>
                    <td style="border:1px solid;padding-left: 5px;padding-right: 5px">${mainGuestName}</td>
                    <td style="border:1px solid;padding-left: 5px;padding-right: 5px">${birthDayGuest}</td>
                    <td style="border:1px solid;padding-left: 5px;padding-right: 5px">${roomType}</td>
                </tr>`
                
            result = result + ` <tr>
                    <td colspan="3" style="border:1px solid">`
           
            result = result + ` <div style="padding-left: 5px;padding-right: 5px"><strong>VAT:</strong> ${vat}</div>
                    <div style="padding-left: 5px;padding-right: 5px"><strong>Payment method:</strong> ${payMethod}</div>
                    </td>
                </tr>
            </table>
            <br/>
            `
            
            return result;
        }

        if(roomAmount === 1) {
            const guest1 = `
            <li><strong>=========== Guest Information 1===========</strong></li>
            <li><strong>Guest's Name :</strong> ${mainGuestName}</li>
            <li><strong>Birthday :</strong> ${checkBirthDay(year, month, day)}</li>`

            contentMail = contentMail + guest1;

            if (familyName !== "" && secondFamilyName !== "") {
                contentMail = contentMail + `
                <br/>
                <li><strong>=========== Guest Information 2===========</strong></li>
                <li><strong>Guest's Name :</strong> ${secondGuestName}</li>
                <li><strong>Birthday :</strong> ${checkBirthDay(secondYear, secondMonth, secondDay)}</li>`    
            }

            const info = `<br/>
                <li><strong>=========== Guest Information End ===========</strong></li>
                <li><strong>Room Type:</strong> ${roomType}</li>
                <li><strong>Contract:</strong> ${contract}</li>
                <li style=${(contract === "契約なし" || contract === "No Contract" || contract === "Không hợp đồng") ? "display:none" : "display:block"}><strong>Company Name: </strong>${company}</li>
                <li style=${(contract === "契約なし" || contract === "No Contract" || contract === "Không hợp đồng") ? "display:none" : "display:block"}><strong>Discount: </strong>${discount}</li>
                <li><strong>VAT Invoice:</strong> ${vat === "" ? "No" : vat}</li>
                <li><strong>Payment method:</strong> ${payMethod === "" ? "individual" : payMethod}</li>`

            contentMail = contentMail + info;
        } else {
            contentMail = contentMail + `<li><strong>=========== Guest Information ===========</strong></li>`

            for(let i = 0; i < roomAmount; i++) {
                contentMail = contentMail + roomInformation1(guestInformation["guest"+(i+1)], i+1);
            }

            contentMail = contentMail + `<li><strong>=========== Guest Information End ===========</strong></li>
            <li><strong>Contract:</strong> ${contract}</li>
            <li style=${(contract === "契約なし" || contract === "No Contract" || contract === "Không hợp đồng") ? "display:none" : "display:block"}><strong>Company Name: </strong>${company}</li>
            <li style=${(contract === "契約なし" || contract === "No Contract" || contract === "Không hợp đồng") ? "display:none" : "display:block"}><strong>Discount: </strong>${discount}</li>`
        }
         
        function checkSpecialRequest() {
            let result = ``;
            if(specialRequest !=="") result = result + `<p>${specialRequest}</p>`
            if(pickupTime !== "") result = result + `<p>Pick Up: ${pickupNumber} @time: ${pickupTime}</p>`;
            if(dropOffTime !== "") result = result + `<p>Drop Off: ${dropOffNumber} @time: ${dropOffTime}</p>`;
            if(earlyIn !=="") result = result + `<p>Early Check In: ${earlyIn}</p>`;
            if(lateOut !=="") result = result + `<p>Late Out: ${lateOut}</p>`;
            return result;
        }

        //Same as person who will stay / Different with who will stay
        contentMail = contentMail + `
            <li><strong>Type Reservation:</strong> ${booker}</li>
            <li style=${booker==="Different with who will stay" ? "display:block":"display:none"}><strong>Name: </strong>${bookerName}</li>
            <li><strong>Email: </strong>${email}</li>
            <li><strong>Phone number: </strong>${phone}</li>
            <br/>
            <li><strong>Any special requirements:</strong>
            ${checkSpecialRequest()}
            </li>
        </ul>
        `
        return contentMail;
        //<a style="padding:8px;font-weight:600;border-radius:25px;background-color:#482979;color:white;text-decoration:none;margin-left:30px" href="http://localhost:3000/check_room/${branchID}/${booking_id}/${selectedRoom.toUpperCase()}">CHECK ON NEW DATABASE</a>
    },
    SentMailGuestAfterBooking: (data) => {
        const { mailGuest, mailRC, language } = data;
        let contentMail = `
            <p>
                ${mailGuest}様
            </p>
            <p>
                この度は東屋ホテルをご予約いただきまして誠にありがとうございます。
            </p>
            <p>
                お問い合わせいただき、ありがとうございます。
                info@azumayavietnam.comは自動返信メールですので、こちらに返信は不要です。
                まだ予約は確定しておりません。
            </p>
            <p>
                受付後、予約確認書がメールで送信されます。
                もし万が一、弊ホテルからのメールが届かない場合は、お手数ですが下記までご連絡ください。
            </p>
            <p>
                <a href="mailto:${mailRC}">${mailRC}</a>
            </p>
        `

        let contentMailEng = `
            <p>Dear Mr. ${mailGuest},</p>
            <p>Thank you for contacting Azumaya Vietnam.</p>
            <p>Please note that info@azumayavietnam.com is an automated email address. Kindly refrain from replying to it.</p>
            <p>Your reservation has not yet been completed. Our reception team will send you a booking confirmation shortly.</p>
            <p>If you do not receive any email or call from us, or if you have any questions, please feel free to contact our reception at the following address:</p>
            <p><a href="mailto:${mailRC}">${mailRC}</a></p>
        `
        
        let contentMailVni = `
            <p>Kính gửi Ông/Bà ${mailGuest},</p>
            <p>Xin chân thành cảm ơn Ông/Bà đã liên hệ với Azumaya Vietnam.</p>
            <p>Xin lưu ý rằng info@azumayavietnam.com là địa chỉ email tự động. Xin vui lòng không trả lời email này.</p>
            <p>Đơn đặt phòng của Ông/Bà vẫn chưa hoàn tất. Nhóm tiếp tân của chúng tôi sẽ gửi cho Ông/Bà xác nhận đặt phòng trong thời gian sớm nhất.</p>
            <p>Nếu Ông/Bà không nhận được bất kỳ email hoặc cuộc gọi nào từ chúng tôi, hoặc nếu có bất kỳ câu hỏi nào, xin vui lòng liên hệ với tiếp tân của chúng tôi theo địa chỉ sau:</p>
            <p><a href="mailto:${mailRC}">${mailRC}</a></p>
        `

        if (language === "vie") return contentMailVni;
        else if (language === "ja") return contentMail;
        else return contentMailEng;

    },
    SentMailGuestAfterMassage: (data) => {
        const { guestName, mailRC, language } = data;
        let contentMail = `
            <p>${guestName}様</p>
            <p>この度は東屋ホテルマッサージをご予約いただきまして誠にありがとうございます。</p>
            <p>info@azumayavietnam.comは自動返信メールですので、こちらに返信は不要です。 </p>
            <p>まだマッサージ予約は確定しておりません。</p>
            <p>確認後、予約確認書がメールで送信されます。</p>
            <p>万が一、当ホテルからのメールが届かない場合はお手数ですが下記までご連絡ください。</p>
            <p><a href="mailto:${mailRC}">${mailRC}</a></p>
        `

        let contentMailEng = `
            <p>Dear ${guestName},</p>
            <p>Thank you for contacting Azumaya Hotel.</p>
            <p>Please note that info@azumayavietnam.com is an automated email address. Kindly refrain from replying to it.</p>
            <p>Your massage has not yet been completed. Our reception team will send you a confirmation shortly.</p>
            <p>If you do not receive any email or call from us, or if you have any questions, please feel free to contact our reception at the following address:</p>
            <p><a href="mailto:${mailRC}">${mailRC}</a></p>
        `

        let contentMailVni = `
            <p>Kính gửi Ông/Bà ${guestName},</p>
            <p>Xin chân thành cảm ơn Ông/Bà đã liên hệ với Azumaya Hotel.</p>
            <p>Xin lưu ý rằng info@azumayavietnam.com là địa chỉ email tự động. Xin vui lòng không trả lời email này.</p>
            <p>Đơn đặt chỗ massage của Ông/Bà vẫn chưa hoàn tất. Tiếp tân của chúng tôi sẽ gửi cho Ông/Bà xác nhận massage trong thời gian sớm nhất.</p>
            <p>Nếu Ông/Bà không nhận được bất kỳ email hoặc cuộc gọi nào từ chúng tôi, hoặc nếu có bất kỳ câu hỏi nào, xin vui lòng liên hệ với tiếp tân của chúng tôi theo địa chỉ sau:</p>
            <p><a href="mailto:${mailRC}">${mailRC}</a></p>
        `

        if (language === "vie") return contentMailVni;
        else if (language === "ja") return contentMail;
        else return contentMailEng;

    },
    SentMailContract: (data, branch) => {
        const {
            companyName,
            address,
            companyURL,
            gender,
            firstName,
            lastName,
            email,
            phoneNumber,
            selectedCity,
            note
        } = data;

        let contentMail = `
        <div>Dear Chief,</div>
        <br/>
        <div>Today, we have guest request make contract to Azumaya Group </div>
        <div>Guest Information & Company: </div>
        <ul>
            <li><strong>Company Name:</strong> ${companyName}</li>
            <li><strong>Address:</strong> ${address}</li>
            <li><strong>Company Url:</strong> ${companyURL}</li>
            <li><strong>Guest Name:</strong> ${(gender ? gender :"") + firstName.toUpperCase()} ${lastName.toUpperCase()}</li>
            <li><strong>Email:</strong>${email}</li>
            <li><strong>Phone Number:</strong> ${[phoneNumber]}</li>
            <li><strong>Area request:</strong> ${selectedCity}</li>
            <li><strong>Note:</strong> ${note}</li>
        </ul>
        `

        return contentMail + signature;
    },
    SentMailMassageBooking: (data, branch, date) => {
        let contentMail;

        const {
            startTime,
            gender,
            guestName,
            option,
            phone,
            email,
            specialRequest
        } = data;

        contentMail = `<ul>
            <li><strong>Hotel's Name:</strong> Azumaya ${branch}</li>
            <li><strong>Date:</strong> ${date}</li>
            <li><strong>Time:</strong> ${startTime}</li>
            <li><strong>Massage case:</strong> ${option}</li> 
            <br/>
            <li><strong>----- Guest Information ----</strong></li>
            <li><strong>Guest name:</strong>${(gender ? gender :"") + guestName.toUpperCase()}</li>
            <li><strong>Phone:</strong></strong>${phone}</li>
            <li><strong>Email:</strong>${email}</li>
            <li><strong>Request:</strong>${specialRequest}</li>    
            <li><strong>----- End Guest Information ----</strong></li>
        </ul >`

        return contentMail
    },
    SentMailCheckBirthDay: ( data, today, nextOneDay, nextTwoDay, branchID) => {
        let contentMail;
        const { dataReturnGuestBirthDay,
                dataReturnGuestBirthDay2,
                dataReturnGuestBirthDay3, } = data;

        function renderTable(date, dataRender) {
            let result;
            result = `<div style="background: yellow;text-align: center;font-weight: 600;border: 1px solid;">${date}</div>`
            if(dataRender.length > 0) {
                result = result + `
                <table style="width: 100%;">
                <tr>
                  <th style="border: 1px solid;min-width: 300px;padding: 2px">Guest Name</th>
                  <th style="border: 1px solid;padding: 2px">Room</th>
                  <th style="border: 1px solid;padding: 2px">Check In</th>
                  <th style="border: 1px solid;padding: 2px">Check Out</th>
                  <th style="border: 1px solid;min-width: 300px;padding: 2px">Remark</th>
                  <th style="border: 1px solid;min-width: 70px;padding: 2px">Link</th>
                </tr>`

                dataRender.forEach(item => {
                    result = result + `<tr>
                    <td style="border: 1px solid;padding: 2px">${(item.gender ? "Ms." : "Mr.") + item.name}</td>
                    <td style="border: 1px solid;padding: 2px;text-align: center;">${item.roomSelect}</td>
                    <td style="border: 1px solid;padding: 2px;text-align: center;">${item.checkin}</td>
                    <td style="border: 1px solid;padding: 2px;text-align: center;">${item.checkout}</td>
                    <td style="border: 1px solid;padding: 2px">${item.remark}</td>
                    <td style="border: 1px solid;padding: 2px;text-align: center;">
                    <a href="${"http://database.azumayareport.com/room/"+branchID+"/"+item.booking_id}">link</a></td>
                    </tr>`
                })

                result = result + `</table><br/>`
            }   

            return result;

        }

        contentMail = `
        <p>Dear Chief,</p>
        <br/>
        <p>System report customer birthday </p>
        ${renderTable(today, dataReturnGuestBirthDay )}
        ${renderTable(nextOneDay, dataReturnGuestBirthDay2 )}
        ${renderTable(nextTwoDay, dataReturnGuestBirthDay3 )}
        <ul>`

        return contentMail + signature;
    },
    SentMailDoubleBookingOnAllBranch: (data, data2, date) => {
        let contentMail;

        contentMail = `
        <p>Dear Chief,</p>
        <br/>
        <p>System report customer double booking on all branch </p>
        <strong>Date check: ${date}</strong>
        <br/>
        <strong>Check by guest ID:</strong>`

        data.forEach( item => {
            contentMail = contentMail + `<p>* ${item}</p>`
        })

        contentMail = contentMail + `
        <br/>
        <strong>Check by name:</strong>
        `
        
        data2.forEach( item => {
            contentMail = contentMail + `<p>* ${item}</p>`
        })

        return contentMail + signature;
    }
};

const signature = `
<p> -------</p>
<div style="margin:auto;font-size:0.8rem">
<p>This is automatic mail by Az System</p>
<p>*** Contact to Mr.Hai if have any problem ***</p>
<p> <img src="//ssl.gstatic.com/mail/emoji/v7/png48/emoji_u1f48c.png" alt="" goomoji="1f48c" data-goomoji="1f48c" style="margin: 0px 0.2ex; vertical-align: middle; height: 24px; width: 24px;"> Mail: it@azumayavietnam.com</P>
<p> <img src="https://ssl.gstatic.com/mail/emoji/v7/png48/emoji_u1f4de.png" alt="" data-goomoji="1f4de" style="margin: 0px 0.2ex; vertical-align: middle; height: 24px; width: 24px;"> Phone: 0971474102</p>`


function renderGuestFeedback(guestOpinion, weekType) {
    var result = [];
    var count = 0;
    if (weekType !== "Month") {
        result.push(`<tr>
        <td style="width:690pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-color:yellow;" colspan="4">
        ${weekType}</td> 
        </tr>`)
        guestOpinion[weekType.toLowerCase().replace(" ", "")].forEach(opinion => {
            count += 1;
            return result.push(`<tr>
             <td style="width:50pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;">
            ${count}</td>
            <td style="width:120pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;">
            ${opinion.mdate + " @" + opinion.mtime}</td>
             <td style="width:70pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;">
            ${opinion.room_number}</td>
             <td style="width:400pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;">
            ${opinion.mcau8}</td>
            <td style="width:250pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;">
            ${opinion.mnotechange}</td>  </tr>`)
        })
    } else {
        const listKeyOnGuestOpinion = Object.keys(guestOpinion);
        listKeyOnGuestOpinion.forEach(week => {
            if (guestOpinion[week].length > 0) {
                result.push(`<tr>
                <td style="width:690pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-color:yellow;" colspan="5">
                ${week.toUpperCase()}</td> 
                </tr>`)
                guestOpinion[week].forEach(opinion => {
                    count += 1;
                    return result.push(`<tr>
                     <td style="width:50pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;">
                    ${count}</td>
                    <td style="width:120pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;">
                    ${opinion.mdate + " @" + opinion.mtime}</td>
                     <td style="width:70pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;">
                    ${opinion.room_number}</td>
                     <td style="width:400pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;">
                    ${opinion.mcau8}</td>
                    <td style="width:250pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;">
                    ${opinion.mnotechange}</td>
                    </tr>`)
                })
            }
        })
    }
    return result.join('')
}
function renderTitleTableScore(branch) {
    if (branch === 11 || branch === 14) {
        return `
            <tr>
                <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
                    <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">Week</font>
                </th>
                <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
                    <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">Reception</font>
                </th>
                <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
                    <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">Azuman</font>
                </th>
                <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
                    <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">Kitchen</font>
                </th>
                <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
                    <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">HouseKeeping</font>
                </th>
                <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
                    <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">Roten</font>
                </th>
                <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
                    <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">Massage</font>
                </th>
                <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
                     <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">Server</font>
                </th>
                <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
                     <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">Maintainer</font>
                </th>
          </tr>`
    } else {
        return `
        <tr>
        <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
            <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">Week</font>
        </th>
        <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
            <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">Reception</font>
        </th>
        <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
            <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">Azuman</font>
        </th>
        <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
            <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">Kitchen</font>
        </th>
        <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
            <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">HouseKeeping</font>
        </th>
        <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
            <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">Roten</font>
        </th>
        <th style="width:90pt;font-weight:700;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap">
            <font face="arial, sans-serif" color="#000000" style="background-color:rgb(255,255,255)">Massage</font>
        </th>
   </tr>`
    }
}
function renderSurveyScoreTable(calculatorWeek, week, branch) {

    if (calculatorWeek === undefined) {
        return (`<tr style="display:none" ></tr> `)
    }

    // branch CAM / MM 
    if (branch === 11 || branch === 14) {
        return (`
        <tr>
                <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
                ${week}</td>
                <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
                ${calculatorWeek.reception > 0 ? calculatorWeek.reception : ""}</td>
                <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
                ${calculatorWeek.azuman > 0 ? calculatorWeek.azuman : ""}</td>
                <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
                ${calculatorWeek.kitchen > 0 ? calculatorWeek.kitchen : ""}</td>
                <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
                ${calculatorWeek.hk > 0 ? calculatorWeek.hk : ""}</td>
                <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
                ${calculatorWeek.roten > 0 ? calculatorWeek.roten : ""}</td>
                <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
                ${calculatorWeek.massage > 0 ? calculatorWeek.massage : ""}</td >
                <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
                ${calculatorWeek.server > 0 ? calculatorWeek.server : ""}</td >
                <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
                ${calculatorWeek.maintainer > 0 ? calculatorWeek.maintainer : ""}</td >
            </tr > `)
    } else {
        return (`
        <tr>
            <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
            ${week}</td>
            <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
            ${calculatorWeek.reception > 0 ? calculatorWeek.reception : ""}</td>
            <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
            ${calculatorWeek.azuman > 0 ? calculatorWeek.azuman : ""}</td>
            <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
            ${calculatorWeek.kitchen > 0 ? calculatorWeek.kitchen : ""}</td>
            <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
            ${calculatorWeek.hk > 0 ? calculatorWeek.hk : ""}</td>
            <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
            ${calculatorWeek.roten > 0 ? calculatorWeek.roten : ""}</td>
            <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
            ${calculatorWeek.massage > 0 ? calculatorWeek.massage : ""}</td >
        </tr > `)
    }
}

function renderTablePickUpDropOffRentCar(data, dataGuest, branchID) {
    const { rentCarList , pickUpList, dropOffList} = data;
    let dataReturn = [];

    if(pickUpList.length > 0) {
        renderInformation(pickUpList, "pickUp","Pick Up")
    }

    if(dropOffList.length > 0) {
        renderInformation(dropOffList, "dropOff","Drop Off")
    }

    if(rentCarList.length > 0) {
        renderInformation(rentCarList, "rentCarList","Rent Car")
    }

    function makeGuestNameByList(list, dataGuest) {
        if(list.length === 1) {
            return (dataGuest[list[0]].gender ? "Ms." : "Mr.") + dataGuest[list[0]].name
        } else {
            let guestName = "";
            list.forEach((guestID, index) => {
                guestName = guestName + (dataGuest[guestID].gender ? "Ms." : "Mr.")  + dataGuest[guestID].name +","// ((dataGuest[guestID].gender ? "Ms." : "Mr.") + dataGuest[guestID].name) + (index === list.length - 1 ? "": "&")
            })

            return guestName;
        }
    }


   // const countLine = data.question1.split(b).length - 1;
   // <textarea disabled style="padding: 24px 4px;border: 1px solid black;width: 60%; min-height: ${countLine===0? 50 :30 + countLine*25}px;overflow: auto;">${data.question1}</textarea>

    function renderTextArea(dataRender) {
        const b="\n";
        const countLine = dataRender.split(b).length - 1;
        return `<textarea disabled style="padding: 24px 4px;border: 1px solid black;width: 97%; min-height: ${countLine===0? 50 :30 + countLine*25}px;overflow: auto;">${dataRender}</textarea>`
    }

    function renderInformation(dataRender, type, nameType) {
        dataRender.forEach(item => {
            // console.log("item", item)
            dataReturn.push(`
            <tr>
                <td style="width:50pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
                ${item.roomSelect}</td>
                <td style="width:200pt;min-width:200px;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;">
                ${makeGuestNameByList(item.list_guest_id, dataGuest)}</td>
                <td style="width:90pt;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
                ${nameType}</td>
                <td style="min-width:500px;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;">
                ${type === "rentCarList" ? renderTextArea(item[type].content) 
                : (item[type].flight +" " + "@" + item[type].time)}</td>
                <td style="min-width:50px;text-align:center;vertical-align:middle;border:0.5pt solid windowtext;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;padding:0px;white-space:nowrap;">
                    <a href="https://database.azumayareport.com/room/${branchID}/${item.booking_id}"}}>Link</a>
                </td>
            </tr>`)
        })
    }

    //return dataReturn;
    return dataReturn.join('')
}

module.exports = formatMail;
