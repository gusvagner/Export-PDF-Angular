import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import jsPDF, { CellConfig } from 'jspdf';
(window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-example-with-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './example-with-data.component.html',
  styleUrls: ['./example-with-data.component.scss']
})
export class ExampleWithDataComponent {  
 
  data: Country[] = [
    {
      Id: 1,
      Codigo: 4,
      NomePais: "Afeganistão",
      ISO: "AFG"
    },
    {
      "Id": 2,
      "Codigo": 8,
      "NomePais": "Albânia",
      "ISO": "ALB"
    },
    {
      "Id": 3,
      "Codigo": 10,
      "NomePais": "Antártida",
      "ISO": "ATA"
    },
    {
      "Id": 4,
      "Codigo": 12,
      "NomePais": "Argélia",
      "ISO": "DZA"
    },
    {
      "Id": 5,
      "Codigo": 16,
      "NomePais": "Samoa Americana",
      "ISO": "ASM"
    },
    {
      "Id": 6,
      "Codigo": 20,
      "NomePais": "Andorra",
      "ISO": "AND"
    },
    {
      "Id": 7,
      "Codigo": 24,
      "NomePais": "Angola",
      "ISO": "AGO"
    },
    {
      "Id": 8,
      "Codigo": 28,
      "NomePais": "Antígua e Barbuda",
      "ISO": "ATG"
    },
    {
      "Id": 9,
      "Codigo": 31,
      "NomePais": "Azerbaijão",
      "ISO": "AZE"
    },
    {
      "Id": 10,
      "Codigo": 32,
      "NomePais": "Argentina",
      "ISO": "ARG"
    }
  ]

  pdfMake() {
    const columns = Object.keys(this.data[0]);
    const headers = columns.map((column) => ({ text: column, style: 'tableHeader' }));

    let test = this.data[0]['Codigo']; 
    console.log(test);

    const rows = this.data.flatMap((country) => {       
      const cells = columns.map((column) => ({ text: (country as any)[column] }));     
      return [...[cells]];
    })

    const docDefinition: TDocumentDefinitions = {
      content: [
        { 
          text: 'Countries', 
          style: 'header' 
        },
        {
          table: {
            headerRows: 1,
            widths: headers.map(() => '*'),
            body: [headers, ...rows],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 15,
          bold: false,
          margin: [0, 0, 0, 10],
          color: 'blue'
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();    
  }

  jsPDFTable() {
    let pdf = new jsPDF({putOnlyUsedFonts: true, orientation: 'portrait'});  
    pdf.table(1, 1, this.data as [], this.headers, {autoSize: true});
    pdf.save('test-table.pdf');
  }

  headers = this.createHeaders([
    'Id',
    'Codigo',
    'NomePais',
    'ISO'    
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

}

export class Country {
  Id!: number;
  Codigo!: number;
  NomePais!: string;
  ISO!: string;
}
