import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import './prueba-pdf.css';

const PdfPreview: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePdfPreview = async () => {
    if (divRef.current) {
      setIsGenerating(true);
      const canvas = await html2canvas(divRef.current, { scale: 2 });
      const canvasHeight = canvas.height;
      const canvasWidth = canvas.width;

      const A4WidthPx = canvasWidth;
      const A4HeightPx = Math.floor((297 / 210) * canvasWidth);

      let pagesCount = Math.floor(canvasHeight / A4HeightPx);
      const remainder = canvasHeight % A4HeightPx;

      if (remainder > A4HeightPx / 2) {
        pagesCount++;
      }

      const pageImages: string[] = [];
      
      for (let i = 0; i < pagesCount; i++) {
        const canvasPage = document.createElement("canvas");
        canvasPage.width = A4WidthPx;
        canvasPage.height = A4HeightPx;

        const ctx = canvasPage.getContext("2d");
        if (ctx) {
          ctx.drawImage(
            canvas,
            0,
            -i * A4HeightPx,
            A4WidthPx,
            canvasHeight
          );
          pageImages.push(canvasPage.toDataURL("image/png"));
        }
      }

      const pdf = new jsPDF("portrait", "mm", "a4");

      pageImages.forEach((page, index) => {
        if (index > 0) pdf.addPage();
        pdf.addImage(page, "PNG", 0, 0, 210, 297);
      });
      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generatePdfPreview(); 
  }, []);

  return (
    <div>
      {pdfUrl && (
        <div style={{ width: "100vw", height: "100vh" }}>
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%"
            title="Vista previa del PDF"
            frameBorder="0"
          />
        </div>
      )}

      <div
        ref={divRef}
        style={{
          width: "210mm",
          backgroundColor: "#fff",
          color: "black",
          padding: "20px",
          marginTop: "20px",
          position: 'absolute',
          clip: 'rect(0, 0, 0, 0)',
        }}
      >
        <div style={{ height: "297mm", }}>
          <div style={{ padding: '20px', fontSize: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <p style={{ fontSize: '10px' }}>
                  <strong>Form W-4</strong>
                </p>
                <p style={{ fontSize: '10px' }}>Department of the Treasury</p>
                <p style={{ fontSize: '10px' }}>Internal Revenue Service</p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <h2 style={{ textAlign: 'center', fontSize: '14px', }}>
                  Employee's Withholding Certificate
                </h2>
                <p style={{ textAlign: 'center', fontSize: '10px'}}>
                  Complete Form W-4 so that your employer can withhold the correct
                  federal income tax from your pay.
                </p>
                <p style={{ textAlign: 'center', fontSize: '10px'}}>
                  Give Form W-4 to your employer.
                </p>
                <p style={{ textAlign: 'center', fontSize: '10px' }}>
                  Your withholding is subject to review by the IRS.
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '10px' }}>OMB No. 1545-0074</p>
                <p style={{ fontSize: '10px' }}>2025</p>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid black', textAlign: 'left', width: '10%' }} rowSpan={4}> 
                    Step 1:<br />
                    Enter<br />
                    Personal<br />
                    Information
                  </td>
                  <td style={{ border: '1px solid black', width: '35%' }}>
                    (a) First name and middle initial
                    <br />
                    <input type="text" style={{ width: '100%' }} />
                  </td>
                  <td style={{ border: '1px solid black', width: '35%' }}> 
                    Last name
                    <br />
                    <input type="text" style={{ width: '100%' }} />
                  </td>
                  <td style={{ border: '1px solid black', width: '20%' }}> 
                    (b) Social security number
                    <br />
                    <input type="text" style={{ width: '100%' }} />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ border: '1px solid black'}}>
                    Address
                    <br />
                    <input type="text" style={{ width: '100%' }} />
                  </td>
                  <td rowSpan={2} style={{ border: '1px solid black' }}>
                    Does your name match the name on your social security card? If not, to ensure you get credit for your earnings, contact SSA at 800-772-1213 or go to www.ssa.gov.
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ border: '1px solid black'}}>
                    City or town, state, and ZIP code
                    <br />
                    <input type="text" style={{ width: '100%' }} />
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} style={{ border: '1px solid black'}}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        <tr>
                          <td style={{ textAlign: 'left' }}>(c)</td>
                          <td style={{ textAlign: 'left' }}><input type="checkbox" /> Single or Married filing separately</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: 'left' }}></td>
                          <td style={{ textAlign: 'left' }}><input type="checkbox" /> Married filing jointly or Qualifying surviving spouse</td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: 'left' }}></td>
                          <td style={{ textAlign: 'left' }}><input type="checkbox" /> Head of household (Check only if you're unmarried and pay more than half the costs of keeping up a home for yourself and a qualifying individual.)</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <p style={{ fontSize: '10px', textAlign: 'left' }}>
              TIP: Consider using the estimator at www.irs.gov/W4App to determine the most accurate withholding for the rest of the year if: you
              are completing this form after the beginning of the year; expect to work only part of the year; or have changes during the year in your
              marital status, number of jobs for you (and/or your spouse if married filing jointly), dependents, other income (not from jobs),
              deductions, or credits. Have your most recent pay stub(s) from this year available when using the estimator. At the beginning of next
              year, use the estimator again to recheck your withholding.
              Complete Steps 2–4 ONLY if they apply to you; otherwise, skip to Step 5. See page 2 for more information on each step, who can
              claim exemption from withholding, and when to use the estimator at www.irs.gov/W4App
            </p>

            <p style={{ fontSize: '10px', textAlign: 'left' }}>
              Complete Steps 2–4 ONLY if they apply to you; otherwise, skip to Step 5. See page 2 for more information on each step, who can
              claim exemption from withholding, and when to use the estimator at www.irs.gov/W4App
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse'}}>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid black', textAlign: 'left', width: '15%' }}>
                    Step 2:<br />
                    Multiple Jobs <br />
                    or Spouse <br />
                    Works
                  </td>
                  <td style={{ border: '1px solid black', width: '85%' }}>
                    <p style={{ fontSize: '10px', textAlign: 'left' }}>
                      Complete this step if you (1) hold more than one job at a time, or (2) are married filing jointly and your spouse
                      also works. The correct amount of withholding depends on income earned from all of these jobs.
                      Do only one of the following.
                      (a) Use the estimator at www.irs.gov/W4App for the most accurate withholding for this step (and Steps 3–4). If
                      you or your spouse have self-employment income, use this option; or
                      (b)Use the Multiple Jobs Worksheet on page 3 and enter the result in Step 4(c) below; or
                      (c) If there are only two jobs total, you may check this box. Do the same on Form W-4 for the other job. This
                      option is generally more accurate than (b) if pay at the lower paying job is more than half of the pay at the
                      higher paying job. Otherwise, (b) is more accurate
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ border: '1px solid black' }}>
                    <p style={{ fontSize: '10px', textAlign: 'left' }}>
                      Complete Steps 3–4(b) on Form W-4 for only ONE of these jobs. Leave those steps blank for the other jobs. (Your withholding will
                      be most accurate if you complete Steps 3–4(b) on the Form W-4 for the highest paying job.)
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <table style={{ width: '100%', borderCollapse: 'collapse'}}>
              <tbody>
                <tr style={{ borderBottom:'1px solid black', marginBottom:""}}>
                  <td style={{ textAlign: 'left', width: '15%',verticalAlign: "top" }}>
                  <strong>
                    Step 3:<br />
                    Claim <br />
                    Dependent <br />
                    and Other<br />
                    Credits 
                  </strong>

                  </td>
                  <td style={{ width: '70%' }}>
                    <p style={{ fontSize: '10px', textAlign: 'left',marginBottom:"0px"}}>
                    If your total income will be $200,000 or less ($400,000 or less if married filing jointly): 
                    </p>

                    <div style={{ fontSize: '10px', textAlign: 'left', marginLeft: "15px", marginBottom: "0px", paddingTop: "8px", display: "flex", alignItems: "center" }}>
                      <p style={{ width: '80%',marginBottom: "0px" }}>
                        Multiply the number of qualifying children under age 17 by $2,000
                      </p>
                      <span><strong>$</strong></span>
                      <input type="text" style={{ width: '20%', borderBottom: '0.5px solid black', borderTop: 'none',borderLeft:"none",borderRight:"none", padding: '0', margin: '0 5px' }} />
                    </div>

                    <div style={{ fontSize: '10px', textAlign: 'left', marginLeft: "15px", marginBottom: "0px", paddingTop: "8px", display: "flex", alignItems: "center" }}>
                      <p style={{ width: '80%',marginBottom: "0px" }}>
                        Multiply the number of other dependents by $500 . . . . . 
                      </p>
                      <span><strong>$</strong></span>
                      <input type="text" style={{ width: '20%', borderBottom: '0.5px solid black', borderTop: 'none',borderLeft:"none",borderRight:"none", padding: '0', margin: '0 5px' }} />
                    </div>

                    <p style={{ fontSize: '10px', textAlign: 'left',marginBottom:"0px",paddingTop:"8px"  }}>
                      Add the amounts above for qualifying children and other dependents. You may add to 
                      this the amount of any other credits. Enter the total here . . . . . . . . . .
                    </p>
                  </td>
                  <td style={{borderLeft: '1px solid black', borderBottom: '1px solid black', textAlign: 'center', width: '5%', verticalAlign: "bottom"  }}>
                  <strong>3</strong>
                  </td>
                  <td style={{borderLeft: '1px solid black', borderBottom: '1px solid black', textAlign: 'center', width: '10%',verticalAlign: "bottom"  }}>
                  <span><strong>$</strong></span>
                     <input type="text" style={{ width: '90%',border:"none"}} />
                  </td>   
                </tr>
              </tbody>
            </table>

            <table style={{ width: '100%', borderCollapse: 'collapse',alignContent:"baseline"}}>
              <tbody>
                <tr>
                  <td rowSpan={3} style={{ textAlign: 'left', width: '15%',verticalAlign: "top"}}>
                    <strong>
                    Step 4:<br />
                    (optional):  <br />
                    Other <br />
                    Adjustments
                  </strong>
                  </td>
                  <td style={{  width: '70%'}}>
                  <p style={{ fontSize: '10px', textAlign: 'left',marginBottom:"0px"  }}>
                  <strong>(a) Other income (not from jobs).</strong> If you want tax withheld for other income you 
                    expect this year that won’t have withholding, enter the amount of other income here. 
                    This may include interest, dividends, and retirement income . . . . . . . 
                  </p>
                </td>
                  <td style={{ borderLeft: '1px solid black', borderBottom: '1px solid black',textAlign: 'center', width: '5%', verticalAlign: "bottom" }}>
                  <strong>4 (a)</strong>
                  </td>
                  <td style={{   borderLeft: '1px solid black', borderBottom: '1px solid black', textAlign: 'center', width: '10%',verticalAlign: "bottom"  }}>
                  <span><strong>$</strong></span>
                     <input type="text" style={{ width: '90%',border:"none"}} />
                  </td>   
                </tr>
                <tr>
                  <td style={{  width: '70%',paddingTop:"8px"  }}>
                    <p style={{ fontSize: '10px', textAlign: 'left',marginBottom:"0px"  }}>
                    <strong>(b) Deductions.</strong> If you expect to claim deductions other than the standard deduction and 
                        want to reduce your withholding, use the Deductions Worksheet on page 3 and enter 
                        the result here . .
                    </p>
                  </td>
                  <td style={{  borderLeft: '1px solid black', borderBottom: '1px solid black', textAlign: 'center', width: '5%' , verticalAlign: "bottom"}}>
                  <strong>4 (b)</strong>
                  </td>
                  <td style={{   borderLeft: '1px solid black', borderBottom: '1px solid black', textAlign: 'center', width: '10%',verticalAlign: "bottom"  }}>
                     <span><strong>$</strong></span>
                     <input type="text" style={{ width: '90%',border:"none"}} />
                  </td>   
                </tr>
                <tr>
                  <td style={{  width: '70%',paddingTop:"8px"  }}>
                    <p style={{ fontSize: '10px', textAlign: 'left',marginBottom:"0px"  }}>
                    <strong>(c) Extra withholding.</strong> Enter any additional tax you want withheld each pay period . .
                    </p>
                  </td>
                  <td style={{  borderLeft: '1px solid black', borderBottom: '1px solid black',textAlign: 'center', width: '5%', verticalAlign: "bottom" }}>
                  <strong>4 (c)</strong>
                  </td>
                  <td style={{   borderLeft: '1px solid black', borderBottom: '1px solid black', textAlign: 'center', width: '10%',verticalAlign: "bottom"  }}>
                  <span><strong>$</strong></span>
                     <input type="text" style={{ width: '90%',border:"none"}} />
                  </td>   
                </tr>
              </tbody>
            </table>

            <table style={{ width: '100%', borderCollapse: 'collapse'}}>
              <tbody>
                <tr>
                  <td style={{  textAlign: 'left', width: '10%' }}>
                    Step 5:<br />
                    Sign <br />
                    Here
                  </td>
                  <td style={{  width: '90%' }}>
                    <p style={{ fontSize: '10px', textAlign: 'left' }}>
                    Under penalties of perjury, I declare that this certificate, to the best of my knowledge and belief, is true, correct, and complete.
                    </p>
                  </td> 
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ height: "297mm" }}>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
            <tbody>
              <tr>
                <td colSpan={14} style={{ border: '1px solid black', textAlign: 'center', fontWeight: 'bold'}}>
                  Married Filing Jointly or Qualifying Surviving Spouse
                </td>
              </tr>
              <tr>
                <td colSpan={2} rowSpan={2} style={{ border: '1px solid black', textAlign: 'center' }}>
                  Higher Paying Job Annual Taxable Wage & Salary
                </td>
                <td colSpan={12} style={{ border: '1px solid black', textAlign: 'center' }}>
                  Lower Paying Job Annual Taxable Wage & Salary
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>$0-9,999</td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>$10,000-19,999</td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>$20,000-29,999</td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>$30,000-39,999</td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>$40,000-49,999</td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>$50,000-59,999</td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>$60,000-69,999</td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>$70,000-79,999</td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>$80,000-89,999</td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>$90,000-99,999</td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>$100,000-109,999</td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>$110,000-120,000</td>
              </tr>

              <tr>
                <td colSpan={2} style={{ border: '1px solid black', textAlign: 'right' }}>
                  $0-9,999
                  $10,000-19,999
                  $20,000-29,999
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  $0<br />
                  0<br />
                  700
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  $0<br />
                  700<br />
                  1,700
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  $700<br />
                  1,700<br />
                  2,760
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  $850<br />
                  1,910<br />
                  3,110
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  $910<br />
                  2,110<br />
                  3,110
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  $1,020<br />
                  2,220<br />
                  3,420
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  $1,020<br />
                  2,220<br />
                  3,420
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  $1,020<br />
                  2,220<br />
                  3,420
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  $1,020<br />
                  2,220<br />
                  3,420
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  $1,020<br />
                  2,220<br />
                  3,420
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  $1,020<br />
                  2,220<br />
                  4,420
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  $1,020<br />
                  3,220<br />
                  5,420
                </td>
              </tr>

              <tr>
                <td colSpan={2} style={{ border: '1px solid black', textAlign: 'right' }}>
                  $30,000 - 39,999<br />
                  $40,000 - 49,999<br />
                  $50,000 - 59,999
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  850<br />
                  910<br />
                  1,020
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  1,910<br />
                  2,110<br />
                  2,220
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  3,110<br />
                  3,310<br />
                  3,420
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  3,460<br />
                  3,660<br />
                  3,770
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  3,660<br />
                  3,860<br />
                  3,970
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  3,770<br />
                  3,970<br />
                  4,080
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  3,770<br />
                  3,970<br />
                  4,080
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  3,770<br />
                  4,970<br />
                  5,080
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  4,770<br />
                  5,970<br />
                  6,080
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  5,770<br />
                  6,970<br />
                  7,080
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  6,770<br />
                  7,970<br />
                  8,080
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  9,080
                </td>
              </tr>

              <tr>
                <td colSpan={2} style={{ border: '1px solid black', textAlign: 'right' }}>
                  $60,000 - 69,999<br />
                  $70,000 - 79,999<br />
                  $80,000 - 99,999
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  1,020<br />
                  1,020<br />
                  1,020
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  2,220<br />
                  2,220<br />
                  2,220
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  3,420<br />
                  3,420<br />
                  3,420
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  3,770<br />
                  3,770<br />
                  4,620
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  3,970<br />
                  3,970<br />
                  5,820
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  4,080<br />
                  5,080<br />
                  6,930
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  5,080<br />
                  6,080<br />
                  7,930
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  6,080<br />
                  7,080<br />
                  8,930
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  7,080<br />
                  8,080<br />
                  9,930
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  8,080<br />
                  9,080<br />
                  10,930
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  9,080<br />
                  10,080<br />
                  11,930
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  10,080<br />
                  11,080<br />
                  12,930
                </td>
              </tr>

              <tr>
                <td colSpan={2} style={{ border: '1px solid black', textAlign: 'right' }}>
                  $100,000 - 149,999<br />
                  $150,000 - 239,999<br />
                  $240,000 - 259,999
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  1,870<br />
                  1,870<br />
                  2,040
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  4,070<br />
                  4,240<br />
                  4,440
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  6,270<br />
                  6,640<br />
                  6,840
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  7,620<br />
                  8,190<br />
                  8,390
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  8,820<br />
                  9,590<br />
                  9,790
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  9,930<br />
                  10,890<br />
                  11,100
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  10,930<br />
                  12,090<br />
                  12,300
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  11,930<br />
                  13,290<br />
                  13,500
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  12,930<br />
                  14,490<br />
                  14,700
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  14,010<br />
                  15,690<br />
                  15,900
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  15,210<br />
                  16,890<br />
                  17,100
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  16,410<br />
                  18,090<br />
                  18,300
                </td>
              </tr>

              <tr>
                <td colSpan={2} style={{ border: '1px solid black', textAlign: 'right' }}>
                  $260,000 - 279,999<br />
                  $280,000 - 299,999<br />
                  $300,000 - 319,999
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  2,040<br />
                  2,040<br />
                  2,040
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  4,440<br />
                  4,440<br />
                  4,440
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  6,840<br />
                  6,840<br />
                  6,840
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  8,390<br />
                  8,390<br />
                  8,390
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  9,790<br />
                  9,790<br />
                  9,790
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  11,100<br />
                  11,100<br />
                  11,100
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  12,300<br />
                  12,300<br />
                  12,300
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  13,500<br />
                  13,500<br />
                  13,500
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  14,700<br />
                  14,700<br />
                  14,700
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  15,900<br />
                  15,900<br />
                  15,900
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  17,100<br />
                  17,100<br />
                  17,170
                </td>
                <td style={{ border: '1px solid black', textAlign: 'right' }}>
                  18,300<br />
                  18,300<br />
                  19,170
                </td>
              </tr>


              <tr>
                <td colSpan={2} style={{ border: '1px solid black', padding: '2px', textAlign: 'right' }}>
                  $320,000 - 364,999<br />
                  $365,000 - 524,999<br />
                  $525,000 and over
                </td>
                <td style={{ border: '1px solid black', padding: '2px', textAlign: 'right' }}>
                  2,040<br />
                  2,790<br />
                  3,140
                </td>
                <td style={{ border: '1px solid black', padding: '2px', textAlign: 'right' }}>
                  4,440<br />
                  6,290<br />
                  6,840
                </td>
                <td style={{ border: '1px solid black', padding: '2px', textAlign: 'right' }}>
                  6,840<br />
                  9,790<br />
                  10,540
                </td>
                <td style={{ border: '1px solid black', padding: '2px', textAlign: 'right' }}>
                  8,390<br />
                  12,440<br />
                  13,390
                </td>
                <td style={{ border: '1px solid black', padding: '2px', textAlign: 'right' }}>
                  9,790<br />
                  14,940<br />
                  16,090
                </td>
                <td style={{ border: '1px solid black', padding: '2px', textAlign: 'right' }}>
                  11,100<br />
                  17,350<br />
                  18,700
                </td>
                <td style={{ border: '1px solid black', padding: '2px', textAlign: 'right' }}>
                  12,470<br />
                  19,650<br />
                  21,200
                </td>
                <td style={{ border: '1px solid black', padding: '2px', textAlign: 'right' }}>
                  14,470<br />
                  21,950<br />
                  23,700
                </td>
                <td style={{ border: '1px solid black', padding: '2px', textAlign: 'right' }}>
                  16,470<br />
                  24,250<br />
                  26,200
                </td>
                <td style={{ border: '1px solid black', padding: '2px', textAlign: 'right' }}>
                  18,470<br />
                  26,550<br />
                  28,700
                </td>
                <td style={{ border: '1px solid black', padding: '2px', textAlign: 'right' }}>
                  20,470<br />
                  28,850<br />
                  31,200
                </td>
                <td style={{ border: '1px solid black', padding: '2px', textAlign: 'right' }}>
                  22,470<br />
                  31,150<br />
                  33,700
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>                 
  );
};

export default PdfPreview;