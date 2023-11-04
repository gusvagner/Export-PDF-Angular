import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import jsPDF, { CellConfig } from 'jspdf';
(window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pdf';
  
  @ViewChild('table', {static: false}) table!: ElementRef;

  values = [
    {
      "Header1": "Sample value 1",
      "Header2": "Sample value 2",
      "Header3": "Sample value 3",
      "Header4": "Sample value 4",
    },
    {
      "Header1": "Sample value 1",
      "Header2": "Sample value 2",
      "Header3": "Sample value 3",
      "Header4": "Sample value 4",
    },
    {
      "Header1": "Sample value 1",
      "Header2": "Sample value 2",
      "Header3": "Sample value 3",
      "Header4": "Sample value 4",
    },
    {
      "Header1": "Sample value 1",
      "Header2": "Sample value 2",
      "Header3": "Sample value 3",
      "Header4": "Sample value 4",
    },
    
  ]


  pdfMake() {
    var docDefinition = {    
      content: [                
        {
          style: "tableExample",
          color: "#444",
          table: {
            width: [200, 'auto', 'auto'],
            headerRows: 2,
            body: [              
              [
                {text: 'Header 1', style: 'tableHeader', alignment: 'center'}, 
                {text: 'Header 2', style: 'tableHeader', alignment: 'center'}, 
                {text: 'Header 3', style: 'tableHeader', alignment: 'center'},
                {text: 'Header 4', style: 'tableHeader', alignment: 'center'}
              ],
              ['Sample value 1', 'Sample value 2', 'Sample value 3', 'Sample value 4']              
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,       
        },
        subheader: {
          fontSize: 16,
          bold: true,
          // margin: [0, 10, 0, 5]
        },
        tableExample: {
          // margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }      
    };

    pdfMake.createPdf(docDefinition).open();
  }

  headers = this.createHeaders([
    'Header1',
    'Header2',
    'Header3',
    'Header4',
  ])

  createHeaders(keys: string[]): CellConfig[] {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      let test: CellConfig = {
        name: keys[i] as string,
        prompt: keys[i] as string,
        width: 65,
        align: "center",
        padding: 0
      }
      result.push(test);
    }
    return result;
  }


  jsPDFTable() {    
    let doc = new jsPDF({putOnlyUsedFonts: true, orientation: 'portrait'});
    doc.table(1, 1, this.values, this.headers, {autoSize: true});
    doc.save('test-table.pdf');    
  }

  jsPDFHtml() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.table.nativeElement, {
      callback: (pdf) => {
        pdf.save('test-html.pdf')
      }
    })
  }

  jsPDFWithCanvas() {
    html2canvas(this.table.nativeElement, {scale: 3}).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 200;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
      PDF.html(this.table.nativeElement.innerHTML)
      PDF.save('test-canvas.pdf');
    })
  }

  
}
