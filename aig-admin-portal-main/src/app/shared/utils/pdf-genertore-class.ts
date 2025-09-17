// import { DatePipe } from '@angular/common';
// import { Injectable } from '@angular/core';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// import { Transaction } from 'src/app/users/models/transaction';
// @Injectable()
// export class PdfGenertoreClass {



//     transaction = new Transaction();
//     constructor(public datePipe: DatePipe) {
//         pdfMake!.vfs = pdfFonts.pdfMake.vfs; // Set vfs property directly
//     }
//     generatePdf(action = 'open', transaction?: any) {
//         this.transaction = transaction ? transaction : new Transaction()
//         const documentDefinition = this.getDocumentDefinition();
//         switch (action) {
//             case 'open': pdfMake.createPdf(documentDefinition).open(); break;
//             //  case 'print': pdfMake.createPdf(documentDefinition).print(); break;
//             case 'download': pdfMake.createPdf(documentDefinition).download(); break;
//             default: pdfMake.createPdf(documentDefinition).open(); break;
//         }
//        //   this.exportAsPDF()
//        // this.generatePDF()
//     }

//     getDocumentDefinition(): any {
//         return {
//             content: [
//                 {
//                     text: 'Transaction Invoice',
//                     bold: true,
//                     fontSize: 20,
//                     alignment: 'center',
//                     margin: [0, 0, 0, 20]
//                 },
//                 {
//                     text: `Transaction ID: ${this.transaction.txnId}\nTransaction Date: ${this.datePipe.transform(this.transaction.createdDate, 'medium')}`

//                 },
//                 {
//                     text: `User Name: ` + this.transaction.firstName + ` ` + this.transaction.lastName + `\nEmail:` + this.transaction.email,
//                 },
//                 {
//                     text: 'Description',
//                     style: 'header'
//                 },
//                 {
//                     table: {
//                         headerRows: 1,
//                         widths: ['auto'],
//                         body: [
//                             [this.transaction.description,]

//                         ]
//                     }
//                 },
//                 {
//                     text: `Amount: ₦` + this.transaction.amount,
//                     style: 'total'
//                 }
//             ],

//             styles: {
//                 header: {
//                     fontSize: 18,
//                     bold: true,
//                     margin: [0, 20, 0, 10],
//                     decoration: 'underline'
//                 },
//                 total: {
//                     fontSize: 14,
//                     bold: true,
//                     alignment: 'right',
//                     margin: [0, 20, 0, 10]
//                 }
//             }
//         };
//     }

//     getCurrentDate(): string {
//         const today = new Date();
//         const dd = String(today.getDate()).padStart(2, '0');
//         const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
//         const yyyy = today.getFullYear();
//         return `${mm}/${dd}/${yyyy}`;
//     }


//     exportAsPDF() {
//         // // Create a temporary container element
//         // const doc = new jsPDF({
//         //     orientation:'p',
//         //     unit: 'pt',
//         //     format: 'a4' // A4 dimensions (210 x 297 mm)
//         // });
//         // //  unit?: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc",
//         // //  orientation?: "p" | "portrait" | "l" | "landscape",
//         // // let jspdf = new jsPDF('p', 'mm', 'a4');
//         // // Add HTML content to PDF
//         // doc.html(this.htmlContent, {
//         //     callback: () => {
//         //         // Save PDF
//         //         doc.save("filename.pdf");
//         //     }
//         // });
//       //  this.generatePDF()
//     }
//     htmlContent = `
//     <!DOCTYPE html>
//     <html lang="en">
    
//     <head>

//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <!-- CUSTOME CSS  -->
//     <link rel="stylesheet" href="assets/css/style.css">
//     <!-- BOOTSTRAP CSS  -->
//     <link rel="stylesheet" href="assets/css/bootstrap.min.css">
//     <!-- FONT CSS  -->
//     <link rel="stylesheet" href="assets/css/stylesheet.css">
//     <!-- GOGGLE ICON-->
//     <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
//     <!-- FLATICON-->
//     <link rel="stylesheet" href="assets/css/uicons-bold-rounded.css">
//     <link rel="stylesheet" href="assets/css/uicons-regular-straight.css">
//     <link rel="stylesheet" href="assets/css/uicons-solid-rounded.css">
//     <link rel="stylesheet" href="assets/css/uicons-solid-straight.css">
//     <link rel="stylesheet" href="assets/css/uicons-regular-rounded.css">
//     <!-- Flaticon -->
//     <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.0.0/uicons-thin-rounded/css/uicons-thin-rounded.css'>
//     <title>AIG Invoice</title>
//     <style>
//     .top_border {
//         background-color: rgba(31, 55, 120, 0.40);
//         height: 30.584px;
//     }
//     .bottom_border{
//         background-color: #30417E;
//         height: 33px;
//         position: absolute;
//     bottom: 0;
//     width: 100%;
//     }
//     .logo_background {
//     width: 270px;
//     flex-shrink: 0;
//     background-color: #1F3778;
//     padding: 30px 40px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     border-radius: 0px 0px 40px 0px;
//     position: absolute;
//     top: 0;
// }
// .invoice_details {
//     padding-top: 209px;
// }
// .invoice_text h2,
// .invoice_text h3{
//     font-size: 18px;
//     font-weight: 600;
//     color:#1A1A1A;
// }
// .invoice_title{
//     font-size: 24px;
//     font-weight: 900;
//     color: #1A1A1A;
// }
// .table_background{
//     background-color: #EDEFF4;
//     padding: 8px;
//     margin:50px 0px 50px;
// }
// .table_invoice{
//     background-color: #fff;
// }
//  tr{
//     border-color: inherit;
//     border-style: hidden;
//     border-width: 0;
// }
// .invoice_total h3,
// .invoice_total h4{
//     font-size: 18px;
//     font-weight: 600;
//     color: #1F3778;
// }
// .subtotal{
//     background-color: #1F3778;
//     color: #fff;
//     padding: 12px;
// }
// .invoice_content{
//     height: 100vh;
// }
// </style>
//     </head>
   
    
//     <body>
//         <!-- INVOICE START-->
//         <div class="d-flex" id="pdf">
//             <!-- MIDDLE CONTENT START -->
//             <div class="w-100" style="background-color:red">
//                 <div class="container">
//                     <DIV class="col-md-8 m-auto position-relative invoice_content">
//                        <div class="position-relative">
//                         <div class="top_border">
//                         </div>
//                         <div class="logo_background">
//                             <img src="assets/images/temp_img/logo.png" width="152" height="64">
//                         </div>
//                        </div>
//                        <div class="invoice_details">
//                         <h1 class="text-end mb-4 "style="font-size: 24px;
//                         font-weight: 900;
//                         color: #1A1A1A;">INVOICE</h1>
//                         <div class="d-flex justify-content-between">
//                             <div class="invoice_text">
//                                 <h2 class="mb-3" style="color:red">Invoice To: Jane Doe</h2>
//                                 <h3 class="mb-0">Transaction ID : 1234567890</h3>
//                             </div>
//                             <div class="text-end invoice_text">
//                                 <h2 class="mb-3">Invoice No: 0001 </h2>
//                                 <h3 class="mb-0">Invoice date: 10 November 2023</h3>
//                             </div>
//                         </div>
//                        </div>
//                        <div class="table_background">
//                         <table class="table mb-0" id="dtHorizontalExample" cellspacing="0" width="100%">
//                             <thead>
//                                 <tr class="table_invoice">
//                                     <th scope="col" class="fs-16 fw-500 theading" style="width: 10%;">SL.</th>
//                                     <th scope="col" class="fs-16 fw-500 theading" style="width: 70%;">Plan Name</th>
//                                     <th scope="col" class="fs-16 fw-500 theading" style="width: 10%;">Price</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td class="fs-18 fw-600 black">1.</td>
//                                     <td class="fs-18 fw-600 black">Saver</td>
//                                     <td class="fs-18 fw-600 black"> ₦19</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                        </div>
//                        <div class="col-md-3 mx-0 ms-auto">
//                         <div class="d-flex justify-content-between mb-4">
//                             <div class="invoice_total">
//                                 <h3 class="mb-2">Subtotal</h3>
//                                 <h4 class="mb-0">Tax</h4>
//                             </div>
//                             <div class="invoice_total">
//                                 <h3 class="mb-2">₦19.00</h3>
//                                 <h4 class="mb-0">₦19.00</h4>
//                             </div>
//                         </div>
//                         <div class="d-flex justify-content-between subtotal">
//                                 <h3 class="mb-0 fs-16 fw-600">Subtotal</h3>
//                                 <h3 class="mb-0 fs-16 fw-600">₦19.00</h3>
//                         </div>
                       
//                        </div>
//                        <div class="bottom_border">
//                     </div>
//                     </DIV>
//                 </div>
//                 <!-- MIDDLE CONTENT END -->
//             </div>
    
    
    
//             <!-- scripts links -->
//             <script src="assets/js/bootstrap.bundle.min.js"></script>
//             <script src="assets/js/jquery.js"></script>
    
    
//     </body>
    
//     </html>
// `;

//     async generatePDF() {
//         const doc = new jsPDF({
//             orientation: 'landscape',
//             unit: 'mm',
//             format: 'a4' // A4 dimensions (210 x 297 mm)
//         });

//         // Add HTML content to PDF
   
//         doc.html(this.htmlContent, {
//             callback: () => {
//                 // Save PDF
//                 doc.save("filename");
//             },
//             html2canvas: {
//                 scale: 0.50 // Adjust the scale as needed to fit content
//             }
//         });
//     }



    
// }
