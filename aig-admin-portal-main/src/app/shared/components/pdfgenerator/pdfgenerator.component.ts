import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Transaction } from 'src/app/users/models/transaction';
@Component({
  selector: 'app-pdfgenerator',
  templateUrl: './pdfgenerator.component.html',
  styleUrls: ['./pdfgenerator.component.scss']
})
export class PdfgeneratorComponent implements OnInit {

  transaction: Transaction = new Transaction();
  constructor(private elementRef: ElementRef) { }
  ngOnInit(): void {

  }


 


  // exportAsPDF(transaction: Transaction) {
  //   this.transaction = transaction;
  //   let el = document.getElementById('pdf_1') as HTMLElement;
  //   // Capture the content of the element 'pdf_1' and render it onto a canvas
  //   html2canvas(el, { scale: 10 }).then(canvas => { // Increase scale for higher quality
  //     let imageData = canvas.toDataURL('image/jpeg', 1.0); // Convert the canvas to a JPEG image data URL with maximum quality
  //     // Create a new jsPDF instance
  //     let jspdf = new jsPDF('p', 'mm', 'a4'); // Use 'mm' units
  //     // Set the size of the PDF to match the canvas dimensions
  //     jspdf.internal.pageSize.width = canvas.width * 0.264583; // Convert pixels to mm (1px = 0.264583mm)
  //     jspdf.internal.pageSize.height = canvas.height * 0.264583; // Convert pixels to mm (1px = 0.264583mm)
  //     // Add the captured image to the PDF at position (0, 0)
  //     jspdf.addImage(imageData, 'JPEG', 0, 0, canvas.width * 0.264583, canvas.height * 0.264583); // Convert pixels to mm

  //     // Save the PDF
  //     jspdf.save('invoice.pdf');
  //   });
  // }

}
