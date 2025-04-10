import React from 'react';

const html_confidentiality: any = (
    <>
        <h5 style={{ textDecoration: 'underline',fontSize:'0.8rem' }}>CLIENT CONFIDENTIALITY AND ASSIGNMENT AGGREMENT</h5>
        <p style={{ fontSize:'0.7rem' }}>In consideration of my employment with Reliable Reports of Texas, Inc. d/b/a Reliable Reports, Inc. ("Reliable") and my assignment to work for Reliable and/or the subsidiaries and affiliates of those clients ("Clients"), I hereby agree as follows:</p>
        <p style={{ fontSize:'0.7rem' }}><strong style={{ textDecoration: 'underline' }}>1. Confidential Data.</strong> As a result of my employment with Reliable, I may develop, obtain, or learn about confidential information which is the property of Reliable or its Clients (collectively "Confidential Data"). Confidential Data includes any information (including information not generally known or used by others and which gives, or may give, Clients an advantage over its competitors or which could cause Clients injury if disclosed) that is disclosed to me by Reliable in writing, orally or otherwise. This includes but is not necessarily limited to data or information of Client(s) which identifies or concerns past, current or potential customers, business practices, financial results, research development plans; marketing plans; financial information and material identified (in writing) as "Confidential"; and/or trade secrets developed by Client(s) that are received by Reliable. Confidential Data may be made known to me during the course of my employment with Reliable. I acknowledge that the nature of the information that Reliable and I may become aware of during this engagement is highly sensitive in nature. The intent of the parties is that these provisions be interpreted as broadly as possible to protect Confidential Data.</p>
        <p style={{ fontSize:'0.7rem' }}><strong style={{ textDecoration: 'underline' }}>2. Maintenance of Confidential Data:</strong> I will maintain the strict confidentiality of Confidential Data and in particular will not copy or use any Confidential Data for myself or reveal it to others either during or after termination of my employment. When my employment with Reliable ends, I will return to Reliable within five (5) business days all materials pertaining to Confidential Data prepared by me for company use.</p>
        <p style={{ fontSize:'0.7rem' }}><strong style={{ textDecoration: 'underline' }}>3. Ownership of Intellectual Property:</strong> I promptly disclose and assign to Reliable all right, title, and interest in inventions, discoveries, improvements, techniques, programs, methods, formulas, processes, systems, computer programs, software, programming languages, software, computer programs, techniques, improvements, documentation, research, development, marketing plans, customer lists, business, and other technical and non-technical data resulting from work performed under this agreement, whether conceived alone or jointly with others, including without limitation employees, agents, contractors, clients, and assigns. I further agree to assist and use my best efforts to cooperate in helping Reliable and its clients obtain, extend, and enforce intellectual property rights in connection with the intellectual property worldwide.</p>
    </>
);

const html_background: any = (
    <>
        <h5 style={{ textDecoration: 'underline',fontSize:'0.8rem' }}>AUTHORIZATION FOR BACKGROUND CHECKS</h5>
        <p  style={{ fontSize:'0.7rem' }}>I instruct and authorize the Released Parties of Texas, Inc. d/b/a Reliable Reports, Inc., including its agents and employees (collectively "Company") to obtain a consumer report(s) on me, including any investigative consumer reports and any consumer credit reports.* I also agree that a copy of this form is valid like the signed original.</p>
        <p  style={{ fontSize:'0.7rem' }}>The consumer reporting agency ("CRA") ADP Screening and Selection Services, Inc. ("ADP SASS") will prepare the consumer report(s) for the Company. ADP SASS is located at 2505 East Parham Road, Richmond, VA 23228-2360, COI5, 80528, and can be reached by phone at 800-367-5933 or at www.adpselect.com.</p>
        <p  style={{ fontSize:'0.7rem' }}>I understand that where allowed by applicable law, the Company may rely on this authorization to order additional consumer reports, including investigative consumer reports,* during my employment without asking me for my authorization again. Where allowed by law I authorize the Company to provide any such subsequent reports.* I also understand that if I disagree with anything in my report(s), I will notify the Company within seven days of my receipt of the report(s).</p>
        <p style={{ fontSize:'0.7rem' }}>I also instruct and authorize the following persons agencies and entities to disclose to ADP SASS and its agents all information about or concerning me as allowed by law including but not limited to: my past or present employers; learning institutions; including colleges and universities; law enforcement agencies; all federal state and local agencies; federal state and local courts; The military; credit bureaus; testing facilities motor vehicle records agencies if applicable workers compensation records* public record repositories: social media platforms: information about my general reputation personal characteristics mode of living educational background licenses professional credentials driving record drug/alcohol testing results criminal history civil record military service subject interview worker's compensation claims* Social Security Number verification current address previous addresses names dates of employment work experience.</p>
        <p style={{ fontSize:'0.7rem' }}><strong>*I understand that I am instructing and authorizing the Company to obtain a *consumer report* that may include information about me obtained from social media platforms only to extent permitted by law If I reside or work outside California Minnesota or Oklahoma where specific notice is required before procuring a *consumer credit report*, this authorization shall serve as such notice.</strong></p>
        <p style={{ fontSize:'0.7rem' }}><strong>By signing below. I understand that this Authorization form shall remain valid throughout my employment unless prohibited by applicable law.</strong></p>
    </>
);

const html_borrowed: any = (
    <>
        <h5 style={{ textDecoration: 'underline' ,fontSize:'0.8rem'}}>CONSENT FOR PAY DEDUCTION TO REPAY BORROWED VACATION TIME</h5>
        <p  style={{ fontSize:'0.7rem' }}>I acknowledge and agree that if I am authorized by Reliable Reports of Texas, Inc. d/b/a Reliable Reports, Inc. ("Company") to borrow paid vacation time before completing one year of employment (i.e., my first anniversary), the borrowed time constitutes an advance or loan provided by the Company.</p>
        <p  style={{ fontSize:'0.7rem' }}>In the event that my employment with the Company ends for any reason before reaching my one-year anniversary, I agree to repay the Company for the borrowed vacation time. I authorize the Company to deduct any amount owed from my final paycheck, in compliance with applicable state and federal laws.</p>
        <p  style={{ fontSize:'0.7rem' }}>This consent is given voluntarily and acknowledges that the Company has the right to withhold the owed amount from any final wages due to me.</p>
    </>
);

const getHtmlContent = (type: number): any => {
    switch (type) {
        case 2:
            return html_confidentiality;
        case 5:
            return html_background;
        case 9:
            return html_borrowed;
        default:
            return <p>Undefined</p>;
    }
};

export default getHtmlContent;
